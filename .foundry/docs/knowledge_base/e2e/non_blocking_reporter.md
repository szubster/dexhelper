# Avoid Blocking Playwright Reports

When running E2E tests in automated environments (like CI or AI-driven tasks), the Playwright HTML reporter can block execution if it attempts to automatically open the report in a browser.

## The Problem
By default, the `html` reporter might be configured with `open: 'on-failure'` or `open: 'always'`. In environments without a headful browser or where the agent cannot interact with the launched browser, this blocks the process indefinitely.

## The Fix
In `playwright.config.ts`, explicitly set `open: 'never'` for the HTML reporter:

```typescript
  reporter: [
    ['html', { open: 'never' }],
    // ... other reporters
  ],
```

This ensures `pnpm test:e2e` completes and exits cleanly even on failure, allowing the next task step to proceed.
