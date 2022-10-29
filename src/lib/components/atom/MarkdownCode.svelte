<script lang="ts">
	import Prism from 'prismjs';
	import 'prism-svelte';

	export let lang: string;
	export let text: string;

	$: highlighted = Prism.highlight(text, Prism.languages.svelte, 'svelte');
</script>

<pre class="language-{lang}"><code>{@html highlighted}</code></pre>
