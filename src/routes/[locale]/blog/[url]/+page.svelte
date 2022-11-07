<script lang="ts">
	import Markdown from '$lib/components/atom/Markdown.svelte';
	import { Seo } from 'chyme-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Seo title="SKit - {data.title}" description={data.description} />

<h1>{data.title}</h1>

<Markdown source={data.content} />
