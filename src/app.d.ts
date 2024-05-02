// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			bucket: R2Bucket$
			DB: DrizzleD1Database
			db: DrizzleD1Database
			lucia: initializeLucia
			user: User | null
			session: Object | null
		}
		// interface PageData {}
		interface Platform {
			env?: {
				DB: D1Database
				BUCKET: R2Bucket
			}
			context: {
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & { default: Cache }
		}
	}
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface User {
	id: string
	github_id: number
	username: string
}

interface DatabaseUserAttributes {
	github_id: number
	username: string
}

declare global {
	interface RenderOptions {
		sitekey: string
		action?: string
		retry?: 'never' | 'auto'
		'retry-interval'?: number
		callback?: (token: string) => void
		'error-callback'?: (errorCode: string) => boolean | void
	}

	const turnstile: {
		ready: (onready: () => void) => void
		render: (targetElement: string, options: RenderOptions) => string
		remove: (widgetId: string) => void
	}
}

export {}
