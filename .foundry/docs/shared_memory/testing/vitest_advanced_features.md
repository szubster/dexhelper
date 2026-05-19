# Advanced Vitest Patterns

## Context & Fixtures (`test.extend`)
Vitest supports a very powerful Playwright-style Extensible Fixtures API (`test.extend`). This is critical when tests require complex, interdependent, or asynchronous setup processes (like file system mocking, save-file extraction, or DB connections).
Instead of traditional `beforeEach`/`afterEach`, you define contextual "fixtures":

```typescript
import { test as baseTest } from 'vitest';

export const saveTest = baseTest.extend<{ rawSave: Uint8Array }>({
  rawSave: async ({ meta }, use) => {
    // Setup Phase: e.g. read file based on meta.name 
    const buffer = await readFileBuffer(meta.name);
    // Use Phase: Provide data to test
    await use(buffer);
    // Teardown Phase runs automatically after test completes
  }
});

// Usage
saveTest('parses Crystal', ({ rawSave }) => {
   expect(rawSave).toBeDefined();
});
```

## Collection Loops (`test.for` & `test.each`)
It is an anti-pattern to loop over `it()` or `test()` with a standard `forEach` due to lack of distinct context injection and potentially harder-to-read logs. 
Use `describe.each`, `test.each`, or Vitest's custom iteration methods:

Using `test.for` (If available in current Vitest version):
```typescript
test.for([
  { input: 1, expected: 2 },
  { input: 2, expected: 3 }
])('processes %input', ({ input, expected }) => {
   expect(fn(input)).toBe(expected);
})
```
This is explicitly helpful for unifying large blocks of repetitive testing, such as running an identical parse validator across multiple instances of file mocks.

## Describe Matrix / Test Suites
When mapping multiple tests against different configurations or setups, combine `describe.each` with `test` blocks to generate nested testing matrixes. It heavily reduces boilerplate.
