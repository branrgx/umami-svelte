<svelte:head>
	<title>Auto Tracking — umami-svelte</title>
</svelte:head>

<h1>Auto Tracking</h1>
<h2>data-auto-track activado por defecto</h2>

<div class="card" data-umami-event="auto-section">
	<h3>Page Views automáticos</h3>
	<p>
		Cada navegación entre páginas se trackea automáticamente. Revisá la pestaña Network y filtrá por <code
			>script.js</code
		>
		o <code>/api/send</code>.
	</p>
	<p>También se enviaron eventos de página al cargar esta página.</p>
</div>

<div class="card">
	<h3>Click tracking automático</h3>
	<p>Estos botones usan <code>data-umami-event</code>. Umami los detecta automáticamente.</p>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap">
		<button data-umami-event="auto-click-1">data-umami-event="auto-click-1"</button>
		<button data-umami-event="auto-click-2">data-umami-event="auto-click-2"</button>
		<button data-umami-event="auto-click-3">data-umami-event="auto-click-3"</button>
		<button data-umami-event="auto-click-4">data-umami-event="auto-click-4"</button>
	</div>
</div>

<div class="card">
	<h3>Con datos extra</h3>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap">
		<button
			data-umami-event="auto-with-data"
			data-umami-event-section="testing"
			data-umami-event-value="42"
		>
			Con data-umami-event-*
		</button>
		<button
			data-umami-event="auto-with-type"
			data-umami-event-type="primary"
			data-umami-event-source="auto-page"
		>
			data-umami-event-type + source
		</button>
	</div>
</div>
