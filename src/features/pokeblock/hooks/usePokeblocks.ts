import type { Gen3Pokeblock } from '../../../engine/saveParser/gen3/pokeblock/types';
import { isGen3Save } from '../../../engine/saveParser/parsers/common';
import { useStore } from '../../../store';

/**
 * A custom hook to access the parsed Pokeblock data from the global store.
 * Returns an array of Gen3Pokeblocks if available, or undefined if the data
 * has not been loaded or is not applicable (e.g., non-Gen 3 save file).
 */
export function usePokeblocks(): Gen3Pokeblock[] | undefined {
  const saveData = useStore((state) => state.saveData);
  if (saveData && isGen3Save(saveData)) {
    return saveData.gen3Pokeblocks;
  }
  return undefined;
}
