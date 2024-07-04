import { z } from 'zod'
import { json } from '@sveltejs/kit'
import { userTable } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const POST = async ({ request, locals }) => {
	try {
		const formData = await request.json()
		const data = formData.value || {}

		const formDataSchema = z.object({
			username: z.string(),
			name: z.string(),
			email: z.string().email(),
			message: z.string()
		})

		try {
			formDataSchema.parse(data)
		} catch (error) {
			return json({ status: 'error', message: `Could not send email: ${error.errors[0]?.message}` })
		}

		const user = await locals.DB.query.userTable.findFirst({
			where: eq(userTable.username, data.username)
		})

		if (!user) {
			return json({ status: 'error', message: 'User not found' })
		}

		let content = `Hello, ${user.full_name} \n\n`
		content += `You got a new message. \n\n`
		content += `Name: ${data.name} \n`
		content += `Email: ${data.email} \n`
		content += `Message: ${data.message} \n\n`
		content += `Best, \nCool resume`

		const send = await fetch(
			new Request('https://api.mailchannels.net/tx/v1/send', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					personalizations: [
						{
							to: [
								{
									email: user.email,
									name: user.full_name
								}
							]
						}
					],
					from: {
						email: 'no-reply@coolresu.me',
						name: 'Cool resume'
					},
					subject: 'Cool Resume | New Message Received',
					content: [
						{
							type: 'text/plain',
							value: content
						}
					]
				})
			})
		)

		return json({ status: 'success', message: 'Message sent successfully' })
	} catch (err) {
		return json({ status: 'error', message: 'Something went wrong' })
	}
}
