<script lang="ts">
	import './styles.css';
	import Header from './Header.svelte';
	import { UmamiAnalyticsEnv } from '$lib';

	let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<UmamiAnalyticsEnv />

<Header>
	{@render children?.()}
</Header>
