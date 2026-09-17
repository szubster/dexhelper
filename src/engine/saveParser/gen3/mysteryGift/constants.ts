// Constants for Mystery Gift parsing
export const MYSTERY_GIFT_FLAGS_OFFSET_EMERALD = 0x1270;
export const MYSTERY_GIFT_FLAGS_OFFSET_RS = 0x1220;
export const MYSTERY_GIFT_FLAGS_OFFSET_FRLG = 0x0ee0;

// RSE Item Received Flags
export const RSE_FLAG_RECEIVED_AURORA_TICKET_BYTE = 39;
export const RSE_FLAG_RECEIVED_AURORA_TICKET_BIT = 2;

export const RSE_FLAG_RECEIVED_MYSTIC_TICKET_BYTE = 39;
export const RSE_FLAG_RECEIVED_MYSTIC_TICKET_BIT = 3;

export const RSE_FLAG_RECEIVED_OLD_SEA_MAP_BYTE = 39;
export const RSE_FLAG_RECEIVED_OLD_SEA_MAP_BIT = 4;

// RSE System Enable Ship Flags (Base offset 0x860)
// The document says these are at specific logical IDs, but we can also use their absolute byte/bit offsets inside the flags array
// The document mentions:
// Southern Island: Byte offset 278, Bit index 3
// Birth Island: Byte offset 282, Bit index 5
// Navel Rock: Byte offset 284, Bit index 0
// Faraway Island: Byte offset 282, Bit index 6
export const RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BYTE = 278;
export const RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BIT = 3;

export const RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE = 282;
export const RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT = 5;

export const RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE = 284;
export const RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT = 0;

export const RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BYTE = 282;
export const RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BIT = 6;

// FRLG Item Received Flags
export const FRLG_FLAG_RECEIVED_AURORA_TICKET_BYTE = 84;
export const FRLG_FLAG_RECEIVED_AURORA_TICKET_BIT = 7;

export const FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BYTE = 85;
export const FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BIT = 0;

// FRLG System Enable Ship Flags
// Navel Rock: Byte offset 265, Bit index 2
// Birth Island: Byte offset 265, Bit index 3
export const FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE = 265;
export const FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT = 2;

export const FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE = 265;
export const FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT = 3;
