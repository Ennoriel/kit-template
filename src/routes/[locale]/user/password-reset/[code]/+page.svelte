<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { Button, PasswordInput } from 'chyme-svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="post">
	<h1>{$LL.password_reset_title_password()}</h1>

	<PasswordInput label="{$LL.password_reset_label_new_password()}" />

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}

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
