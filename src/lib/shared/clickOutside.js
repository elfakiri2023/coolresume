/** Dispatch event on click outside of node */

/**
 * @param {Node} node
 */
export function clickOutside(node) {
	/**
	 * @param {MouseEvent} event
	 */
	const handleClick = (event) => {
		// @ts-ignore
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			// Added type declaration for `on:clickOutside` in src/additional-svelte-typings.d.ts for no TS warnings
			node.dispatchEvent(new CustomEvent('clickOutside', { detail: node }))
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}
