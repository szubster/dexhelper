import { describe, expect, it } from 'vitest';
import {
  MATCH_CALL_BLOCK_SECTION_OFFSET,
  MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET,
  MATCH_CALL_UNLOCK_FLAG_SECTION_OFFSET,
} from './offsets';
import { parseGen3MatchCall } from './parser';

describe('parseGen3MatchCall', () => {
  it('returns undefined for non-Emerald games', () => {
    const buffer = new ArrayBuffer(10000);
    const view = new DataView(buffer);
    const result = parseGen3MatchCall(view, 0, 0, 'ruby');
    expect(result).toBeUndefined();
  });

  it('extracts unlock flag, registered flags, and rematch states for Emerald', () => {
    const buffer = new ArrayBuffer(10000);
    const view = new DataView(buffer);
    const sec1 = 1000;
    const sec2 = 2000;

    // Set hasMatchCall (bit 7)
    view.setUint8(sec2 + MATCH_CALL_UNLOCK_FLAG_SECTION_OFFSET, 1 << 7);

    // Set some registered flags (starts at bit 4)
    // byte 0: bits 4, 5, 6, 7 => true, false, true, false => 0101 0000 => 0x50
    view.setUint8(sec2 + MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET, 0x50);
    // byte 1: bits 0, 1 => true, true => 0000 0011 => 0x03
    view.setUint8(sec2 + MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET + 1, 0x03);

    // Set some rematch states
    view.setUint8(sec1 + MATCH_CALL_BLOCK_SECTION_OFFSET, 2); // Rematch ready, tier 2
    view.setUint8(sec1 + MATCH_CALL_BLOCK_SECTION_OFFSET + 1, 0); // Not ready
    view.setUint8(sec1 + MATCH_CALL_BLOCK_SECTION_OFFSET + 2, 5); // Rematch ready, tier 5

    const result = parseGen3MatchCall(view, sec1, sec2, 'emerald');

    expect(result).toBeDefined();
    expect(result?.hasMatchCall).toBe(true);

    expect(result?.registeredTrainers[0]).toBe(true); // bit 4
    expect(result?.registeredTrainers[1]).toBe(false); // bit 5
    expect(result?.registeredTrainers[2]).toBe(true); // bit 6
    expect(result?.registeredTrainers[3]).toBe(false); // bit 7
    expect(result?.registeredTrainers[4]).toBe(true); // bit 0 of next byte
    expect(result?.registeredTrainers[5]).toBe(true); // bit 1 of next byte
    expect(result?.registeredTrainers[6]).toBe(false);

    expect(result?.rematchStates[0]).toBe(2);
    expect(result?.rematchStates[1]).toBe(0);
    expect(result?.rematchStates[2]).toBe(5);
  });

  it('throws for out of bounds read', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3MatchCall(view, 0, 0, 'emerald')).toThrow('The save file is corrupted or incomplete.');
  });
});
