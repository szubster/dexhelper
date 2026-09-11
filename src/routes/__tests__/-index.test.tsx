import { describe, expect, it, vi } from 'vitest';
import { Route } from '../index';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as any,
    createFileRoute: (path: string) => (config: any) => ({
      ...config,
      options: { path },
    }),
  };
});

describe('Index Route', () => {
  it('defines the route component', () => {
    expect(Route.component).toBeDefined();
  });
});
