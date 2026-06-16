<script>
	import TitleBox from "$lib/components/TitleBox.svelte";
</script>

<div class="outer">
	<div class="container">
		<header>
			<h1>synchromic</h1>
		</header>

		<main>
			<TitleBox title="Quick Links">
				<p>Hello, world!</p>
				<p>Paragraph two</p>
			</TitleBox>
			<TitleBox title="Latest Blog Posts">
				<p>Hello, world!</p>
			</TitleBox>
			<TitleBox title="Featured Project">
				<p>Hello, world!</p>
			</TitleBox>
			<TitleBox title="Random Cat Photo">
				<p>Hello, world!</p>
			</TitleBox>
		</main>
	</div>
</div>

<style>
	.outer {
		width: 100%;
		min-height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background-image: url(./background.svg);
		background-position: center center;
		background-clip: border-box;
	}

	.container {
		padding: 1em;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	header {
		margin-bottom: 1em;
		padding: 1em;

		border: 1px solid var(--foreground-color);
		background-color: var(--background-color);
		font-weight: bold;
	}

	h1 {
		margin: 0;

		font-family: "Source Code Pro", Consolas, monaco, monospace;
		letter-spacing: 0.1em;
	}

	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 1em;
	}

	@media (max-width: 850px) {
		main {
			grid-template-columns: 1fr;
			grid-auto-rows: 1fr;
		}
	}

	@media (max-width: 450px) {
		.container {
			padding-left: 0;
			padding-right: 0;

			width: 100%;
		}

		main {
			width: 100%;
			grid-template-columns: auto;
		}
	}
</style>
