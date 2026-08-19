import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as store from '../../../../store';
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
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 2,
          npcTradeFlags: [true, false, true, false, false, false, false],
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return selector(state);
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
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return selector(state);
    });

    await render(<Gen2NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
