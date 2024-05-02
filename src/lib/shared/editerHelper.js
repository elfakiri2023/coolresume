/**
 * @param {HTMLElement} node
 */
export function clickOutside(node) {
	/** @param {MouseEvent} event */
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.blur()
			node.contentEditable = 'false'
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}

/**
 * @param {HTMLElement} element
 */
export function makeEditable(element) {
	element.contentEditable = 'true'
	element.focus()
}
