# @branrgx/umami-svelte

Paquete Svelte 5 para integrar [Umami Analytics](https://umami.is/) en proyectos SvelteKit.

Basado en `@lukulent/svelte-umami`, adaptado a Svelte 5 runes y con tipos de `@types/umami-browser`.

## Instalación

```sh
pnpm add @branrgx/umami-svelte
```

## Uso básico

Agregá `UmamiAnalytics` en tu `+layout.svelte` raíz:

```svelte
<script lang="ts">
	import { UmamiAnalytics } from '@branrgx/umami-svelte';
</script>

<UmamiAnalytics
	websiteID="tu-website-id"
	srcURL="https://tu-instancia.umami.is/script.js"
/>
```

O con variables de entorno (`.env`):

```env
PUBLIC_UMAMI_SRC=https://tu-instancia.umami.is/script.js
PUBLIC_UMAMI_WEBSITE_ID=tu-website-id
```

```svelte
<script lang="ts">
	import { UmamiAnalyticsEnv } from '@branrgx/umami-svelte';
</script>

<UmamiAnalyticsEnv />
```

## API

### Componentes

| Componente | Descripción |
|---|---|
| `UmamiAnalytics` | Inicializa el tracker. Props: `websiteID`, `srcURL`, `configuration`, `overwrite` |
| `UmamiAnalyticsEnv` | Igual que UmamiAnalytics pero lee `PUBLIC_UMAMI_SRC` y `PUBLIC_UMAMI_WEBSITE_ID` del entorno |
| `UmamiTrackClicks` | Wrapper para trackear clicks en una sección. Prop: `name` |

### Funciones

| Función | Descripción |
|---|---|
| `trackPageView(props?)` | Trackea una vista de página manualmente |
| `trackEvent(name, data?)` | Trackea un evento con nombre y datos opcionales |
| `trackEventWithProperties(name, props, data?)` | Trackea un evento sobrescribiendo propiedades (url, title, etc.) |
| `trackSession(id\|data, sessionData?)` | Identifica la sesión con un ID único y/o datos |
| `handleEvent` | Event handler para usar con `onclick`, `onchange`, etc. |

### Estado reactivo

```ts
import { umami, setIsEnabled } from '@branrgx/umami-svelte';

umami.status       // 'loaded' | 'mounted' | 'removed' | 'error' | undefined
umami.isEnabled    // boolean
setIsEnabled(false) // persiste en localStorage
```

### Configuración

```svelte
<UmamiAnalytics
	websiteID="..."
	srcURL="..."
	configuration={{
		'data-auto-track': false,
		'data-domains': 'misitio.com',
		'data-host-url': 'https://custom.umami.instance',
		'data-tag': 'landing-v2',
		'data-exclude-search': true,
		'data-cache': true
	}}
/>
```

Ver todas las opciones en [Tracker Configuration](https://umami.is/docs/tracker-configuration).

## Desarrollo

```sh
pnpm dev        # servidor de desarrollo
pnpm check      # type-check
pnpm build      # build de la app demo + paquete
pnpm prepack    # solo build del paquete (src/lib -> dist)
```

Todo en `src/lib` es el paquete. `src/routes` es el playground de prueba.

## Publicar

```sh
pnpm prepack
pnpm publish --access public
```
