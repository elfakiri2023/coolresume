<script>
	import Logo from '$lib/components/ui/Logo.svelte'
	import MobileMenu from '$lib/components/ui/MobileMenu.svelte'
	import Navigation from '$lib/components/ui/Navigation.svelte'
</script>

<header class="relative w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out">
	<div class="container mx-auto px-5 sm:px-6">
		<div class="flex items-center justify-between h-16 md:h-20">
			<div class="shrink-0 mr-4">
				<Logo />
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex md:grow">
				<Navigation class="flex grow justify-end flex-wrap items-center" />
			</nav>

			<MobileMenu />
		</div>
	</div>
</header>
