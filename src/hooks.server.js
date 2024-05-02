import { initializeLucia } from '$lib/server/auth'
import { dev } from '$app/environment'
import { D1Database$, R2Bucket$ } from 'cfw-bindings-wrangler-bridge'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '$lib/server/db/schema'

/**
 * @param {string} dbName
 * @returns {Promise<D1Database$>}
 */
const getDevD1 = async (dbName) => {
	return new D1Database$(dbName)
}

/**
 * @param {string} bucketName
 * @returns {Promise<R2Bucket$>}
 */
const getDevR2 = async (bucketName) => {
	return new R2Bucket$(bucketName)
}

/** @type { import('@sveltejs/kit').Handle } */
export const handle = async ({ event, resolve }) => {
	if (dev) {
		event.locals.db = await getDevD1('DB')
		event.locals.bucket = await getDevR2('BUCKET')
	} else {
		event.locals.db = event.platform?.env?.DB
		event.locals.bucket = event.platform?.env?.BUCKET
	}

	event.locals.DB = drizzle(event.locals.db, { schema })
	event.locals.lucia = initializeLucia(event.locals.db, event.platform?.env)

	if (event.url.pathname.startsWith('/api') && event.request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*'
			}
		})
	}

	const lucia = event.locals.lucia
	const sessionId = event.cookies.get(lucia.sessionCookieName)

	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	const { session, user } = await lucia.validateSession(sessionId)
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}

	event.locals.user = user
	event.locals.session = session

	const response = await resolve(event)

	if (event.url.pathname.startsWith('/api')) {
		response.headers.append('Access-Control-Allow-Origin', `*`)
	}

	return response
}
