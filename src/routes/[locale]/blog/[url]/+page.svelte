<script lang="ts">
	import { HackerNewsLink, LinkedInLink, RedditLink, TwitterLink } from 'svelte-social-links';
	import Markdown from '$lib/components/atom/Markdown.svelte';
	import { Seo } from 'chyme-svelte';
	import type { PageData } from './$types';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	export let data: PageData;
	$: article = data.article;
</script>

<Seo title="SKit - {article.title}" description={article.description} />

<h1>{article.title}</h1>

<Markdown source={article.content} />

<h2>Share this article</h2>

<HackerNewsLink
	url="{PUBLIC_BASE_URL}/{article.url}"
/>
<LinkedInLink
	url="{PUBLIC_BASE_URL}/{article.url}"
/>
<RedditLink
	url="{PUBLIC_BASE_URL}/{article.url}"
/>
<TwitterLink
	title="{article.title} at {PUBLIC_BASE_URL}/{article.url}"
/>
