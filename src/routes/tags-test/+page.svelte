<svelte:head>
	<title>Tags — umami-svelte</title>
</svelte:head>

<h1>Tags</h1>
<h2>Múltiples instancias del tracker con distintos tags</h2>

<div class="card" style="border-color:var(--yellow)">
	<h3>Una instancia por pagina</h3>
	<p>
		Umami permite reutilizar el script con distintos <code>data-tag</code> pero en distintas paginas,
		no en la misma. Aca mostramos como se veria la configuración.
	</p>
</div>

<div class="card">
	<h3>Ejemplo: Tag "homepage-layout-a"</h3>
	<p>Usa <code>data-tag</code> para segmentar eventos de distintas versiones de una pagina.</p>
	<button data-umami-event="tag-a-click">Click en layout A</button>
</div>

<div class="card">
	<h3>Ejemplo: Tag "homepage-layout-b"</h3>
	<button data-umami-event="tag-b-click">Click en layout B</button>
</div>

<div class="card">
	<h3>Ejemplo: Tag "landing-v2"</h3>
	<button data-umami-event="tag-landing-click">Click en Landing v2</button>
</div>
