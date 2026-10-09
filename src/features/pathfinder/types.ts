export interface PathfinderChainStep {
  speciesId: number;
  speciesName: string;
  eggGroups: number[];
  learnedMoves?: number[];
  requiredGender?: 'Male' | 'Female' | 'Genderless';
}

export interface PathfinderChainVizProps {
  chain: PathfinderChainStep[];
  targetMoveId?: number | null;
  targetSpeciesId?: number | null;
}
