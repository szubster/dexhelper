import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { LotteryProvider, useLottery } from '../LotteryContext';

vi.mock('../../store', () => ({
  useStore: vi.fn<typeof useStore>(),
}));

const TestComponent = () => {
  const { dailyWinningNumber, tier, winningPokemon } = useLottery();
  return (
    <div>
      <div data-testid="winningNumber">{dailyWinningNumber !== null ? dailyWinningNumber : 'null'}</div>
      <div data-testid="tier">{tier}</div>
      <div data-testid="winningPokemon">{winningPokemon ? winningPokemon.speciesId : 'none'}</div>
    </div>
  );
};

describe('LotteryContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render null/0/none when saveData is null', async () => {
    vi.mocked(useStore).mockImplementation((selector) =>
      selector({ saveData: null } as unknown as Parameters<typeof selector>[0]),
    );

    const screen = await render(
      <LotteryProvider>
        <TestComponent />
      </LotteryProvider>,
    );

    await expect.element(screen.getByTestId('winningNumber')).toHaveTextContent('null');
    await expect.element(screen.getByTestId('tier')).toHaveTextContent('0');
    await expect.element(screen.getByTestId('winningPokemon')).toHaveTextContent('none');
  });

  it('should render null/0/none when generation is not 3', async () => {
    vi.mocked(useStore).mockImplementation((selector) =>
      selector({
        saveData: { generation: 2 },
      } as unknown as Parameters<typeof selector>[0]),
    );

    const screen = await render(
      <LotteryProvider>
        <TestComponent />
      </LotteryProvider>,
    );

    await expect.element(screen.getByTestId('winningNumber')).toHaveTextContent('null');
    await expect.element(screen.getByTestId('tier')).toHaveTextContent('0');
    await expect.element(screen.getByTestId('winningPokemon')).toHaveTextContent('none');
  });

  it('should render correctly with Gen 3 data and matching lottery number', async () => {
    // 0x1234 -> 4660 in decimal. Winning number = 4660.
    // We want a perfect match, so OT ID should be 4660 (or higher with Secret ID)
    const saveData = {
      generation: 3,
      gen3LotteryNumber: 4660,
      partyDetails: [
        {
          speciesId: 25,
          otId: 4660, // Perfect match (0 matches Secret ID part since it's 0)
        },
      ],
      pcDetails: [],
    };

    vi.mocked(useStore).mockImplementation((selector) =>
      selector({ saveData } as unknown as Parameters<typeof selector>[0]),
    );

    const screen = await render(
      <LotteryProvider>
        <TestComponent />
      </LotteryProvider>,
    );

    await expect.element(screen.getByTestId('winningNumber')).toHaveTextContent('4660');
    await expect.element(screen.getByTestId('tier')).toHaveTextContent('1');
    await expect.element(screen.getByTestId('winningPokemon')).toHaveTextContent('25');
  });
});
