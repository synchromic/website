<script>
	import QuickLink from "$lib/components/QuickLink.svelte";
	import TitleBox from "$lib/components/TitleBox.svelte";
</script>

<div class="outer">
	<div class="container">
		<header>
			<h1>synchromic</h1>
		</header>

		<main>
			<TitleBox title="Quick Links">
				<div class="quick-links-container">
					<div class="quick-links">
						<QuickLink
							title="Youtube"
							alt="Youtube channel link"
							href="https://www.youtube.com/@synchromic"
							imgSrc="icons/youtube.svg"
						/>
						<QuickLink
							title="Github"
							alt="Github profile link"
							href="https://github.com/synchromic"
							imgSrc="icons/github.svg"
						/>
						<QuickLink
							title="osu!"
							alt="osu! profile link"
							href="https://osu.ppy.sh/users/14201221"
							imgSrc="icons/osu.svg"
						/>
						<QuickLink
							title="Twitch"
							alt="Twitch channel link"
							href="https://www.twitch.tv/synchromic"
							imgSrc="icons/twitch.svg"
						/>
					</div>
				</div>
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

	.quick-links-container {
		flex-grow: 1;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.quick-links {
		margin: 0.5em;

		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 0.5em;

		font-size: 1.5em;
	}
</style>
