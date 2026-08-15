// Mix record NPC pokemon payload
export interface Gen3MixedRecordNPCPokemon {
  personality: number;
  species: number;
  heldItem: number;
  moves: number[];
  level: number;
  hpEV: number;
  atkEV: number;
  defEV: number;
  speedEV: number;
  spAtkEV: number;
  spDefEV: number;
}

export interface Gen3MixedRecordNPC {
  trainerName: string;
  trainerGender: number;
  trainerId: number;
  party: Gen3MixedRecordNPCPokemon[];
}
