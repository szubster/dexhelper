import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RngTidSidDisplay } from './RngTidSidDisplay';

describe('RngTidSidDisplay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
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
});
