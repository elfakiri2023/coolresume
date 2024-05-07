import { fail, redirect } from '@sveltejs/kit'
import { generateId } from 'lucia'
import { userTable, socialTable } from '$lib/server/db/schema'
import { validateCaptcha } from '$lib/server/captcha'
import { createPasswordHash } from '$lib/server/password-hasher'
import { z } from 'zod'
import { loggedIn } from '$lib/stores/general'

export const load = async ({ locals }) => {
	if (locals.user) return redirect(302, `/${locals.user.username}`)
	return {}
}

export const actions = {
	default: async ({ request, locals, cookies, platform }) => {
		const formData = await request.formData()
		const username = formData.get('username')
		const email = formData.get('email')
		const password = formData.get('password')
		const captchaToken = formData.get('cf-turnstile-response')
		const ip = request.headers.get('CF-Connecting-IP') ?? ''

		const schema = z.object({
			username: z.string().min(3, { message: 'Username must be at least 3 characters' }).max(32, { message: 'Username must be at most 32 characters' }),
			email: z.string().email({ message: 'Email must be a valid email' }),
			password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
			captchaToken: z.string().min(1, { message: 'Captcha Token must not be empty' })
		})

		try {
			schema.parse({ username, email, password, captchaToken })
		} catch (error) {
			return fail(400, {
				// @ts-ignore
				message: error.errors[0]?.message
			})
		}

		const outcome = await validateCaptcha(ip, captchaToken)

		if (!outcome.success) {
			return fail(400, {
				message: 'Error with captcha, please try again.'
			})
		}

		const hashedPassword = await createPasswordHash(password)
		const userId = generateId(15)

		try {
			await locals.DB.insert(userTable).values({
				id: userId,
				username,
				password: hashedPassword,
				email
			})

			await locals.DB.insert(socialTable).values({
				id: generateId(15),
				user_id: userId,
				facebook: '#',
				youtube: '#',
				github: '#',
				linkedin: '#',
				twitter: '#',
				instagram: '#'
			})

			const lucia = locals.lucia

			const session = await lucia.createSession(userId, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
		} catch (e) {
			if (e instanceof Error && e.message === 'D1_ERROR: UNIQUE constraint failed: user.username') {
				return fail(400, {
					message: 'Username already used'
				})
			}

			return fail(500, {
				/* @ts-ignore */
				message: 'An unknown error occurred ' + e?.message
			})
		}

		loggedIn.set(true)
		return redirect(302, `/${username}?welcome`)
	}
}
