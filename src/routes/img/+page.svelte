<script lang="ts">
	import { FileForm, FormAction, TextInput } from 'chyme-svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<!-- TODO seo -->

{#if data.user}
	<FileForm csrf={data.csrf}>
		<TextInput label="Title" name="title" />
	</FileForm>

	{#if form?.error}
		<p style:background="orange">{form.error}</p>
	{/if}
{/if}

{#each data.images as image}
	<img src="/img/{image.path}" alt={image.title} />
	<FormAction action="/img/{image.path}?/delete" method="POST">delete</FormAction>
{/each}
