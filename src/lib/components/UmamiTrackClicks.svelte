<script lang="ts">
	import { handleEvent } from '$lib/tracker';

	let {
		name,
		children
	}: {
		name: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div data-umami-event={name} onclick={handleEvent} role="button" tabindex="0">
	{@render children?.()}
</div>
