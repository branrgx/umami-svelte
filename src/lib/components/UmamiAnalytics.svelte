<script module lang="ts">
	import { umami, setStatus } from '$lib/stores/umami.svelte';
	umami.status = undefined;
</script>

<script lang="ts">
	import type { UmamiTrackerConfiguration } from '$lib/types.d.ts';
	import { BROWSER } from 'esm-env';

	let {
		websiteID,
		srcURL,
		configuration = {},
		overwrite = false
	}: {
		websiteID: string;
		srcURL: string;
		configuration?: UmamiTrackerConfiguration;
		overwrite?: boolean;
	} = $props();

	$effect(() => {
		if (BROWSER && document.getElementById('umami_analytics_script') !== null) {
			setStatus('mounted');
		}
	});

	$effect(() => {
		return () => {
			if (BROWSER) {
				const script = document.getElementById('umami_analytics_script');
				if (script !== null) {
					script.remove();
					setStatus('removed');
				}
			}
		};
	});

	$effect(() => {
		if (overwrite && BROWSER) {
			const script = document.getElementById('umami_analytics_script');
			if (script !== null) {
				script.remove();
				setStatus('removed');
			}
		}
	});

	let shouldInitialize = $derived([undefined, 'removed', 'error'].includes(umami.status));

	function scriptLoaded() {
		setStatus('loaded');
	}

	function errorHappened() {
		setStatus('error');
	}
</script>

<svelte:head>
	{#if shouldInitialize}
		<script
			async
			defer
			id="umami_analytics_script"
			data-testid="umami_analytics_script"
			src={srcURL}
			data-website-id={websiteID}
			{...configuration}
			onload={scriptLoaded}
			onerror={errorHappened}
		></script>
	{/if}
</svelte:head>
