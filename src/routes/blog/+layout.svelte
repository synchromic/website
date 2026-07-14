<script lang="ts">
	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<div class="container bg-pattern">
	<article>
		{@render children()}
	</article>
</div>

<style>
	.container {
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	article {
		width: 1000px;
		padding: 1em 20px;
		margin: 20px 0;

		display: flex;
		flex-direction: column;
		gap: 1em;

		background-color: var(--background-color);
		border: 1px solid var(--background-color-ll);
	}

	@media (max-width: 1100px) {
		article {
			width: auto;
			margin: 0;
			border: none;
		}
	}
</style>
