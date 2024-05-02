<script>
	import { enhance } from '$app/forms'

	export let data
</script>

<section>
	<article>
		<strong>{JSON.stringify(data.user, null, 2)}</strong>
		<form method="post" use:enhance>
			<button style="margin-top: 10px;">Sign out</button>
		</form>
	</article>
</section>
