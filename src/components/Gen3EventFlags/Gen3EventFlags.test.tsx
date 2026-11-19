import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Gen3EventFlags } from './Gen3EventFlags';

describe('Gen3EventFlags', () => {
  it('renders correctly with falsy states', async () => {
    await render(<Gen3EventFlags />);
    await expect.element(page.getByText('EON TICKET')).toBeVisible();
    await expect.element(page.getByText('MYSTIC TICKET')).toBeVisible();
    await expect.element(page.getByText('AURORA TICKET')).toBeVisible();
    await expect.element(page.getByText('OLD SEA MAP')).toBeVisible();

    // Verify it renders the zinc variant by default
    await expect.element(page.getByText('EON TICKET')).toHaveClass(/text-zinc-500/);
    await expect.element(page.getByText('MYSTIC TICKET')).toHaveClass(/text-zinc-500/);
    await expect.element(page.getByText('AURORA TICKET')).toHaveClass(/text-zinc-500/);
    await expect.element(page.getByText('OLD SEA MAP')).toHaveClass(/text-zinc-500/);
  });

  it('renders correctly with truthy states', async () => {
    await render(<Gen3EventFlags eonTicket={true} mysticTicket={true} auroraTicket={true} oldSeaMap={true} />);

    // Verify it renders the primary variant when active
    await expect.element(page.getByText('EON TICKET')).toHaveClass(/text-\[var\(--theme-primary\)\]/);
    await expect.element(page.getByText('MYSTIC TICKET')).toHaveClass(/text-\[var\(--theme-primary\)\]/);
    await expect.element(page.getByText('AURORA TICKET')).toHaveClass(/text-\[var\(--theme-primary\)\]/);
    await expect.element(page.getByText('OLD SEA MAP')).toHaveClass(/text-\[var\(--theme-primary\)\]/);
  });

  it('renders correctly according to ADR 008 tactical aesthetics', async () => {
    await render(<Gen3EventFlags />);

    // Verify presence of tactical-badge class indicating ADR 008 aesthetics
    await expect.element(page.getByText('EON TICKET')).toHaveClass(/tactical-badge/);
  });
});
