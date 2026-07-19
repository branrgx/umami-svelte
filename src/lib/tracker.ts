/// <reference types="umami-browser" />
import type { Umami, UmamiTrackerConfiguration } from './types.d.ts';
import type { EventData, SessionData } from './types.d.ts';
import { umami as umamiStore } from './stores/umami.svelte';
import { BROWSER } from 'esm-env';

export async function trackPageView(
	properties?: Partial<umami.PageViewProperties>
): Promise<string> {
	if (!BROWSER) return Promise.resolve('');
	if ([undefined, 'error', 'removed'].includes(umamiStore.status))
		return Promise.resolve('Umami not found.');

	return waitForUmami().then(async (t) => {
		if (properties) {
			return t
				.track((props: umami.PageViewProperties) => ({
					...props,
					...properties
				}))
				.then(() => 'ok');
		} else {
			return t.track().then(() => 'ok');
		}
	});
}

async function waitForUmami(): Promise<Umami> {
	let count = 50;
	while (typeof globalThis.umami === 'undefined') {
		if ([undefined, 'error', 'removed'].includes(umamiStore.status) || count <= 0) {
			return {
				track: () => Promise.resolve(),
				identify: () => Promise.resolve()
			};
		}
		await new Promise((resolve) => setTimeout(resolve, 100));
		count--;
	}
	return globalThis.umami;
}

export async function trackEvent(eventName: string, eventData?: EventData): Promise<string> {
	if (!BROWSER) return Promise.resolve('');
	if ([undefined, 'error', 'removed'].includes(umamiStore.status))
		return Promise.resolve('Umami not found.');

	return waitForUmami().then(async (t) => {
		if (eventData) {
			return t.track(eventName, eventData).then(() => 'ok');
		} else {
			return t.track(eventName).then(() => 'ok');
		}
	});
}

export async function trackEventWithProperties(
	eventName: string,
	properties: Partial<umami.PageViewProperties>,
	eventData?: EventData
): Promise<string> {
	if (!BROWSER) return Promise.resolve('');
	if ([undefined, 'error', 'removed'].includes(umamiStore.status))
		return Promise.resolve('Umami not found.');

	return waitForUmami().then(async (t) => {
		if (eventData) {
			return t
				.track((props: umami.PageViewProperties) => ({
					...props,
					...properties,
					name: eventName,
					data: eventData
				}))
				.then(() => 'ok');
		} else {
			return t
				.track((props: umami.PageViewProperties) => ({
					...props,
					...properties,
					name: eventName
				}))
				.then(() => 'ok');
		}
	});
}

export async function trackSession(
	uniqueIdOrSessionData: string | SessionData,
	sessionData?: SessionData
): Promise<string> {
	if (!BROWSER) return Promise.resolve('');
	if ([undefined, 'error', 'removed'].includes(umamiStore.status))
		return Promise.resolve('Umami not found.');
	return waitForUmami().then(async (t) => {
		if (typeof uniqueIdOrSessionData === 'string') {
			if (sessionData) {
				return t.identify(uniqueIdOrSessionData, sessionData).then(() => 'ok');
			} else {
				return t.identify(uniqueIdOrSessionData).then(() => 'ok');
			}
		} else {
			return t.identify(uniqueIdOrSessionData).then(() => 'ok');
		}
	});
}

const SCRIPT_ID = 'umami_analytics_script';

async function registerUmamiScript(
	websiteID: string,
	srcURL: string = 'https://eu.umami.is/script.js'
) {
	return new Promise((resolve, reject) => {
		const head = document.head || document.getElementsByTagName('head')[0];
		const script = document.createElement('script');
		script.id = SCRIPT_ID;
		script.async = true;
		script.defer = true;
		script.setAttribute('data-website-id', websiteID);
		script.setAttribute('data-testid', SCRIPT_ID);
		script.src = srcURL;
		head.appendChild(script);
		script.onload = resolve;
		script.onerror = reject;
	});
}

export async function registerUmami(
	websiteID: string,
	srcURL: string,
	configuration: UmamiTrackerConfiguration
) {
	if (!BROWSER || window.document.getElementById(SCRIPT_ID)) return;
	try {
		await registerUmamiScript(websiteID, srcURL);
		const umamiScript = document.getElementById(SCRIPT_ID);
		if (umamiScript) {
			setScriptSettingsProps(umamiScript, configuration);
		} else {
			console.error('umami script not found');
		}
	} catch {
		console.error('umami failure');
		const s = window.document.getElementById(SCRIPT_ID);
		if (s) s.remove();
	}
}

function setScriptSettingsProps(scriptElem: HTMLElement, config: UmamiTrackerConfiguration) {
	if (config['data-host-url']) scriptElem.setAttribute('data-host-url', config['data-host-url']);
	if (config['data-auto-track'] !== undefined && !config['data-auto-track'])
		scriptElem.setAttribute('data-auto-track', 'false');
	if (config['data-cache']) scriptElem.setAttribute('data-cache', 'true');
	if (config['data-domains']) scriptElem.setAttribute('data-domains', config['data-domains']);
	if (config['data-exclude-search']) scriptElem.setAttribute('data-exclude-search', 'true');
	if (config['data-tag']) scriptElem.setAttribute('data-tag', config['data-tag']);
}

export async function handleEvent(e: Event & { currentTarget: HTMLElement }) {
	const targetUmamiId = (e.target as Element)?.getAttribute('data-umami-event');
	const currentTargetUmamiId = e.currentTarget?.getAttribute('data-umami-event');
	const targetId = (e.target as Element)?.getAttribute('id');
	const currentTargetId = e.currentTarget?.getAttribute('id');

	await trackEvent(
		`${targetUmamiId ?? currentTargetUmamiId ?? targetId ?? currentTargetId} ${e.type}`,
		e as unknown as EventData
	);
}
