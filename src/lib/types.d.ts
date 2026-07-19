export interface UmamiTrackerConfiguration {
	'data-host-url'?: string;
	'data-tag'?: string;
	'data-auto-track'?: boolean;
	'data-exclude-search'?: boolean;
	'data-domains'?: string;
	'data-cache'?: boolean;
}

/// <reference types="umami-browser" />
export type Umami = umami.umami;

export type OptionalTrackedProperties = Partial<umami.umami.PageViewProperties>;

export type EventData = umami.EventData;

export type SessionData = umami.EventData;
