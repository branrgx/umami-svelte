<script lang="ts">
	import { UmamiTrackClicks } from '$lib';
</script>

<svelte:head><title>Track Clicks — umami-svelte</title></svelte:head>

<h1>Track Clicks</h1>
<h2>UmamiTrackClicks — wrapper para trackear clicks en secciones</h2>

<UmamiTrackClicks name="click-tracker-section">
	<div class="card" data-umami-event="click-tracker-card">
		<h3>Sección completa trackeada</h3>
		<p>
			Todo click dentro de este card se trackea como <code>click-tracker-section</code> más el tipo de
			evento.
		</p>
		<div style="display:flex;gap:0.5rem;flex-wrap:wrap">
			<button data-umami-event="click-tracker-btn-1">Botón 1</button>
			<button data-umami-event="click-tracker-btn-2">Botón 2</button>
			<button data-umami-event="click-tracker-btn-3">Botón 3</button>
		</div>
		<br />
		<a href="/" data-umami-event="click-tracker-link">Link a Home</a>
	</div>
</UmamiTrackClicks>

<UmamiTrackClicks name="click-tracker-form">
	<div class="card" data-umami-event="click-tracker-form">
		<h3>Formulario</h3>
		<div style="display:flex;gap:0.5rem">
			<input placeholder="Nombre" data-umami-event="click-tracker-name" />
			<button data-umami-event="click-tracker-submit">Enviar</button>
		</div>
	</div>
</UmamiTrackClicks>

<pre>
{`
<UmamiTrackClicks name="mi-seccion">
  <section data-umami-event="section">
    <button data-umami-event="boton">Click</button>
    <a href="/" data-umami-event="link">Link</a>
  </section>
</UmamiTrackClicks>
`}
</pre>
