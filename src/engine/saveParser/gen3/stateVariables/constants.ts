// Gen 3 State Variables and Bank Constants

// Event flags array offset in SaveBlock1
export const EVENT_FLAGS_OFFSET = 0x02f0;

// Shift to get byte offset from flag ID
export const FLAG_BYTE_SHIFT = 3; // (flag >> 3)
// Mask to get bit offset from flag ID
export const FLAG_BIT_MASK = 7; // (flag & 7)

// Common bit constants
export const BIT_MASK = 1;

// Flash bank constants
export const BANK_A_START = 0x0000;
export const BANK_B_START = 0xe000;
export const SECTION_SIZE = 0x1000; // 4096 bytes per section
export const NUM_SECTIONS = 14;

export const SIGNATURE_OFFSET = 0x0ff8;
export const SECTION_ID_OFFSET = 0x0ff4;
export const SAVE_INDEX_OFFSET = 0x0ffc;
export const SIGNATURE_VALUE = 0x08012025;
