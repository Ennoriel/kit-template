<script lang="ts">
	import { Button, EmailInput, Seo } from 'chyme-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Seo
	title="SKit - reset password"
	description="Reset your SKit password, configure your web app, see the power of a thoughtful-code approach"
/>

<form method="post">
	<h1>Lost your password?</h1>

	<EmailInput />

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}

	<div>
		<Button type="submit">send me a reset link</Button>
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
