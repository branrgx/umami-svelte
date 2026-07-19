<svelte:head>
	<title>About — umami-svelte</title>
</svelte:head>

<h1>Acerca de</h1>
<h2>@branrgx/umami-svelte</h2>

<div class="card">
	<p>
		Paquete Svelte 5 para integrar <a href="https://umami.is/" target="_blank" rel="noopener"
			>Umami Analytics</a
		> en proyectos SvelteKit.
	</p>
	<p>
		Creado a partir de <code>@lukulent/svelte-umami</code>, adaptado a Svelte 5 runes y con tipos de
		<code>@types/umami-browser</code>.
	</p>
</div>

<div class="card">
	<h3>Componentes</h3>
	<ul>
		<li><code>UmamiAnalytics</code> — Inicialización del tracker</li>
		<li><code>UmamiAnalyticsEnv</code> — Inicialización con env vars</li>
		<li><code>UmamiTrackClicks</code> — Wrapper para trackear clicks</li>
	</ul>
</div>

<div class="card">
	<h3>Funciones</h3>
	<ul>
		<li><code>trackPageView()</code> — Page view manual</li>
		<li><code>trackEvent()</code> — Evento con nombre y data</li>
		<li><code>trackEventWithProperties()</code> — Evento con props custom</li>
		<li><code>trackSession()</code> — Identificar sesión</li>
		<li><code>handleEvent()</code> — Handler para eventos Svelte</li>
	</ul>
</div>
