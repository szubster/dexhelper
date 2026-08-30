import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as store from '../../../../store';
import { Gen1Checklist } from '../Gen1Checklist';

// Mock the store explicitly since we are dealing with useStore
vi.mock('../../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../store')>();
  return {
    ...actual,
    useStore: vi.fn<typeof store.useStore>(),
  };
});

describe('Gen1Checklist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 1 data', async () => {
    // Mock the store to return valid gen 1 save data
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 1,
          gen1StaticEncounters: {
            1: true, // Bulbasaur
            4: false, // Charmander
            150: true, // Mewtwo
          },
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - Mocking zustand store state
      return selector(state);
    });

    await render(<Gen1Checklist />);

    await expect.element(page.getByText('STATIC ENCOUNTERS')).toBeInTheDocument();
    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();
    await expect.element(page.getByText('BULBASAUR')).toHaveClass('line-through');
    await expect.element(page.getByText('CHARMANDER')).toBeInTheDocument();
    await expect.element(page.getByText('CHARMANDER')).not.toHaveClass('line-through');
    await expect.element(page.getByText('MEWTWO')).toBeInTheDocument();
    await expect.element(page.getByText('MEWTWO')).toHaveClass('line-through');
  });

  it('does not render for gen 3 data', async () => {
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - Mocking zustand store state
      return selector(state);
    });

    await render(<Gen1Checklist />);

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });

  it('does not render if saveData is null', async () => {
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: null,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - Mocking zustand store state
      return selector(state);
    });

    await render(<Gen1Checklist />);

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });
});
