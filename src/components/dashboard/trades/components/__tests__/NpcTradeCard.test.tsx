import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { NpcTradeCard } from '../NpcTradeCard';

describe('NpcTradeCard', () => {
  const mockTrade = {
    receivedId: 122,
    offeredId: 64,
    location: 'Route 2',
    receivedOtName: 'REYLEY',
    nickname: 'MARCEL',
    gen: 1,
  };

  it('renders trade details correctly', async () => {
    await render(<NpcTradeCard trade={mockTrade} status="Available" />);

    // There are multiple "#122" and "#64" strings on the card.
    // Use first() to avoid strict mode violations.
    await expect.element(page.getByText('#122').first()).toBeInTheDocument();
    await expect.element(page.getByText('"MARCEL"')).toBeInTheDocument();
    await expect.element(page.getByText('#64').first()).toBeInTheDocument();
    await expect.element(page.getByText('Route 2')).toBeInTheDocument();
    await expect.element(page.getByText('REYLEY')).toBeInTheDocument();
  });

  it('renders Available status with correct styling', async () => {
    await render(<NpcTradeCard trade={mockTrade} status="Available" />);

    const badge = page.getByText('Available');
    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveClass(/border-zinc-500\/50/);
    await expect.element(badge).toHaveClass(/text-zinc-400/);
  });

  it('renders Claimed status with correct styling', async () => {
    await render(<NpcTradeCard trade={mockTrade} status="Claimed" />);

    const badge = page.getByText('Claimed');
    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveClass(/border-emerald-500\/50/);
    await expect.element(badge).toHaveClass(/text-emerald-400/);
  });

  it('renders Incomplete status with correct styling', async () => {
    await render(<NpcTradeCard trade={mockTrade} status="Incomplete" />);

    const badge = page.getByText('Incomplete');
    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveClass(/border-amber-500\/50/);
    await expect.element(badge).toHaveClass(/text-amber-400/);
  });

  it('renders tactical card styling', async () => {
    await render(<NpcTradeCard trade={mockTrade} status="Available" data-testid="card" />);

    const card = page.getByTestId('card');
    await expect.element(card).toHaveClass(/tactical-card/);
  });
});
