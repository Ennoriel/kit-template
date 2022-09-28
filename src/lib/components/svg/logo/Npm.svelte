<script lang="ts">
	import Svg from '../Svg.svelte';

	export let alt: string;
	export let maxwidth: number | undefined = undefined;
	export let maxheight: number | undefined = undefined;
</script>

<Svg format={[780, 450]} {alt} {maxwidth} {maxheight}>
	<g transform="translate(0 100)">
		<path
			fill="#231F20"
			d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
		/>
	</g>
</Svg>
