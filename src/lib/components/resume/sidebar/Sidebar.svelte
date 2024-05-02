<script>
	import { Avatar } from '@skeletonlabs/skeleton'
	import EditPen from '$lib/components/shared/EditPen.svelte'
	import { canEdit } from '$lib/stores/general'
	import { userData, resume } from '$lib/stores/userData'
	import SocialIcons from '$lib/components/resume/sidebar/components/SocialIcons.svelte'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import { MAX_IMAGE_SIZE } from '$lib/consts'
	import { PUBLIC_CDN_URL } from '$env/static/public'
	import { user } from '$lib/stores/userData'

	$: imageUrl = $user.image_url ? `${PUBLIC_CDN_URL}/${$user.image_url}` : ``

	const toastStore = getToastStore()

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
				$user.image_url = data.key
			}
		}
	}
</script>

<div class="col-span-4 md:col-span-3">
	<div class="card shadow lg:rounded-2xl p-4">
		<div class="flex flex-col">
			<div class="relative w-40 h-40 mx-auto my-4">
				<Avatar class="w-40 h-40 rounded-full shrink-0 shadow-sm" draggable="false" alt={$user.full_name || $user.username} src={imageUrl}></Avatar>
				{#if $canEdit}
					<input type="file" id="fileUpload" class="hidden" on:change={handleFileUpload} accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/webp" />
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
			<SocialIcons />
		</div>
		<hr class="my-4 border-t" />
		<div class="flex flex-col">
			<span class="uppercase font-bold tracking-wider mb-2">Skills</span>
			<ul>
				<li class="mb-2">JavaScript</li>
				<li class="mb-2">React</li>
				<li class="mb-2">Node.js</li>
				<li class="mb-2">HTML/CSS</li>
				<li class="mb-2">Tailwind Css</li>
			</ul>
		</div>
	</div>
</div>
