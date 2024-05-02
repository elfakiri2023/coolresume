<script>
	import { resume } from '$lib/stores/userData'
	import EditPen from '$lib/components/shared/EditPen.svelte'
</script>

<div class="col-span-4 md:col-span-9">
	<div class="card shadow rounded-lg p-6">
		<h2 class="text-xl font-bold mb-4">About Me</h2>
		<div class="group relative">
			<p
				id="about"
				class="editable"
				contenteditable="false"
				placeholder="This is your space to introduce yourself briefly. Share a snapshot of who you are, your interests, passions, and what drives you professionally. Focus on your personality and what makes you unique."
			>
				{$resume.user.about || ``}
			</p>
			<EditPen element="about" />
		</div>
		<h2 class="text-xl font-bold mt-6 mb-4">Experience</h2>
		<div class="group relative">
			{#each { length: 30 } as _, i}
				<div class="mb-6">
					<div class="flex justify-between flex-wrap gap-2 w-full">
						<span class="text-gray-700 dark:text-gray-400 font-bold">Web Developer</span>
						<p>
							<span class="text-gray-700 dark:text-gray-400 mr-2">at ABC Company</span>
							<span class="text-gray-700 dark:text-gray-400">2017 - 2019</span>
						</p>
					</div>
					<p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit.</p>
				</div>
			{/each}
			<EditPen element="" />
		</div>
	</div>
</div>
