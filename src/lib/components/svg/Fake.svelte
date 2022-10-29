<script>
	import Svg from './Svg.svelte';
</script>

<Svg format={[500, 200]} maxwidth={200} alt="">
	<rect x="10" y="10" width="50" height="50" fill="black" />
	<rect x="70" y="10" width="50" height="50" stroke="black" />
	<rect x="130" y="10" width="50" height="50" />
	<rect x="190" y="10" width="50" height="50" fill="white" />
	<rect x="250" y="10" width="50" height="50" fill="transparent" />
	<rect class="rect1" x="310" y="10" width="50" height="50" />
	<rect class="rect2" x="370" y="10" width="50" height="50" />

	<text x="10" y="80" fill="black">Text</text>
	<text x="70" y="80" stroke="black">Text</text>
	<text x="130" y="80">Text</text>
	<text x="190" y="80" fill="white">Text</text>
	<text x="250" y="80" fill="transparent">Text</text>
	<text class="text1" x="310" y="80">Text</text>
	<text class="text2" x="370" y="80">Text</text>
</Svg>

<style>
	.rect1,
	.text1 {
		fill: blue;
	}
	.rect2,
	.text2 {
		fill: transparent;
		stroke: blue;
	}
</style>
