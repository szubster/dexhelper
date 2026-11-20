// RSE (Ruby/Sapphire) Constants
export const RSE_VARS_OFFSET_RS = 0x1340;
export const RSE_FLAGS_OFFSET_RS = 0x1220;
export const RSE_VAR_FOSSIL_RESURRECTION_STATE_RS = 0x14c8 - RSE_VARS_OFFSET_RS; // Relative offset
export const RSE_VAR_WHICH_FOSSIL_REVIVED_RS = 0x14ca - RSE_VARS_OFFSET_RS; // Relative offset

// Emerald Constants
export const RSE_VARS_OFFSET_EMERALD = 0x139c;
export const RSE_FLAGS_OFFSET_EMERALD = 0x1270;
export const RSE_VAR_FOSSIL_RESURRECTION_STATE_EMERALD = 0x1524 - RSE_VARS_OFFSET_EMERALD; // Relative offset
export const RSE_VAR_WHICH_FOSSIL_REVIVED_EMERALD = 0x1526 - RSE_VARS_OFFSET_EMERALD; // Relative offset

// Resurrection States
export const RSE_FOSSIL_STATE_NONE = 0;
export const RSE_FOSSIL_STATE_REGENERATING = 1;
export const RSE_FOSSIL_STATE_READY = 2;

// Fossil IDs
export const RSE_FOSSIL_ID_ROOT = 1;
export const RSE_FOSSIL_ID_CLAW = 2;

// FRLG (FireRed/LeafGreen) Constants
export const FRLG_VARS_OFFSET = 0x1000;
export const FRLG_FLAGS_OFFSET = 0x0ee0;
export const FRLG_VAR_WHICH_FOSSIL_REVIVED = 0x10d2 - FRLG_VARS_OFFSET; // Relative offset

// FRLG Fossil Item IDs
export const FRLG_FOSSIL_ID_HELIX = 357;
export const FRLG_FOSSIL_ID_DOME = 358;
export const FRLG_FOSSIL_ID_OLD_AMBER = 354;

// RSE Event Flags Relative Byte Offsets
export const RSE_FLAG_CHOSE_ROOT_FOSSIL_BYTE = 0x29;
export const RSE_FLAG_CHOSE_ROOT_FOSSIL_BIT = 7;
export const RSE_FLAG_CHOSE_CLAW_FOSSIL_BYTE = 0x2a;
export const RSE_FLAG_CHOSE_CLAW_FOSSIL_BIT = 0;
export const RSE_FLAG_RECEIVED_REVIVED_FOSSIL_MON_BYTE = 0x21;
export const RSE_FLAG_RECEIVED_REVIVED_FOSSIL_MON_BIT = 3;

// FRLG Event Flags Relative Byte Offsets
export const FRLG_FLAG_GOT_DOME_FOSSIL_BYTE = 0x4e;
export const FRLG_FLAG_GOT_DOME_FOSSIL_BIT = 2;
export const FRLG_FLAG_GOT_HELIX_FOSSIL_BYTE = 0x4e;
export const FRLG_FLAG_GOT_HELIX_FOSSIL_BIT = 3;
export const FRLG_FLAG_GOT_OLD_AMBER_BYTE = 0x4b;
export const FRLG_FLAG_GOT_OLD_AMBER_BIT = 6;
