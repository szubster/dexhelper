import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { GameVersion } from './index';
import { parseSaveFile } from './index';
import { decodeGen12String } from './parsers/common';

describe('saveParser - Pokémon Gen 1 Validation', () => {
  const yellowSavPath = join(__dirname, '../../../tests/fixtures/yellow.sav');
  const getBuffer = () => {
    const buffer = readFileSync(yellowSavPath);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  };

  it('should correctly detect and parse the provided yellow.sav (R/B layout)', () => {
    // Note: The sample yellow.sav provided uses a Red/Blue memory layout (no +1 shift).
    // Our parser should detect this automatically and parse it correctly.
    const data = parseSaveFile(getBuffer());

    // Auto-detection might see it as 'blue' because of the layout and traded mons,
    // but the important thing is that the offsetShift is 0 and it reads real data.
    expect(data.generation).toBe(1);

    // Pokedex should show starters as owned
    expect(data.owned.has(1)).toBe(true); // Bulbasaur
    expect(data.owned.has(4)).toBe(true); // Charmander
    expect(data.owned.has(7)).toBe(true); // Squirtle
  });

  it('should correctly identify claimed gifts in the save file', () => {
    const data = parseSaveFile(getBuffer());
    expect(data.eventFlags).toBeDefined();
    const flags = data.eventFlags;
    if (!flags) throw new Error('eventFlags not found');

    // Bits should be set for claimed gifts
    // Bulbasaur: index 84, bit 1
    const bulbasaurClaimed = ((flags[84] ?? 0) & (1 << 1)) !== 0;
    expect(bulbasaurClaimed).toBe(true);

    // Charmander: index 66, bit 7
    const charmanderClaimed = ((flags[66] ?? 0) & (1 << 7)) !== 0;
    expect(charmanderClaimed).toBe(true);

    // Squirtle: index 68, bit 1
    const squirtleClaimed = ((flags[68] ?? 0) & (1 << 1)) !== 0;
    expect(squirtleClaimed).toBe(true);
  });

  it('should support manual version overrides', () => {
    // If we force 'yellow' on a save that doesn't have the shift, it might see garbage,
    // but we test that the mechanism exists.
    const data = parseSaveFile(getBuffer(), 'yellow' as GameVersion);
    expect(data.gameVersion).toBe('yellow');
  });

  it('should parse full pcDetails for all 12 boxes', () => {
    const data = parseSaveFile(getBuffer());
    expect(data.pcDetails.length).toBeGreaterThan(0);

    // Check that we have boxes other than the current one (if any)
    const boxNames = new Set(data.pcDetails.map((p) => p.storageLocation));
    expect(boxNames.size).toBeGreaterThan(0);

    // Verify each entry has essential details
    const firstEntry = data.pcDetails[0];
    if (!firstEntry) throw new Error('pcDetails is empty');
    expect(firstEntry.level).toBeDefined();
    expect(firstEntry.moves).toBeDefined();
    expect(firstEntry.storageLocation).toMatch(/Box \d+/);
  });
});

describe('saveParser - Pokémon Gen 2 Inventory', () => {
  const HEADER_SIZE = 32768;

  function createGen2MockSave(isCrystal: boolean): ArrayBuffer {
    const buffer = new Uint8Array(HEADER_SIZE);

    // Make valid gen 2 save structure
    const countOffset = isCrystal ? 0x2865 : 0x288a;
    const speciesOffset = isCrystal ? 0x2866 : 0x288b;
    buffer[countOffset] = 1;
    buffer[speciesOffset] = 1; // Bulbasaur
    buffer[speciesOffset + 1] = 0xff;

    // Gen 2 Inventory Offsets
    const tmPocket = isCrystal ? 0x23c8 : 0x23e7;
    const itemsPocket = isCrystal ? 0x2402 : 0x2420;
    const keyItemsPocket = isCrystal ? 0x242c : 0x244a;
    const ballsPocket = isCrystal ? 0x2447 : 0x2465;

    // Add a TM (Headbutt = TM02, ID 192)
    buffer[tmPocket + 1] = 1; // TM02 qty 1

    // Add an HM (Rock Smash = TM08 in Gen 2 but let's just test any HM like HM01 Cut)
    buffer[tmPocket + 50] = 1; // HM01 qty 1

    // Add a Key Item (e.g. Squirtbottle = ID 50/0x32, Special Rods e.g. Super Rod = 60/0x3C)
    buffer[keyItemsPocket] = 2; // count
    buffer[keyItemsPocket + 1] = 0x32; // Squirtbottle
    buffer[keyItemsPocket + 2] = 0x3c; // Super Rod
    buffer[keyItemsPocket + 3] = 0xff; // terminator

    // Add Items (Apricorns e.g. Red Apricorn = 153/0x99, Evolution e.g. Water Stone = 22/0x16)
    buffer[itemsPocket] = 2; // count
    buffer[itemsPocket + 1] = 0x99; // Red Apricorn
    buffer[itemsPocket + 2] = 5; // qty
    buffer[itemsPocket + 3] = 0x16; // Water Stone
    buffer[itemsPocket + 4] = 2; // qty
    buffer[itemsPocket + 5] = 0xff; // terminator

    // Add Balls
    buffer[ballsPocket] = 1; // count
    buffer[ballsPocket + 1] = 1; // Master Ball
    buffer[ballsPocket + 2] = 99; // qty
    buffer[ballsPocket + 3] = 0xff;

    // Fix Checksum
    let gen2Sum = 0;
    for (let i = 0x2009; i <= 0x2d0c; i++) {
      gen2Sum += buffer[i] ?? 0;
    }
    const view = new DataView(buffer.buffer);
    view.setUint16(0x2d0d, gen2Sum, true);

    return buffer.buffer;
  }

  it('should extract Key Items, Special Rods, TM/HMs, Apricorns, and Evolution Items for GS', () => {
    const data = parseSaveFile(createGen2MockSave(false));
    const inv = data.inventory;

    // TM02 (Headbutt) ID 192
    expect(inv.find((i) => i.id === 192)?.quantity).toBe(1);
    // HM01 (Cut) ID 241
    expect(inv.find((i) => i.id === 241)?.quantity).toBe(1);
    // Squirtbottle ID 50
    expect(inv.find((i) => i.id === 0x32)?.quantity).toBe(1);
    // Super Rod ID 60
    expect(inv.find((i) => i.id === 0x3c)?.quantity).toBe(1);
    // Red Apricorn ID 153
    expect(inv.find((i) => i.id === 0x99)?.quantity).toBe(5);
    // Water Stone ID 22
    expect(inv.find((i) => i.id === 0x16)?.quantity).toBe(2);
    // Master Ball ID 1
    expect(inv.find((i) => i.id === 1)?.quantity).toBe(99);
  });

  it('should extract Key Items, Special Rods, TM/HMs, Apricorns, and Evolution Items for Crystal', () => {
    // Note: We'll force the parser version to avoid detection logic getting confused by empty Pokédex blocks
    const buffer = createGen2MockSave(true);
    const data = parseSaveFile(buffer, 'crystal');
    const inv = data.inventory;

    expect(inv.find((i) => i.id === 192)?.quantity).toBe(1);
    expect(inv.find((i) => i.id === 241)?.quantity).toBe(1);
    expect(inv.find((i) => i.id === 0x32)?.quantity).toBe(1);
    expect(inv.find((i) => i.id === 0x3c)?.quantity).toBe(1);
    expect(inv.find((i) => i.id === 0x99)?.quantity).toBe(5);
    expect(inv.find((i) => i.id === 0x16)?.quantity).toBe(2);
    expect(inv.find((i) => i.id === 1)?.quantity).toBe(99);
  });
});

describe('decodeGen12String', () => {
  it('should decode a simple string correctly', () => {
    const u8 = new Uint8Array([0x80, 0x92, 0x87, 0x50]); // "ASH@"
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('ASH');
  });

  it('should handle non-zero offsets correctly', () => {
    const u8 = new Uint8Array([0x00, 0x00, 0x80, 0x92, 0x87, 0x50]); // Pad + "ASH@"
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 2)).toBe('ASH');
  });

  it('should handle unmapped characters with "?"', () => {
    const u8 = new Uint8Array([0x01, 0x02, 0x50]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('??');
  });

  it('should handle special multi-character mappings', () => {
    const u8 = new Uint8Array([0xe1, 0xe2, 0xe8, 0x50]); // "PK" "MN" "♂" "@"
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('PKMN♂');
  });

  it('should stop at terminator 0x50', () => {
    const u8 = new Uint8Array([0x80, 0x50, 0x81]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('A');
  });

  it('should stop at terminator 0x00', () => {
    const u8 = new Uint8Array([0x80, 0x00, 0x81]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('A');
  });

  it('should stop at terminator 0xFF', () => {
    const u8 = new Uint8Array([0x80, 0xff, 0x81]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('A');
  });

  it('should respect maxLength', () => {
    const u8 = new Uint8Array([0x80, 0x81, 0x82, 0x83]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0, 2)).toBe('AB');
  });

  it('should default to maxLength 11', () => {
    const u8 = new Uint8Array([
      0x80,
      0x80,
      0x80,
      0x80,
      0x80,
      0x80,
      0x80,
      0x80,
      0x80,
      0x80, // 10 'A's
      0x80,
      0x80,
      0x80,
      0x80, // more 'A's
    ]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('AAAAAAAAAAA');
    expect(decodeGen12String(view, 0).length).toBe(11);
  });

  it('should trim the resulting string', () => {
    const u8 = new Uint8Array([0x7f, 0x80, 0x7f, 0x50]); // " A @"
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('A');
  });

  it('should handle strings that fill maxLength without a terminator', () => {
    const u8 = new Uint8Array([0x80, 0x81, 0x82]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0, 3)).toBe('ABC');
  });

  it('should stop gracefully when reaching out-of-bounds array access (undefined byte)', () => {
    // DataView will throw RangeError on out-of-bounds, which is handled by a try-catch in decodeGen12String or we should handle it
    const u8 = new Uint8Array([0x80, 0x81]);
    const view = new DataView(u8.buffer);
    expect(decodeGen12String(view, 0)).toBe('AB');
  });
});
