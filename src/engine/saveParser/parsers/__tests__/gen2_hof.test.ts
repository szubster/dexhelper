import { describe, expect, it } from 'vitest';
import { parseGen2 } from '../gen2';

const JOHTO_BADGES_OFFSET_CRYSTAL = 0x23e5;
const HALL_OF_FAME_OFFSET_RELATIVE = 0xf74;
const HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES = 0xa8;
const GEN2_HOF_RECORD_LENGTH = 0x62;

describe('Gen 2 Hall of Fame parsing (Integration)', () => {
  it('should parse HoF records correctly via parseGen2', () => {
    const buf = new Uint8Array(0x8000);
    const view = new DataView(buf.buffer);

    // Pretend we're Crystal
    view.setUint8(0x23e5, 0xff); // Johto badges (trigger isCrystal)
    view.setUint8(0x23e6, 0xff); // Kanto badges

    const hofCountOffset = JOHTO_BADGES_OFFSET_CRYSTAL + HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES;
    view.setUint8(hofCountOffset, 2); // 2 HoF entries

    const hofRecordsOffset = JOHTO_BADGES_OFFSET_CRYSTAL + HALL_OF_FAME_OFFSET_RELATIVE;

    // Record 1
    view.setUint8(hofRecordsOffset, 1); // Win count

    // Pokemon 1 (Chikorita)
    view.setUint8(hofRecordsOffset + 1, 152); // Species ID
    view.setUint8(hofRecordsOffset + 1 + 5, 15); // Level
    view.setUint8(hofRecordsOffset + 1 + 6, 0x82); // 'C'
    view.setUint8(hofRecordsOffset + 1 + 7, 0x50); // Terminator

    // Pokemon 2 (Totodile)
    view.setUint8(hofRecordsOffset + 1 + 16, 158); // Species ID
    view.setUint8(hofRecordsOffset + 1 + 16 + 5, 12); // Level
    view.setUint8(hofRecordsOffset + 1 + 16 + 6, 0x93); // 'T'
    view.setUint8(hofRecordsOffset + 1 + 16 + 7, 0x50); // Terminator

    // Record 2
    const offset2 = hofRecordsOffset + GEN2_HOF_RECORD_LENGTH;
    view.setUint8(offset2, 2);
    // Pokemon 1 (Cyndaquil)
    view.setUint8(offset2 + 1, 155); // Species ID
    view.setUint8(offset2 + 1 + 5, 20); // Level
    view.setUint8(offset2 + 1 + 6, 0x82); // 'C'
    view.setUint8(offset2 + 1 + 7, 0x50); // Terminator

    // Mock trainer name
    view.setUint8(0x200b, 0x89); // 'J'
    view.setUint8(0x200c, 0x94); // 'U'
    view.setUint8(0x200d, 0x8b); // 'L'
    view.setUint8(0x200e, 0x84); // 'E'
    view.setUint8(0x200f, 0x92); // 'S'
    view.setUint8(0x2010, 0x50); // Terminator

    const data = parseGen2(view, true);

    expect(data.hallOfFameCount).toBe(2);

    const hofRecords = data.hallOfFameRecords || [];
    expect(hofRecords.length).toBe(2);

    expect(hofRecords[0]?.playerName).toBe('JULES');
    expect(hofRecords[0]?.pokemon.length).toBe(2);
    expect(hofRecords[0]?.pokemon[0]?.speciesId).toBe(152);
    expect(hofRecords[0]?.pokemon[0]?.level).toBe(15);
    expect(hofRecords[0]?.pokemon[0]?.nickname).toBe('C');

    expect(hofRecords[0]?.pokemon[1]?.speciesId).toBe(158);
    expect(hofRecords[0]?.pokemon[1]?.level).toBe(12);
    expect(hofRecords[0]?.pokemon[1]?.nickname).toBe('T');

    expect(hofRecords[1]?.pokemon.length).toBe(1);
    expect(hofRecords[1]?.pokemon[0]?.speciesId).toBe(155);
    expect(hofRecords[1]?.pokemon[0]?.level).toBe(20);
    expect(hofRecords[1]?.pokemon[0]?.nickname).toBe('C');
  });
});
