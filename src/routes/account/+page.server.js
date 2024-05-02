import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	if (!locals.user) return redirect(302, '/login')

	return { user: locals.user }
}

export const actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401)
		}
		const lucia = locals.lucia
		/* @ts-ignore */
		await lucia.invalidateSession(locals.session.id)
		const sessionCookie = lucia.createBlankSessionCookie()
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
		return redirect(302, '/login?1')
	}
}
