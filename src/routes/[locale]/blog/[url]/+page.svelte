<script lang="ts">
	import Markdown from '$lib/components/atom/Markdown.svelte';
	import { Seo } from 'chyme-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: article = data.article;
</script>

<Seo title="SKit - {article.title}" description={article.description} />

<h1>{article.title}</h1>

<Markdown source={article.content} />
