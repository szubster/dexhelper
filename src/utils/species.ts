export const GEN1_MAX_SPECIES_ID = 151;
export const GEN2_MAX_SPECIES_ID = 251;
export const GEN3_MAX_SPECIES_ID = 386;

export function isGen1Species(pokemonId: number): boolean {
  return pokemonId >= 1 && pokemonId <= GEN1_MAX_SPECIES_ID;
}
