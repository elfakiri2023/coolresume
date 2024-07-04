<script>
	import { Avatar } from '@skeletonlabs/skeleton'
	import EditPen from '$lib/components/shared/EditPen.svelte'
	import { canEdit } from '$lib/stores/general'
	import { resume } from '$lib/stores/userData'
	import Social from '$lib/components/resume/sidebar/components/Social.svelte'
	import { getToastStore, getDrawerStore } from '@skeletonlabs/skeleton'
	import { MAX_IMAGE_SIZE, ACCEPTED_IMAGETYPE_EXTENSIONS } from '$lib/consts'
	import { PUBLIC_CDN_URL } from '$env/static/public'
	import { user } from '$lib/stores/userData'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { sendRequest } from '$lib/shared/sendRequest'
	import SkillsDrawer from '$lib/components/drawers/SkillsDrawer.svelte'
	import SendMessage from '$lib/components/modals/SendMessage.svelte'

	$: imageUrl = $resume.user.image_url ? `${PUBLIC_CDN_URL}/${$resume.user.image_url}` : ``

	const toastStore = getToastStore()
	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()

	const skills = $resume.user.skills

	const meta = {
		component: SkillsDrawer,
		data: { skills },
		save: async () => {
			const request = await sendRequest('skills', skills)
			toastStore.trigger(request)
		},
		cancel: () => {
			drawerStore.close()
		}
	}

	function send() {
		const modal = {
			type: 'component',
			component: { ref: SendMessage }
		}

		modalStore.trigger(modal)
	}

	/**
	 * @param {Event} event
	 */
	async function handleFileUpload(event) {
		// @ts-ignore
		const file = event.target.files[0]

		if (file.size > MAX_IMAGE_SIZE) {
			return toastStore.trigger({
				message: `File size exceeds ${MAX_IMAGE_SIZE / 1024 / 1024}MB. Please select a smaller file.`,
				background: 'variant-filled-warning'
			})
		}

		if (file) {
			const formData = new FormData()
			formData.append('image', file)

			const getPresignedUrlResponse = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			})

			if (!getPresignedUrlResponse.ok) {
				return toastStore.trigger({
					message: (await getPresignedUrlResponse.json().message) || 'An error occurred while uploading the image.',
					background: 'variant-filled-warning'
				})
			}

			const data = await getPresignedUrlResponse.json()

			if (data.success) {
				$resume.user.image_url = data.key
				return toastStore.trigger({
					message: 'Your resume picture has been updated successfully.',
					background: 'variant-filled-success'
				})
			}
		}
	}
</script>

<div class="col-span-4 lg:col-span-3 lg:self-start lg:sticky lg:top-5">
	<div class="card shadow lg:rounded-2xl p-4 rounded-none">
		<div class="flex flex-col">
			<div class="relative w-40 h-40 mx-auto my-4">
				<Avatar
					class="w-40 h-40 rounded-full shrink-0 shadow-sm"
					draggable="false"
					alt={$resume.user.full_name || $resume.user.username}
					src={imageUrl || `/images/default-profile-picture.jpg`}
					fallback="/images/default-profile-picture.jpg"
				></Avatar>
				{#if $canEdit}
					<input type="file" id="fileUpload" class="hidden" on:change={handleFileUpload} accept={Object.keys(ACCEPTED_IMAGETYPE_EXTENSIONS).join(', ')} />
					<label for="fileUpload" class="absolute top-0 left-0 w-full h-full rounded-full hover:bg-primary-500 hover:bg-opacity-30 cursor-pointer flex items-center justify-center text-primary-50 opacity-0 hover:opacity-100"
						>Upload</label
					>
				{/if}
			</div>
			<div class="group relative">
				<h1 id="full_name" contenteditable="false" placeholder="Full name" class="mt-1 text-xl text-center font-bold editable">
					{$resume.user?.full_name || ``}
				</h1>
				<EditPen element="full_name" classes="top-1 -right-4" />
			</div>
			<div class="group relative">
				<p id="job_title" contenteditable="false" placeholder="Job title" class="text-center focus:border-red-100 editable rounded-lg m-2 bg-primary">
					{$resume.user?.job_title || ``}
				</p>
				<EditPen element="job_title" classes="top-1 -right-4" />
			</div>
			<Social />
			<button on:click={send} class="btn btn-sm variant-filled-primary mt-4 mb-1 mx-6">Send a message</button>
		</div>
		<hr class="my-4 border-t" />
		<div class="group relative">
			<div class="flex flex-col">
				<span class="uppercase font-bold tracking-wider mb-2">Skills</span>
				<div class="flex justify-center flex-wrap gap-2 mx-auto my-4 text-sm">
					{#each $resume.user.skills as skill}
						<span class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-200/70 text-gray-800 hover:bg-gray-300">{skill}</span>
					{:else}
						<p>You didn't add any no skills yet</p>
					{/each}
				</div>
			</div>
			<EditPen element="skills" {meta} classes="top-0 -right-4" />
		</div>
	</div>
</div>
