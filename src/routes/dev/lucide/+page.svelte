<script lang="ts">
	import { icons } from './icons';

	let search: string;
</script>

<input bind:value={search} />

{#each icons.filter(({ name }) => !search || name.indexOf(search) >= 0) as icon}
	<button on:click={() => navigator.clipboard.writeText(icon.name)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			{@html icon.path}
		</svg>
	</button>
{/each}

<style>
	button {
		margin: 8px;
	}
</style>
