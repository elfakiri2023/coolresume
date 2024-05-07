<script>
	export let name = ''
</script>

{#if name === 'edit'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
	</svg>
{:else if name === 'eye'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path
			fill="currentColor"
			d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
		/>
	</svg>
{:else if name === 'success'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
	</svg>
{:else if name === 'cancel-bold'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z" />
	</svg>
{:else if name === 'cancel'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
	</svg>
{:else if name === 'close'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...$$restProps}>
		<path d="M6 18L18 6M6 6l12 12" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
	</svg>
{:else if name === 'burger'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...$$restProps}>
		<path d="M4 6h16M4 12h16M4 18h16" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
	</svg>
{:else if name === 'add'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
		<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
	</svg>
{/if}
