<script lang="ts">
	import { Button, EmailInput, PasswordInput, Seo } from 'chyme-svelte';
	import type { ActionData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';

	export let form: ActionData;
</script>

<Seo title={$LL.sign_in_seo_title()} description={$LL.sign_in_seo_description()} {locales} />

<form method="post">
	<h1>
		{$LL.sign_in_title()}
	</h1>

	<EmailInput label={$LL.global_label_email()} />
	<PasswordInput label={$LL.global_label_password()} />

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}

	<div>
		<Button type="submit">{$LL.sign_in_action_submit()}</Button>
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
