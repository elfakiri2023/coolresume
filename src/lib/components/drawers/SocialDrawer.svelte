<script>
	import RiFacebookFill from '~icons/ri/facebook-fill'
	import MdiTwitter from '~icons/mdi/twitter'

	let inputs = [
		{
			icon: RiFacebookFill,
			name: 'Facebook'
		},
		{
			icon: MdiTwitter,
			name: 'Twitter'
		}
	]
</script>

<div class="container">
	<div class="space-y-5">
		{#each inputs as input}
			<div class="">
				<label for="username" class="label mb-2 text-sm font-medium">{input.name}</label>
				<div class="relative">
					<input value="cacascasc" type="text" name="username" class="input pl-10 pr-4 py-2" />
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svelte:component this={input.icon} class="w-6 h-6 text-gray-400 dark:text-primary" />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
