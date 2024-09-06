<script>
	import EditPen from '$lib/components/shared/EditPen.svelte'
	import SocialDrawer from '$lib/components/drawers/SocialDrawer.svelte'
	import SocialIcons from '$lib/components/icons/SocialIcons.svelte'
	import { resume } from '$lib/stores/userData'
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import { sendRequest } from '$lib/shared/sendRequest'

	const toastStore = getToastStore()
	const drawerStore = getDrawerStore()

	/**
	 * @type {HTMLElement}
	 */
	let socialBtns

	let socialMedia = buildList()

	let meta = {
		component: SocialDrawer,
		data: socialMedia,
		save: async () => {
			let newObj = Object.entries($resume.social).reduce((acc, [key, value]) => {
				if (key !== 'id' && key !== 'user_id') {
					acc[key] = value
				}
				return acc
			}, {})

			const request = await sendRequest('social', newObj)
			toastStore.trigger(request)
			socialMedia = buildList()
		},
		cancel: () => {
			for (let social of socialMedia) {
				$resume.social[social.name] = social.url
			}

			drawerStore.close()
		}
	}

	function buildList() {
		let arr = []
		for (let social of ['facebook', 'x', 'youtube', 'github', 'instagram', 'linkedin']) {
			arr.push({
				name: social,
				url: $resume.social[social]
			})
		}

		return arr
	}
</script>

<div class="group relative">
	<div bind:this={socialBtns} class="flex justify-center space-x-2">
		{#each socialMedia as social}
			{#if social.url && social.url !== ''}
				<a href={social.url} class="socialBtn cursor-pointer" target="_blank" rel="noopener noreferrer">
					<span class={social.name}>
						<SocialIcons name={social.name} width="1.2em" height="1.2em" class="hover:text-white" />
					</span>
				</a>
			{/if}
		{/each}
	</div>
	<EditPen element="social" {meta} classes="top-1 right-2 lg:-right-6" />
</div>
