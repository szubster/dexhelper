import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../../../db/PokeDB';
import { useShinyBreedingStore } from '../store';

describe('useShinyBreedingStore security tests', () => {
  beforeEach(() => {
    useShinyBreedingStore.setState({
      parent1: null,
      parent2: null,
      metadataCache: {},
    });
    vi.restoreAllMocks();
  });

  it('safely catches error when pokeDB.getAllPokemon rejects without leaking raw error object (CWE-209)', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(pokeDB, 'getAllPokemon').mockRejectedValue(new Error('Sensitive DB failure details'));

    const { loadMetadataForSpecies } = useShinyBreedingStore.getState();
    await loadMetadataForSpecies([25]);

    expect(errorSpy).toHaveBeenCalledWith(
      'Failed to load metadata for shiny breeding store:',
      'Sensitive DB failure details',
    );
    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining('Failed to load metadata'), expect.any(Error));

    errorSpy.mockRestore();
  });

  it('safely handles non-Error rejection without leaking unknown objects', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(pokeDB, 'getAllPokemon').mockRejectedValue('String error');

    const { loadMetadataForSpecies } = useShinyBreedingStore.getState();
    await loadMetadataForSpecies([25]);

    expect(errorSpy).toHaveBeenCalledWith('Failed to load metadata for shiny breeding store:', 'Unknown error');

    errorSpy.mockRestore();
  });
});
