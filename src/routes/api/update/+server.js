import { json } from '@sveltejs/kit'
import { userTable, experienceTable, socialTable } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

const sigleValue = ['about', 'full_name', 'job_title']

export const POST = async ({ request, locals }) => {
	if (!locals.user || !locals.user.id) {
		return json({ status: 'error', message: 'You are not logged in' })
	}

	const { key, value } = await request.json()

	if (!key) {
		return json({ status: 'error', message: 'Invalid request' })
	}

	if (!value) {
		return json({ status: 'error', message: 'Value cannot be empty' })
	}

	if (sigleValue.includes(key)) {
		const result = await locals.DB.update(userTable)
			.set({ [key]: value })
			.where(eq(userTable.id, locals.user.id))

		if (result.success) {
			return json({ status: 'success', message: 'Your resume has been updated successfully' })
		}

		return json({ status: 'error', message: 'Cannot save changed, Please try again!' })
	}

	return json({ status: 'error', message: 'Something wront' })
}
