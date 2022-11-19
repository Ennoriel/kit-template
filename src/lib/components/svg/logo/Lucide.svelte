<script lang="ts">
	import Svg from '../Svg.svelte';

	export let alt: string;
	export let maxwidth: number | undefined = undefined;
	export let maxheight: number | undefined = undefined;
</script>

<Svg
	format={[24, 24]}
	{alt}
	{maxwidth}
	{maxheight}
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path d="M14 12a4 4 0 0 0-8 0 8 8 0 1 0 16 0 11.97 11.97 0 0 0-4-8.944" /><path
		d="M10 12a4 4 0 0 0 8 0 8 8 0 1 0-16 0c0 3.584 1.571 6.801 4.063 9"
		stroke="#F56565"
	/>
</Svg>
