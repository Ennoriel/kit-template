<script lang="ts">
	import { Button, EmailInput, PasswordInput, Seo } from 'chyme-svelte';
	import type { ActionData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';

	export let form: ActionData;
</script>

<Seo title={$LL.login_seo_title()} description={$LL.login_seo_description()} {locales} />

<form method="post">
	<h1>
		{$LL.login_title()}
	</h1>

	<EmailInput label={$LL.global_label_email()}/>
	<PasswordInput label={$LL.global_label_password()} />

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}

	<div>
		<Button type="submit">{$LL.login_action_submit()}</Button>
	</div>

	<a href="/user/password-reset">{$LL.login_link_lost_password()}</a>
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
	a {
		text-align: center;
		margin-top: 16px;
		color: grey;
		transition: all 0.2s;
	}
	a:hover {
		color: var(--text-color);
	}
</style>
