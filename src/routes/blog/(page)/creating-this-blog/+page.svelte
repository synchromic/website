<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Creating this blog",
		date: new Date("2026-06-20T20:00:00.000Z"),
		hidden: true,
		description: "Notes on how I created this blog.",
	};
</script>

<script lang="ts">
	import imgDesign from "$lib/assets/blog/creating-this-blog/design.webp";
</script>

<p>
	Hello! If you're reading this, it means I finally got around to publishing my blog on the web.
	Good job, me!
</p>
<p>
	Making a blog is a project that has been at the back of my mind for years, but I never thought of
	a design that motivated me to code it up. Last year, I came up with the idea to make a blog themed
	like the osu! song select, but it was a huge pain trying to wrangle the positioning of DOM
	elements in a not-janky way. This time my goal was to not do anything too special, and just create
	a simple, intuitive, decent-looking blog that still feels like it's
	<i>mine</i>.
</p>
<p>
	As I don't particularly enjoy writing (yet?), the coding part is the main attraction of this
	project. That's why I'm not just using Wordpress or whatever blog template people are using
	nowadays. That's also why I have decided to forgo using LLMs entirely for this project; it's a lot
	of fun figuring this stuff out myself. (And writing code on my own helps me get accustomed to
	using emacs as my main editor.)
</p>
<figure>
	<img class="portrait" src={imgDesign} alt="Pen and paper design for main page" />
	<figcaption>A quick drawing of my imagined design for the main page</figcaption>
</figure>
<p>I'll write more of this post later!</p>
