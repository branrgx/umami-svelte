<script lang="ts">
	let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<header>
	<a href="/" class="logo">umami-svelte</a>
	<nav>
		<a href="/" data-umami-event="nav-home">Home</a>
		<a href="/autoTracking-test" data-umami-event="nav-auto">Auto Track</a>
		<a href="/manualTracking-test" data-umami-event="nav-manual">Manual</a>
		<a href="/eventHandler-test" data-umami-event="nav-events">Events</a>
		<a href="/trackClicks-test" data-umami-event="nav-clicks">Clicks</a>
		<a href="/conf-test" data-umami-event="nav-conf">Config</a>
		<a href="/sessions-test" data-umami-event="nav-sessions">Sessions</a>
		<a href="/tags-test" data-umami-event="nav-tags">Tags</a>
		<a href="/about" data-umami-event="nav-about">About</a>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
	}
	.logo {
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--accent);
		text-decoration: none;
	}
	nav {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
	}
	nav a {
		color: var(--text2);
		text-decoration: none;
		font-size: 0.8rem;
		padding: 0.3rem 0.5rem;
		border-radius: 4px;
		transition: all 0.15s;
	}
	nav a:hover {
		color: var(--text);
		background: var(--surface2);
	}
	main {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 1.5rem;
	}
</style>
