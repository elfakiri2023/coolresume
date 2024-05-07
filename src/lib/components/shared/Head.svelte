<script>
	import { currentPage } from '$lib/stores/general'
	import { page } from '$app/stores'

	let info = {
		title: 'Cool Resume',
		subTitle: 'Make your resume cool and get noticed',
		description: 'Empower your career journey effortlessly with our intuitive resume builder. Craft, share, and showcase your professional story with ease, saving time and hassle.'
	}

	$: url = `${$page.url.protocol}//${$page.url.host}${$page.url.pathname}`
	$: title = $currentPage === 'home' ? `${info.title} | ${info.subTitle}` : `${$currentPage} - ${info.title}`
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={info.description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={info.description} />
	<meta property="og:url" content={url} />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={info.description} />
</svelte:head>
