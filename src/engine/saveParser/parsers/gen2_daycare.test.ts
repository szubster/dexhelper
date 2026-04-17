import { describe, expect, it } from 'vitest';
import { parseGen2 } from './gen2';

describe('gen2 daycare parsing', () => {
  it('should parse GS daycare with 1 pokemon and no egg', () => {
    const u8 = new Uint8Array(32768);
    const daycare1Offset = 0x2850;
    const eggFlagOffset = 0x284f;

    // Slot 1: Bulbasaur Lvl 5
    u8[daycare1Offset] = 1; // Species
    u8[daycare1Offset + 31] = 5; // Level

    // Egg flag
    u8[eggFlagOffset] = 0;

    const data = parseGen2(u8, false);
    expect(data.daycare ?? []).toHaveLength(1);
    expect(data.daycare?.[0]).toMatchObject({
      speciesId: 1,
      level: 5,
      storageLocation: 'Daycare',
    });
    expect(data.daycareHasEgg).toBe(false);
  });

  it('should parse GS daycare with 2 pokemon and an egg', () => {
    const u8 = new Uint8Array(32768);
    const daycare1Offset = 0x2850;
    const daycare2Offset = daycare1Offset - 57; // 0x2817
    const eggFlagOffset = 0x284f;

    // Slot 1: Ditto Lvl 10
    u8[daycare1Offset] = 132;
    u8[daycare1Offset + 31] = 10;

    // Slot 2: Pikachu Lvl 20
    u8[daycare2Offset] = 25;
    u8[daycare2Offset + 31] = 20;

    // Egg flag set
    u8[eggFlagOffset] = 1;

    const data = parseGen2(u8, false);
    expect(data.daycare ?? []).toHaveLength(2);
    expect(data.daycare).toContainEqual(expect.objectContaining({ speciesId: 132, level: 10 }));
    expect(data.daycare).toContainEqual(expect.objectContaining({ speciesId: 25, level: 20 }));
    expect(data.daycareHasEgg).toBe(true);
  });

  it('should parse Crystal daycare with 1 pokemon and no egg', () => {
    const u8 = new Uint8Array(32768);
    const daycare1Offset = 0x282c;
    const eggFlagOffset = 0x282b;

    // Slot 1: Chikorita Lvl 5
    u8[daycare1Offset] = 152;
    u8[daycare1Offset + 31] = 5;

    u8[eggFlagOffset] = 0;

    // We force crystal by setting the Crystal party count offset
    u8[0x2865] = 1;
    u8[0x2866] = 152; // Valid species in species list

    const data = parseGen2(u8, true); // explicitly force crystal
    expect(data.gameVersion).toBe('crystal');
    expect(data.daycare ?? []).toHaveLength(1);
    expect(data.daycare?.[0]).toMatchObject({
      speciesId: 152,
      level: 5,
    });
    expect(data.daycareHasEgg).toBe(false);
  });

  it('should parse Crystal daycare with 2 pokemon and an egg', () => {
    const u8 = new Uint8Array(32768);
    const daycare1Offset = 0x282c;
    const daycare2Offset = daycare1Offset - 57; // 0x27f3
    const eggFlagOffset = 0x282b;

    // Slot 1: Marill Lvl 15
    u8[daycare1Offset] = 183;
    u8[daycare1Offset + 31] = 15;

    // Slot 2: Togetic Lvl 25
    u8[daycare2Offset] = 176;
    u8[daycare2Offset + 31] = 25;

    // Egg flag set
    u8[eggFlagOffset] = 1;

    // Force Crystal
    u8[0x2865] = 1;
    u8[0x2866] = 183;

    const data = parseGen2(u8, true); // explicitly force crystal
    expect(data.gameVersion).toBe('crystal');
    expect(data.daycare ?? []).toHaveLength(2);
    expect(data.daycareHasEgg).toBe(true);
  });
});
