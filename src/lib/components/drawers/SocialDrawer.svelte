<script>
	import SocialIcons from '$lib/components/icons/SocialIcons.svelte'
	import { resume } from '$lib/stores/userData'

	/**
	 * @type {any[]}
	 */
	export let data = []
</script>

{#each data as social}
	<div>
		<label for="username" class="label mb-2 text-sm font-medium">{social.name.charAt(0).toUpperCase() + social.name.slice(1)}</label>
		<div class="relative">
			<input value={$resume.social[social.name]} on:input={(e) => ($resume.social[social.name] = e.target.value)} type="text" class="input pl-12 pr-4 py-2" />
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<SocialIcons name={social.name} class="w-6 h-6 text-gray-400 dark:text-primary" />
			</div>
		</div>
	</div>
{/each}
<p><span class="text-red-500">* </span>To hide a social media icon, simply leave the corresponding field empty.</p>
