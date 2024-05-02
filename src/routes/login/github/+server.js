import { redirect } from '@sveltejs/kit'
import { generateState } from 'arctic'
import { initializeGithub } from '$lib/server/auth'
import { dev } from '$app/environment'

export async function GET({ cookies }) {
	const state = generateState()
	// @ts-ignore
	const github = initializeGithub()
	const url = await github.createAuthorizationURL(state)

	cookies.set('github_oauth_state', state, {
		path: '/',
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	})

	redirect(302, url.toString())
}
