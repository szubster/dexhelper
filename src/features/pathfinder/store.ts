import { create } from 'zustand';
import { pokeDB } from '../../db/PokeDB';

export interface PathfinderState {
  targetPokemon: number | null;
  eggMove: number | null;
  availableEggMoves: number[];
  setTargetPokemon: (id: number | null) => Promise<void>;
  setEggMove: (id: number | null) => void;
}

export const usePathfinderStore = create<PathfinderState>((set) => ({
  targetPokemon: null,
  eggMove: null,
  availableEggMoves: [],
  setTargetPokemon: async (id) => {
    let eggMoves: number[] = [];
    if (id !== null) {
      const pokemon = await pokeDB.getPokemon(id);
      if (pokemon?.em) {
        eggMoves = Object.keys(pokemon.em).map(Number);
      }
    }
    set({ targetPokemon: id, availableEggMoves: eggMoves, eggMove: null });
  },
  setEggMove: (id) => set({ eggMove: id }),
}));
