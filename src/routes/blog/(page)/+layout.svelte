<script lang="ts">
	import "$lib/css/blog.css";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();

	const formatter = new Intl.DateTimeFormat("en", {
		dateStyle: "long",
		timeStyle: "long"
	});

	function formatDate(date: Date) {
		return formatter.format(date);
	}
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<header>
	<h1>{data.meta.title}</h1>
	<p>{formatDate(data.meta.date)}</p>
</header>

{@render children()}

<footer>
	<nav>
		<div class="footer footer-left">
			{#if data.newer !== null}
				<a href="/blog/{data.newer.slug}">
					Newer post:<br />
					{data.newer.meta.title}
				</a>
			{/if}
		</div>
		<div class="footer footer-center">
			{#if data.parent !== undefined}
				<a href="/blog/{data.parent.slug}">Back to {data.parent.meta.title}</a>
				<div style="height: 0.5em"></div>
			{/if}
			<a href="/blog">Back to blog index</a>
		</div>
		<div class="footer footer-right">
			{#if data.older !== null}
				<a href="/blog/{data.older.slug}">
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
