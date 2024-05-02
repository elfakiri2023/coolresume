import { redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { userTable, experienceTable, socialTable } from '$lib/server/db/schema'

export const load = async ({ locals, params }) => {
	const username = params.username ? params.username.trim() : ''

	if (!/^[a-zA-Z0-9][a-zA-Z0-9-_]{1,22}[a-zA-Z0-9]$/.test(username)) {
		return redirect(302, '/')
	}

	// For some unkown reasons I can't so joins query with drizzle orm
	// So for now I will use 3 diffrents queries and comine the resultsy

	const user = await locals.DB.query.userTable.findFirst({
		where: eq(userTable.username, username)
	})

	if (!user?.id) {
		return redirect(302, '/')
	}

	const social = await locals.DB.query.socialTable.findFirst({
		where: eq(socialTable.user_id, user.id)
	})

	// prettier-ignore
	const experiences = await locals.DB
		.select()
		.from(experienceTable)
		.where(eq(experienceTable.user_id, user.id))

	return { user: locals.user, resume: { user, social, experiences } }
}
