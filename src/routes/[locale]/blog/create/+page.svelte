<script lang="ts">
	import { Button, Seo, TextArea, TextInput } from 'chyme-svelte';
	import Markdown from '$lib/components/atom/Markdown.svelte';

	let content: string;
</script>

<Seo
	title="SKit - new article"
	description="Write your new SKit article, configure your web app, see the power of a thoughtful-code approach"
/>

<form method="post">
	<TextInput label="Title" name="title" />
	<TextInput label="Url" name="url" />
	<TextInput label="Description (meta)" name="description" />
	<div class="grid-2">
		<TextArea label="Content" name="content" bind:value={content} />
		<div>
			<p>Preview</p>
			<Markdown source={content} />
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
