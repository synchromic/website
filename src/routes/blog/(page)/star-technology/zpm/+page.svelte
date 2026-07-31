<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology: ZPM and Classic Stargate",
		date: new Date("2026-07-29T23:20:53-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology during the ZPM tier and up to the Classic Stargate.",
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
	caption="We finally learned that we can rotate multiblocks. Chaos ensues"
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

<BlogFigure
	src="{data.slug}/chapter-4"
	imgClass="landscape"
	alt="Completed chapter 4 of the quest book"
	caption="Futuristic Mechanisms chapter complete! (July 26)"
/>

<p>With all the main ZPM infrastructure done, it was time to begin crafting components for the Classic Stargate. This thing is expensive! The bottlenecks are making 23 thousand weapon grade naquadah (6.3 days of processing time in one UV CAT) and 485 stargate rods, but there are also lots of other challenges along the way.
</p>

<p>
	First of all, for two of the multiblocks, we need these Runic Wave Generators. The hardest part of this craft is remembering to make large enough input hatches for the assembly line. Our AE2 infrastructure is a little bit behind, as we're still using the perfect overclocking multiblocks for most crafts.
</p>

<BlogFigure
	src="{data.slug}/runic-wave"
	imgClass="landscape"
	alt="Autocrafting screen for runic wave generator"
	caption="One of the most complex crafts yet"
/>

<p>
	Next, Maz made some Component Part Assemblies as well as the Runic Circuitry Assembly Station.
</p>

<BlogFigure
	src="{data.slug}/cpa"
	imgClass="landscape"
	alt="Eight component part assemblies in parallel"
	caption="The Haph setup is for the RCAS, not this"
/>

<BlogFigure
	src="{data.slug}/rcas"
	imgClass="landscape"
	alt="The completed Runic Circuitry Assembly Stations"
	caption="Looks kind of like a shulker"
/>

<p>
	Then I set up the Large Rotor Machine. I used another design by Haph from the Star Technology Discord that allows us to autocraft recipes with layered inputs. I feel a little bad about not trying to come up with autocrafting solutions myself, but these are just too ingenious. We eventually upgraded this to run four in parallel, as it became a bottleneck.
</p>

<BlogFigure
	src="{data.slug}/lrm"
	imgClass="landscape"
	alt="Large Rotor Machine with an autocrafting setup attached"
	caption="I accidentally veinmined the cables soon after"
/>

<p>
	We completely ran out of trinium, so Maz rebuilt the naquadah line with all the parallel multiblocks.
</p>

<BlogFigure
	src="{data.slug}/naqline-upgrade"
	imgClass="landscape"
	alt="Overview of upgraded naquadah line"
	caption="He's much better at building at scale than I am"
/>

<p>
	Yet another multiblock: the Dimensional Finder gives us the coordinates to enter into the Stargate. I think this multiblock looks really cool.
</p>

<BlogFigure
	src="{data.slug}/finder"
	imgClass="landscape"
	alt="Dimensional Finder multiblock"
	caption="Also pictured: our donut stack"
/>

<p>
	At this point, we were mostly just waiting for the stargate rods and weapon grade naquadah, so I went on a little side quest to try out the Modular Combustion Frame. It only generates around 7.5M EU/t, which is around the same amount as seven of the plasma turbines, so it wasn't really worth it for the energy, but I still thought it was fun.
</p>

<BlogFigure
	src="{data.slug}/combustion"
	imgClass="landscape"
	alt="Modular Combustion Frame as well as the gas to power it"
	caption="I love the massive tower of chemical reactors"
/>

<p>
	Here we have the Stargate Component Assembly, the multiblock that finally makes the stargate blocks. Unfortunately, we still don't have the materials for those!
</p>

<BlogFigure
	src="{data.slug}/sca"
	imgClass="landscape"
	alt="Exterior of the Stargate Component Assembly"
	caption="It would have been funnier to build this sideways"
/>

<p>
	While we continued to wait, we worked on some quality of life automation. Mazerak built this upgraded manual crafting setup.
</p>

<BlogFigure
	src="{data.slug}/manual"
	imgClass="landscape"
	alt="A row of ZPM single block machines, with some decoration"
	caption="The black machines fit well with the base theme"
/>

<p>
	Meanwhile, I designed this little thing. I call it MultIKEA: you can order a multiblock (or several) and it delivers all the required blocks to this terminal.
</p>

<BlogFigure
	src="{data.slug}/multikea"
	imgClass="landscape"
	alt="A small station for collecting multiblocks"
	caption="The top terminal contains hatches and other common items"
/>

<p>
	Since I designed this myself from scratch (for once), I'll elaborate on how it works. The key technique that makes this work is that filling and emptying fluid cells does not change their custom name. This is important because I want to make the patterns that request the multiblocks searchable in my terminal. Each multiblock pattern has an empty fluid cell in the input and a filled fluid cell in the output. When the pattern provider deposits all the multiblock materials into the yellow subnet, the canner fills the cell and dumps it into the main net, completing the recipe. Then the main net automatically empties all the filled cells it finds.
</p>

<BlogFigure
	src="{data.slug}/multikea-bottom"
	imgClass="landscape"
	alt="Underside of the terminal, with a colossal chest"
	caption="Never thought I'd need one of these after unlocking AE2"
/>

<p>
	A funny quirk of this system is that when we empty the fluid cells, we need to use the Pipez item pipe to filter for cells with water in them. (I couldn't find any way to do this using AE2 only.) So, I put a storage bus with a fuzzy card on a colossal chest to store all fluid cells, and then used an item pipe to extract filled ones. This lets us use a larger number of different multiblock patterns, since with a normal chest we can only have 27 differently-named fluid cells.
</p>
