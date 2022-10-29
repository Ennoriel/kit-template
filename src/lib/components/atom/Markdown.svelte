<script lang="ts">
	import Code from '$lib/components/atom/MarkdownCode.svelte';
	import Text from '$lib/components/atom/MarkdownText.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let source: string;
</script>

<SvelteMarkdown {source} renderers={{ html: Text, code: Code }} />
