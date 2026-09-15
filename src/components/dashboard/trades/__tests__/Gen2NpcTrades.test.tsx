import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as emulatorContext from '../../../../contexts/EmulatorContext';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';

vi.mock('../../../../contexts/EmulatorContext', () => ({
  useParsedSaveData: vi.fn<() => SaveData | null>(),
}));

import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type * as store from '../../../../store';
import { Gen2NpcTrades } from '../Gen2NpcTrades';

vi.mock('../../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../store')>();
  return {
    ...actual,
    useStore: vi.fn<typeof store.useStore>(),
  };
});

describe('Gen2NpcTrades', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 2 data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: {
          generation: 2,
          npcTradeFlags: [true, false, true, false, false, false, false],
        },
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen2NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('ROCKY')).toBeInTheDocument();
    await expect.element(page.getByText('ROCKY')).toHaveClass('line-through');
    await expect.element(page.getByText('MUSCLE')).toBeInTheDocument();
    await expect.element(page.getByText('MUSCLE')).not.toHaveClass('line-through');
    await expect.element(page.getByText('VOLTY')).toBeInTheDocument();
    await expect.element(page.getByText('VOLTY')).toHaveClass('line-through');
  });

  it('does not render for gen 3 data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: {
          generation: 3,
        },
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen2NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
