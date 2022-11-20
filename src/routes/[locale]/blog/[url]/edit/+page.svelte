<script lang="ts">
	import { languages } from '$i18n/i18n-store';
	import { Button, InputHidden, Radio, TextArea, TextInput } from 'chyme-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	export let data: PageData;
	$: article = data.article;
</script>

<!-- TODO seo -->

<form method="post">
	<InputHidden name="_id" value={article._id} />
	<TextInput label="Title" name="title" bind:value={article.title} />
	<TextInput label="Url" name="url" bind:value={article.url} />
	<TextInput label="Description (meta)" name="description" bind:value={article.description} />
	<Radio
		label="Langue"
		options={Object.entries(languages).map(([value, label]) => ({ label, value }))}
		name="locale"
		bind:value={article.locale}
	/>
	<div class="grid-2">
		<TextArea label="Content" name="content" bind:value={article.content} />
		<div>
			<p>Preview</p>
			<SvelteMarkdown source={article.content} />
		</div>
	</div>
	<Button type="submit">Update</Button>
</form>

<style>
	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
</style>
