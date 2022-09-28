<script lang="ts">
	import { Button, ButtonGroup } from 'chyme-svelte';

	export let title: string;
	export let description: string | undefined = undefined;
	export let buttons: Array<{ label: string }> | undefined = undefined;
	export let img: any | undefined = undefined;
	export let theme: 'primary' | 'transparent' = 'primary';
	export let reverse = false;
</script>

<div class="wrapper {theme}" class:col-2={img}>
	{#if img}
		<div class:right={reverse} class:left={!reverse}>
			<svelte:component this={img} maxwidth={250} maxheight={250} />
		</div>
	{/if}
	<div class:left={img && reverse} class:right={img && !reverse}>
		<h2>{title}</h2>
		{#if description}
			<p>{@html description}</p>
		{/if}
		{#if buttons && buttons.length}
			<ButtonGroup>
				{#each buttons as { label }, index}
					<Button theme={index ? 'secondary' : 'primary'}>
						{label}
					</Button>
				{/each}
			</ButtonGroup>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		--box-shadow: 0 0 2px #ddd;
		--bg-color: white;
		--margin: 128px 16px;

		padding: 16px;
		margin: var(--margin);
		border-radius: 16px;
		background-color: var(--bg-color);
		box-shadow: var(--box-shadow);
	}

	.transparent {
		--bg-color: transparent;
		--box-shadow: none;
		--margin: 64px 16px;
	}

	.left {
		grid-column: left;
	}

	.right {
		grid-column: right;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	h2,
	p {
		text-align: center;
	}

	.wrapper :global(br) {
		margin: 16px;
	}

	@media (min-width: 768px) {
		.wrapper {
			padding: 32px;
			display: grid;
			justify-items: center;
		}
		.wrapper.col-2 {
			grid-template-columns: 1fr 1fr;
			grid-auto-flow: dense;
			grid-template-areas: 'left right';
		}
	}
</style>
