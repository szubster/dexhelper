import { lazy } from 'react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LazyLoadWrapper } from '../LazyLoadWrapper';

// Mock a component that suspends
const SuspendingComponent = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>(() => {
      // Intentionally never resolve for testing the fallback
      // setTimeout(() => resolve({ default: () => <div>Loaded</div> }), 100);
    }),
);

test('renders default tactical skeleton fallback while suspending', async () => {
  const { unmount } = await render(
    <LazyLoadWrapper>
      <SuspendingComponent />
    </LazyLoadWrapper>,
  );

  const fallback = page.getByTestId('tactical-skeleton-fallback');
  await expect.element(fallback).toBeInTheDocument();
  await expect.element(fallback).toHaveClass('tactical-skeleton');
  await expect.element(fallback).toHaveClass('w-full');
  await expect.element(fallback).toHaveClass('h-full');
  await unmount();
});

test('renders custom fallback if provided', async () => {
  const { unmount } = await render(
    <LazyLoadWrapper fallback={<div data-testid="custom-fallback">Custom</div>}>
      <SuspendingComponent />
    </LazyLoadWrapper>,
  );

  const fallback = page.getByTestId('custom-fallback');
  await expect.element(fallback).toBeInTheDocument();
  await unmount();
});

test('accepts custom width and height classes', async () => {
  const { unmount } = await render(
    <LazyLoadWrapper width="w-64" height="h-32">
      <SuspendingComponent />
    </LazyLoadWrapper>,
  );

  const fallback = page.getByTestId('tactical-skeleton-fallback');
  await expect.element(fallback).toHaveClass('w-64');
  await expect.element(fallback).toHaveClass('h-32');
  await unmount();
});
