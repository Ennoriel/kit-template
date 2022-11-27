<script>
	import Numbers from '$lib/components/landing-page/Numbers.svelte';
	import Text from '$lib/components/landing-page/Text.svelte';
	import AdvancedCustomization from '$lib/components/svg/AdvancedCustomization.svelte';
	import Jest from '$lib/components/svg/logo/Jest.svelte';
	import MongoDb from '$lib/components/svg/logo/MongoDb.svelte';
	import Npm from '$lib/components/svg/logo/Npm.svelte';
	import S3 from '$lib/components/svg/logo/S3.svelte';
	import Svelte from '$lib/components/svg/logo/Svelte.svelte';
	import VisionaryTechnology from '$lib/components/svg/VisionaryTechnology.svelte';
	import Freelancer from '$lib/components/svg/Freelancer.svelte';
	import WebDevices from '$lib/components/svg/WebDevices.svelte';
	import Contact from '$lib/components/landing-page/Contact.svelte';
	import { Seo } from 'chyme-svelte';
	import LL, { locale } from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
</script>

<Seo title={$LL.about_seo_title()} description={$LL.about_seo_description()} {locales} />

<Text
	title={$LL.about_bloc1_title()}
	buttons={[
		{ label: $LL.global_action_contact_me() },
		{ label: $LL.global_action_view_examples() }
	]}
	img={AdvancedCustomization}
	center
	tight
>
	{$LL.about_bloc1_description()}
</Text>

<Text
	title={$LL.about_bloc2_title()}
	buttons={[{ label: $LL.global_action_learn_more() }]}
	img={VisionaryTechnology}
	theme="transparent"
	center
	reverse
>
	{$LL.about_bloc2_description()}
</Text>

<Numbers
	data={[
		{ number: '100+', description: $LL.about_bloc3_hours() },
		{ number: '10+', description: $LL.about_bloc3_features() },
		{ number: '36', description: $LL.about_bloc3_components() }
	]}
	maxItemLg={3}
/>

<Text
	title={$LL.about_bloc4_title()}
	buttons={[{ label: $LL.about_bloc4_action_learn_more() }]}
	img={WebDevices}
	theme="transparent"
	center
>
	{@html $LL.about_bloc4_description()}
</Text>

<Text title={$LL.about_bloc5_title()} theme="transparent" />

<Numbers
	data={[
		{ compo: Svelte, number: 'Svelte', description: $LL.about_bloc5_svelte() },
		{ compo: Jest, number: 'Jest', description: $LL.about_bloc5_jest() },
		{ compo: MongoDb, number: 'mongoDB', description: $LL.about_bloc5_mongodb() },
		{ compo: Npm, number: 'npm', description: $LL.about_bloc5_npm() },
		{ compo: S3, number: 'S3', description: $LL.about_bloc5_s3() }
	]}
	maxItemSm={2}
	maxItemLg={5}
	theme="transparent"
/>

<Text
	title={$LL.about_bloc6_title()}
	buttons={[{ label: $LL.global_action_contact_me() }]}
	img={Freelancer}
	theme="transparent"
	center
>
	{$LL.about_bloc6_description()}
</Text>

<Contact />

<a href="/{$locale}/about/thanks" style:text-align="center" style:display="block"
	>{$LL.about_link_to_thanks()}</a
>
