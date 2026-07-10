<script lang="ts">
	let { data } = $props();

	const formatter = new Intl.DateTimeFormat(undefined, {
		month: "2-digit",
		day: "numeric"
	});

	function formatDate(date: Date) {
		// TODO: in 2027 split this into multiple years and show year number
		return formatter.format(date);
	}
</script>

<svelte:head>
	<title>synchromic's blog</title>
	<meta name="description" content="index page for synchromic's blog" />
</svelte:head>

<h1>Blog index</h1>

<h2>Recent posts</h2>

<ul>
	{#each data.pages as page}
		<li>
			<a href="/blog/{page.slug}">
				{formatDate(page.meta.date)}: {page.meta.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
	}
</style>
