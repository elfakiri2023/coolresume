export const USERNAME_REGEX = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // MB in bytes
export const ACCEPTED_IMAGETYPE_EXTENSIONS = {
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webm': 'webm',
	'image/webp': 'webp',
	'image/svg+xml': 'svg',
	'image/avif': 'avif'
}
