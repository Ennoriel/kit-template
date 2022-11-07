<script lang="ts">
	import { Button, EmailInput, PasswordInput, Seo } from 'chyme-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Seo
	title="SKit - sign in"
	description="Sign in to SKit, configure your web app, see the power of a thoughtful-code approach"
/>

<form method="post">
	<h1>Signin</h1>

	<EmailInput />
	<PasswordInput />

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}

	<div>
		<Button type="submit">login</Button>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		padding: 48px 24px 0;
		max-width: 350px;
	}
	h1 {
		text-align: center;
		margin-bottom: 16px;
	}
	div {
		text-align: center;
		margin: 16px 0;
	}
</style>
