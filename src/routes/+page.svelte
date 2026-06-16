<script>
	import TitleBox from "$lib/components/TitleBox.svelte";
</script>

<div class="container">
	<header>
		<h1>synchromic</h1>
	</header>

	<main>
		<TitleBox title="Quick Links">
			<p>Hello, world!</p>
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

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: center;
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
		grid-template-columns: 500px 500px;
		gap: 1em;
	}
</style>
