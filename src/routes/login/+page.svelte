<script>
	import { enhance } from '$app/forms'
	import Turnstile from '$lib/components/shared/Turnstile.svelte'
	import { currentPage } from '$lib/stores/general'

	currentPage.set('Login')

	/** @type {import('./$types').ActionData} */
	export let form
	/** @type {Turnstile} */
	let turnstileComponent
</script>

<div class="flex items-center justify-center mt-20">
	<div class="card w-full max-w-md p-6 pb-0 mx-2 rounded shadow-lg">
		<h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
		<form method="post" use:enhance>
			<div class="mb-4">
				<label for="username" class="label mb-2 text-sm font-medium">Username</label>
				<input type="text" name="username" class="input" placeholder="Enter your username" minlength="3" maxlength="24" required />
			</div>
			<div class="mb-6">
				<label for="password" class="block mb-2 text-sm font-medium">Password</label>
				<input type="password" name="password" class="input" placeholder="Enter your password" minlength="6" required />
			</div>
			<button class="hidden" id="submit" type="submit"></button>
			<Turnstile bind:this={turnstileComponent} />
			<button
				on:click={() => {
					turnstileComponent.render()
				}}
				type="button"
				class="btn variant-filled-primary font-medium rounded-lg">Login</button
			>
			{#if form?.message}
				<h3 id="message" class="alert-message text-center text-warning-600 mt-4">{form.message}</h3>
			{/if}
			<footer class="card-footer text-center mt-2">
				Don't have an account? <a href="/sign-up" class="underline text-primary-600 dark:text-primary-100">Sign up</a>
			</footer>
		</form>
	</div>
</div>
