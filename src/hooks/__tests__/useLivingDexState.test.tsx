import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { useLivingDexState } from '../useLivingDexState';

function TestComponent() {
  const state = useLivingDexState();
  return (
    <div>
      <span data-testid="displayLimit">{state.displayLimit}</span>
      <span data-testid="partySetSize">{state.partySet.size}</span>
      <span data-testid="pcSetSize">{state.pcSet.size}</span>
      <span data-testid="shinySpeciesIdsSize">{state.shinySpeciesIds.size}</span>
      <span data-testid="totalSecured">{state.totalSecured}</span>
    </div>
  );
}

describe('useLivingDexState', () => {
  beforeEach(() => {
    useStore.setState({ saveData: null });
  });

  it('returns default state when no save data is present', async () => {
    const screen = await render(<TestComponent />);

    await expect.element(screen.getByTestId('displayLimit')).toHaveTextContent('386');
    await expect.element(screen.getByTestId('partySetSize')).toHaveTextContent('0');
    await expect.element(screen.getByTestId('pcSetSize')).toHaveTextContent('0');
    await expect.element(screen.getByTestId('shinySpeciesIdsSize')).toHaveTextContent('0');
    await expect.element(screen.getByTestId('totalSecured')).toHaveTextContent('0');
  });

  it('calculates secured pokemon from party and PC', async () => {
    useStore.setState({
      saveData: {
        generation: 3,
        party: [1],
        pc: [4, 7],
        partyDetails: [{ speciesId: 1, isShiny: true }],
        pcDetails: [
          { speciesId: 4, isShiny: false },
          { speciesId: 7, isShiny: true },
        ],
      } as unknown as ReturnType<typeof useStore.getState>['saveData'],
    });

    const screen = await render(<TestComponent />);

    await expect.element(screen.getByTestId('displayLimit')).toHaveTextContent('386');
    await expect.element(screen.getByTestId('partySetSize')).toHaveTextContent('1');
    await expect.element(screen.getByTestId('pcSetSize')).toHaveTextContent('2');
    await expect.element(screen.getByTestId('shinySpeciesIdsSize')).toHaveTextContent('2');
    await expect.element(screen.getByTestId('totalSecured')).toHaveTextContent('3');
  });
});
