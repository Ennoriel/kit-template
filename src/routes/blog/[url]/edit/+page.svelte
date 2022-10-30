<script lang="ts">
	import { Button, TextArea, TextInput } from 'chyme-svelte';
	import SvelteMarkdown from 'svelte-markdown';

	let content: string;
</script>

<!-- TODO seo -->

<form method="post">
	<TextInput label="Title" name="title" />
	<TextInput label="Url" name="url" />
	<div class="grid-2">
		<TextArea label="Content" name="content" bind:value={content} />
		<div>
			<p>Preview</p>
			<SvelteMarkdown source={content} />
		</div>
	</div>
	<Button type="submit">Create</Button>
</form>

<style>
	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
</style>
