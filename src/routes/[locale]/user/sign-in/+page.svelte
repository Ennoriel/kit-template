<script lang="ts">
	import { Button, EmailInput, PasswordInput, Seo } from 'chyme-svelte';
	import type { ActionData } from './$types';
	import LL from '$i18n/i18n-svelte';
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

<Seo title={$LL.sign_in_seo_title()} description={$LL.sign_in_seo_description()} {locales} />

<form method="post" use:enhance>
	<h1>
		{$LL.sign_in_title()}
	</h1>

	<EmailInput label={$LL.global_label_email()} />
	<PasswordInput label={$LL.global_label_password()} />

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
