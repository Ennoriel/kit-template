<script>
	import { isOpen } from '$lib/components/configuration/store';
	import AdvancedCustomization from '$lib/components/svg/AdvancedCustomization.svelte';
	import { Button } from 'chyme-svelte';
</script>

<div>
	<AdvancedCustomization maxheight={300} alt="" />

	<section>
		<h1>Start building what matters now</h1>
		<p>
			Don't want to pay for a login workflow for your <strong>MVP</strong> or your
			<strong>business class app/website</strong> ?
		</p>
		<p>
			Good news! I don't like to rebuild it for every client. Instead, I made a template with the 10
			most common features used on the web!
		</p>
		<p>It includes:</p>
		<ul>
			<li>
				<a href="/user/sign-in">registering</a> & <a href="/user/login">authentication</a> with email
				validation
			</li>
			<li>database connexion</li>
			<li>S3 storage for file & image upload</li>
			<li>built with SEO in mind</li>
			<li>accessibility friendly</li>
			<!-- thought mobile first -->
			<!-- performance -->
		</ul>
		<Button as="a" href="/about">Learn more</Button>
		<!-- or contact page? -->
		<Button
			on:click={(e) => {
				e.stopPropagation();
				$isOpen = !$isOpen;
			}}
		>
			Start instant configuration
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
