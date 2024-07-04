<script>
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { sendRequest } from '$lib/shared/sendRequest'
	import { resume } from '$lib/stores/userData'

	export let parent

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	// Form Data
	const formData = {
		username: $resume.user.username,
		name: '',
		email: '',
		message: ''
	}

	async function onFormSubmit() {
		const toast = await sendRequest('details', formData, 'email')
		toastStore.trigger(toast)

		if ($modalStore[0].response) {
			$modalStore[0].response(formData)
		}

		modalStore.close()
	}
</script>

<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
	<header class="text-2xl font-bold">Send a message</header>
	<form class="modal-form border p-4 space-y-4 rounded-container-token">
		<label class="label">
			<span>Full name</span>
			<input class="input" type="text" bind:value={formData.name} placeholder="Enter full name..." required />
		</label>
		<label class="label">
			<span>Email</span>
			<input class="input" type="email" bind:value={formData.email} placeholder="Enter email..." required />
		</label>
		<label class="label">
			<span>Message</span>
			<textarea class="textarea" rows="3" bind:value={formData.message} placeholder="Enter message..." required></textarea>
		</label>
	</form>
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Send</button>
	</footer>
</div>
