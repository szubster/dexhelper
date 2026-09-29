/**
 * Constants for Generation 3 Fame Checker data structure and save parsing.
 * SaveBlock1 offset: 0x3a54 in FireRed / LeafGreen.
 */

/** Base offset for Fame Checker array in SaveBlock1 */
export const GEN3_FAME_CHECKER_OFFSET = 0x3a54;

/** Number of persons tracked in the Fame Checker (e.g. Oak, Daisy, Brock, etc.) */
export const NUM_FAMECHECKER_PERSONS = 16;

/** Byte size of each Fame Checker person entry (16-bit / 2-byte integer per person) */
export const FAME_CHECKER_RECORD_SIZE = 2;

/** Bitmask for extracting the pick state (bits 0-1) */
export const FAME_CHECKER_PICK_STATE_MASK = 0x3;

/** Bitmask for extracting raw flavor text flags (bits 2-13) */
export const FAME_CHECKER_FLAVOR_FLAGS_MASK = 0xfff;

/** Number of flavor text unlocks tracked per Fame Checker person */
export const FAME_CHECKER_FLAVOR_FLAGS_COUNT = 6;
