// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { reloadPage } from './window';

describe('window utility', () => {
  const originalLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it('should call window.location.reload', () => {
    const reloadMock = vi.fn<() => void>();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    reloadPage();

    expect(reloadMock).toHaveBeenCalledOnce();
  });
});
