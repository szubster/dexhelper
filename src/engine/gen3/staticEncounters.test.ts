import { describe, expect, it } from 'vitest';
import type { Gen3EmeraldStaticEncounters, Gen3FRLGStaticEncounters, Gen3RSStaticEncounters } from './staticEncounters';
import {
  EMERALD_RAYQUAZA_BIT,
  EMERALD_RAYQUAZA_BYTE,
  EVENT_FLAGS_START,
  extractGen3StaticEncounterFlags,
  FRLG_MEWTWO_BIT,
  FRLG_MEWTWO_BYTE,
  RS_GROUDON_KYOGRE_BIT,
  RS_GROUDON_KYOGRE_BYTE,
} from './staticEncounters';

describe('extractGen3StaticEncounterFlags', () => {
  it('should correctly parse Emerald static encounters', () => {
    const buffer = new ArrayBuffer(EVENT_FLAGS_START + 0x100);
    const view = new DataView(buffer);

    // Set Rayquaza flag
    const rayquazaOffset = EVENT_FLAGS_START + EMERALD_RAYQUAZA_BYTE;
    view.setUint8(rayquazaOffset, 1 << EMERALD_RAYQUAZA_BIT);

    const result = extractGen3StaticEncounterFlags(view, 'emerald', 0) as Gen3EmeraldStaticEncounters;

    expect(result).toBeDefined();
    expect(result.rayquaza).toBe(true);
    expect(result.deoxys).toBe(false); // Sanity check for an unset bit
  });

  it('should correctly parse FireRed/LeafGreen static encounters', () => {
    const buffer = new ArrayBuffer(EVENT_FLAGS_START + 0x100);
    const view = new DataView(buffer);

    // Set Mewtwo flag
    const mewtwoOffset = EVENT_FLAGS_START + FRLG_MEWTWO_BYTE;
    view.setUint8(mewtwoOffset, 1 << FRLG_MEWTWO_BIT);

    const result = extractGen3StaticEncounterFlags(view, 'firered', 0) as Gen3FRLGStaticEncounters;

    expect(result).toBeDefined();
    expect(result.mewtwo).toBe(true);
    expect(result.moltres).toBe(false);
  });

  it('should correctly parse Ruby/Sapphire static encounters', () => {
    const buffer = new ArrayBuffer(EVENT_FLAGS_START + 0x100);
    const view = new DataView(buffer);

    // Set Groudon/Kyogre flag
    const groudonKyogreOffset = EVENT_FLAGS_START + RS_GROUDON_KYOGRE_BYTE;
    view.setUint8(groudonKyogreOffset, 1 << RS_GROUDON_KYOGRE_BIT);

    const result = extractGen3StaticEncounterFlags(view, 'ruby', 0) as Gen3RSStaticEncounters;

    expect(result).toBeDefined();
    expect(result.groudonKyogre).toBe(true);
    expect(result.rayquaza).toBe(false);
  });

  it('should handle section1Offset correctly', () => {
    const section1Offset = 0x1000;
    const buffer = new ArrayBuffer(section1Offset + EVENT_FLAGS_START + 0x100);
    const view = new DataView(buffer);

    // Set Mewtwo flag with section1Offset
    const mewtwoOffset = section1Offset + EVENT_FLAGS_START + FRLG_MEWTWO_BYTE;
    view.setUint8(mewtwoOffset, 1 << FRLG_MEWTWO_BIT);

    const result = extractGen3StaticEncounterFlags(view, 'firered', section1Offset) as Gen3FRLGStaticEncounters;

    expect(result).toBeDefined();
    expect(result.mewtwo).toBe(true);
  });

  it('should throw "The save file is corrupted or incomplete." for out of bounds access (RangeError)', () => {
    // Create a very small buffer that will cause a RangeError when trying to read event flags
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);

    expect(() => {
      extractGen3StaticEncounterFlags(view, 'emerald', 0);
    }).toThrow('The save file is corrupted or incomplete.');
  });
});
