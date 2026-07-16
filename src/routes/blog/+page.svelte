<script lang="ts">
	import { formatShortDate } from "$lib/dates.js";

	let { data } = $props();
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
				{formatShortDate(page.meta.date)}: {page.meta.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
	}
</style>
