<script lang="ts">
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<header>
	<h1>{data.meta.title}</h1>
	<p>{data.meta.date}</p>
</header>

{@render children()}

<footer>
	<nav>
		{#if data.newer !== null}
			<a href="./{data.newer.slug}">
				Newer post: {data.newer.meta.title}
			</a>
		{/if}
		<a href="/blog">Back to blog index</a>
		{#if data.older !== null}
			<a href="./{data.older.slug}">
				<div>&lt;</div>
				<span>Older post: <br /> {data.older.meta.title}</span>
			</a>
		{/if}
	</nav>
</footer>

<style>
	a {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
