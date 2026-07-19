type UmamiStatus = undefined | 'mounted' | 'removed' | 'loaded' | 'error';

function safeLocalStorage(): Storage | null {
	try {
		if (
			typeof localStorage !== 'undefined' &&
			typeof localStorage.getItem === 'function' &&
			typeof localStorage.setItem === 'function'
		) {
			return localStorage;
		}
	} catch {
		// salt catch
	}
	return null;
}

const stored = safeLocalStorage()?.getItem('umami') ?? JSON.stringify({ enabled: true });
const initialEnabled = stored ? JSON.parse(stored).enabled : true;

export const umami = $state({
	isEnabled: initialEnabled as boolean,
	status: undefined as UmamiStatus
});

export function setIsEnabled(v: boolean) {
	umami.isEnabled = v;
	safeLocalStorage()?.setItem('umami', JSON.stringify({ enabled: v }));
}

export function setStatus(v: UmamiStatus) {
	umami.status = v;
}
