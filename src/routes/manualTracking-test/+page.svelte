<script lang="ts">
	import { trackPageView, trackEvent, trackEventWithProperties } from '$lib';
	import Counter from '../Counter.svelte';

	let lastResult = $state('');
	let eventCount = $state(0);
	let eventName = $state('my-event');
	let eventDataKey = $state('key');
	let eventDataValue = $state('value');
	let customUrl = $state('');
	let customTitle = $state('');
</script>

<svelte:head>
	<title>Manual Tracking — umami-svelte</title>
</svelte:head>

<h1>Manual Tracking</h1>
<h2>trackPageView, trackEvent, trackEventWithProperties</h2>

{#if lastResult}
	<div class="card" style="border-color:var(--green)">
		Último resultado: <code>{lastResult}</code>
	</div>
{/if}

<div class="card">
	<h3>trackPageView</h3>
	<p>Trackea manualmente una vista de página.</p>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:end">
		<button
			onclick={async () => {
				lastResult = await trackPageView();
			}}
		>
			trackPageView()
		</button>
		<button
			onclick={async () => {
				lastResult = await trackPageView({
					url: customUrl || undefined,
					title: customTitle || undefined
				});
			}}
		>
			trackPageView con props
		</button>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="pv-url">url</label>
			<input id="pv-url" bind:value={customUrl} placeholder="/custom-path" />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="pv-title">title</label>
			<input id="pv-title" bind:value={customTitle} placeholder="Custom Title" />
		</div>
	</div>
</div>

<div class="card">
	<h3>trackEvent</h3>
	<p>Trackea un evento con nombre y datos opcionales.</p>
	<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:end">
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="ev-name">event name</label>
			<input id="ev-name" bind:value={eventName} />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="ev-key">data key</label>
			<input id="ev-key" bind:value={eventDataKey} />
		</div>
		<div>
			<label style="font-size:0.75rem;color:var(--text2)" for="ev-val">data value</label>
			<input id="ev-val" bind:value={eventDataValue} />
		</div>
	</div>
	<div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">
		<button
			onclick={async () => {
				lastResult = await trackEvent(eventName);
				eventCount++;
			}}
		>
			trackEvent(name)
		</button>
		<button
			onclick={async () => {
				lastResult = await trackEvent(eventName, { [eventDataKey]: eventDataValue });
				eventCount++;
			}}
		>
			trackEvent con data
		</button>
		<button
			onclick={async () => {
				lastResult = await trackEvent(eventName, {
					key: eventDataKey,
					value: eventDataValue,
					count: eventCount
				});
				eventCount++;
			}}
		>
			con data múltiple
		</button>
	</div>
	<br /><Counter count={eventCount} />
</div>

<div class="card">
	<h3>trackEventWithProperties</h3>
	<p>
		Trackea un evento sobrescribiendo propiedades como <code>url</code>, <code>title</code>, etc.
	</p>
	<button
		onclick={async () => {
			lastResult = await trackEventWithProperties('manual-custom-url', {
				url: '/manual-test',
				title: 'Manual Test'
			});
		}}
	>
		trackEventWithProperties con url y title custom
	</button>
</div>

<pre>
{`
import { trackPageView, trackEvent } from '@branrgx/umami-svelte';

// Page view
await trackPageView();
await trackPageView({ url: '/custom', title: 'Custom' });

// Event
await trackEvent('signup');
await trackEvent('signup', { method: 'email' });
`}
</pre>
