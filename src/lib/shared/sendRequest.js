/**
 *
 * @param {string} key
 * @param {string|object} value
 * @returns {Promise<import('@skeletonlabs/skeleton').ToastSettings|Object>}
 */
export async function sendRequest(key, value) {
	let response = { success: false, message: 'Something went wrong!' }

	const request = await fetch('/api/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			key: key,
			value: value
		})
	})

	if (!request.ok) {
		response.message = 'Oops! Something went wrong. Please try again later.'
	}

	const data = await request.json()

	if (data.status === 'error') {
		response.message = data.message
	}

	if (data.status === 'success') {
		response.success = true
	}

	response.message = data.message

	const toast = {
		message: response.message,
		background: response.success ? 'variant-filled-primary' : 'variant-filled-warning'
	}

	if (data.data && Object.keys(data.data).length > 0) {
		return { responseData: data.data, toast }
	}

	return toast
}
