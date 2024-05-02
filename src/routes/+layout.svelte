<script>
	import '../app.postcss'
	import { initializeStores } from '@skeletonlabs/skeleton'
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import { Toast, getToastStore } from '@skeletonlabs/skeleton'
	import IconoirCancel from '~icons/iconoir/cancel'
	import MdiSuccess from '~icons/mdi/success'
	import Navbar from '$lib/components/ui/Navbar.svelte'
	import { loggedIn } from '$lib/stores/general'
	import { user } from '$lib/stores/userData'

	export let data

	$: loggedIn.set(data.loggedIn)
	$: user.set(data.user)

	initializeStores()

	const drawerStore = getDrawerStore()

	/* https://tourguidejs.com/docs/ */
</script>

<Toast />

<Drawer position="right" width="w-5/6 sm:w-1/2 md:w-1/3" bgBackdrop="bg-transparent">
	{#if $drawerStore.meta.component}
		<div class="p-4 mb-4 flex justify-end space-x-2">
			<button class="rounded-full border-2 border-red-500" on:click={() => drawerStore.close()}>
				<IconoirCancel class="w-6 h-6 text-red-500" />
			</button>
			<button class="rounded-full border-2 border-green-500" on:click={() => $drawerStore.meta?.save()}>
				<MdiSuccess class="w-6 h-6 text-green-500" />
			</button>
		</div>
		<svelte:component this={$drawerStore.meta.component} />
	{/if}
</Drawer>

<main class="grow">
	<div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
		<Navbar />
		<slot />
	</div>
</main>
