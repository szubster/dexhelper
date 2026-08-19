import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ClearStorageButton } from '../ClearStorageButton';

describe('ClearStorageButton', () => {
  it('renders initial state correctly', async () => {
    const onClear = vi.fn<() => void>();
    await render(<ClearStorageButton onClear={onClear} />);

    await expect.element(page.getByText(/SYS.PURGE/)).toBeInTheDocument();
  });

  it('shows confirmation state when clicked', async () => {
    const onClear = vi.fn<() => void>();
    await render(<ClearStorageButton onClear={onClear} />);

    await page.getByText(/SYS.PURGE/).click();

    await expect.element(page.getByText(/CONFIRM.PURGE/)).toBeInTheDocument();
    await expect.element(page.getByText(/ABORT/)).toBeInTheDocument();
  });

  it('calls onClear when confirmation is clicked', async () => {
    const onClear = vi.fn<() => void>();
    await render(<ClearStorageButton onClear={onClear} />);

    await page.getByText(/SYS.PURGE/).click();
    await page.getByText(/CONFIRM.PURGE/).click();

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('returns to initial state when abort is clicked', async () => {
    const onClear = vi.fn<() => void>();
    await render(<ClearStorageButton onClear={onClear} />);

    await page.getByText(/SYS.PURGE/).click();
    await page.getByText(/ABORT/).click();

    await expect.element(page.getByText(/SYS.PURGE/)).toBeInTheDocument();
  });
});
