<script lang="ts">
	import { onMount } from "svelte";
	import { PlaneTiling } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	let { startCode }: { startCode?: string } = $props();

	let tiling = new PlaneTiling(15, 44);
	let reflecting = $state(true);
	let code = $derived(tiling.getCode());

	function onclick(r: number, c: number) {
		tiling.toggle(r, c);
		if (reflecting) {
			const { r: refR, c: refC } = tiling.reflected(r, c);
			if (refR !== r || refC !== c) {
				tiling.toggle(refR, refC);
			}
		}
	}

	onMount(() => {
		if (startCode !== undefined) {
			tiling.setCode(startCode);
		}
	});
</script>

<TilingDisplay svgClass="portrait" {tiling} {onclick} {reflecting} />
<p>Code: <code>{code}</code></p>
