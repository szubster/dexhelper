import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { NpcTradeEntry } from '../../../../../engine/data/gen1/assistantData';
import type { TradeStatus } from '../NpcTradeCard';
import { NpcTradeList } from '../NpcTradeList';

describe('NpcTradeList', () => {
  const mockTrades: { trade: NpcTradeEntry; status: TradeStatus }[] = [
    {
      trade: {
        receivedId: 122,
        offeredId: 64,
        location: 'Route 2',
        receivedOtName: 'REYLEY',
        nickname: 'MARCEL',
        gen: 1,
      },
      status: 'Available',
    },
    {
      trade: {
        receivedId: 83,
        offeredId: 21,
        location: 'Route 5',
        receivedOtName: 'DON',
        nickname: 'CHIKY',
        gen: 1,
      },
      status: 'Claimed',
    },
  ];

  it('renders a list of trades', async () => {
    await render(<NpcTradeList trades={mockTrades} generation={1} />);

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('SYS.GEN1_IN_GAME_TRADES')).toBeInTheDocument();

    // There are multiple "#122" and "#83" strings in the DOM (e.g. title + description)
    // Use first() to avoid strict mode violations.
    await expect.element(page.getByText('#122').first()).toBeInTheDocument();
    await expect.element(page.getByText('"MARCEL"')).toBeInTheDocument();
    await expect.element(page.getByText('Available')).toBeInTheDocument();

    await expect.element(page.getByText('#83').first()).toBeInTheDocument();
    await expect.element(page.getByText('"CHIKY"')).toBeInTheDocument();
    await expect.element(page.getByText('Claimed')).toBeInTheDocument();
  });

  it('renders nothing when trades array is empty', async () => {
    await render(<NpcTradeList trades={[]} generation={1} />);

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
