<script lang="ts">
	import { trackEvent, trackEventWithProperties } from '$lib/index.js';

	let lastResult = $state('');
	let customName = $state('custom-event');
	let customKey = $state('key');
	let customValue = $state('value');
	let bigPayload = $state(Array.from({ length: 50 }, (_, i) => `item-${i}`).join(', '));
</script>

<svelte:head><title>Event Data — umami-svelte</title></svelte:head>

<h1>Event Data</h1>
<h2>Datos en eventos, limites, timestamps, atributos data-umami-event-*</h2>

{#if lastResult}
	<div class="card" style="border-color:var(--green)">
		Resultado: <code>{lastResult}</code>
	</div>
{/if}

<div class="card">
	<h3>data-umami-event con atributos extra</h3>
	<p>
		Umami recolecta automaticamente los atributos <code>data-umami-event-*</code> como datos del evento.
	</p>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap">
		<button
			data-umami-event="Signup button"
			data-umami-event-email="bob@aol.com"
			data-umami-event-id="123"
		>
			data-umami-event="Signup button" + email + id
		</button>
		<button
			data-umami-event="Purchase"
			data-umami-event-product="Svelte Book"
			data-umami-event-price="29.99"
			data-umami-event-currency="USD"
		>
			Compra con producto, precio, moneda
		</button>
		<button
			data-umami-event="Form submit"
			data-umami-event-form="contact"
			data-umami-event-status="success"
			data-umami-event-duration="342"
		>
			Form submit con metadatos
		</button>
	</div>
</div>

<div class="card">
	<h3>trackEvent con Event Data</h3>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:end">
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="ed-name">Event name</label>
			<input id="ed-name" bind:value={customName} />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="ed-key">Key</label>
			<input id="ed-key" bind:value={customKey} />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="ed-val">Value</label>
			<input id="ed-val" bind:value={customValue} />
		</div>
	</div>
	<div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">
		<button
			onclick={async () => {
				lastResult = await trackEvent(customName, { [customKey]: customValue });
			}}
		>
			trackEvent con &#123; key: value &#125;
		</button>
		<button
			onclick={async () => {
				lastResult = await trackEvent(customName, { string: 'text', number: 42, boolean: true });
			}}
		>
			Multiples tipos
		</button>
		<button
			onclick={async () => {
				lastResult = await trackEvent(customName, {
					tags: ['a', 'b', 'c'],
					meta: { source: 'test' }
				});
			}}
		>
			Arrays y objetos
		</button>
	</div>
</div>

<div class="card" style="border-color:var(--yellow)">
	<h3>Limites de Event Data</h3>
	<ul>
		<li>Numeros: precision maxima de 4 decimales</li>
		<li>Strings: longitud maxima de 500 caracteres</li>
		<li>Arrays: convertidos a string, max 500 caracteres</li>
		<li>Objetos: max 50 propiedades (los arrays cuentan como 1)</li>
		<li>Nombres de evento: truncados a 50 caracteres</li>
	</ul>
	<button
		onclick={async () => {
			lastResult = await trackEvent(
				'event-with-long-name-that-will-get-truncated-by-umami-at-50-characters',
				{ ok: true }
			);
		}}
	>
		Nombre truncado (&gt;50 chars)
	</button>
	<button
		onclick={async () => {
			lastResult = await trackEvent('precision-test', { pi: 3.1415926535 });
		}}
	>
		Numeros con precision (pi truncado)
	</button>
	<button
		onclick={async () => {
			lastResult = await trackEvent('big-string', { data: 'x'.repeat(600) });
		}}
	>
		String &gt; 500 chars (truncado)
	</button>
</div>

<div class="card" style="border-color:var(--green)">
	<h3>Overriding Event Timestamps</h3>
	<p>
		Umami asigna automaticamente un timestamp a cada evento. Si tenes tu propio timestamp (ej. del
		servidor), podes sobrescribirlo trackeando con propiedades.
	</p>
	<button
		onclick={async () => {
			lastResult = await trackEventWithProperties('timestamped-event', {
				url: '/data-test?ts=' + Date.now()
			});
		}}
	>
		trackEventWithProperties con timestamp custom
	</button>
	<p style="font-size:0.8rem;color:var(--text2)">
		Nota: Umami no expone una propiedad directa de timestamp en el tracker. La forma de
		"sobrescribir" es pasar datos contextuales como <code>url</code> o <code>title</code>.
	</p>
</div>

<div class="card">
	<h3>Distinct IDs con trackSession</h3>
	<p>
		Umami permite identificar sesiones con <code>umami.identify(&#123; id: '...' &#125;)</code>.
	</p>
	<button
		onclick={async () => {
			const { trackSession } = await import('$lib/index.js');
			lastResult = await trackSession({ id: 'bob@aol.com' });
		}}
	>
		identify(&#123; id: 'bob@aol.com' &#125;)
	</button>
</div>
