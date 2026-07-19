<script lang="ts">
	import { trackSession } from '$lib';

	let lastResult = $state('');
	let userId = $state('user-' + Math.random().toString(36).slice(2, 8));
	let sessionEmail = $state('test@example.com');
	let sessionName = $state('Test User');
</script>

<svelte:head>
	<title>Sessions — umami-svelte</title>
</svelte:head>

<h1>Sessions / Identify</h1>
<h2>trackSession — identificar sesiones con unique ID y session data</h2>

{#if lastResult}
	<div class="card" style="border-color:var(--green)">
		Resultado: <code>{lastResult}</code>
	</div>
{/if}

<div class="card" data-umami-event="session-section">
	<h3>Identificar con unique ID</h3>
	<p>Asigná un ID único a la sesión actual. Esto permite contar usuarios únicos.</p>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:end">
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="userId">User ID</label>
			<input id="userId" bind:value={userId} />
		</div>
		<button
			onclick={async () => {
				lastResult = await trackSession(userId);
			}}
		>
			trackSession(id)
		</button>
	</div>
</div>

<div class="card" data-umami-event="session-section">
	<h3>Identificar con ID + Session Data</h3>
	<p>Además del ID, adjuntá datos personalizados a la sesión (email, nombre, etc).</p>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:end">
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="sessUserId">User ID</label>
			<input id="sessUserId" bind:value={userId} />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="sessEmail">email</label>
			<input id="sessEmail" bind:value={sessionEmail} />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="sessName">name</label>
			<input id="sessName" bind:value={sessionName} />
		</div>
	</div>
	<div style="margin-top:0.75rem">
		<button
			onclick={async () => {
				lastResult = await trackSession(userId, { email: sessionEmail, name: sessionName });
			}}
		>
			trackSession(id, &#123; email, name &#125;)
		</button>
	</div>
</div>

<div class="card" data-umami-event="session-section">
	<h3>Session Data sin unique ID</h3>
	<p>Adjuntá datos a la sesión sin asignar un ID.</p>
	<button
		onclick={async () => {
			lastResult = await trackSession({ role: 'visitor', source: 'sessions-test-page' });
		}}
	>
		trackSession(&#123; role, source &#125;)
	</button>
</div>

<pre>
{`
import { trackSession } from '@branrgx/umami-svelte';

// Solo ID
await trackSession('user-123');

// ID + datos
await trackSession('user-123', { email: 'bob@aol.com', name: 'Bob' });

// Solo datos (sin ID)
await trackSession({ role: 'visitor' });
`}
</pre>
