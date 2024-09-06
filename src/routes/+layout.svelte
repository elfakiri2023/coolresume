<script>
	import '../app.postcss'
	import { initializeStores } from '@skeletonlabs/skeleton'
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import { Toast, Modal } from '@skeletonlabs/skeleton'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'
	import Navbar from '$lib/components/ui/Navbar.svelte'
	import { loggedIn } from '$lib/stores/general'
	import { user } from '$lib/stores/userData'
	import Head from '$lib/components/shared/Head.svelte'
	import { beforeNavigate } from '$app/navigation'
	import { mobileNavOpen } from '$lib/stores/general'
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

	beforeNavigate(() => mobileNavOpen.set(false))

	export let data

	$: loggedIn.set(data.loggedIn)
	$: user.set(data.user)

	initializeStores()

	const drawerStore = getDrawerStore()
</script>

<Modal />
<Toast />

<Drawer position="right" width="w-5/6 sm:w-1/2 lg:w-1/3" bgBackdrop="bg-transparent">
	{#if $drawerStore.meta.component}
		<div class="p-4 mb-4 flex justify-end space-x-2">
			{#if $drawerStore.meta?.add && $drawerStore.meta.data?.page === 'index'}
				<button class="rounded-full border-2 border-secondary-400 dark:border-secondary-300" on:click={() => $drawerStore.meta?.add()}>
					<GeneralIcons name="add" class="w-6 h-6 text-secondary-400 dark:text-secondary-300" />
				</button>
			{/if}
			{#if !$drawerStore.meta?.add || ($drawerStore.meta?.add && $drawerStore.meta.data?.page !== 'index')}
				<button
					class="rounded-full border-2 border-green-500"
					on:click={() => {
						if ($drawerStore.meta?.add && $drawerStore.meta.data?.page !== 'index') {
							document.getElementById($drawerStore.id).click()
						} else {
							$drawerStore.meta?.save()
							drawerStore.close()
						}
					}}
				>
					<GeneralIcons name="success" class="w-6 h-6 text-green-500" />
				</button>
			{/if}
			<button
				class="rounded-full border-2 border-red-500"
				on:click={() => {
					if ($drawerStore.meta?.add && $drawerStore.meta.data?.page !== 'index') {
						$drawerStore.meta.data.page = 'index'
					} else {
						$drawerStore.meta?.cancel()
					}
				}}
			>
				<GeneralIcons name="cancel" class="w-6 h-6 text-red-500" />
			</button>
		</div>
		<div class="container">
			<div class="space-y-5">
				<svelte:component this={$drawerStore.meta.component} data={$drawerStore.meta.data} />
			</div>
		</div>
	{/if}
</Drawer>

<Head />
<main class="grow">
	<div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
		<Navbar />
		<slot />
	</div>
</main>
