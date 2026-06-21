<script lang="ts">
	import imgYoutube from "$lib/assets/icons/youtube.svg";
	import imgGithub from "$lib/assets/icons/github.svg";
	import imgOsu from "$lib/assets/icons/osu.svg";
	import imgTwitch from "$lib/assets/icons/twitch.svg";
	import QuickLink from "$lib/components/QuickLink.svelte";
	import TitleBox from "$lib/components/TitleBox.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>synchromic's website</title>
	<meta
		name="description"
		content="the personal website for synchromic - software engineer, osu! player"
	/>
</svelte:head>

<div class="outer bg-pattern">
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
							imgSrc={imgYoutube}
						/>
						<QuickLink
							title="Github"
							alt="Github profile link"
							href="https://github.com/synchromic"
							imgSrc={imgGithub}
						/>
						<QuickLink
							title="osu!"
							alt="osu! profile link"
							href="https://osu.ppy.sh/users/14201221"
							imgSrc={imgOsu}
						/>
						<QuickLink
							title="Twitch"
							alt="Twitch channel link"
							href="https://www.twitch.tv/synchromic"
							imgSrc={imgTwitch}
						/>
					</div>
				</div>
			</TitleBox>
			<TitleBox title="Latest Blog Posts">
				<ul>
					{#each data.recent as post}
						<li><a href="/blog/{post.slug}">{post.meta.title}</a></li>
					{/each}
				</ul>
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
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
