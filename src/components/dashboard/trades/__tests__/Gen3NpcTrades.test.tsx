import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as emulatorContext from '../../../../contexts/EmulatorContext';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';

vi.mock('../../../../contexts/EmulatorContext', () => ({
  useParsedSaveData: vi.fn<() => SaveData | null>(),
}));

import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type * as store from '../../../../store';
import { Gen3NpcTrades } from '../Gen3NpcTrades';

vi.mock('../../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../store')>();
  return {
    ...actual,
    useStore: vi.fn<typeof store.useStore>(),
  };
});

describe('Gen3NpcTrades', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 3 FRLG data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: {
          generation: 3,
          gen3NPCTrades: {
            MIMIEN: true,
            ZYNX: false,
          },
        },
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen3NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('MIMIEN')).toBeInTheDocument();
    await expect.element(page.getByText('MIMIEN')).toHaveClass('line-through');
    await expect.element(page.getByText('ZYNX')).toBeInTheDocument();
    await expect.element(page.getByText('ZYNX')).not.toHaveClass('line-through');
  });

  it('renders correctly with gen 3 RSE data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: {
          generation: 3,
          gen3NPCTrades: {
            RUSTBORO: false,
            FORTREE: true,
          },
        },
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen3NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('RUSTBORO')).toBeInTheDocument();
    await expect.element(page.getByText('RUSTBORO')).not.toHaveClass('line-through');
    await expect.element(page.getByText('FORTREE')).toBeInTheDocument();
    await expect.element(page.getByText('FORTREE')).toHaveClass('line-through');
  });

  it('does not render for gen 2 data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: {
          generation: 2,
        },
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen3NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
