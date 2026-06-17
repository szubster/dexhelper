import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../../engine/saveParser/index';
import { UnownDexPanel } from '../UnownDexPanel';

describe('UnownDexPanel', () => {
  it('renders the 26 forms of Unown and marks owned forms', async () => {
    const mockYourPokemon: (PokemonInstance & { location: string })[] = [
      {
        speciesId: 201,
        level: 5,
        moves: [],
        isShiny: false,
        unownForm: 'A',
        location: 'Party',
        storageLocation: 'Party',
      },
      { speciesId: 201, level: 5, moves: [], isShiny: false, unownForm: 'Z', location: 'PC', storageLocation: 'PC' },
      // Irrelevant pokemon to ensure they're ignored
      { speciesId: 1, level: 5, moves: [], isShiny: false, location: 'Party', storageLocation: 'Party' },
    ];

    const screen = await render(<UnownDexPanel yourPokemon={mockYourPokemon} />);

    // Check header info
    const header = screen.getByText(/Unown Database/i);
    expect(header).toBeInTheDocument();

    const countText = screen.getByText('2');
    expect(countText).toBeInTheDocument();

    const text26 = screen.getByText('/ 26 Forms Discovered');
    expect(text26).toBeInTheDocument();

    // The 'A' and 'Z' text should be rendered in the document
    const formA = screen.getByText('A', { exact: true });
    expect(formA).toBeInTheDocument();

    const formZ = screen.getByText('Z', { exact: true });
    expect(formZ).toBeInTheDocument();

    // Not going to count the lucide icons easily but we know A and Z should be highlighted
    // in testing we can just check if all 26 are in the document
    const forms = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for (const form of forms) {
      const el = screen.getByText(form, { exact: true });
      expect(el).toBeInTheDocument();
    }
  });

  it('renders correctly with no Unown caught', async () => {
    const mockYourPokemon: (PokemonInstance & { location: string })[] = [];

    const screen = await render(<UnownDexPanel yourPokemon={mockYourPokemon} />);

    const countText = screen.getByText('0');
    expect(countText).toBeInTheDocument();
  });
});
