<script lang="ts">
	import { Button, ButtonGroup, FormAction, Seo } from 'chyme-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Seo
	title="SKit - blog articles"
	description="The latest articles around best practices in web application development."
/>

{#if data.user}
	<ButtonGroup>
		<Button as="a" href="/blog/create">New page</Button>
	</ButtonGroup>
{/if}

<h1>Articles</h1>

<ul>
	{#each data.articles as article}
		<li>
			<a href="/blog/{article.url}">{article.title}</a>
			{#if data.user}
				, <FormAction action="/blog/{article.url}?/delete">Delete</FormAction>
			{/if}
		</li>
	{/each}
</ul>
