import { describe, expect, it } from 'vitest';
import { parseGen2 } from './gen2';

describe('Gen 2 Static Encounter Flags', () => {
  it('should correctly parse the event flags for static encounters', () => {
    // Generate a mock save block
    const buffer = new ArrayBuffer(0x8000);
    const view = new DataView(buffer);

    // Set some valid data to get past initial checks
    view.setUint8(0x288a, 6); // gsPartyCount
    view.setUint8(0x2865, 0); // cPartyCount - makes it GS

    // Offset for Event Flags in GS is 0x2624
    const offset = 0x2624;

    const EVENT_FLAG_SUDOWOODO_BYTE = Math.floor(42 / 8);
    const EVENT_FLAG_SUDOWOODO_BIT = 42 % 8;
    const EVENT_FLAG_HO_OH_BYTE = Math.floor(791 / 8);
    const EVENT_FLAG_HO_OH_BIT = 791 % 8;

    // Set Sudowoodo (byte 6, bit 3)
    view.setUint8(offset + EVENT_FLAG_SUDOWOODO_BYTE, 1 << EVENT_FLAG_SUDOWOODO_BIT);
    // Set Ho-Oh (byte 58, bit 6)
    view.setUint8(offset + EVENT_FLAG_HO_OH_BYTE, 1 << EVENT_FLAG_HO_OH_BIT);

    const result = parseGen2(view, false);

    expect(result.gen2StaticEncounters).toBeDefined();
    expect(result.gen2StaticEncounters?.sudowoodo).toBe(true);
    expect(result.gen2StaticEncounters?.hoOh).toBe(true);

    // Should be false
    expect(result.gen2StaticEncounters?.snorlax).toBe(false);
    expect(result.gen2StaticEncounters?.redGyarados).toBe(false);
    expect(result.gen2StaticEncounters?.lugia).toBe(false);
  });
});
