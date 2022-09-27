<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

{#if form?.error}
    <p style:background="orange">{form.error}</p>
{/if}

<form action="/user/password-reset" method="post">
    <input type="email" name="email"/>
    <button type="submit">Mot de passe oublié</button>
</form>
