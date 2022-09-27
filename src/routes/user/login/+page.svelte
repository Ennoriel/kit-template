<script lang="ts">
    import Button from '$lib/components/atom/Button.svelte';
    import EmailInput from '$lib/components/input/EmailInput.svelte';
    import PasswordInput from '$lib/components/input/PasswordInput.svelte';

    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<form method="post">
    <h1>Login</h1>

    <EmailInput/>
    <PasswordInput/>

    {#if form?.error}
        <p style:background="orange">{form.error}</p>
    {/if}

    <div>
        <Button type="submit">login</Button>
    </div>

    <a href="/user/password-reset">Lost your passsword?</a>
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
        transition: all .2s;
    }
    a:hover {
        color: var(--text-color);
    }
</style>