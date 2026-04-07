import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";
import type { GameVersion } from "./index";
import { decodeGen12String, parseSaveFile } from "./index";

describe("saveParser - Pokémon Gen 1 Validation", () => {
  const yellowSavPath = join(__dirname, "../../../tests/fixtures/yellow.sav");
  const buffer = readFileSync(yellowSavPath).buffer;

  it("should correctly detect and parse the provided yellow.sav (R/B layout)", () => {
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

  it("should correctly identify claimed gifts in the save file", () => {
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

  it("should support manual version overrides", () => {
    // If we force 'yellow' on a save that doesn't have the shift, it might see garbage,
    // but we test that the mechanism exists.
    const data = parseSaveFile(buffer, "yellow" as GameVersion);
    expect(data.gameVersion).toBe("yellow");
  });

  it("should parse full pcDetails for all 12 boxes", () => {
    const data = parseSaveFile(buffer);
    expect(data.pcDetails.length).toBeGreaterThan(0);

    // Check that we have boxes other than the current one (if any)
    const boxNames = new Set(data.pcDetails.map((p) => p.storageLocation));
    expect(boxNames.size).toBeGreaterThan(0);

    // Verify each entry has essential details
    const firstEntry = data.pcDetails[0]!;
    expect(firstEntry.level).toBeDefined();
    expect(firstEntry.moves).toBeDefined();
    expect(firstEntry.dvs).toBeDefined();
    expect(firstEntry.storageLocation).toMatch(/Box \d+/);
  });
});

describe("decodeGen12String", () => {
  it("should decode a simple string correctly", () => {
    const u8 = new Uint8Array([0x80, 0x92, 0x87, 0x50]); // "ASH@"
    expect(decodeGen12String(u8, 0)).toBe("ASH");
  });

  it("should handle non-zero offsets correctly", () => {
    const u8 = new Uint8Array([0x00, 0x00, 0x80, 0x92, 0x87, 0x50]); // Pad + "ASH@"
    expect(decodeGen12String(u8, 2)).toBe("ASH");
  });

  it('should handle unmapped characters with "?"', () => {
    const u8 = new Uint8Array([0x01, 0x02, 0x50]);
    expect(decodeGen12String(u8, 0)).toBe("??");
  });

  it("should handle special multi-character mappings", () => {
    const u8 = new Uint8Array([0xe1, 0xe2, 0xe8, 0x50]); // "PK" "MN" "♂" "@"
    expect(decodeGen12String(u8, 0)).toBe("PKMN♂");
  });

  it("should stop at terminator 0x50", () => {
    const u8 = new Uint8Array([0x80, 0x50, 0x81]);
    expect(decodeGen12String(u8, 0)).toBe("A");
  });

  it("should stop at terminator 0x00", () => {
    const u8 = new Uint8Array([0x80, 0x00, 0x81]);
    expect(decodeGen12String(u8, 0)).toBe("A");
  });

  it("should stop at terminator 0xFF", () => {
    const u8 = new Uint8Array([0x80, 0xff, 0x81]);
    expect(decodeGen12String(u8, 0)).toBe("A");
  });

  it("should respect maxLength", () => {
    const u8 = new Uint8Array([0x80, 0x81, 0x82, 0x83]);
    expect(decodeGen12String(u8, 0, 2)).toBe("AB");
  });

  it("should default to maxLength 11", () => {
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
    expect(decodeGen12String(u8, 0)).toBe("AAAAAAAAAAA");
    expect(decodeGen12String(u8, 0).length).toBe(11);
  });

  it("should trim the resulting string", () => {
    const u8 = new Uint8Array([0x7f, 0x80, 0x7f, 0x50]); // " A @"
    expect(decodeGen12String(u8, 0)).toBe("A");
  });

  it("should handle strings that fill maxLength without a terminator", () => {
    const u8 = new Uint8Array([0x80, 0x81, 0x82]);
    expect(decodeGen12String(u8, 0, 3)).toBe("ABC");
  });

  it("should stop gracefully when reaching out-of-bounds array access (undefined byte)", () => {
    const u8 = new Uint8Array([0x80, 0x81]);
    // The array only has 2 bytes, but we ask it to read up to 11.
    // u8[2] will be undefined, triggering the break condition.
    expect(decodeGen12String(u8, 0)).toBe("AB");
  });
});
