import { usePathfinderStore } from './store';

export const useTargetPokemon = () => usePathfinderStore((state) => state.targetPokemon);
export const useSetTargetPokemon = () => usePathfinderStore((state) => state.setTargetPokemon);

export const useEggMove = () => usePathfinderStore((state) => state.eggMove);
export const useSetEggMove = () => usePathfinderStore((state) => state.setEggMove);

export const useAvailableEggMoves = () => usePathfinderStore((state) => state.availableEggMoves);
