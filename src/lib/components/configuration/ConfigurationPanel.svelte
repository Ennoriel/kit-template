<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { Button, Panel, ResponsiveWrapper } from 'chyme-svelte';
	import { isOpen, bgColor, linkColor, primaryColor, textColor } from './store';
	import Brush from '../svg/icon/Brush.svelte';
	import { browser } from '$app/environment';

	function reset() {
		$bgColor = '#f7f7fa';
		$linkColor = '#ed1f3a';
		$primaryColor = '#002395';
		$textColor = '#333333';
	}

	$: if (browser) {
		fetch('/dev/configuration', {
			method: 'POST',
			body: JSON.stringify({ 'primaryColor': $primaryColor })
		})
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
		isAlpha={false}
		label="primary color"
	/>
	<ColorPicker
		bind:hex={$bgColor}
		isAlpha={false}
		label="background color"
	/>
	<ColorPicker
		bind:hex={$textColor}
		isAlpha={false}
		label="text color"
	/>
	<ColorPicker
		bind:hex={$linkColor}
		isAlpha={false}
		label="link color"
	/>
	<div>
		<p>
			You've screwed the colors?<br />
			I'v done it too, many times!
		</p>

		<Button on:click={reset}>Reset the colors!</Button>
	</div>
</Panel>

<style>
	span {
		position: fixed;
		bottom: 16px;
		left: 16px;
	}

	span + :global(div) {
		overflow: visible;
	}

	div {
		padding: 0 16px 16px;
	}

	:global(.color-picker label) {
		flex-direction: row;
		margin: 16px;
	}

	:global(.color-picker .wrapper) {
		top: 10px;
	}

	:global(.color-picker details) {
		border: none;
	}
</style>
