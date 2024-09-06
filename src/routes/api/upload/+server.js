import { json } from '@sveltejs/kit'
import { MAX_IMAGE_SIZE } from '$lib/consts'
import { z } from 'zod'
import { userTable } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import { ACCEPTED_IMAGETYPE_EXTENSIONS } from '$lib/consts'

/**
 * @param {string} str
 * @returns {string}
 */
const slugifyString = (str) => {
	return str
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/\./g, '-')
		.replace(/-+/g, '-')
		.replace(/[^a-z0-9-]/g, '-')
}

/**
 * @param {File} file
 * @returns {string|boolean}
 */
const imageExtension = (file) => {
	// @ts-ignore
	return ACCEPTED_IMAGETYPE_EXTENSIONS[file.type] || false
}

export const POST = async ({ request, locals }) => {
	if (!locals.user || !locals.user.id) {
		return json({ status: 'error', message: 'You are not logged in' }, { status: 401 })
	}

	// @ts-ignore
	const formData = Object.fromEntries(await request.formData())
	const oldKey = locals.user.image_url
	const schema = z.object({
		image: z
			.instanceof(File, {
				message: 'Invalid file'
			})
			.refine((data) => data.size < MAX_IMAGE_SIZE, {
				message: `Image must be less than ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
			})
			.refine((data) => imageExtension(data), {
				message: 'File must be an image'
			})
	})

	try {
		schema.parse(formData)
	} catch (error) {
		// @ts-ignore
		console.log(error)
		return json({ message: error.errors[0]?.message }, { status: 400 })
	}

	const image = formData.image
	const ext = imageExtension(image)
	const objectKey = `${slugifyString(locals.user.username)}-${slugifyString(Date.now().toString())}.${ext}`

	try {
		if (oldKey) {
			// delete old image first
			const object = await locals.bucket.get(oldKey)
			if (object) {
				await locals.bucket.delete(oldKey)
			}
		}

		const uploadedImage = await locals.bucket.put(objectKey, image)

		if (uploadedImage.key) {
			const key = uploadedImage.key
			const result = await locals.DB.update(userTable).set({ image_url: key }).where(eq(userTable.id, locals.user.id))

			if (result.success) {
				return json({ success: true, key: uploadedImage.key }, { status: 200 })
			}
		}

		return json({ message: 'Failed to upload image' }, { status: 400 })
	} catch (e) {
		return json({ message: e instanceof Error ? e.message : 'Failed to upload image' }, { status: 400 })
	}
}
