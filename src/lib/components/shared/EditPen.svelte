<script>
	import { canEdit } from '$lib/stores/general'
	import MdiEdit from '~icons/mdi/edit'
	import { getDrawerStore } from '@skeletonlabs/skeleton'
	import { getToastStore } from '@skeletonlabs/skeleton'

	const toastStore = getToastStore()
	const drawerStore = getDrawerStore()

	export let element = ''
	export let classes = ''

	/**
	 * @type {string|undefined}
	 */
	let value = undefined

	/**
	 * @type {Array<any>|undefined}
	 */
	export let meta = undefined

	/**
	 * @type {HTMLElement}
	 */
	let btnElement

	/**
	 * @param {HTMLElement} node
	 */
	function makeEditable(node) {
		if (value === undefined) {
			value = node.innerText.trim()
		}

		btnElement.style.display = 'none'
		node.contentEditable = 'true'
		node.spellcheck = false
		node.focus()

		node.addEventListener('keydown', (event) => {
			if (event.repeat) {
				return
			}

			if ('Enter' === event.key) {
				saveChanges(node)
			}
		})

		/** @param {MouseEvent} event */
		const handleClick = (event) => {
			// @ts-ignore
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				document.removeEventListener('click', handleClick, true)
				saveChanges(node)
			}
		}

		// TODO: remove the event listener when the element is distroyed
		document.addEventListener('click', handleClick, true)
	}

	function takeAction() {
		let node = document.getElementById(element)

		if (!node) {
			return
		}

		// @ts-ignore
		if (!meta?.component) {
			makeEditable(node)
		} else {
			drawerStore.open({
				id: 'social',
				meta
			})
		}
	}

	/**
	 * @param {HTMLElement} node
	 */
	function saveChanges(node) {
		node.blur()
		node.contentEditable = 'false'
		btnElement.style.display = 'block'
		node.innerText = node.innerText.trim()

		if (value !== node.innerText) {
			value = undefined
			sendUpdate(node.innerText)
		}
	}

	/**
	 * @param {Object|string} newValue
	 * @returns {Promise<any>}
	 */
	async function sendUpdate(newValue) {
		const response = await fetch('/api/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				key: element,
				value: newValue
			})
		})

		if (!response.ok) {
			return toastStore.trigger({
				message: `Oops! Something went wrong. Please try again later.`,
				background: 'variant-filled-warning'
			})
		}

		const data = await response.json()

		if (data.status === 'error') {
			return toastStore.trigger({
				message: data.message,
				background: 'variant-filled-warning'
			})
		}

		toastStore.trigger({
			message: 'Your changes have been successfully saved!',
			background: 'variant-filled-primary'
		})
	}
</script>

{#if $canEdit}
	<button class={`absolute -top-8 right-0 ${classes}`} bind:this={btnElement} on:click={() => takeAction()}>
		<MdiEdit class="edit-pen" />
	</button>
{/if}
