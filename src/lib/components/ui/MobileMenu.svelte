<script>
	import { mobileNavOpen } from '$lib/stores/general'
	import { fade } from 'svelte/transition'
	import { clickOutside } from '$lib/shared/clickOutside'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'

	import Navigation from '$lib/components/ui/Navigation.svelte'

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
<div use:clickOutside on:keydown={handleKeyDown} on:clickOutside={() => mobileNavOpen.set(false)} class="flex md:hidden">
	<!-- Hamburger button -->
	<button bind:this={trigger} class="hamburger" class:active={$mobileNavOpen} aria-controls="mobile-nav" aria-expanded={$mobileNavOpen} on:click={toggleMobileNav}>
		<span class="sr-only">Menu</span>
		<GeneralIcons name={$mobileNavOpen ? `close` : `burger`} class="w-7 h-7 fill-current text-surface-800 dark:text-primary-800" />
	</button>

	<!-- Mobile navigation -->
	{#if $mobileNavOpen}
		<nav bind:this={mobileNav} id="mobile-nav" class="bg-surface-100 dark:bg-surface-800 absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll" transition:fade={{ duration: 200 }}>
			<!-- Nav content -->
			<Navigation isMobile={true} class="px-5 py-2" />
		</nav>
	{/if}
</div>
