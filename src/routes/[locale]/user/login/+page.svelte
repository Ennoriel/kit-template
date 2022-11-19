<script lang="ts">
	import { Button, EmailInput, PasswordInput, Seo } from 'chyme-svelte';
	import type { ActionData } from './$types';
	import LL, { locale } from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import { enhance } from '$app/forms';
	import { getNotificationsContext } from 'svelte-notifications';
	import { makeError } from '$lib/utils/notifications';

	const { addNotification } = getNotificationsContext();

	export let form: ActionData;

	$: if (form?.error) {
		addNotification(makeError(form?.error));
	}
</script>

<Seo title={$LL.login_seo_title()} description={$LL.login_seo_description()} {locales} />

<form method="post" use:enhance>
	<h1>
		{$LL.login_title()}
	</h1>

	<EmailInput label={$LL.global_label_email()} />
	<PasswordInput label={$LL.global_label_password()} />

	<div>
		<Button type="submit">{$LL.login_action_submit()}</Button>
	</div>

	<a href="/{$locale}/user/password-reset">{$LL.login_link_lost_password()}</a>
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
