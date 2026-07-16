<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology Initial Progress (LV-IV)",
		date: new Date("2026-07-16T00:14:48-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology up through the IV voltage tier.",
	};
</script>

<script lang="ts">
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<p>
	I didn't think to start writing this blog until we already reached LuV. As a result, there is
	already a significant amount of progress to show off. Since I basically never took any screenshots
	up to this point, I'll be using some from Mazerak that I grabbed from our Discord chat.
</p>

<hr />

<p>
	We began our playthrough on June 21, 2026. I originally tried out the hard mode for an hour before
	realizing it was not very complete, so we switched over to the normal mode.
</p>

<BlogFigure
	src="{data.slug}/the-start"
	imgClass="landscape"
	alt="Very small base with sieves and a coke oven"
	caption={'"time capsule" -Mazerak (June 21)'}
/>

<p>
	Nothing too special happened at the start. Lots of manual crafting going on. In general, I tend to
	work on progression while Mazerak works on automating stuff. He crafted some Create crushers for
	gravel, sand, and dust, while I set up our first few blast furnaces for steel.
</p>

<BlogFigure
	src="{data.slug}/storage-network"
	imgClass="landscape"
	alt="Center shot of the expanded base"
	caption="LV machines and storage network (June 22)"
/>

<p>
	We got to LV pretty quickly. Maz set up Simple Storage and decorated the base a bit while I
	crafted several LV machines. I've seen people do a lot of Create automation in their playthroughs,
	but the early game progresses fast enough that it didn't seem worth it.
</p>

<BlogFigure
	src="{data.slug}/auto-sieves"
	imgClass="landscape"
	alt="Drawers with various sieved materials"
	caption="Basic large sieve automation (June 22)"
/>

<p>
	We made it to MV, then HV, creating various small automations for rubber, chemicals, steel, ore
	processing, etc. Maz worked on getting the ME storage system online, while I improved our circuit
	production. Thankfully, the pack lets us keep ME channels unlimited for this playthrough; both of
	us have dealt with limited channels before and we don't think it's fun.
</p>

<BlogFigure
	src="{data.slug}/tubes"
	imgClass="landscape"
	alt="Early HV base with Create pneumatic tubes everywhere"
	caption="Mazerak discovers pneumatic tubes (June 28)"
/>

<p>
	Our base is rather flat and plain. I don't have the motivation to build anything fancy, though Maz
	still does some decoration when he's bored. I also think highly compressed lawnbases like ours can
	look pretty cool.
</p>

<BlogFigure
	src="{data.slug}/upgraded-ores"
	imgClass="landscape"
	alt="Several ore processing factories in a row"
	caption="Expanded ore processing setup (June 29)"
/>

<BlogFigure
	src="{data.slug}/chip-cube"
	imgClass="landscape"
	alt="Tiny cleanroom for making wafers"
	caption="Trust me, I tried to convince him that bigger cleanrooms are cheap (July 2)"
/>

<BlogFigure
	src="{data.slug}/underside"
	imgClass="landscape"
	alt="Underside of platform with snaking cables"
	caption="Pre-Flux Networks view of all the cables underneath (July 2)"
/>

<p>
	Power has pretty consistently been a problem throughout the playthrough. We spent quite a while
	relying on upgrading lapidary dynamos for our power. Eventually we switched to nitrobenzene, but
	it's been tricky to scale up. At the time of writing, we have built <i>four</i> different nitrobenzene
	setups.
</p>

<BlogFigure
	src="{data.slug}/circuitville"
	imgClass="landscape"
	alt="Circuit automation"
	caption="Circuitville! Automatic ULV through HV circuits. (July 2)"
/>

<p>
	We reached EV, and the pack's difficulty began to increase. I started working on platline while
	Mazerak improved our AE2 infrastructure.
</p>

<BlogFigure
	src="{data.slug}/chemical-city"
	imgClass="landscape"
	alt="Lots of chemical reactors"
	caption="Chemical City, with improved production of plastics and epoxy. (July 7)"
/>

<p>
	We made our way through EV and then IV, upgraded production of lots of chemicals and alloys, fixed
	our power, and passived a variety of items. Finally, we reached the end of the Automation Age
	chapter on July 10, 2026.
</p>

<BlogFigure
	src="{data.slug}/iv-base"
	imgClass="full-width"
	alt=""
	caption="Base overview at the end of IV"
/>

<hr />

<p>
	I will add the next post once we reach the end of LuV. I'll start taking more screenshots so it
	will hopefully be more detailed. See you soon!
</p>
