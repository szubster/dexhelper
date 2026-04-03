import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppProvider, useAppState } from './state';

const TestComponent = () => {
  const { isLivingDex } = useAppState();
  return <div data-testid="is-living-dex">{isLivingDex.toString()}</div>;
};

describe('AppProvider Security Fix', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should handle invalid JSON in localStorage for isLivingDex gracefully', () => {
    // Mock console.error to avoid cluttering the test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Set invalid JSON for isLivingDex
    localStorage.setItem('isLivingDex', 'invalid-json');

    // Attempt to render the AppProvider with invalid JSON in localStorage
    // If the fix is correct, this should not throw an error
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Should fallback to false
    expect(getByTestId('is-living-dex').textContent).toBe('false');

    consoleSpy.mockRestore();
  });

  it('should correctly parse valid JSON for isLivingDex', () => {
    localStorage.setItem('isLivingDex', 'true');

    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(getByTestId('is-living-dex').textContent).toBe('true');
  });
});
