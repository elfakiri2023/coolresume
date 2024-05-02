<script>
	import { canEdit, currentMode } from '$lib/stores/general'
	import { resume } from '$lib/stores/userData'

	import Sidebar from '$lib/components/resume/sidebar/Sidebar.svelte'
	import Content from '$lib/components/resume/content/Content.svelte'
	import MdiEdit from '~icons/mdi/edit'
	import MdiEye from '~icons/mdi/eye'

	export let data

	resume.set(data.resume)
	canEdit.set($currentMode === 'edit')

	currentMode.subscribe((value) => {
		canEdit.set(value === 'edit')
	})
</script>

<div class="container px-0 md:px-8">
	<div class="my-3 mx-4 flex justify-end items-center">
		{#if data?.user?.id === data.resume?.user?.id}
			<div class="flex">
				<button class="chip {$currentMode === 'edit' ? 'variant-filled' : 'variant-soft'}" on:click={() => currentMode.set('edit')}>
					<MdiEdit /><span>Edit</span>
				</button>
				<button class="chip {$currentMode === 'preview' ? 'variant-filled' : 'variant-soft'}" on:click={() => currentMode.set('preview')}>
					<MdiEye /><span>Preview</span>
				</button>
			</div>
		{/if}
	</div>
	<div class="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
		<Sidebar />
		<Content />
	</div>
</div>
