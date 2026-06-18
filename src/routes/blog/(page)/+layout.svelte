<script lang="ts">
	import "$lib/css/blog.css";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<div class="container">
	<article>
		<header>
			<h1>{data.meta.title}</h1>
			<p>{data.meta.date}</p>
		</header>

		{@render children()}
	</article>

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
</div>

<style>
	a {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.container {
		padding: 0 3vw;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	article {
		max-width: 1000px;

		display: flex;
		flex-direction: column;
	}
</style>
