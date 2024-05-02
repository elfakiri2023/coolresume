<script>
	import { LightSwitch } from '@skeletonlabs/skeleton'
	import { loggedIn } from '$lib/stores/general'
	import { user } from '$lib/stores/userData'
	import { page } from '$app/stores'

	export let isMobile = false
</script>

<ul {...$$restProps}>
	{#if $loggedIn === false}
		<a href="/login" class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-primary` : `btn btn-sm variant-primary`}>Sign in</a>
		<a href="/sign-up" class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-filled-primary` : `btn btn-sm variant-filled-primary`}>Sign up</a>
	{:else}
		{#if $user && $page.params.username !== $user.username}
			<a href={`/${$user.username}`} class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-primary` : `btn btn-sm variant-primary`}>Account</a>
		{/if}
		<a data-sveltekit-reload href="/logout" class={isMobile ? `flex w-full justify-center my-2 btn btn-sm variant-filled-primary` : `btn btn-sm variant-filled-primary`}>Log out</a>
	{/if}
	<div class="hidden md:block mx-4 w-[1px] h-8 bg-surface-500 opacity-70 dark:opacity-100"></div>
	<div class={isMobile ? `flex w-full justify-center my-2` : ``}>
		<LightSwitch />
	</div>
</ul>
