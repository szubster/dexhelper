import { test as base, expect } from '@playwright/test';

// Use Record<string, never> or similarly to avoid banned types
export const test = base.extend<Record<string, never>>({});

export { expect };
