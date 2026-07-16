<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology index",
		date: new Date("2026-07-14T20:00:00.000Z")
	};
</script>

<script lang="ts">
	import imgInitialOverview from "$lib/assets/blog/star-technology/initial-overview.webp";
</script>

<p>
	This is the index page for my Star Technology blog posts. Links to progress updates are below.
</p>
<p>
	<a href="https://www.curseforge.com/minecraft/modpacks/star-technology">Star Technology</a> is a
	Minecraft modpack focused on technology and progression. If you've ever heard of
	<a href="https://www.gtnewhorizons.com/">GregTech New Horizons</a>, Star Technology is essentially
	an easier, more modern, and more streamlined version. So far, I consider this to be the single
	most enjoyable Minecraft modpack I've ever played, though it's definitely meant for a certain kind
	of person.
</p>
<p>
	This series of blog posts is meant to be a journal of my progress through the pack. I'm planning
	on adding a new post after every technology tier (LV, MV, etc). I'm playing on a server with two
	of my friends, Mazerak and silverpickaxe15. We started this run on June 21, 2026.
</p>

<hr />

<nav>
	<h2>
		<a href="/blog/star-technology/initial-progress">Initial progress (to mid-LuV)</a>
	</h2>
	<a href="/blog/star-technology/initial-progress">
		<img class="full-width" src={imgInitialOverview} alt="Navigate to initial progress blog post" />
	</a>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
