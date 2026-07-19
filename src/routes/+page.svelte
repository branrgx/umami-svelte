<script lang="ts">
	import { trackPageView, trackEvent } from '$lib';
</script>

<svelte:head>
	<title>umami-svelte — Home</title>
</svelte:head>

<h1>umami-svelte</h1>
<h2>Paquete Svelte 5 para Umami Analytics</h2>

<div class="card">
	<h3>Page View automático</h3>
	<p>
		El <code>UmamiAnalytics</code> en el layout ya trackea esta página. Abrí la consola de red para ver
		los requests.
	</p>
</div>

<div class="card" data-umami-event="home-section">
	<h3>Track manual</h3>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap">
		<button onclick={() => trackPageView()} data-umami-event="track-pageview">
			trackPageView()
		</button>
		<button onclick={() => trackEvent('home-button-click')} data-umami-event="track-event">
			trackEvent('home-button-click')
		</button>
		<button
			onclick={() => trackEvent('home-button-data', { page: 'home', action: 'demo' })}
			data-umami-event="track-event-data"
		>
			trackEvent con data
		</button>
	</div>
</div>

<div class="card" data-umami-event="home-section">
	<h3>Elementos con data-umami-event</h3>
	<p>
		Cualquier elemento con <code>data-umami-event</code> se trackea automáticamente si
		<code>data-auto-track</code> está activo.
	</p>
	<button data-umami-event="home-demo-click">data-umami-event="home-demo-click"</button>
	<button
		data-umami-event="home-demo-extra"
		data-umami-event-page="home"
		data-umami-event-action="demo"
	>
		data-umami-event con atributos extra
	</button>
</div>
