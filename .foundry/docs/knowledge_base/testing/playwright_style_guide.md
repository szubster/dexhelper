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
