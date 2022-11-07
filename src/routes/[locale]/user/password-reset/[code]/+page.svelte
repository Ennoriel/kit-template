<script lang="ts">
	import { Button, PasswordInput } from 'chyme-svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="post">
	<h1>Reset your password</h1>

	<PasswordInput label="New password" />

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}

	<div>
		<Button type="submit">reinitialize password</Button>
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
