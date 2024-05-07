<script>
	import { resume } from '$lib/stores/userData'
	import EditPen from '$lib/components/shared/EditPen.svelte'
	import ExperienceDrawer from '$lib/components/drawers/ExperienceDrawer.svelte'

	import { getToastStore, getDrawerStore } from '@skeletonlabs/skeleton'

	const drawerStore = getDrawerStore()

	const meta = {
		component: ExperienceDrawer,
		data: { page: 'index' },
		add: async () => {
			$drawerStore.meta.data.page = 'add'
		},
		save: async () => {},
		cancel: () => {
			$drawerStore.meta.data.page = 'index'
			drawerStore.close()
		}
	}
</script>

<div class="col-span-4 md:col-span-9">
	<div class="card shadow rounded-none lg:rounded-lg p-6">
		<h2 class="text-xl font-bold mb-1 uppercase">SUMMARY</h2>
		<hr class="border-t-2 mb-4" />
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
		<h2 class="text-xl font-bold mt-6 mb-1 uppercase">Experience</h2>
		<hr class="border-t-2 mb-4" />
		<div class="group relative">
			{#each $resume.experiences as experience}
				<div class="mb-6">
					<div class="flex justify-between flex-wrap gap-2 w-full">
						<div>
							<span class="text-gray-900 dark:text-gray-50 font-bold text-lg">{experience.position || ''}</span>
							<p class="text-primary-900 dark:text-primary-400 text-md">{experience.company || ``}</p>
						</div>
						<div>
							<span class="text-gray-900 dark:text-gray-50">{`${experience.start_date || ``} - ${experience.end_date || ``}`}</span>
						</div>
					</div>
					<p class="mt-2">{experience.description || ''}</p>
				</div>
			{:else}
				<p>You didn't add any no experience yet</p>
			{/each}
			<EditPen element="experience" {meta} />
		</div>
	</div>
</div>
