import { z } from 'zod';

export const Gen3MixedRecordNPCPokemonSchema = z.object({
  personality: z.number(),
  species: z.number(),
  heldItem: z.number(),
  moves: z.array(z.number()),
  level: z.number(),
  hpEV: z.number(),
  atkEV: z.number(),
  defEV: z.number(),
  speedEV: z.number(),
  spAtkEV: z.number(),
  spDefEV: z.number(),
});

export const Gen3MixedRecordNPCSchema = z.object({
  trainerName: z.string(),
  trainerGender: z.number().optional(),
  trainerId: z.number(),
  party: z.array(Gen3MixedRecordNPCPokemonSchema),
});

export type Gen3MixedRecordNPCPokemon = z.infer<typeof Gen3MixedRecordNPCPokemonSchema>;
export type Gen3MixedRecordNPC = z.infer<typeof Gen3MixedRecordNPCSchema>;
