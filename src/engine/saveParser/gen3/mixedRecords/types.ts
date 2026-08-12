import { z } from 'zod';

export const Gen3MixedRecordPokemonSchema = z.object({
  personality: z.number().int().min(0),
  species: z.number().int().min(0),
  heldItem: z.number().int().min(0),
  moves: z.tuple([z.number().int().min(0), z.number().int().min(0), z.number().int().min(0), z.number().int().min(0)]),
  level: z.number().int().min(1).max(100),
  evs: z.number().int().min(0).max(255),
});

export type Gen3MixedRecordPokemon = z.infer<typeof Gen3MixedRecordPokemonSchema>;

export const Gen3MixedRecordTrainerSchema = z.object({
  secretBaseId: z.number().int().min(0),
  trainerName: z.string(),
  trainerId: z.number().int().min(0),
  gender: z.enum(['M', 'F', 'UNKNOWN']),
  battledOwnerToday: z.boolean(),
  language: z.number().int().optional(),
  party: z.array(Gen3MixedRecordPokemonSchema).max(6),
});

export type Gen3MixedRecordTrainer = z.infer<typeof Gen3MixedRecordTrainerSchema>;

// Global Offset and Structure Array
export const SECRET_BASES_COUNT = 20;
export const SECRET_BASE_RECORD_SIZE = 160;

export const RS_SECRET_BASE_ARRAY_OFFSET = 0x1a08;
export const EMERALD_SECRET_BASE_ARRAY_OFFSET = 0x1a9c;

// Secret Base Struct Definition (`SecretBase` / `SecretBaseRecord`)
export const SECRET_BASE_ID_OFFSET = 0x00;
export const SECRET_BASE_FLAGS_OFFSET = 0x01;
export const SECRET_BASE_TRAINER_NAME_OFFSET = 0x02;
export const SECRET_BASE_TRAINER_ID_OFFSET = 0x09;
export const SECRET_BASE_LANGUAGE_OFFSET = 0x0d; // Emerald only
export const SECRET_BASE_PARTY_OFFSET = 0x34;

export const PLAYER_NAME_LENGTH = 7;
export const OT_NAME_LENGTH = 7; // Same as PLAYER_NAME_LENGTH, alias for convenience
export const TRAINER_ID_LENGTH = 4;

// Secret Base Party Struct (`SecretBaseParty`)
// Total size: 108 bytes
export const PARTY_PERSONALITY_OFFSET = 0x00;
export const PARTY_MOVES_OFFSET = 0x18;
export const PARTY_SPECIES_OFFSET = 0x48;
export const PARTY_HELD_ITEMS_OFFSET = 0x54;
export const PARTY_LEVELS_OFFSET = 0x60;
export const PARTY_EVS_OFFSET = 0x66;
