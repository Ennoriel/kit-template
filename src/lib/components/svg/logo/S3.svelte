<script lang="ts">
	import Svg from '../Svg.svelte';

	export let alt: string;
	export let maxwidth: number | undefined = undefined;
	export let maxheight: number | undefined = undefined;
</script>

<Svg format={[428, 512]} {alt} {maxwidth} {maxheight}>
	<path fill="#e25444" d="M378,99L295,257l83,158,34-19V118Z" />
	<path fill="#7b1d13" d="M378,99L212,118,127.5,257,212,396l166,19V99Z" />
	<path fill="#58150d" d="M43,99L16,111V403l27,12L212,257Z" />
	<path fill="#e25444" d="M42.637,98.667l169.587,47.111V372.444L42.637,415.111V98.667Z" />
	<path fill="#58150d" d="M212.313,170.667l-72.008-11.556,72.008-81.778,71.83,81.778Z" />
	<path fill="#58150d" d="M284.143,159.111l-71.919,11.733-71.919-11.733V77.333" />
	<path fill="#58150d" d="M212.313,342.222l-72.008,13.334,72.008,70.222,71.83-70.222Z" />
	<path fill="#7b1d13" d="M212,16L140,54V159l72.224-20.333Z" />
	<path fill="#7b1d13" d="M212.224,196.444l-71.919,7.823V309.105l71.919,8.228V196.444Z" />
	<path fill="#7b1d13" d="M212.224,373.333L140.305,355.3V458.363L212.224,496V373.333Z" />
	<path fill="#e25444" d="M284.143,355.3l-71.919,18.038V496l71.919-37.637V355.3Z" />
	<path fill="#e25444" d="M212.224,196.444l71.919,7.823V309.105l-71.919,8.228V196.444Z" />
	<path fill="#e25444" d="M212,16l72,38V159l-72-20V16Z" />
</Svg>
