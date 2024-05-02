import { writable } from 'svelte/store'

const placeholder = {
	fullName: 'John Doe',
	imageUrl: 'https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop',
	work: 'Software Developer'
}

export const userData = writable(placeholder)
export const resume = writable({})
export const user = writable(null)
