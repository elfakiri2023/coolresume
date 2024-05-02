<script>
	import RiFacebookFill from '~icons/ri/facebook-fill'
	import MdiTwitter from '~icons/mdi/twitter'
	import EditPen from '$lib/components/shared/EditPen.svelte'
	import SocialDrawer from '$lib/components/drawers/SocialDrawer.svelte'

	/**
	 * @type {HTMLElement}
	 */
	let socialBtns

	let socialMedia = [
		{
			name: 'facebook',
			color: '1773EA',
			url: 'https://www.facebook.com/',
			icon: RiFacebookFill
		},
		{
			name: 'facebook',
			color: '1DA1F2',
			url: 'https://www.facebook.com/',
			icon: MdiTwitter
		}
	]

	let meta = {
		component: SocialDrawer,
		save: () => {
			alert('save')
		}
	}
</script>

<div class="group relative">
	<div bind:this={socialBtns} class="flex justify-center space-x-2">
		{#each socialMedia as social}
			<a href={social.url} class="socialBtn" target="_blank" rel="noopener noreferrer">
				<span style="color: #{social.color}" class="">
					<svelte:component this={social.icon} class="hover:text-white" />
				</span>
			</a>
		{/each}
	</div>
	<EditPen element={socialBtns} {meta} classes="top-0" />
</div>
