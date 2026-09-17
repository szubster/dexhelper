import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmulatorProvider } from '../../../../contexts/EmulatorContext';
import { useEmulatorStore } from '../../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../../engine/saveParser';
import { Gen3NpcTrades } from '../Gen3NpcTrades';

describe('Gen3NpcTrades', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 3 FRLG data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 3,
        gen3NPCTrades: {
          MIMIEN: true,
          ZYNX: false,
        },
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen3NpcTrades />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('MIMIEN')).toBeInTheDocument();
    await expect.element(page.getByText('MIMIEN')).toHaveClass('line-through');
    await expect.element(page.getByText('ZYNX')).toBeInTheDocument();
    await expect.element(page.getByText('ZYNX')).not.toHaveClass('line-through');
  });

  it('renders correctly with gen 3 RSE data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 3,
        gen3NPCTrades: {
          RUSTBORO: false,
          FORTREE: true,
        },
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen3NpcTrades />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('RUSTBORO')).toBeInTheDocument();
    await expect.element(page.getByText('RUSTBORO')).not.toHaveClass('line-through');
    await expect.element(page.getByText('FORTREE')).toBeInTheDocument();
    await expect.element(page.getByText('FORTREE')).toHaveClass('line-through');
  });

  it('does not render for gen 2 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 2,
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen3NpcTrades />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
