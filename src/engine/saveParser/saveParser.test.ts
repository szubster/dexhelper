import { describe, it, expect } from 'vitest';
import { parseSaveFile, decodeGen12String } from './index';
import type { GameVersion } from './index';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('saveParser - Pokémon Gen 1 Validation', () => {
  const yellowSavPath = join(__dirname, '../../../tests/fixtures/yellow.sav');
  const buffer = readFileSync(yellowSavPath).buffer;

  it('should correctly detect and parse the provided yellow.sav (R/B layout)', () => {
    // Note: The sample yellow.sav provided uses a Red/Blue memory layout (no +1 shift).
    // Our parser should detect this automatically and parse it correctly.
    const data = parseSaveFile(buffer);
    
    // Auto-detection might see it as 'blue' because of the layout and traded mons,
    // but the important thing is that the offsetShift is 0 and it reads real data.
    expect(data.generation).toBe(1);
    
    // Pokedex should show starters as owned
    expect(data.owned.has(1)).toBe(true); // Bulbasaur
    expect(data.owned.has(4)).toBe(true); // Charmander
    expect(data.owned.has(7)).toBe(true); // Squirtle
  });

  it('should correctly identify claimed gifts in the save file', () => {
    const data = parseSaveFile(buffer);
    expect(data.eventFlags).toBeDefined();
    const flags = data.eventFlags!;

    // Bits should be set for claimed gifts
    // Bulbasaur: index 84, bit 1
    const bulbasaurClaimed = (flags[84]! & (1 << 1)) !== 0;
    expect(bulbasaurClaimed).toBe(true);

    // Charmander: index 66, bit 7
    const charmanderClaimed = (flags[66]! & (1 << 7)) !== 0;
    expect(charmanderClaimed).toBe(true);

    // Squirtle: index 68, bit 1
    const squirtleClaimed = (flags[68]! & (1 << 1)) !== 0;
    expect(squirtleClaimed).toBe(true);
  });

  it('should support manual version overrides', () => {
    // If we force 'yellow' on a save that doesn't have the shift, it might see garbage,
    // but we test that the mechanism exists.
    const data = parseSaveFile(buffer, 'yellow' as GameVersion);
    expect(data.gameVersion).toBe('yellow');
  });

  it('should parse Pokémon from multiple PC boxes in Gen 1', () => {
    // Create a mock buffer with Pokémon in Box 1 and Box 2
    const mockBuffer = new Uint8Array(32768);
    // Mark as valid Gen 1 save to pass isGen1Save detection
    mockBuffer[0x2F2C] = 1; // Party count
    mockBuffer[0x2F2D] = 0x54; // Pikachu in party
    mockBuffer[0x2F2D + 1] = 0xFF; // Terminator

    // Set Pikachu (ID 25) as owned in pokedex to help auto-detection
    mockBuffer[0x25A3 + 3] = 1;

    // Active box is Box 1 (index 0)
    mockBuffer[0x284C] = 0;
    // Box 1 count = 1
    mockBuffer[0x30C0] = 1;
    // Box 1 Species 1 = Pikachu (internal 0x54)
    mockBuffer[0x30C1] = 0x54;
    mockBuffer[0x30C1 + 1] = 0xFF; // Terminator
    // Box 1 Data 1 Internal ID = Pikachu (0x54)
    mockBuffer[0x30C0 + 22] = 0x54;
    // Box 1 Data 1 Level = 5
    mockBuffer[0x30C0 + 22 + 3] = 5;

    // Box 2 (offset 0x4000) count = 1
    mockBuffer[0x4000] = 1;
    // Box 2 Species 1 = Charmander (internal 0xB0)
    mockBuffer[0x4001] = 0xB0;
    mockBuffer[0x4002] = 0xFF; // Terminator
    // Box 2 Data 1 Internal ID = Charmander (0xB0)
    mockBuffer[0x4000 + 22] = 0xB0;
    // Box 2 Data 1 Level = 10
    mockBuffer[0x4000 + 22 + 3] = 10;

    const data = parseSaveFile(mockBuffer.buffer, 'red');
    expect(data.pcDetails).toHaveLength(2);
    expect(data.pcDetails[0].speciesId).toBe(25); // Pikachu
    expect(data.pcDetails[0].storageLocation).toBe('Box 1');
    expect(data.pcDetails[1].speciesId).toBe(4); // Charmander
    expect(data.pcDetails[1].storageLocation).toBe('Box 2');
  });

  it('should parse Pokémon from Daycare in Gen 1', () => {
    const mockBuffer = new Uint8Array(32768);
    // Mark as valid Gen 1 save
    mockBuffer[0x2F2C] = 1;
    mockBuffer[0x2F2D] = 0x54;
    mockBuffer[0x2F2D + 1] = 0xFF;
    mockBuffer[0x25A3 + 3] = 1; // Pikachu owned

    // Daycare Species = Pikachu (0x54)
    mockBuffer[0x2CF4] = 0x54;
    // Daycare Data Internal ID = Pikachu (0x54)
    mockBuffer[0x2D0B] = 0x54;
    // Daycare Data Level = 20
    mockBuffer[0x2D0B + 3] = 20;

    const data = parseSaveFile(mockBuffer.buffer, 'red');
    const daycareMon = data.pcDetails.find(p => p.storageLocation === 'Daycare');
    expect(daycareMon).toBeDefined();
    expect(daycareMon?.speciesId).toBe(25);
    expect(daycareMon?.level).toBe(20);
  });
});

describe('saveParser - Pokémon Gen 2 Validation', () => {
  it('should include Eggs (ID 253) in Gen 2 party and PC', () => {
    const mockBuffer = new Uint8Array(32768);
    // Mark as valid GS save
    mockBuffer[0x288A] = 1; // Party count
    mockBuffer[0x288B] = 253; // Egg
    mockBuffer[0x288C] = 0xFF; // Terminator

    // Ensure it's not detected as Gen 1
    mockBuffer[0x2F2C] = 0xFF;

    // Party data starts at speciesOffset + 7 = 0x288B + 7 = 0x2892
    mockBuffer[0x2892] = 253; // Species ID in data
    mockBuffer[0x2892 + 31] = 5; // Level

    // PC Active box count at 0x2D10
    mockBuffer[0x2D10] = 1;
    mockBuffer[0x2D11] = 253; // Egg
    mockBuffer[0x2D12] = 0xFF; // Terminator
    // PC Data starts at currentBoxSpecies + 21 = 0x2D11 + 21 = 0x2D26
    mockBuffer[0x2D26] = 253; // Species ID in data
    mockBuffer[0x2D26 + 31] = 5; // Level

    // Force version to Gold to bypass detection issues with empty mock
    const data = parseSaveFile(mockBuffer.buffer, 'gold');
    expect(data.party).toContain(253);
    expect(data.pc).toContain(253);
    expect(data.partyDetails).toHaveLength(1);
    expect(data.pcDetails).toHaveLength(1);
    expect(data.partyDetails[0].speciesId).toBe(253);
    expect(data.pcDetails[0].speciesId).toBe(253);
  });

  it('should correctly report currentBoxCount for Gen 2', () => {
    const mockBuffer = new Uint8Array(32768);
    mockBuffer[0x288A] = 1;
    mockBuffer[0x288B] = 1;
    mockBuffer[0x288C] = 0xFF;

    mockBuffer[0x2D10] = 5; // 5 Pokémon in active box

    const data = parseSaveFile(mockBuffer.buffer);
    expect(data.currentBoxCount).toBe(5);
  });
});

describe('decodeGen12String', () => {
  it('should decode a simple string correctly', () => {
    const u8 = new Uint8Array([0x80, 0x92, 0x87, 0x50]); // "ASH@"
    expect(decodeGen12String(u8, 0)).toBe('ASH');
  });

  it('should handle non-zero offsets correctly', () => {
    const u8 = new Uint8Array([0x00, 0x00, 0x80, 0x92, 0x87, 0x50]); // Pad + "ASH@"
    expect(decodeGen12String(u8, 2)).toBe('ASH');
  });

  it('should handle unmapped characters with "?"', () => {
    const u8 = new Uint8Array([0x01, 0x02, 0x50]);
    expect(decodeGen12String(u8, 0)).toBe('??');
  });

  it('should handle special multi-character mappings', () => {
    const u8 = new Uint8Array([0xE1, 0xE2, 0xE8, 0x50]); // "PK" "MN" "♂" "@"
    expect(decodeGen12String(u8, 0)).toBe('PKMN♂');
  });

  it('should stop at terminator 0x50', () => {
    const u8 = new Uint8Array([0x80, 0x50, 0x81]);
    expect(decodeGen12String(u8, 0)).toBe('A');
  });

  it('should stop at terminator 0x00', () => {
    const u8 = new Uint8Array([0x80, 0x00, 0x81]);
    expect(decodeGen12String(u8, 0)).toBe('A');
  });

  it('should stop at terminator 0xFF', () => {
    const u8 = new Uint8Array([0x80, 0xFF, 0x81]);
    expect(decodeGen12String(u8, 0)).toBe('A');
  });

  it('should respect maxLength', () => {
    const u8 = new Uint8Array([0x80, 0x81, 0x82, 0x83]);
    expect(decodeGen12String(u8, 0, 2)).toBe('AB');
  });

  it('should default to maxLength 11', () => {
    const u8 = new Uint8Array([
      0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, // 10 'A's
      0x80, 0x80, 0x80, 0x80 // more 'A's
    ]);
    expect(decodeGen12String(u8, 0)).toBe('AAAAAAAAAAA');
    expect(decodeGen12String(u8, 0).length).toBe(11);
  });

  it('should trim the resulting string', () => {
    const u8 = new Uint8Array([0x7F, 0x80, 0x7F, 0x50]); // " A @"
    expect(decodeGen12String(u8, 0)).toBe('A');
  });

  it('should handle strings that fill maxLength without a terminator', () => {
    const u8 = new Uint8Array([0x80, 0x81, 0x82]);
    expect(decodeGen12String(u8, 0, 3)).toBe('ABC');
  });

  it('should stop gracefully when reaching out-of-bounds array access (undefined byte)', () => {
    const u8 = new Uint8Array([0x80, 0x81]);
    // The array only has 2 bytes, but we ask it to read up to 11.
    // u8[2] will be undefined, triggering the break condition.
    expect(decodeGen12String(u8, 0)).toBe('AB');
  });
});
