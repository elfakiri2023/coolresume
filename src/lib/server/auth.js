import { Lucia } from 'lucia'
import { D1Adapter } from '@lucia-auth/adapter-sqlite'
import { dev } from '$app/environment'
import { GitHub } from 'arctic'

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private'

export function initializeGithub() {
	return new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)
}

/**
 * @param {import('cfw-bindings-wrangler-bridge').D1Database$} db
 * @param {object} env
 */
export function initializeLucia(db, env = {}) {
	const adapter = new D1Adapter(db, {
		user: 'user',
		session: 'session'
	})

	return new Lucia(adapter, {
		sessionCookie: { attributes: { secure: !dev } },
		getUserAttributes: (attributes) => {
			return {
				username: attributes.username,
				githubId: attributes.github_id,
				image_url: attributes.image_url
			}
		}
	})
}
