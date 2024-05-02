const encoder = new TextEncoder()

/**
 * @param {string|undefined|} password
 * @param {string|null} salt
 * @returns {Promise<string>}
 */
export async function createPasswordHash(password = undefined, salt = null) {
	if (!salt) {
		salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('')
	}

	const cryptoKey = await crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, ['deriveKey', 'deriveBits'])

	const hash = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt: encoder.encode(salt),
			iterations: 100000,
			hash: 'SHA-256'
		},
		cryptoKey,
		256
	)

	return (
		Array.from(new Uint8Array(hash))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('') + salt
	)
}

/**
 * @param {string} password
 * @param {string} hashedPasswordWithSalt
 * @returns {Promise<boolean>}
 */
export async function verifyPasswordHash(password, hashedPasswordWithSalt) {
	let salt = hashedPasswordWithSalt.slice(-32)

	const hashedPassword = await createPasswordHash(password, salt)

	return hashedPassword === hashedPasswordWithSalt
}
