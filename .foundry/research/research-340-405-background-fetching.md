---
id: research-340-405-background-fetching
type: RESEARCH
title: Investigate background fetching and preloading for msgpack files
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-08'
updated_at: '2026-08-10'
depends_on: []
jules_session_id: '17140263401140651897'
parent: prd-136-340-split-bundles-and-data
tags:
  - performance
  - preloading
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Background Fetching and Preloading

## Context
As part of PRD 136-340 to split bundles and data by game generation, we also want to explore ways to pre-fetch or background fetch the generation-specific msgpack files and assets. This ensures that while initial load is fast, subsequent data is available seamlessly without blocking the main thread or causing noticeable delays when a user navigates to a new generation.

## Objectives
- Investigate the use of `defer` in script tags.
- Explore resource hints (like `<link rel="prefetch">` or `<link rel="preload">`) to hint the browser about msgpack files.
- Document state-of-the-art patterns for background fetching large static data payloads in modern web applications.
- Produce a recommendation on the best approach to integrate into the DexHelper architecture.

## Acceptance Criteria
- [x] Document findings and recommendations in this node.

## Findings and Recommendations

Based on the objectives and the goals outlined in the [Bundle and Data Splitting Strategy](.foundry/archive/docs/adrs/adr-117-029-bundle-splitting-strategy.md), here are the findings and recommendations for background fetching and preloading of `msgpack` files:

### 1. Resource Hints (`<link rel="preload">` and `<link rel="prefetch">`)
*   **`<link rel="preload">`**: Use this for resources that are needed for the *current* page load immediately. Since `pokedata-core.msgpack` is critical for initial app load, it should be preloaded to ensure it's fetched as early as possible without blocking the DOM parser.
*   **`<link rel="prefetch">`**: Use this for resources needed for *future* navigations. This is ideal for generation-specific data (e.g., `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, `pokedata-gen3.msgpack`). The browser will fetch these in the background during idle time, ensuring they are available seamlessly when a user switches generations or uploads a specific save file.

### 2. Service Workers (Background Fetch API)
For robust offline support and caching of large static payloads like the extension bundles (`pokedata-gen{N}.msgpack`), Service Workers are highly recommended.
*   **Cache API**: Service Workers can intercept network requests for `msgpack` files and serve them from the Cache Storage if available.
*   **Background Sync**: While the Background Fetch API allows for downloading large files in the background even if the user closes the app, it might be overkill for our payload sizes (which are relatively small compared to movies or podcasts). Standard Service Worker caching combined with `prefetch` is usually sufficient.

### 3. Deferring Scripts
*   **`defer` attribute**: Use `defer` on all non-critical `<script>` tags. This ensures that script execution happens after the document has been parsed, unblocking the initial render. This aligns well with the lazy loading of UI components and engine code via dynamic `import()` and `React.lazy()` as specified in the ADR.

### Recommendation for DexHelper Architecture
1.  **Core Preload**: Inject `<link rel="preload" href="pokedata-core.msgpack" as="fetch" crossorigin="anonymous">` into the `index.html` to prioritize the core data payload.
2.  **Idle Prefetching**: Implement logic (e.g., using `requestIdleCallback` or a React `useEffect` with low priority) to dynamically inject `<link rel="prefetch">` tags for the `pokedata-gen{N}.msgpack` files after the initial core load is complete and the application is idle.
3.  **Service Worker Caching**: Enhance the existing Service Worker (or implement one) to cache all `.msgpack` requests using a Cache-First strategy to guarantee instant availability on subsequent visits and offline usage.


### 4. Vite Plugins Integration
*   To streamline this process and ensure it integrates well with our build pipeline, this background fetching logic should be implemented as a Vite plugin.
*   A custom Vite plugin can automatically analyze the output chunks during the build process and dynamically inject the necessary `<link rel="preload">` and `<link rel="prefetch">` tags into the generated `index.html`.
*   This approach avoids manual HTML manipulation and keeps the preloading logic tightly coupled with the actual generated assets.
