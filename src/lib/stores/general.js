import { writable } from 'svelte/store'
export const turnstileLoaded = writable(false)
export const canEdit = writable(false)
export const currentMode = writable('preview') // preview
export const loggedIn = writable(false)
