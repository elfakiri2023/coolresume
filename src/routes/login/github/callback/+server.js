import { initializeGithub } from '$lib/server/auth'
import { OAuth2RequestError } from 'arctic'
import { generateId } from 'lucia'
import { eq } from 'drizzle-orm'
import { userTable, experienceTable, socialTable } from '$lib/server/db/schema'
import { fail, redirect } from '@sveltejs/kit'

export async function GET(event) {
	const code = event.url.searchParams.get('code')
	const state = event.url.searchParams.get('state')
	const storedState = event.cookies.get('github_oauth_state') ?? null

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		})
	}

	try {
		const lucia = event.locals.lucia
		const github = initializeGithub()
		const tokens = await github.validateAuthorizationCode(code)
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})

		const githubUser = await githubUserResponse.json()

		const existingUser = await event.locals.DB.query.userTable.findFirst({
			where: eq(userTable.github_id, githubUser.id)
		})

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})

			return redirect(302, `/${username}`)
		} else {
			const userId = generateId(15)
			db.prepare('INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)').run(userId, githubUser.id, githubUser.login)
			const session = await lucia.createSession(userId, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		})
	} catch (e) {
		console.log(e)
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			// invalid code
			return new Response(null, {
				status: 400
			})
		}
		return new Response(null, {
			status: 500
		})
	}
}
