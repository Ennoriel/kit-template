<script lang="ts">
	import Svg from '../Svg.svelte';

	export let alt = 'Application logo';
	export let maxwidth: number | undefined = undefined;
	export let maxheight: number | undefined = undefined;

	export let size: 's' | 'm' = 'm';
	export let bg = false;
</script>

<Svg format={size === 's' ? [150, 150] : [450, 150]} {alt} {maxwidth} {maxheight}>
	{#if size === 's'}
		<g class="wrapper" class:bg>
			<rect width="150" height="150" x="0" y="0" class="no-stroke background" />
			<rect width="140" height="140" x="5" y="5" stroke-width="10" class="no-fill text" />
			<text
				x="30"
				y="100"
				font-size="75"
				font-weight="900"
				font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
				class="no-stroke text">FC</text
			>`
		</g>
	{:else}
		<g class="wrapper" class:bg>
			<rect width="450" height="150" x="0" y="0" class="no-stroke background" />
			<g
				class="no-stroke text"
				font-weight="600"
				font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
			>
				<text x="40" y="92.5" font-size="55">Fake Company</text>
				<text x="75" y="142" font-size="26" font-weight="400">everything out of the box</text>
			</g>
			<path
				d="M 60 135 L 15 135 L 15 15 L 435 15 L 435 135 L 380 135"
				stroke-width="3"
				class="no-fill text"
			/>
		</g>
	{/if}
</Svg>

<style>
	.no-fill {
		fill: none !important;
	}
	.no-stroke {
		stroke: none !important;
	}
	.text {
		stroke: var(--svg-color-text);
		fill: var(--svg-color-text);
	}
	.background {
		stroke: var(--svg-color-bg);
		fill: var(--svg-color-bg);
	}
	:global(.menu-light) .text,
	.bg .text {
		stroke: var(--svg-color-text);
		fill: var(--svg-color-text);
	}
	:global(.menu-light) .background,
	.bg .background {
		stroke: var(--svg-color-bg);
		fill: var(--svg-color-bg);
	}
	.wrapper {
		--svg-color-text: white;
		--svg-color-bg: var(--primary-color);
	}
	:global(.menu-light) .wrapper,
	.wrapper.bg {
		--svg-color-text: var(--primary-color);
		--svg-color-bg: transparent;
	}
</style>
