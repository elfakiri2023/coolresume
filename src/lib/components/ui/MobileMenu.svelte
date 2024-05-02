<script>
	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { clickOutside } from '$lib/shared/clickOutside'

	import Navigation from '$lib/components/ui/Navigation.svelte'

	let mobileNavOpen = writable(false)
	let trigger
	let mobileNav

	/**
	 * @param {KeyboardEvent} event
	 */
	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			mobileNavOpen.set(false)
		}
	}

	function toggleMobileNav() {
		mobileNavOpen.update((n) => !n)
	}

	function closeMobileNav() {
		mobileNavOpen.set(false)
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div use:clickOutside on:keydown={handleKeyDown} on:clickOutside={(() => console.log('xxxx'), mobileNavOpen.set(false))} class="flex md:hidden">
	<!-- Hamburger button -->
	<button bind:this={trigger} class="hamburger" class:active={$mobileNavOpen} aria-controls="mobile-nav" aria-expanded={$mobileNavOpen} on:click={toggleMobileNav}>
		<span class="sr-only">Menu</span>
		<svg class="w-6 h-6 fill-current text-surface-800 dark:text-primary-800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<rect y="4" width="24" height="2" />
			<rect y="11" width="24" height="2" />
			<rect y="18" width="24" height="2" />
		</svg>
	</button>

	<!-- Mobile navigation -->
	{#if $mobileNavOpen}
		<nav bind:this={mobileNav} id="mobile-nav" class="bg-surface-100 dark:bg-surface-800 absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll" transition:fade={{ duration: 200 }}>
			<!-- Nav content -->
			<Navigation isMobile={true} class="px-5 py-2" />
		</nav>
	{/if}
</div>
