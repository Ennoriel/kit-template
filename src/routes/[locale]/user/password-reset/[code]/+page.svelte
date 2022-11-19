<script lang="ts">
	import { Button, PasswordInput } from 'chyme-svelte';
	import type { ActionData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { enhance } from '$app/forms';
	import { getNotificationsContext } from 'svelte-notifications';
	import { makeError } from '$lib/utils/notifications';

	const { addNotification } = getNotificationsContext();

	export let form: ActionData;

	$: if (form?.error) {
		addNotification(makeError(form?.error))
	}
</script>

<form method="post" use:enhance>
	<h1>{$LL.password_reset_title_password()}</h1>

	<PasswordInput label={$LL.password_reset_label_new_password()} />

	<div>
		<Button type="submit">{$LL.password_reset_action_new_password()}</Button>
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
