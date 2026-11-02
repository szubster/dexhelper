import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser';
import { useStore } from '../../store';
import { useInGameTrades } from '../useInGameTrades';

function TestComponent() {
  const trades = useInGameTrades();
  return (
    <div data-testid="trades">
      {trades.map((t) => (
        <div key={`${t.offeredId}-${t.receivedId}`} data-testid={`trade-${t.receivedId}`}>
          {t.status}
        </div>
      ))}
    </div>
  );
}

describe('useInGameTrades', () => {
  beforeEach(() => {
    useStore.setState({ saveData: null, manualVersion: null });
  });

  it('computes correct statuses for Gen 1', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([33]), // Nidorino (offeredId for Nidorina trade)
      npcTradeFlags: { 0: false },
    } as unknown as SaveData;
    useStore.setState({ saveData: mockSaveData, manualVersion: null });

    const screen = await render(<TestComponent />);
    await expect.element(screen.getByTestId('trade-30')).toHaveTextContent('Available');
  });

  it('computes Claimed when received pokemon is owned', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([30]), // Nidorina (receivedId)
      npcTradeFlags: { 0: false },
    } as unknown as SaveData;
    useStore.setState({ saveData: mockSaveData, manualVersion: null });

    const screen = await render(<TestComponent />);
    await expect.element(screen.getByTestId('trade-30')).toHaveTextContent('Claimed');
  });

  it('computes Incomplete when neither is owned', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([]),
      npcTradeFlags: { 0: false },
    } as unknown as SaveData;
    useStore.setState({ saveData: mockSaveData, manualVersion: null });

    const screen = await render(<TestComponent />);
    await expect.element(screen.getByTestId('trade-30')).toHaveTextContent('Incomplete');
  });

  it('uses gameVersion override when manualVersion is provided', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'unknown',
      owned: new Set([]),
      npcTradeFlags: {},
    } as unknown as SaveData;
    useStore.setState({ saveData: mockSaveData, manualVersion: 'yellow' });

    const screen = await render(<TestComponent />);
    // Machoke for Cubone trade is in Yellow
    await expect.element(screen.getByTestId('trade-67')).toHaveTextContent('Incomplete');
  });

  it('computes Claimed when npcTradeFlags is true', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([]),
      npcTradeFlags: { 0: true },
    } as unknown as SaveData;
    useStore.setState({ saveData: mockSaveData, manualVersion: null });

    const screen = await render(<TestComponent />);
    await expect.element(screen.getByTestId('trade-30')).toHaveTextContent('Claimed');
  });

  it('computes Claimed when gen3TradeKey is true', async () => {
    const mockSaveData = {
      generation: 3,
      gameVersion: 'emerald',
      owned: new Set([]),
      gen3NPCTrades: { RUSTBORO: true },
    } as unknown as SaveData;
    useStore.setState({ saveData: mockSaveData, manualVersion: null });

    const screen = await render(<TestComponent />);
    await expect.element(screen.getByTestId('trade-273')).toHaveTextContent('Claimed');
  });
});
