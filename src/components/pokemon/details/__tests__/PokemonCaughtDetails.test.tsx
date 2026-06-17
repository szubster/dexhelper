import { beforeEach, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../../../store';
import { PokemonCaughtDetails } from '../PokemonCaughtDetails';

vi.mock('../../../../store', () => ({
  useStore: vi.fn<() => void>(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders Time Capsule UI indicator for Gen 2 save if eligible', async () => {
  (useStore as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue(2);

  await render(
    <PokemonCaughtDetails
      yourPokemon={[{ speciesId: 1, storageLocation: 'Party', level: 5, isShiny: false, moves: [1, 2, 3], location: 'TEST' } as any]}
    />,
  );

  await expect.element(page.getByText('TIME CAPSULE READY')).toBeInTheDocument();
});

test('renders Time Capsule error indicator for Gen 2 save if ineligible', async () => {
  (useStore as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue(2);

  await render(
    <PokemonCaughtDetails
      yourPokemon={[{ speciesId: 152, storageLocation: 'Party', level: 5, isShiny: false, moves: [1, 2, 3], location: 'TEST' } as any]}
    />,
  );

  await expect.element(page.getByText('INVALID: Gen 2 Species')).toBeInTheDocument();
});
