import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as emulatorContext from '../../../../contexts/EmulatorContext';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';

vi.mock('../../../../contexts/EmulatorContext', () => ({
  useParsedSaveData: vi.fn<() => SaveData | null>(),
}));

import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type * as store from '../../../../store';
import { Gen2Checklist } from '../Gen2Checklist';

// Mock the store explicitly since we are dealing with useStore
vi.mock('../../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../store')>();
  return {
    ...actual,
    useStore: vi.fn<typeof store.useStore>(),
  };
});

describe('Gen2Checklist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 2 data', async () => {
    // Mock the store to return valid gen 2 save data
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: {
          generation: 2,
          gen2StaticEncounters: {
            sudowoodo: true,
            snorlax: false,
            redGyarados: true,
            hoOh: false,
            lugia: false,
          },
          gen2DailyEvents: {
            mysteryGift: true,
            fridayLapras: false,
            bugCatchingContest: true,
          },
        },
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen2Checklist />);

    await expect.element(page.getByText('STATIC ENCOUNTERS')).toBeInTheDocument();
    await expect.element(page.getByText('SUDOWOODO')).toBeInTheDocument();
    await expect.element(page.getByText('SUDOWOODO')).toHaveClass('line-through');
    await expect.element(page.getByText('SNORLAX')).toBeInTheDocument();
    await expect.element(page.getByText('SNORLAX')).not.toHaveClass('line-through');
    await expect.element(page.getByText('RED GYARADOS')).toBeInTheDocument();
    await expect.element(page.getByText('RED GYARADOS')).toHaveClass('line-through');

    await expect.element(page.getByText('DAILY / WEEKLY EVENTS')).toBeInTheDocument();
    await expect.element(page.getByText('MYSTERY GIFT')).toBeInTheDocument();
    await expect.element(page.getByText('MYSTERY GIFT')).toHaveClass('line-through');
    await expect.element(page.getByText('FRIDAY LAPRAS')).not.toHaveClass('line-through');
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

    await render(<Gen2Checklist />);

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });

  it('does not render if saveData is null', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockImplementation(() => {
      const state = {
        saveData: null,
      };
      return state.saveData as unknown as SaveData;
    });

    await render(<Gen2Checklist />);

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });
});
