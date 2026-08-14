import { z } from 'zod';

export const SECRET_BASES_COUNT = 20;
export const SECRET_BASE_SIZE = 160;
export const SECRET_BASE_ARRAY_SIZE = 3200;

export const RS_SECRET_BASE_ARRAY_OFFSET = 0x1a08;
export const EMERALD_SECRET_BASE_ARRAY_OFFSET = 0x1a9c;

export const SECRET_BASE_SECRET_BASE_ID_OFFSET = 0x00;
export const SECRET_BASE_FLAGS_OFFSET = 0x01;
export const SECRET_BASE_TRAINER_NAME_OFFSET = 0x02;
export const SECRET_BASE_TRAINER_NAME_LENGTH = 7;
export const SECRET_BASE_TRAINER_ID_OFFSET = 0x09;
export const SECRET_BASE_TRAINER_ID_LENGTH = 4;
export const EMERALD_SECRET_BASE_LANGUAGE_OFFSET = 0x0d;
export const SECRET_BASE_NUM_SECRET_BASES_RECEIVED_OFFSET = 0x0e;
export const SECRET_BASE_NUM_TIMES_ENTERED_OFFSET = 0x10;
export const SECRET_BASE_UNUSED_OFFSET = 0x11;
export const SECRET_BASE_DECORATIONS_OFFSET = 0x12;
export const DECOR_MAX_SECRET_BASE = 16;
export const SECRET_BASE_DECORATION_POSITIONS_OFFSET = 0x22;
export const SECRET_BASE_PARTY_OFFSET = 0x34;

export const SECRET_BASE_PARTY_SIZE = 108;
export const SECRET_BASE_PARTY_MEMBER_COUNT = 6;
export const SECRET_BASE_PARTY_PERSONALITY_OFFSET = 0x00;
export const SECRET_BASE_PARTY_MOVES_OFFSET = 0x18;
export const SECRET_BASE_PARTY_SPECIES_OFFSET = 0x48;
export const SECRET_BASE_PARTY_HELD_ITEMS_OFFSET = 0x54;
export const SECRET_BASE_PARTY_LEVELS_OFFSET = 0x60;
export const SECRET_BASE_PARTY_EVS_OFFSET = 0x66;

export const SecretBasePokemonSchema = z.object({
  personality: z.number().int().nonnegative(),
  moves: z.array(z.number().int().nonnegative()).length(4),
  species: z.number().int().nonnegative(),
  heldItem: z.number().int().nonnegative(),
  level: z.number().int().nonnegative().max(100),
  evs: z.number().int().nonnegative().max(255),
});
export type SecretBasePokemon = z.infer<typeof SecretBasePokemonSchema>;

export const MixedRecordNPCSchema = z.object({
  trainerName: z.string().max(7),
  trainerId: z.number().int().nonnegative(),
  secretBaseId: z.number().int().nonnegative(),
  party: z.array(SecretBasePokemonSchema).max(6),
});
export type MixedRecordNPC = z.infer<typeof MixedRecordNPCSchema>;
