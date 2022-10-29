<script lang="ts">
	import Markdown from '$lib/components/atom/Markdown.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.title}</h1>

<Markdown source={data.content} />
