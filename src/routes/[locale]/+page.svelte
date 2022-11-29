<script>
	import { Seo } from 'chyme-svelte';
	import AdvancedCustomization from '$lib/components/svg/AdvancedCustomization.svelte';
	import LL from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import Text from '$lib/components/landing-page/Text.svelte';
</script>

<Seo title={$LL.global_seo_title()} description={$LL.global_seo_description()} {locales} />

<Text
	title={$LL.home_title()}
	header="h1"
	buttons={[
		{ label: $LL.global_action_contact_me() },
		{ label: $LL.global_action_view_examples() }
	]}
	img={AdvancedCustomization}
	theme="transparent"
	tight
>
	<div>
		<p>{$LL.home_text_1()}</p>
		<p>{$LL.home_text_2()}</p>
		<ul>
			<li>{$LL.home_feature_1()}</li>
			<li>{$LL.home_feature_2()}</li>
			<li>{$LL.home_feature_3()}</li>
			<li>{$LL.home_feature_4()}</li>
			<li>{$LL.home_feature_5()}</li>
		</ul>
	</div>
</Text>
