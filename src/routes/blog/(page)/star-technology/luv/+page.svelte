<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology: LuV",
		date: new Date("2026-07-27T11:36:05-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology through the LuV voltage tier.",
		thumbnail: "blog/star-technology/luv/luv-base",
	};
</script>

<script lang="ts">
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<p>
	It's time for LuV! The difficulty of this pack is still ramping up, but LuV is honestly pretty
	short. The main challenge this tier is getting used to assembly lines and beginning to produce
	naquadah.
</p>

<p>
	The first thing I set up in LuV was Circuitville v2. We got access to Advanced SMD components, so
	I automated those and the nanoprocessor line of circuits. You can't see them in the picture, but I
	finally learned to use ME Interfaces instead of storage drawers to input many different kinds of
	items into machines.
</p>

<BlogFigure
	src="{data.slug}/circuitville-cleanroom"
	imgClass="landscape"
	alt="Cleanroom containing nanoprocessor circuit assemblers"
	caption="Assembler towers and wafer cutters"
/>

<p>
	Mazerak got nether star looping set up with a slow but passive energized shard setup. Meanwhile, I
	improved our AE2 autocrafting situation by putting together some large assemblers. Thanks to the
	Star Technology discord, I learned about the "Haph" setup which lets you use multiple different
	circuit numbers on the same machines. It works by swapping between several different AE2 subnets
	based on whether there are items waiting in them, and using stocking input buses to automatically
	craft with those items. Pretty neat!
</p>

<BlogFigure
	src="{data.slug}/assembler-haph"
	imgClass="landscape"
	alt="Large assemblers automated with the Haph setup"
	caption="What an interesting color scheme"
/>

<p>It's time for naquadah, but first here are some screenshots of the whole base.</p>

<BlogFigure
	src="{data.slug}/mid-luv-base-s"
	imgClass="landscape"
	alt="Mid-LuV base screenshot facing south"
	caption="South-facing overview, showing Circuitville"
/>

<BlogFigure
	src="{data.slug}/mid-luv-base-w"
	imgClass="landscape"
	alt="Mid-LuV base screenshot facing west"
	caption="West-facing overview, showing the EBFs and Chemical City"
/>

<BlogFigure
	src="{data.slug}/mid-luv-base-n"
	imgClass="landscape"
	alt="Mid-LuV base screenshot facing north"
	caption="North-facing overview, showing the AE2 stuff and some ore processing"
/>

<BlogFigure
	src="{data.slug}/mid-luv-base-e"
	imgClass="landscape"
	alt="Mid-LuV base screenshot facing east"
	caption="East-facing overview, showing Passive Land and more ore processing"
/>

<p>
	These screenshots went out of date quickly, since while I was inactive for a few days, Mazerak did
	a lot of spring cleaning. He completely reworked the ore processing system, putting stuff on
	subnets and in disks and using large machines everywhere. Very impressive work; I would have died
	of boredom.
</p>

<BlogFigure
	src="{data.slug}/ore-processing"
	imgClass="landscape"
	alt="Reworked ore processing system"
	caption="So many machines (July 16)"
/>

<BlogFigure
	src="{data.slug}/cleaned-base"
	imgClass="landscape"
	alt="Base with lots of empty space after cleaning"
	caption="It feels so empty... (July 17)"
/>

<p>
	You can see there in the bottom left my naquadah setup. It's pretty slow but it does passively
	produce naquadah, naquadah alloy, and trinium. I'm pretty lazy so I usually only put up one
	machine per recipe, but it's passive so it's good enough right?
</p>

<BlogFigure
	src="{data.slug}/naqline"
	imgClass="landscape"
	alt="Naquadah line setup"
	caption="Biggest multiblock so far, I think (July 17)"
/>

<p>
	This is when I fell in love with using AE2 subnets. I don't know how good they are in terms of
	lag, but it is very nice to limit the set of items you see in the system.
</p>

<p>
	I guess I never mentioned power generation, did I? I hinted last post that we have four
	nitrobenzene setups. You can see two of them in the upper left of the below screenshot. Our main
	goal at this point is rushing fusion mk2 for plasma energy, but that's well into ZPM so we still
	need lots of power, and nitrobenzene seemed like the most reasonable option. Mazerak did all the
	work here.
</p>

<BlogFigure
	src="{data.slug}/labelled-base"
	imgClass="full-width"
	alt="Labelled overview of base"
	caption="Labelled overview of our base, made by Mazerak (July 17)"
/>

<p>
	With naquadah and fusion (no screenshots of the first fusion reactor, sadly), we are now heading
	into ZPM. Hence, this is the end of this blog post. See you next tier!
</p>
