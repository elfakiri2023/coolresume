<script>
	import { page } from '$app/stores'
</script>

<div class="flex items-center justify-center flex-col min-h-screen">
	<h1 class="text-7xl leading-none text-white font-extrabold md:text-8xl">{$page.status}</h1>
	<p class="text-medium text-white text-sm capitalize mb-7 mt-6 px-4 text-center">
		{$page.status === 404 ? 'The Page You Are Looking For Does Not Exist' : $page.error.message}!
	</p>
	<a class="btn variant-filled-secondary" href="/"> Back To Home </a>
</div>
