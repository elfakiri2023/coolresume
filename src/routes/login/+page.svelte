<script>
	import { enhance } from '$app/forms'
	import Turnstile from '$lib/components/shared/Turnstile.svelte'
	import { currentPage } from '$lib/stores/general'
	import SocialIcons from '$lib/components/icons/SocialIcons.svelte'

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
			<div class="flex flex-col items-center space-y-3">
				<button
					on:click={() => {
						turnstileComponent.render()
					}}
					type="button"
					class="btn variant-filled-primary font-medium rounded-lg px-4 py-2 w-full">Login</button
				>
				<!-- <div class="social-login">
					<div class="flex items-center w-full p-2">
						<div class="flex-grow border-t border-gray-400"></div>
						<p class="text-sm mx-3">Or login with</p>
						<div class="flex-grow border-t border-gray-400"></div>
					</div>
					<div class="flex items-center space-x-3">
						<button
							on:click={() => {
								// Add your GitHub login function here
							}}
							type="button"
							class="btn btn-sm variant-filled"
						>
							<span><SocialIcons name="discord" class="w-5 h-5 text-[#7289da]" /></span>
							<span>Discord</span>
						</button>
						<a href="/login/github" class="btn btn-sm variant-filled">
							<span><SocialIcons name="github" class="w-5 h-5" /></span>
							<span>Github</span>
						</a>
					</div>
				</div> -->
			</div>
			{#if form?.message}
				<h3 id="message" class="alert-message text-center text-warning-600 mt-4">{form.message}</h3>
			{/if}
			<footer class="card-footer text-center mt-4">
				Don't have an account? <a href="/sign-up" class="underline text-primary-600 dark:text-primary-100">Sign up</a>
			</footer>
		</form>
	</div>
</div>
