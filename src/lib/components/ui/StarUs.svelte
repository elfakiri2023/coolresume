<script>
	import { onMount } from 'svelte'
	import SocialIcons from '$lib/components/icons/SocialIcons.svelte'
	import GeneralIcons from '$lib/components/icons/GeneralIcons.svelte'

	const repo = 'elfakiri2023/coolresume'
	let stars = 0

	async function fetchStars() {
		try {
			const response = await fetch(`https://api.github.com/repos/${repo}`)
			if (response.ok) {
				const data = await response.json()
				stars = data.stargazers_count
			} else {
				console.error('Failed to fetch star count')
			}
		} catch (error) {
			console.error('Error fetching GitHub stars:', error)
		}
	}

	onMount(() => {
		fetchStars()
	})
</script>

<a href={`https://github.com/${repo}`} target="_blank" class="fixed bottom-4 right-4 p-2 bg-gray-800 dark:bg-gray-300 text-white dark:text-black transition-colors hover:bg-gray-700 dark:hover:bg-gray-400 flex items-center rounded-lg">
	<SocialIcons name="github_full" class="h-8 w-8" />
	<span class="mx-2 text-sm">Star us</span>
	{#if stars > 0}
		<span class="px-2 py-1 border border-gray-500 rounded text-xs">
			<GeneralIcons name="star" class="h-4 w-4 inline-block mr-1 text-green-500" />

			{stars.toLocaleString()}
		</span>
	{/if}
</a>
