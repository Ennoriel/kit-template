<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
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
		<Button as="a" href="/{$locale}/blog/create">New page</Button>
	</ButtonGroup>
{/if}

<h1>Articles</h1>

<ul>
	{#each data.articles as article}
		<li>
			<a href="/{$locale}/blog/{article.url}">{article.title}</a>
			{#if data.user}
				, <FormAction action="/{$locale}/blog/{article.url}?/delete">Delete</FormAction>
				, <a href="/{$locale}/blog/{article.url}/edit">update</a>
			{/if}
		</li>
	{/each}
</ul>

<ul>
	<li>
		<a href="/{$locale}/blog/rss.xml">Flux RSS</a>
	</li>
</ul>
