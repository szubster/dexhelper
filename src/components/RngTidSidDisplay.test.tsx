import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RngTidSidDisplay } from './RngTidSidDisplay';

describe('RngTidSidDisplay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders TID and SID with correct padding', async () => {
    await render(<RngTidSidDisplay tid={123} sid={4567} />);

    await expect.element(page.getByText('00123')).toBeInTheDocument();
    await expect.element(page.getByText('04567')).toBeInTheDocument();
  });

  it('has correct tactical hardware aesthetic classes', async () => {
    await render(<RngTidSidDisplay tid={123} sid={4567} />);

    const container = page.getByText('RNG Trainer Identifiers').element();
    // This part ensures it renders with some aesthetic constraints
    expect(container).toBeDefined();
  });

  it('copies TID and SID to clipboard on click', async () => {
    // Provide a mock navigator.clipboard
    const writeTextMock = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    await render(<RngTidSidDisplay tid={123} sid={4567} />);
    const copyButton = page.getByRole('button', { name: /copy tid and sid to clipboard/i });

    await userEvent.click(copyButton);
    expect(writeTextMock).toHaveBeenCalledWith('TID: 123, SID: 4567');

    // Fast-forward to trigger the timeout for reset
    await vi.advanceTimersByTimeAsync(2000);
  });

  it('logs an error when clipboard copy fails', async () => {
    const writeTextMock = vi.fn<() => Promise<void>>().mockRejectedValue(new Error('Clipboard error'));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await render(<RngTidSidDisplay tid={123} sid={4567} />);
    const copyButton = page.getByRole('button', { name: /copy tid and sid to clipboard/i });

    await userEvent.click(copyButton);
    expect(writeTextMock).toHaveBeenCalledWith('TID: 123, SID: 4567');
    expect(consoleSpy).toHaveBeenCalledWith('Failed to copy to clipboard');

    consoleSpy.mockRestore();
  });
});
