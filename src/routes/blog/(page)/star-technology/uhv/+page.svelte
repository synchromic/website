<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology: UHV and Ancient Stargate",
		date: new Date("2026-08-28T11:32:01-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology during the UHV tier and up to the Ancient Stargate.",
		thumbnail: "blog/star-technology/uhv/ancient-stargate",
	};
</script>

<script lang="ts">
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import Footnote from "$lib/components/footnote/Footnote.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<p>
	UHV is here, and it's going to be here for a while, since UEV components are locked behind the
	Ancient Stargate. The stargate is, of course, going to take plenty of work, but there are also
	some other challenges on the way, such as making Utopian Akreyrium and UEV circuits.
</p>

<p>
	As the one who made the UHV circuit setup, I was naturally given the task of expanding it to craft
	UEV circuits as well. Before that, though, we need an ingredient called Runic Convergence
	Infusion. Compared to what I went through earlier, this was a pretty simple processing line.
</p>

<BlogFigure
	src="{data.slug}/runic-infusion"
	imgClass="landscape"
	alt="Some machines producing Runic Convergence Infusion"
	caption="Lag machines, activate!"
/>

<p>
	Now for the UEV circuits themselves. Thanks to my awesome infrastructure from the UHV circuit
	setup, most of my work was simplified to just adding patterns for various random plates and bolts
	and putting those in the requesters. For assembling the circuits, I decided to use the new Compact
	Assembly Lines, which are 2.5 times faster than the regular assembly lines (if my understanding is
	correct). Unfortunately, these take forever to craft, requiring lots of expensive UHV components,
	so I ran the autocrafting overnight. I also upgraded the old circuits to use the new neutronium
	wafers.
</p>

<BlogFigure
	src="{data.slug}/circuitville-uev"
	imgClass="landscape"
	alt="Circuitville now with UEV component crafting"
	caption="Very pink!"
/>

<p>
	While I was working on that, and was also getting distracted by writing the UV blog post, Mazerak
	set up some basic Utopian Akreyrium<Footnote name="akreyrium"
		>Learning how to spell this correctly took concerningly long.</Footnote
	>. There are two ways to craft it: the horrible slow way, which takes almost two hours per bucket
	(with 1 UHV machine), and the actually decent way which takes a handful of seconds. Unfortunately,
	the decent way requires both UEV circuits <i>and</i> having some amount of akreyrium already, so the
	slow way will have to do for now.
</p>

<BlogFigure
	src="{data.slug}/basic-akreyrium"
	imgClass="landscape"
	alt="The basic akreyrium setup (it's, like, four machines)"
	caption="There will be much more going on here later"
/>

<p>
	Maz also set up nuclear reactors for echo shards, which are used for void ingots, an important
	material for the Ancient Stargate. We had been completely neglecting nuclear reactors for this
	whole run, so this was quite the project. It's too bad their power output is negligible at this
	point<Footnote name="reactors"
		>Though, honestly, their power output was negligible at <i>all</i> points.</Footnote
	>.
</p>

<BlogFigure
	src="{data.slug}/echo-dust"
	imgClass="landscape"
	alt="A huge block of nuclear reactors for producing echo shard dust"
	caption="my honest reactor"
/>

<p>
	Now that we have a decent supply of UEV circuits, it only takes a bit of random crafting to finish
	off the Abydos chapter in the questbook. Look at how far we've come!
</p>

<BlogFigure
	src="{data.slug}/abydos-complete"
	imgClass="landscape"
	alt="Questbook chapter Adventures in Abydos completed"
	caption="Adventures in Abydos completed! (August 16)"
/>

<p>
	That leaves us with the next chapter, which is all about crafting the Ancient Stargate. Before we
	got into that, though, I put down a couple Component Nexuses, which are one of the new
	multiblocks. They help massively in crafting the LuV, ZPM, and UV components, as they run at
	double the speed and we don't have to send them ordered inputs like the assembly line. If you're
	making one, <b>beware</b>: the recipes for the UV pump and UV robot arm are <i>slightly</i> different
	than the assembly line recipes (this is a bug).
</p>

<BlogFigure
	src="{data.slug}/component-nexus"
	imgClass="landscape"
	alt="Component nexus crafting something and having lots of ingredients in its buffer"
	caption="Look at all that junk"
/>

<p>
	The first important resource for the Ancient Stargate is void ingots. I tacked this on to the echo
	shard production. Mazerak had already done all of the hard work so it wasn't all too difficult for
	me. I needed more industrial TNT, but we have an endless supply of toluene from bacteria so this
	isn't as hard as before.
</p>

<BlogFigure
	src="{data.slug}/void-ingots"
	imgClass="landscape"
	alt="Part of the void ingot processing line"
	caption="Is that Squidward's house?"
/>

<p>
	Next, I made some Titan Forges. These are necessary to craft dense plates, but they also make
	other stargate components faster using the foil ream and wire spool recipes. No longer will we
	need that big stack of forming presses.
</p>

<BlogFigure
	src="{data.slug}/titan-forges"
	imgClass="landscape"
	alt="Four titan forges, two stacks of two"
	caption="Don't mind what happened to the sign on the left"
/>

<p>
	Mazerak built some Auxiliary Boosted Fusion Reactors, which are darn fast and will greatly help
	with our power production in the future. You can wallshare these in a sorta silly way, overlapping
	the rings, but we sadly put it too close to the other builds to take full advantage of this.
</p>

<BlogFigure
	src="{data.slug}/aux-fusion"
	imgClass="landscape"
	alt="Six fancy new fusion reactors, wallshared through the rings"
	caption="They look pretty cool"
/>

<p>
	Maz also upgraded the akreyrium production to use the better recipe. The stargate needs thousands
	of buckets of akreyrium, and the bad recipe is <i>really</i> not going to cut it. This is one of the
	most complicated processing lines yet.
</p>

<BlogFigure
	src="{data.slug}/better-akreyrium"
	imgClass="landscape"
	alt="New machines like injection mixers for the akreyrium"
	caption="I told you there would be more going on (though this screenshot doesn't do it justice)"
/>

<p>
	At this point, there's not much left to do other than add recipes, build multiblocks, and wait.
	Most of the Ancient Stargate recipes are just more expensive versions of the Classic Stargate
	counterparts, so after upgrading the old infrastructure to higher energy levels, we basically had
	everything we needed. And so on August 23, 2026, we... uh...
</p>

<BlogFigure
	src="{data.slug}/create-craft"
	imgClass="landscape"
	alt="Using the Create Mechanical Crafter to craft the stargate?"
	caption="What are you doing??"
/>

<p>
	Okay, right clicking the base didn't form the multiblock, so we used the Create recipe to finish
	it off. (Why does something always go wrong with building the Stargate?) After deftly avoiding the
	kawoosh, we have unlocked the nether!
</p>

<BlogFigure
	src="{data.slug}/ancient-stargate"
	imgClass="landscape"
	alt="Ancient Stargate completed and powered"
	caption="The real hell comes after this"
/>

<p>
	Technically we still aren't in UEV yet, since we need to do the hell forge stuff first, but this
	feels like a good spot to end this blog post. The next post will cover our adventures in the
	nether, the end, and UEV. See you then!
</p>
