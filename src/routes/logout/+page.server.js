import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals?.session?.id) {
		await locals.lucia.invalidateSession(locals.session.id)
		locals.user = null
		locals.session = null
	}

	redirect(307, '/')
}
