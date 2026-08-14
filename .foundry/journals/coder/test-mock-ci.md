# Playwright CI Fetch Mocking

**Date:** 2026-08-14

## Context & Issue
While writing an E2E test for the DAG Dashboard that requires intercepting `**/data/foundry.json` to return a mocked deterministic state (ParsedNode[]), the tests passed successfully locally (using `CI=true pnpm test:e2e`) but consistently failed in the GitHub Actions CI environment. Playwright's `page.route` (`page.route('**/*', ...)`) failed to intercept the API requests, likely due to how Vite's preview server, Service Workers, or native JS fetches interact within that specific CI execution environment.

## Lesson Learned
When standard Playwright `page.route()` fails to intercept native `fetch` API requests reliably in a CI environment using Vite preview, the most robust solution is to bypass Playwright's network proxying by injecting a script directly into the browser context.

Using `await page.addInitScript()` to override the global `window.fetch` function directly intercepts the request within the JavaScript sandbox before it ever reaches the network layer or the Vite dev/preview server.

**Example implementation:**
```typescript
await page.addInitScript((threshold) => {
  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    let url = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : input?.url || '');
    if (url.includes('foundry.json')) {
      return new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return originalFetch(input, init);
  };
}, MAX_REJECTION_THRESHOLD);
```
This approach guarantees interception and resolves timeout flakes in CI caused by missed API overrides.
