<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>synchromic's blog</title>
	<meta name="description" content="index page for synchromic's blog" />
</svelte:head>

<p>This will be my blog!</p>

{#each data.pagesByDateRev as page}
	<a href="/blog/{page.slug}">
		{page.meta.title}
	</a>
{/each}
