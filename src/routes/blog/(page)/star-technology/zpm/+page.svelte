<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology: ZPM",
		date: new Date("2026-07-29T23:20:53-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology through the ZPM voltage tier.",
	};
</script>

<script lang="ts">
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<p>
	We're on to ZPM, the last tier before the Classic Stargate. Unlike in GT:NH, where the stargate is
	the final goal, in Star Technology there are <i>three</i> stargates, so we have quite a bit of work
	left to do. But that's a concern for later; let's get progressing!
</p>

<p>
	First order of business is getting a steady supply of ZPM circuits. Since we had unlimited LuV
	circuits from before, the quantum processor line of circuits never seemed worth automating, and we
	manually crafted the few ZPM circuits we needed up to this point. However, with new access to the
	Crystal Processor line of circuits, I took it upon myself to automate them.
</p>

<BlogFigure
	src="{data.slug}/first-uv-circuit"
	imgClass="landscape"
	alt="The first UV circuit we crafted"
	caption="This gets us UV circuits too"
/>

<BlogFigure
	src="{data.slug}/new-cleanroom"
	imgClass="landscape"
	alt="Cleanroom containing new circuit assemblers"
	caption="Our first couple large circuit assemblers"
/>

<BlogFigure
	src="{data.slug}/zpm-circuit-machines"
	imgClass="landscape"
	alt="Overview of the other machines used for crystal circuits"
	caption="The rest of the machines making circuits"
/>

<p>
	I then made a dedicated cleanroom for wafers and chips since those became the bottleneck. I kind
	of half-assed this automation, but I guess it worked, maybe.
</p>

<BlogFigure
	src="{data.slug}/wafers"
	imgClass="landscape"
	alt="Many machines in a row producing all the kinds of wafers and chips"
	caption="I almost forgot about the lubricant input"
/>

<BlogFigure
	src="{data.slug}/chipz"
	imgClass="landscape"
	alt="Cleanroom decorated with the word 'chipz' in plascrete"
	caption="Always decorate your cleanrooms!"
/>

<p>
	Mazerak upgraded our assembly line setup to run eight parallel machines, using a design taken from
	the Star Technology Discord. Also, we are now mainly relying on argon plasma for our power
	production.
</p>

<BlogFigure
	src="{data.slug}/assline"
	imgClass="landscape"
	alt="Eight parallel assembly lines"
	caption="I could not have figured this out myself"
/>

<BlogFigure
	src="{data.slug}/wallshare"
	imgClass="landscape"
	alt="Two different machines with different casings somehow wallsharing"
	caption="Learned this trick from Neurotic Goose"
/>

<p>
	I made an awfully-ratioed aerogel setup. It's easy to make the parallel multiblocks now so I feel
	compelled to use them everywhere, but this thing produces a stupid amount of ethanol which I don't
	need just yet.
</p>

<BlogFigure
	src="{data.slug}/aerogel"
	imgClass="landscape"
	alt="Aerogel production line using all parallel multiblocks"
	caption="There's a second ECR tower hiding behind the one you see"
/>

<p>
	Mazerak remade the nether star looping setup, since the old one with single block machines was <i
		>really</i
	> not cutting it.
</p>

<BlogFigure
	src="{data.slug}/nether-stars"
	imgClass="landscape"
	alt="Nether star looping setup with parallel multiblocks"
	caption="There are four heat chambers hiding behind the multiblocks. I should take better screenshots"
/>
