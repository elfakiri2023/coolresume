<script>
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { turnstileLoaded } from '$lib/stores/general'
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'

	export async function render() {
		const widgetId = turnstile.render('#cf-turnstile', {
			sitekey: PUBLIC_TURNSTILE_SITE_KEY,
			callback: function () {
				document.getElementById('submit')?.click()
				turnstile.remove(widgetId)
			}
		})
	}

	function turnstileCallback() {
		turnstileLoaded.set(true)
	}

	let mounted = false
	onMount(() => {
		mounted = true
		return () => {
			mounted = false
		}
	})
</script>

<svelte:head>
	{#if browser && $turnstileLoaded == false}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" on:load={turnstileCallback} async></script>
	{/if}
</svelte:head>

{#if mounted && $turnstileLoaded}
	<div id="cf-turnstile" class="mb-4" data-test={PUBLIC_TURNSTILE_SITE_KEY}></div>
{/if}
