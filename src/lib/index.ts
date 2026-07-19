export { default as UmamiAnalytics } from './components/UmamiAnalytics.svelte';
export { default as UmamiAnalyticsEnv } from './components/UmamiAnalyticsEnv.svelte';
export { default as UmamiTrackClicks } from './components/UmamiTrackClicks.svelte';
export {
	trackPageView,
	trackEvent,
	trackEventWithProperties,
	handleEvent,
	trackSession
} from './tracker';
export { umami, setIsEnabled, setStatus } from './stores/umami.svelte';
