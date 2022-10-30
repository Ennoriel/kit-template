<script lang="ts">
	import { Button, ButtonGroup } from 'chyme-svelte';
	import Wrapper from './Wrapper.svelte';

	export let title: string;
	export let description: string | undefined = undefined;
	export let buttons: Array<{ label: string }> | undefined = undefined;
	export let img: any | undefined = undefined;
	export let theme: 'primary' | 'transparent' = 'primary';
	export let reverse = false;
</script>

<Wrapper {theme} col={img ? 2 : undefined}>
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
			<ButtonGroup justify="center">
				{#each buttons as { label }, index}
					<Button theme={index ? 'secondary' : 'primary'}>
						{label}
					</Button>
				{/each}
			</ButtonGroup>
		{/if}
	</div>
</Wrapper>

<style>
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

	p :global(br) {
		margin: 16px;
	}
</style>
