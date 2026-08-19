import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as store from '../../../../store';
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
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
          gen3NPCTrades: {
            MIMIEN: true,
            ZYNX: false,
          },
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return selector(state);
    });

    await render(<Gen3NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('MIMIEN')).toBeInTheDocument();
    await expect.element(page.getByText('MIMIEN')).toHaveClass('line-through');
    await expect.element(page.getByText('ZYNX')).toBeInTheDocument();
    await expect.element(page.getByText('ZYNX')).not.toHaveClass('line-through');
  });

  it('renders correctly with gen 3 RSE data', async () => {
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
          gen3NPCTrades: {
            RUSTBORO: false,
            FORTREE: true,
          },
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return selector(state);
    });

    await render(<Gen3NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('RUSTBORO')).toBeInTheDocument();
    await expect.element(page.getByText('RUSTBORO')).not.toHaveClass('line-through');
    await expect.element(page.getByText('FORTREE')).toBeInTheDocument();
    await expect.element(page.getByText('FORTREE')).toHaveClass('line-through');
  });

  it('does not render for gen 2 data', async () => {
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 2,
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return selector(state);
    });

    await render(<Gen3NpcTrades />);

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
