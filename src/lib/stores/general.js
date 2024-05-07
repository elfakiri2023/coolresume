import { writable } from 'svelte/store'
export const turnstileLoaded = writable(false)
export const canEdit = writable(false)
export const currentMode = writable('preview') // edit
export const loggedIn = writable(false)
export const currentPage = writable('home')
export const firstTime = writable(false)
export const mobileNavOpen = writable(false)
