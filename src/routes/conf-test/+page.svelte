<script lang="ts">
	import { umami } from '$lib/stores/umami.svelte';
</script>

<svelte:head>
	<title>Config — umami-svelte</title>
</svelte:head>

<h1>Tracker Configuration</h1>
<h2>data-host-url, data-auto-track, data-domains, data-tag, data-exclude-search, etc.</h2>

<div class="card" style="border-color:var(--yellow)">
	<h3>⚠️ Config activa</h3>
	<p>
		Abajo hay ejemplos de distintas configuraciones. Solo una instancia de UmamiAnalytics puede
		estar activa. Esta página usa la config del layout.
	</p>
	<p>Status del script: <code class="badge badge-green">{umami.status}</code></p>
</div>

<div class="card">
	<h3>Configuración: data-auto-track=false</h3>
	<p>Desactivá el tracking automático de page views y eventos. Luego usá las funciones manuales.</p>
	<pre>
		{`
		<UmamiAnalytics
		  websiteID="..."
		  srcURL="https://cloud.umami.is/script.js"
		  configuration={{
			'data-auto-track': false
		  }}
		/>
		`}
	</pre>
</div>

<div class="card">
	<h3>Configuración: data-domains</h3>
	<p>Limitá el tracker a dominios específicos. Útil para evitar tracking en staging.</p>
	<pre>
		{`
		<UmamiAnalytics
		  websiteID="..."
		  srcURL="https://cloud.umami.is/script.js"
		  configuration={{
			'data-domains': 'miproyecto.com,www.miproyecto.com'
		  }}
		/>
		`}
	</pre>
</div>

<div class="card">
	<h3>Configuración: data-host-url</h3>
	<p>Redirigí los datos a otro endpoint de Umami.</p>
	<pre>
		{`
		<UmamiAnalytics
		  websiteID="..."
		  srcURL="https://cloud.umami.is/script.js"
		  configuration={{
			'data-host-url': 'https://ustomia.branrgx.dev'
		  }}
		/>
		`}
	</pre>
</div>

<div class="card">
	<h3>Configuración: data-tag</h3>
	<p>Agregá un tag a todos los eventos de esta instancia del tracker.</p>
	<pre>
		{`
		<UmamiAnalytics
		  websiteID="..."
		  srcURL="https://cloud.umami.is/script.js"
		  configuration={{
			'data-tag': 'homepage-layout-a'
		  }}
		/>
		`}
	</pre>
</div>

<div class="card">
	<h3>Configuración: data-exclude-search + data-cache</h3>
	<pre>
		{`
		<UmamiAnalytics
		  websiteID="..."
		  srcURL="https://cloud.umami.is/script.js"
		  configuration={{
			'data-exclude-search': true,
			'data-cache': true
		  }}
		/>
		`}
	</pre>
</div>

<pre>
{`
Todas las opciones de configuración:

interface UmamiTrackerConfiguration {
  'data-host-url'?: string;
  'data-tag'?: string;
  'data-auto-track'?: boolean;
  'data-exclude-search'?: boolean;
  'data-domains'?: string;
  'data-cache'?: boolean;
}

// También soportadas por Umami (se pasan como attrs al script):
// data-performance, data-exclude-hash, data-do-not-track, data-before-send
// https://umami.is/docs/tracker-configuration
`}
</pre>
