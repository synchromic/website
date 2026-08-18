<script lang="ts">
	import FootnoteList from "$lib/components/footnote/FootnoteList.svelte";
	import FootnoteWrapper from "$lib/components/footnote/FootnoteWrapper.svelte";
	import "$lib/css/blog.css";
	import { formatLongDate } from "$lib/dates";
	import { getUrls } from "$lib/images";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();

	let canonURL = $derived(data.url.origin + data.url.pathname);
	let thumbnailPath = $derived.by(() => {
		const { png, webp } = getUrls(data.meta.thumbnail);
		return webp ?? png;
	});
	let thumbnail: URL = $derived(new URL(thumbnailPath, data.url));
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	{#if data.meta.description}
		<meta name="description" content={data.meta.description} />
		<meta property="og:description" content={data.meta.description} />
	{/if}
	<meta name="theme-color" content="#a61b86" />

	<!-- OpenGraph metadata: https://ogp.me/ -->
	<meta property="og:title" content={data.meta.title} />

	<!-- maybe `article` would be more accurate but i don't understand the namespace stuff -->
	<meta property="og:type" content="website" />

	<meta property="og:image" content={thumbnail.href} />
	<meta property="og:url" content={canonURL} />

	<!-- I HATE METADATA -->
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<header>
	<h1>{data.meta.title}</h1>
	<p><time datetime={data.meta.date.toISOString()}>{formatLongDate(data.meta.date)}</time></p>
</header>

{#if data.meta.hidden}
	<div class="warning">
		<p>
			This post is considered <i>hidden</i>. While you can still read it, please remember that it is
			likely just a draft.
		</p>
	</div>
{/if}

<FootnoteWrapper>
	{@render children()}

	<div>
		<hr />
		<FootnoteList />
	</div>

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
</FootnoteWrapper>

<style>
	.warning {
		padding: 1em;

		border: 2px dashed var(--foreground-color-warn);

		color: var(--foreground-color-warn);
		background-color: var(--background-color-warn);
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
