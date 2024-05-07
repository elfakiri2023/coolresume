<script>
	import { canEdit } from '$lib/stores/general'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import { sendRequest } from '$lib/shared/sendRequest'

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

		/**
		 * @param {KeyboardEvent} event
		 */
		const keydownHandler = (event) => {
			if ('Enter' === event.key) {
				clear(node)
				saveChanges(node)
			}
		}

		node.addEventListener('keydown', keydownHandler)

		/** @param {MouseEvent} event */
		const handleClick = (event) => {
			// @ts-ignore
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				clear(node)
				saveChanges(node)
			}
		}

		document.addEventListener('click', handleClick, true)

		/**
		 * @param {HTMLElement} node
		 */
		const clear = (node) => {
			node.removeEventListener('keydown', keydownHandler)
			document.removeEventListener('click', handleClick, true)
		}
	}

	function takeAction() {
		// @ts-ignore
		if (!meta?.component) {
			let node = document.getElementById(element)

			if (!node) {
				return
			}
			makeEditable(node)
		} else {
			openDrawer(element)
		}
	}

	/**
	 * @param {string} id
	 */
	function openDrawer(id) {
		drawerStore.open({
			id: id,
			meta
		})
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
		const request = await sendRequest(element, newValue)
		toastStore.trigger(request)
	}
</script>

{#if $canEdit}
	<button class={`absolute -top-8 right-0 ${classes}`} bind:this={btnElement} on:click={() => takeAction()}>
		<GeneralIcons name="edit" class="edit-pen" />
	</button>
{/if}
