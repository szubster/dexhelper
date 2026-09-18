# Playwright Testing Style Guide

## locator.or() Strict Mode
When waiting for one of two potential elements to load, do not use `Promise.any` with `expect`, and do not wrap `expect` inside a `try...catch` block. Use `locator.or()` to correctly wait for either.

To satisfy strict mode, you must append `.first()` both before and after the `.or()`.

### Code Example
```typescript
// ✅ CORRECT: Appending .first() before and after .or()
await expect(page.locator('.a').first().or(page.locator('.b').first()).first()).toBeVisible();

// ❌ INCORRECT: Missing .first() modifiers (will fail in strict mode if multiple elements match)
await expect(page.locator('.a').or(page.locator('.b'))).toBeVisible();

// ❌ INCORRECT: Using Promise.any or try...catch
try {
  await expect(page.locator('.a')).toBeVisible();
} catch {
  await expect(page.locator('.b')).toBeVisible();
}
```

## isMobile Context
When writing or maintaining E2E tests for navigation elements, always consider that layout and labeling may change based on screen size. The `isMobile` fixture in Playwright should be used to conditionally adjust locators.

### Code Example
```typescript
import { test, expect } from '@playwright/test';

test('navigation menu behaves correctly', async ({ page, isMobile }) => {
  if (isMobile) {
    // On mobile, we might need to open a hamburger menu first
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('navigation')).toBeVisible();
  } else {
    // On desktop, the navigation is always visible
    await expect(page.getByRole('navigation')).toBeVisible();
  }
});
```

## Mock Utilities
To keep E2E tests deterministic and decoupled from complex backend setups (like full DAG resolution), utilize Playwright's network interception to mock API responses and complex systems.

The `mockDagData` utility allows injecting mock DAG definitions for frontend rendering tests.

### Code Example
```typescript
import { test, expect } from '@playwright/test';
import { mockDagData } from '../test-utils';

test('successfully fetches and renders mock DAG data', async ({ page }) => {
  // Inject mock DAG definitions before the page loads
  await mockDagData(page, 'tests/fixtures/dag/mock_dag.json');

  await page.goto('/dashboard');

  // Verify that the UI reflects the mocked state
  const personaBadges = page.getByTestId('persona-badge');
  await expect(personaBadges).toHaveCount(3);
});
```
