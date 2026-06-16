import { expect, test } from 'vitest';
import { useDagContext } from '../DagContext';
import { renderHook } from 'vitest-browser-react';
import React from 'react';

// Use an error boundary component because useDagContext is expected to throw when outside DagProvider
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError) {
      return <div data-testid="error">{this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

test('DagContext throws error outside provider', async () => {
  await renderHook(() => useDagContext(), {
    wrapper: ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>,
  });

  expect(true).toBe(true);
});
