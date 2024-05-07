<script>
	let open = false
</script>

<div class="justify-center w-full mx-auto">
	<div class="flex flex-col w-full px-8 py-2 mx-auto md:px-12 md:items-center md:justify-between md:flex-row lg:px-32 max-w-7xl">
		<div class="flex flex-row items-center justify-between text-black">
			<a class="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-black" href="/">
				<span> ❖ </span>
				<span>Logo</span>
			</a>
			<button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" on:click={() => (open = !open)}>
				<svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
					<path class={open ? 'hidden' : 'inline-flex'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					<path class={open ? 'inline-flex' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
		</div>
		<nav class="flex-col items-center flex-grow gap-3 p-4 px-5 text-sm font-medium text-gray-500 md:px-0 md:pb-0 md:flex md:justify-start md:flex-row lg:p-0 md:mt-0 {open ? 'flex' : 'hidden'}">
			<a class="hover:text-black focus:outline-none focus:text-gray-500 md:ml-auto" href="#_">Features</a>
			<a class="hover:text-black focus:outline-none focus:text-gray-500" href="#_">About</a>
			<a
				class="inline-flex items-center justify-center w-full h-8 gap-3 px-5 py-3 text-xs font-medium text-white duration-200 bg-gray-900 rounded-lg md:w-auto hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
				href="#_"
				role="button"
			>
				Button
			</a>
		</nav>
	</div>
</div>
