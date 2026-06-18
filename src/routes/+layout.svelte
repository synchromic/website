<script lang="ts">
	import "$lib/css/styles.css";
	import favicon from "$lib/assets/favicon.png";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<a href="/">Home</a>
		·
		<a href="/blog">Blog</a>
		·
		<a href="/about">About</a>
	</nav>
</header>

{@render children()}

<style>
	header {
		padding: 0.2em;

		border-bottom: 1px solid var(--background-color-ll);
		background-color: var(--background-color-d);
	}

	nav {
		text-transform: lowercase;
	}
</style>
