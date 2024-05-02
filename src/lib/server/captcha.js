import { TURNSTILE_SECRET_KEY } from '$env/static/private'

/**
 * @param {string} ip
 * @param {string|null} token
 * @returns {Promise<object>}
 */
export async function validateCaptcha(ip, token) {
	let captchaData = new FormData()
	captchaData.append('secret', TURNSTILE_SECRET_KEY)
	captchaData.append('response', token)
	captchaData.append('remoteip', ip)

	const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		body: captchaData,
		method: 'POST'
	})

	const outcome = await result.json()

	if (!outcome.success) {
		outcome.message = 'Error with captcha, please try again.'
	}

	return outcome
}
