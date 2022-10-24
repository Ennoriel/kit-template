<script lang="ts">
    import { Button, TextArea, TextInput } from 'chyme-svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<form method="post">
    <TextInput label="Title" name="title"/>
    <TextInput label="Url" name="url"/>
    <TextArea label="Content" name="content"/>
    <Button type="submit">Create</Button>
</form>