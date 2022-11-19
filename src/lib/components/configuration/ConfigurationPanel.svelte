<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { Button, Panel, ResponsiveWrapper } from 'chyme-svelte';
	import {
		isOpen,
		bgColor,
		linkColor,
		primaryColor,
		secondaryColor,
		textColor,
		menuStyle
	} from './store';
	import Brush from '../svg/icon/Brush.svelte';
	import { browser } from '$app/environment';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	function reset() {
		$menuStyle = undefined;
		$bgColor = '#f7f7fa';
		$linkColor = '#ed1f3a';
		$primaryColor = '#002395';
		$secondaryColor = '#ed1f3a';
		$textColor = '#333333';
	}

	$: if (browser) {
		fetch(`/${$locale}/dev/configuration`, {
			method: 'POST',
			body: JSON.stringify({ primaryColor: $primaryColor })
		});
	}

	function onInput(e: Event) {
		const checked = (<HTMLInputElement>e.target)?.checked;

		$menuStyle = checked ? 'menu-light' : undefined;
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
			}}>{$LL.layout_button_configure_theme()}</Button
		>
	</ResponsiveWrapper>
</span>

<Panel bind:open={$isOpen}>
	<fieldset style:margin="16px">
		<label>
			<input
				type="checkbox"
				style:margin-left="8px"
				style:margin-right="12px"
				on:input={onInput}
				checked={$menuStyle === 'menu-light'}
			/>
			{$LL.global_color_menu_light()}
		</label>
	</fieldset>
	<ColorPicker bind:hex={$primaryColor} isAlpha={false} label={$LL.global_color_primary_label()} />
	<ColorPicker
		bind:hex={$secondaryColor}
		isAlpha={false}
		label={$LL.global_color_secondary_label()}
	/>
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
