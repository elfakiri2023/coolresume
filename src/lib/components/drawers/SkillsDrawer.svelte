<script>
	import { InputChip } from '@skeletonlabs/skeleton'
	import { resume } from '$lib/stores/userData'

	export let data = []
	let skillsList = data.skills

	$: $resume.user.skills = skillsList
</script>

<InputChip bind:value={skillsList} name="chips" placeholder="Enter a new skill here..." allowUpperCase />
