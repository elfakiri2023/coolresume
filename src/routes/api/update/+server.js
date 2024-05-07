import { json } from '@sveltejs/kit'
import { userTable, experienceTable, socialTable } from '$lib/server/db/schema'
import { eq, and } from 'drizzle-orm'
import { generateId } from 'lucia'

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
	} else if (key === 'social') {
		const referenceKeys = ['facebook', 'youtube', 'github', 'linkedin', 'twitter', 'instagram']
		const objKeys = Object.keys(value)
		if (referenceKeys.length === objKeys.length && referenceKeys.every((key) => objKeys.includes(key))) {
			const result = await locals.DB.update(socialTable).set(value).where(eq(socialTable.user_id, locals.user.id))

			if (result.success) {
				return json({ status: 'success', message: 'Your resume has been updated successfully' })
			}
		}
	} else if (key === 'skills') {
		const skills = Array.isArray(value) && value.length > 0 ? value.join(',') : []
		const result = await locals.DB.update(userTable).set({ skills: skills }).where(eq(userTable.id, locals.user.id))

		if (result.success) {
			return json({ status: 'success', message: 'Your resume has been updated successfully' })
		}
	} else if (key === 'experience_add') {
		const referenceKeys = ['company', 'position', 'start_date', 'end_date', 'description']
		const objKeys = Object.keys(value)
		if (referenceKeys.length === objKeys.length && referenceKeys.every((key) => objKeys.includes(key))) {
			const id = generateId(15)
			const result = await locals.DB.insert(experienceTable).values({
				id: id,
				user_id: locals.user.id,
				...value
			})

			if (result.success) {
				return json({
					status: 'success',
					message: 'Your resume has been updated successfully',
					data: {
						id: id,
						user_id: locals.user.id,
						...value
					}
				})
			}
		}
	} else if (key === 'experience_remove') {
		const result = await locals.DB.delete(experienceTable).where(and(eq(experienceTable.user_id, locals.user.id), eq(experienceTable.id, value)))

		if (result.success) {
			return json({ status: 'success', message: 'Your resume has been updated successfully' })
		}
	} else if (key === 'experience_edit') {
		const referenceKeys = ['id', 'company', 'position', 'start_date', 'end_date', 'description']
		const objKeys = Object.keys(value)
		if (referenceKeys.length === objKeys.length && referenceKeys.every((key) => objKeys.includes(key)) && value.id) {
			const { id, ...values } = value
			const result = await locals.DB.update(experienceTable)
				.set({
					...values
				})
				.where(and(eq(experienceTable.user_id, locals.user.id), eq(experienceTable.id, id)))

			if (result.success) {
				return json({
					status: 'success',
					message: 'Your resume has been updated successfully',
					data: {
						...value
					}
				})
			}
		}
	}

	return json({ status: 'error', message: 'Cannot save changes, Please try again!', data: {} })
}
