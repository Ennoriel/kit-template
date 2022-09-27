<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

{#if form?.error}
    <p style:background="orange">{form.error}</p>
{/if}

<form method="post">
    <input type="password" name="password"/>
    <button type="submit">Réinitialiser le mot de passe</button>
</form>