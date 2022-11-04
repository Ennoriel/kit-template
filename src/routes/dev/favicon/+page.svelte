<script lang="ts">
	import Fake from '$lib/components/svg/Fake.svelte';
	import Fav from '$lib/components/svg/logo/Fav.svelte';
	import { colorRange } from 'chyme';

	const colors = colorRange('#111111', '#EEEEEE', 3) || [];
</script>

<Fake alt="" />

{#each colors as color, index}
	<div class:dark={index} class:light={!index}>
		<span style="--primary-color: {color} !important">
			<Fav maxheight={50} size="s" />
		</span>
		<span style="--primary-color: {color} !important">
			<Fav maxheight={50} size="s" bg />
		</span>
		<span style="--primary-color: {color} !important">
			<Fav maxheight={50} />
		</span>
		<span style="--primary-color: {color} !important">
			<Fav maxheight={50} bg />
		</span>
	</div>
{/each}

<!-- {#each colors as color}
    <div>
        <img src="/svg/favicon-s.svg?bg=false&color=%23{color.slice(1, 7)}" />
        <img src="/svg/favicon-s.svg?bg=true&color=%23{color.slice(1, 7)}" />
        <img src="/svg/favicon-m.svg?bg=false&color=%23{color.slice(1, 7)}" />
        <img src="/svg/favicon-m.svg?bg=true&color=%23{color.slice(1, 7)}" />
    </div>
{/each} -->

<!-- <style>
    img {
        height: 50px;
    }
</style> -->
<style>
	div {
		max-width: 500px;
		margin: auto;
	}
</style>
