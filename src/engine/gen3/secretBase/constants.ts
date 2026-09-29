export const SECRET_BASES_COUNT = 20;
export const SECRET_BASE_SIZE = 160;
export const SECRET_BASE_OFFSET_RS = 0x1a08;
export const SECRET_BASE_OFFSET_EMERALD = 0x1a9c;

export const SECRET_BASE_MAP_ID_DIVISOR = 10;
export const FLAGS_OFFSET = 0x01;
export const BATTLED_OWNER_TODAY_MASK = 1 << 5;

export const TRAINER_NAME_OFFSET = 0x02;
export const TRAINER_NAME_LENGTH = 7;

export const TRAINER_ID_OFFSET = 0x09;

export const PARTY_OFFSET = 0x34;
export const PARTY_COUNT = 6;

export const POKEMON_PERSONALITY_OFFSET = 0x00;
export const POKEMON_MOVES_OFFSET = 0x18;
export const POKEMON_SPECIES_OFFSET = 0x48;
export const POKEMON_HELD_ITEM_OFFSET = 0x54;
export const POKEMON_LEVEL_OFFSET = 0x60;
export const POKEMON_EVS_OFFSET = 0x66;

export const POKEMON_MOVES_COUNT = 4;
export const POKEMON_MOVE_SIZE = 2;
export const POKEMON_PERSONALITY_SIZE = 4;
export const POKEMON_SPECIES_SIZE = 2;
export const POKEMON_HELD_ITEM_SIZE = 2;
export const POKEMON_LEVEL_SIZE = 1;
export const POKEMON_EVS_SIZE = 1;

export const DECOR_MAX_SECRET_BASE = 16;
export const NUM_SECRET_BASES_RECEIVED_OFFSET = 0x0e;
export const NUM_TIMES_ENTERED_OFFSET = 0x10;
export const DECORATIONS_OFFSET = 0x12;
export const DECORATION_POSITIONS_OFFSET = 0x22;

export const EMPTY_SECRET_BASE_ID = 0;
export const FLAG_FALSE = 0;
