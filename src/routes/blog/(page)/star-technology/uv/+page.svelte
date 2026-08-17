<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology: UV",
		date: new Date("2026-08-16T13:38:03-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology during the UV tier.",
		thumbnail: "blog/star-technology/uv/circuittown",
	};
</script>

<script lang="ts">
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<p>
	We are now in UV, with a whole new dimension to explore: Abydos. It contains an endless desert,
	scattered with various structures containing important loot. Within some of the treasure chests
	are bacteria, which we must cultivate to harvest stem cells for highly advanced circuits. There
	are also four new liquids filled with new minerals that can be extracted and processed. Let's get
	started!
</p>

<p>
	With the stargate newly opened, we spent some time flying around and exploring Abydos. The
	dimension has an eternal sandstorm that occasionally damages you, but because we are playing in
	peaceful mode (as intended), it never hurt enough to become a problem, even without crafting the
	fancy armor from last tier. The two structures that contain loot are the tombs and the pyramids.
	The most important item to obtain from the chests is the dormant bacteria. There are some other
	useful items, such as the ruined components and the naquadah armor, but those aren't used until
	later tiers. We can also get the Pharaoh's Necklace which stops the sandstorm damage, although
	it's rare and not really a necessity.
</p>

<BlogFigure
	src="{data.slug}/structures"
	imgClass="landscape"
	alt="A tomb and a pyramid in Abydos"
	caption="This place is very yellow"
/>

<p>
	The more immediately important resources from Abydos are the fluids that can be drilled. There are
	three types of "dense magma" — refractory, reactivity, and naquadite — and also gritty akreyrium.
	The different dense magmas turn into a bunch of things, but primarily zirconium and zapolgium. We
	can convert the magma into raw ores directly, or we can use the more efficient recipe of turning
	it into residue first with the cyclonic sifter. We do need some thallium first to craft the
	cyclonic sifter, and thallium is a product of the reactivity dense magma, so you must either use
	the inefficient recipe first or manually mine a little bit of crookesite from Abydos. (I found
	this a bit confusing at first.)
</p>

<BlogFigure
	src="{data.slug}/thallium"
	imgClass="landscape"
	alt="Thallium and zirconium ore processing setup"
	caption="Thallium and zirconium ore processing setup"
/>

<p>
	Sorry about the FOV in some of these screenshots; the Pharaoh's Necklace gives Speed III, which
	increases my FOV, and for a while I forgot to adjust it down.
</p>

<p>
	Before getting into bacteria, I did some AE2 infrastructure improvements. I switched over from the
	perfect overclocking multiblocks to the parallel ones, and built a few more Haph setups. They're a
	bit of a pain to build but they are so worth it for the autocrafting speedups and convenience.
</p>

<BlogFigure
	src="{data.slug}/ae2-parallels"
	imgClass="landscape"
	alt="Towers of parallel multiblocks for autocrafting"
	caption="More of this to come"
/>

<BlogFigure
	src="{data.slug}/more-haph"
	imgClass="landscape"
	alt="Three more Haph setups for bender, extruder, and wiremill"
	caption="Bender, extruder, and wiremill"
/>

<p>
	Mazerak had a new project: replacing Chemical City. Our old setup for all the plastics was very
	dated, still using old <abbr title="Large Chemical Reactors">LCRs</abbr>. It was also the first
	(second?) AE2 subnet we built on the server, which meant it was poorly designed, with Super Tanks
	and import/export buses everywhere. In my opinion, we should have waited to replace Chemical City
	until after we had bacteria, since they make the petrochemicals much easier to produce, but we
	needed <abbr title="polyether ether ketone">PEEK</abbr> plastic right now anyways. Time to say goodbye
	to one of the oldest builds on the server.
</p>

<BlogFigure
	src="{data.slug}/chemical-city-destruction"
	imgClass="landscape"
	alt="Old Chemical City getting torn down"
	caption="Skeletons of LCR towers"
/>

<BlogFigure
	src="{data.slug}/new-chemical-city"
	imgClass="landscape"
	alt="New, fancier, more compact chemicals"
	caption="Chemical Metropolis?"
/>

<p>
	At this point, I got sick and tired of server lag. The profiler told us that we were running at
	around 70 milliseconds per tick, and I think this was an underestimate because it seemed like
	recipes took over twice as long to finish as they should have. Even after eliminating the biggest
	sources of lag on the server (interfaces on large output buses are surprisingly laggy!) it was
	still unacceptably slow. For a while now we had been running the server on Maz's Amazon EC2
	instance, but this was very expensive and had too little RAM. After some searching, I found <a
		href="https://www.kinetichosting.com/">Kinetic Hosting</a
	> (not sponsored!) to be a good option. Apart from some minor downtime, it's been a smooth experience
	for the past two weeks; our mid-UHV server is running at 36 milliseconds per tick on the 12GB plan.
</p>

<p>
	Now that we have plastic, it's bacteria time. Maz did the hard work mutating the bacteria; it
	looks rather tedious. I find the bacteria mutating mechanic kind of weird, since once you put in
	the hard work to get the best possible bacteria, you basically don't need to think about it
	anymore. There's no tradeoffs between efficiency and productivity or anything that would make it
	actually interesting; you just choose how to prioritize the chemical outputs. We didn't
	particularly care about the petrochemicals since we had just built the new Chemical City, so the
	bacteria fluid was all that we wanted.
</p>

<BlogFigure
	src="{data.slug}/bacteria"
	imgClass="landscape"
	alt="Bacteria mutating and breeding multiblocks"
	caption="The big bacteria multiblocks"
/>
