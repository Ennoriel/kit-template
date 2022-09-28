<script lang="ts">
	import ColorPicker, { CircleVariant, type Hsv } from 'svelte-awesome-color-picker';
	import { Button, Panel, ResponsiveWrapper } from 'chyme-svelte';
	import { isOpen, bgColor, linkColor, primaryColor, textColor } from './store';
	import Brush from '../svg/icon/Brush.svelte';

	let hsvBgColor: Hsv | undefined;
	let hsvTextColor: Hsv | undefined;

	$: LightnessDiff = Math.abs((hsvBgColor?.v || 0) - (hsvTextColor?.v || 0));

	function reset() {
		$bgColor = '#f7f7fa';
		$linkColor = '#ed1f3a';
		$primaryColor = '#002395';
		$textColor = '#333333';
	}
</script>

<span>
	<ResponsiveWrapper>
		<Button
			slot="s"
			icon={Brush}
			on:click={(e) => {
				e.stopPropagation();
				$isOpen = !$isOpen;
			}}
		/>
		<Button
			slot="l"
			on:click={(e) => {
				e.stopPropagation();
				$isOpen = !$isOpen;
			}}>Configure the theme</Button
		>
	</ResponsiveWrapper>
</span>

<Panel bind:open={$isOpen}>
	<ColorPicker
		bind:hex={$primaryColor}
		components={CircleVariant}
		isAlpha={false}
		label="primary color"
	/>
	<ColorPicker
		bind:hex={$bgColor}
		bind:hsv={hsvBgColor}
		components={CircleVariant}
		isAlpha={false}
		label="background color"
	/>
	<ColorPicker
		bind:hex={$textColor}
		bind:hsv={hsvTextColor}
		components={CircleVariant}
		isAlpha={false}
		label="text color"
	/>
	<ColorPicker
		bind:hex={$linkColor}
		components={CircleVariant}
		isAlpha={false}
		label="link color"
	/>

	<div>
		<p>
			You've screwed the colors?<br />
			I'v done it too, many times!
		</p>

		<Button on:click={reset}>Reset the colors!</Button>

		{#if LightnessDiff < 0.6}
			<p>
				⛔ Be careful, the color contrast between the <strong>text</strong> color and
				<strong>background</strong>
				color is not sufficient enough ({(100 * LightnessDiff).toFixed(1)}%). It should be higher
				than 60%.
			</p>
		{/if}
	</div>
</Panel>

<style>
	span {
		position: fixed;
		bottom: 16px;
		left: 16px;
	}

	div {
		padding: 0 16px 16px;
	}
</style>
