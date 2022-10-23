<script lang="ts">
    export let theme: 'primary' | 'transparent' = 'primary';
    export let col: number | undefined = undefined;

    $: classColumn = col && `column-${col}`
</script>

<div class="wrapper {theme} {classColumn}">
    <slot/>
</div>

<style>
    .wrapper {
		--box-shadow: 0 0 2px #ddd;
		--bg-color: white;
		--margin: 128px 16px;

		padding: 16px;
		margin: var(--margin);
		border-radius: 16px;
		background-color: var(--bg-color);
		box-shadow: var(--box-shadow);
	}

	.transparent {
		--bg-color: transparent;
		--box-shadow: none;
		--margin: 64px 16px;
	}

	@media (min-width: 768px) {
		.wrapper {
			padding: 32px;
            gap: 32px;
			display: grid;
			justify-items: stretch;
            align-items: center;
		}
		.wrapper.column-2 {
			grid-template-columns: auto auto;
			grid-auto-flow: dense;
			grid-template-areas: 'left right';
		}
	}
</style>