<script>
	import { canEdit, currentMode, currentPage } from '$lib/stores/general'
	import { resume } from '$lib/stores/userData'
	import Sidebar from '$lib/components/resume/sidebar/Sidebar.svelte'
	import Content from '$lib/components/resume/content/Content.svelte'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'
	import { page } from '$app/stores'

	export let data

	if ($page.url.searchParams.has('welcome') && data?.user?.id === data.resume?.user?.id) {
		currentMode.set('edit')
	}

	resume.set(data.resume)
	canEdit.set($currentMode === 'edit')
	currentPage.set(data.resume.user.full_name ?? data.resume.user.username)

	currentMode.subscribe((value) => {
		canEdit.set(value === 'edit')
	})
</script>

<div class="container px-0 md:px-8">
	<div class="my-3 mx-4 flex justify-end items-center">
		{#if data?.user?.id === data.resume?.user?.id}
			<div class="flex">
				<button class="chip {$currentMode === 'edit' ? 'variant-filled' : 'variant-soft'}" on:click={() => currentMode.set('edit')}>
					<GeneralIcons name="edit" width="1.2em" height="1.2em" /><span>Edit</span>
				</button>
				<button class="chip {$currentMode === 'preview' ? 'variant-filled' : 'variant-soft'}" on:click={() => currentMode.set('preview')}>
					<GeneralIcons name="eye" width="1.2em" height="1.2em" /><span>Preview</span>
				</button>
			</div>
		{/if}
	</div>
	<div class="grid grid-cols-4 lg:grid-cols-12 lg:gap-6 px-4">
		<Sidebar />
		<Content />
	</div>
</div>
