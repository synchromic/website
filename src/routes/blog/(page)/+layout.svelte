<script lang="ts">
	import "$lib/css/blog.css";
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
		<div class="footer footer-left">
			{#if data.newer !== null}
				<a href="./{data.newer.slug}">
					Newer post:<br />
					{data.newer.meta.title}
				</a>
			{/if}
		</div>
		<div class="footer footer-center">
			<a href="/blog">Back to blog index</a>
		</div>
		<div class="footer footer-right">
			{#if data.older !== null}
				<a href="./{data.older.slug}">
					Older post:<br />
					{data.older.meta.title}
				</a>
			{/if}
		</div>
	</nav>
</footer>

<style>
	footer {
		width: 100%;
		margin-bottom: 2em;
	}

	.footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.footer-left {
		align-items: start;
		text-align: left;
		grid-area: left;
	}

	.footer-center {
		align-items: center;
		grid-area: center;
	}

	.footer-right {
		align-items: end;
		text-align: right;
		grid-area: right;
	}

	nav {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-areas: "left center right";
		gap: 0.5em;
	}

	@media (max-width: 500px) {
		nav {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				"left right"
				"center center";
		}
	}
</style>
