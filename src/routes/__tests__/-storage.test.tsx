import { describe, expect, it, vi } from 'vitest';
import { Route } from '../storage';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    createFileRoute: (path: string) => (config: unknown) => ({
      ...(config as Record<string, unknown> | undefined),
      options: { path },
    }),
  };
});

describe('Storage Route', () => {
  it('defines the route component', () => {
    // @ts-expect-error - mock type bypass
    expect(Route.component).toBeDefined();
  });
});
