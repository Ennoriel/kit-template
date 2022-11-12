<script>
	import { Button, Seo } from 'chyme-svelte';
	import { isOpen } from '$lib/components/configuration/store';
	import AdvancedCustomization from '$lib/components/svg/AdvancedCustomization.svelte';
	import LL from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import { locale } from '$i18n/i18n-svelte';
</script>

<Seo title={$LL.global_seo_title()} description={$LL.global_seo_description()} {locales} />

<div>
	<AdvancedCustomization maxheight={300} alt="" />

	<section>
		<h1>{$LL.home_title()}</h1>
		<p>{@html $LL.home_text_1()}</p>
		<p>{@html $LL.home_text_2()}</p>
		<p>{@html $LL.home_text_3()}</p>
		<ul>
			<li>{@html $LL.home_feature_1()}</li>
			<li>{@html $LL.home_feature_2()}</li>
			<li>{@html $LL.home_feature_3()}</li>
			<li>{@html $LL.home_feature_4()}</li>
			<li>{@html $LL.home_feature_5()}</li>
		</ul>
		<Button as="a" href="/{$locale}/about">{$LL.global_action_learn_more()}</Button>
		<Button
			on:click={(e) => {
				e.stopPropagation();
				$isOpen = !$isOpen;
			}}
		>
			{$LL.home_action_configuration()}
		</Button>
	</section>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
	}
	@media (min-width: 768px) {
		div {
			flex-direction: row;
			gap: 64px;
			max-width: 800px;
			margin: auto;
		}
	}
</style>
