<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";
	import thumbnail from "$lib/assets/blog/star-technology/thumbnail.webp";

	export const metadata: Metadata = {
		title: "Star Technology index",
		date: new Date("2026-07-14T20:00:00.000Z"),
		description:
			"Index page for all my Star Technology blog posts. Star Technology is a Minecraft modpack focused on technology and progression.",
		thumbnail,
	};
</script>

<script lang="ts">
	import blogIndex from "$lib/blogIndex";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const childSlugs = ["initial-progress", "luv", "zpm"];
	const childPosts = childSlugs.map((s) => blogIndex.pageMap.get(data.slug + "/" + s)!);
</script>

<p>
	This is the index page for my Star Technology blog posts. Links to progress updates are below.
</p>
<p>
	<a href="https://www.curseforge.com/minecraft/modpacks/star-technology">Star Technology</a> is a
	Minecraft modpack focused on technology and progression. If you've ever heard of
	<a href="https://www.gtnewhorizons.com/">GregTech New Horizons</a>, Star Technology is essentially
	an easier, more modern, and more streamlined version. So far, I consider this to be the single
	most enjoyable Minecraft modpack I've ever played.
</p>
<p>
	This series of blog posts is meant to be a journal of my progress through the pack. I'm planning
	on adding a new post after every technology tier (LV, MV, etc). I'm playing on a server with two
	of my friends, Mazerak and silverpickaxe15. We started this run on June 21, 2026.
</p>

<hr />

<nav>
	{#each childPosts as post, index}
		{#if index > 0}
			<hr />
		{/if}
		{const shortTitle = post.meta.title.slice("Star Technology: ".length)}
		<h2>
			<a href={post.slug}>{shortTitle}</a>
		</h2>
		<a href={post.slug}>
			<img class="full-width" src={post.meta.thumbnail} alt="Navigate to {shortTitle} blog post" />
		</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
