<script lang="ts">
	import { handleEvent } from '$lib/index.js';
</script>

<svelte:head>
	<title>Event Handler — umami-svelte</title>
</svelte:head>

<h1>Event Handler</h1>
<h2>handleEvent — Eventos con atributos data-umami-event</h2>

<div class="card">
	<h3>Clicks con handleEvent</h3>
	<p>Usá <code>onclick={handleEvent}</code> con <code>data-umami-event</code> en el elemento.</p>
	<button data-umami-event="handler-click" onclick={handleEvent}>
		data-umami-event="handler-click"
	</button>
	<button data-umami-event="handler-second" data-umami-event-type="secondary" onclick={handleEvent}>
		con data-umami-event-type
	</button>
</div>

<div class="card">
	<h3>onchange en inputs</h3>
	<input
		data-umami-event="handler-input"
		type="text"
		placeholder="Escribí algo..."
		onchange={handleEvent}
	/>
</div>

<div class="card">
	<h3>select</h3>
	<select data-umami-event="handler-select" onchange={handleEvent}>
		<option value="">Seleccioná...</option>
		<option value="opcion-a">Opción A</option>
		<option value="opcion-b">Opción B</option>
		<option value="opcion-c">Opción C</option>
	</select>
</div>

<div class="card">
	<h3>Evento sin data-umami-event (usa id)</h3>
	<button id="handler-fallback-btn" onclick={handleEvent}>id="handler-fallback-btn"</button>
</div>
