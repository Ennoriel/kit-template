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
</script>

<Seo
	title="SKit - about"
	description="About SKit, learn what you can get with the power of a thoughtful-code approach"
/>

<Text
	title="You are in the right place"
	description="I can help you to bring your MVP to life or create your business class website / app in a matter of days or weeks"
	buttons={[{ label: 'View examples' }, { label: 'Contact me' }]}
	img={AdvancedCustomization}
/>

<Text
	title="The Template"
	description="I use a hand crafted template thought and frequently improved for real world applications. You won't need to pay for the basics: it's all included!"
	buttons={[{ label: 'Learn more' }]}
	img={VisionaryTechnology}
	theme="transparent"
	reverse
/>
<!--
	link to page/section template
		- chyme / chyme-svelte: updates even after a year
-->

<Numbers
	data={[
		{ number: '100+', description: 'hours won with the template' },
		{ number: '10+', description: 'features you can rely on' },
		{ number: '36', description: 'ready to use components' }
	]}
	maxItemLg={3}
/>

<Text
	title="I care about performance"
	description="...and also SEO, mobile interfaces, accessibility, sovereignty.<br/>It's not just an option, it's built in! You'll have all of this without even noticing."
	buttons={[{ label: "See what's included" }]}
	img={WebDevices}
	theme="transparent"
/>
<!-- also eco design -->

<Text title="The tools we use" theme="transparent" />

<Numbers
	data={[
		{
			compo: Svelte,
			number: 'Svelte',
			description: 'the most powerful framework on the market'
		},
		{ compo: Jest, number: 'Jest', description: 'it makes your website safer to build & update' },
		{ compo: MongoDb, number: 'mongoDB', description: 'fast object oriented database' },
		{
			compo: Npm,
			number: 'npm',
			description: '2 home made library: chyme & chyme-svelte'
		},
		{
			compo: S3,
			number: 'S3',
			description: 'fast file storage for image & file upload ready to use'
		}
	]}
	maxItemSm={2}
	maxItemLg={5}
	theme="transparent"
/>

<!--
	tech stack
		- svelte / sveltekit
		- testing: jest / playwright
		- npm libraries
		- S3
		- mongodb
		- github / github actions
	and open to other technologies
-->

<!--
	examples:
		- inkjs
		- trouve ton sport
-->

<Text
	title="Do you want to benefit from my experience?"
	description="6 years full stack developer, I have been working actively to automate & industrialize the way I work to garantee the best application possible quickly."
	buttons={[{ label: 'Contact me' }]}
	img={Freelancer}
	theme="transparent"
/>

<Contact />
