<script>
	import { sendRequest } from '$lib/shared/sendRequest'
	import { getToastStore, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import { resume } from '$lib/stores/userData'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'

	const modalStore = getModalStore()
	const toastStore = getToastStore()
	const drawerStore = getDrawerStore()

	let formFields = initializeformFields()

	$: {
		if ($drawerStore.meta.data.page === 'add') {
			formFields = initializeformFields()
		}
	}

	function initializeformFields() {
		return {
			id: null,
			company: '',
			position: '',
			start_date: '',
			end_date: '',
			description: ''
		}
	}

	async function selectExperience(experience) {
		formFields = {
			id: experience.id,
			company: experience.company,
			position: experience.position,
			start_date: experience.start_date,
			end_date: experience.end_date,
			description: experience.description
		}
		$drawerStore.meta.data.page = 'edit'
	}

	async function removeExperience(id) {
		const modal = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you wish to delete this experience?',
			buttonNeutral: 'variant-ghost-surface',
			buttonPositive: 'variant-filled-error',
			buttonTextConfirm: 'Yes, delete1',
			response: async (confirmed) => {
				if (confirmed) {
					const toast = await sendRequest('experience_remove', id)
					toastStore.trigger(toast)
					$resume.experiences = $resume.experiences.filter((experience) => experience.id !== id)
				}
			}
		}

		modalStore.trigger(modal)
	}

	async function addExperience(e) {
		const formData = new FormData(e.target)
		let data = Object.fromEntries(formData.entries())
		let endpoint = 'experience_edit'

		if ($drawerStore.meta.data.page === 'add') {
			endpoint = 'experience_add'
			delete data.id
		}

		const request = await sendRequest(endpoint, data)
		const responseData = request.responseData || null
		const toast = request.toast || request

		toastStore.trigger(toast)

		if (responseData) {
			if ($drawerStore.meta.data.page === 'add') {
				$resume.experiences.push(responseData)
				$resume.experiences = $resume.experiences // yeah
			} else if ($drawerStore.meta.data.page === 'edit') {
				const index = $resume.experiences.findIndex((experience) => experience.id === data.id)
				$resume.experiences[index] = responseData
			}
		}

		$drawerStore.meta.data.page = 'index'
	}
</script>

{#if $drawerStore.meta.data.page === 'index'}
	<div class="table-container">
		<table class="table table-hover">
			<tbody>
				{#each $resume.experiences as experience}
					<tr>
						<td colspan="2" class="text-left">{experience.company}</td>
						<td class="text-right">
							<button
								on:click={() => {
									selectExperience(experience)
								}}
								class="inline-block mr-2"><GeneralIcons name="edit" width="1.4em" height="1.4em" class="text-primary-500" /></button
							>
							<button
								on:click={() => {
									removeExperience(experience.id)
								}}
								class="inline-block"><GeneralIcons name="cancel-bold" width="1.5em" height="1.5em" class="text-error-700" /></button
							>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="3" class="text-center">Click <span class="text-bold">+</span> to add a new experience</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	{#key formFields}
		<form class="space-y-5" on:submit|preventDefault={addExperience}>
			<div>
				<label for="company" class="label mb-2 text-sm font-medium">Company</label>
				<input value={formFields.company} type="text" name="company" class="input" placeholder="Enter company name" required />
			</div>
			<div>
				<label for="position" class="label mb-2 text-sm font-medium">Position</label>
				<input value={formFields.position} type="text" name="position" class="input" placeholder="Enter position" required />
			</div>
			<div>
				<label for="start_date" class="label mb-2 text-sm font-medium">Start Date</label>
				<input value={formFields.start_date} type="text" name="start_date" class="input" placeholder="Enter start date" required />
			</div>
			<div>
				<label for="end_date" class="label mb-2 text-sm font-medium">End Date</label>
				<input value={formFields.end_date} type="text" name="end_date" class="input" placeholder="Enter end date" required />
			</div>
			<div>
				<label for="description" class="label mb-2 text-sm font-medium">Description</label>
				<textarea name="description" class="textarea" rows="4" placeholder="Enter description" required>{formFields.description}</textarea>
			</div>
			<input type="hidden" name="id" value={formFields.id} />
			<button type="submit" class="hidden" id="experience" />
		</form>
	{/key}
{/if}
