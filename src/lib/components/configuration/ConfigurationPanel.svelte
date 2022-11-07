<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { Button, Panel, ResponsiveWrapper } from 'chyme-svelte';
	import { isOpen, bgColor, linkColor, primaryColor, textColor } from './store';
	import Brush from '../svg/icon/Brush.svelte';
	import { browser } from '$app/environment';
	import LL from '$i18n/i18n-svelte';

	function reset() {
		$bgColor = '#f7f7fa';
		$linkColor = '#ed1f3a';
		$primaryColor = '#002395';
		$textColor = '#333333';
	}

	$: if (browser) {
		fetch('/dev/configuration', {
			method: 'POST',
			body: JSON.stringify({ primaryColor: $primaryColor })
		});
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
	<ColorPicker bind:hex={$primaryColor} isAlpha={false} label={$LL.global_color_primary_label()} />
	<ColorPicker bind:hex={$bgColor} isAlpha={false} label={$LL.global_color_background_label()} />
	<ColorPicker bind:hex={$textColor} isAlpha={false} label={$LL.global_color_text_label()} />
	<ColorPicker bind:hex={$linkColor} isAlpha={false} label={$LL.global_color_link_label()} />
	<div>
		<p>
			{@html $LL.compo_configuration_panel_screwed_colors()}
		</p>

		<Button on:click={reset}>{$LL.compo_configuration_panel_action_reset()}</Button>
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
