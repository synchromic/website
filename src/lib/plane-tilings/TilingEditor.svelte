<script lang="ts">
	import { onMount } from "svelte";
	import { PlaneTiling } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	let { svgClass, startCode }: { svgClass?: string; startCode?: string } = $props();

	let tiling = new PlaneTiling(15, 44);
	let code = $derived(tiling.getCode());

	function onclick(r: number, c: number) {
		tiling.toggle(r, c);
		if (!(r === tiling.height / 2 - 1 && c === (tiling.width - 1) / 2)) {
			const refR = tiling.height - 1 - r;
			const refC = tiling.width - 1 - c;
			tiling.toggle(refR, refC);
		}
	}

	onMount(() => {
		if (startCode !== undefined) {
			tiling.setCode(startCode);
		}
	});
</script>

<figure>
	<TilingDisplay {tiling} {svgClass} {onclick} />
	<figcaption>Code: <code>{code}</code></figcaption>
</figure>
