import { describe, expect, it, test } from 'vitest';
import { detectGen1GameVersion, isGen1Save, parseGen1 } from './gen1';

describe('gen1 parsers', () => {
  describe('detectGen1GameVersion', () => {
    const trainerName = 'RED';

    const cases = [
      {
        name: 'yellow version by starters',
        owned: [1, 4, 7, 25],
        expected: 'unknown',
      },
      {
        name: 'yellow version by pikachu markers',
        u8Mods: { 0x271c: 1, 0x271d: 128 },
        expected: 'yellow',
      },
      {
        name: 'red version by exclusives',
        owned: [23, 24, 43, 44],
        expected: 'red',
      },
      {
        name: 'blue version by exclusives',
        owned: [27, 28, 37, 38],
        expected: 'blue',
      },
      {
        name: 'red by trade checks',
        owned: [23],
        party: [{ speciesId: 83, otName: 'CHIKUCHIKU' }],
        expected: 'red',
      },
      {
        name: 'completely ambiguous',
        expected: 'unknown',
      },
    ];

    test.for(cases)('should detect $name', ({ owned = [], u8Mods = {}, party = [], expected }) => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      for (const [offset, value] of Object.entries(u8Mods || {})) {
        view.setUint8(Number(offset), value as number);
      }
      expect(detectGen1GameVersion(view, new Set(owned), new Set(), trainerName, party)).toBe(expected);
    });
  });

  describe('isGen1Save', () => {
    const cases = [
      { name: 'invalid party count', u8Mods: { 0x2f2c: 7 }, expected: false },
      { name: 'missing party terminator', u8Mods: { 0x2f2c: 1, 0x2f2e: 0x00 }, expected: false },
      { name: 'invalid species id 0', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 0 }, expected: false },
      { name: 'invalid species id 255', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 0xff }, expected: false },
      { name: 'valid save', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 15 }, expected: true },
    ];

    test.for(cases)('should return $expected for $name', ({ u8Mods, expected }) => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      for (const [offset, value] of Object.entries(u8Mods || {})) {
        view.setUint8(Number(offset), value as number);
      }
      expect(isGen1Save(view)).toBe(expected);
    });
  });
});

describe('parseGen1 branches', () => {
  it('should return unknown when redScore === blueScore and they are > 4 (missing branch 246)', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // We need offsetShift=0. Pokedex is at 0x25A3
    // Set 5 Red exclusives
    view.setUint8(0x25a3 + Math.floor(22 / 8), view.getUint8(0x25a3 + Math.floor(22 / 8)) | (1 << (22 % 8))); // Ekans (23)
    view.setUint8(0x25a3 + Math.floor(23 / 8), view.getUint8(0x25a3 + Math.floor(23 / 8)) | (1 << (23 % 8))); // Arbok (24)
    view.setUint8(0x25a3 + Math.floor(42 / 8), view.getUint8(0x25a3 + Math.floor(42 / 8)) | (1 << (42 % 8))); // Oddish (43)
    view.setUint8(0x25a3 + Math.floor(43 / 8), view.getUint8(0x25a3 + Math.floor(43 / 8)) | (1 << (43 % 8))); // Gloom (44)
    view.setUint8(0x25a3 + Math.floor(44 / 8), view.getUint8(0x25a3 + Math.floor(44 / 8)) | (1 << (44 % 8))); // Vileplume (45)

    // Set 5 Blue exclusives
    view.setUint8(0x25a3 + Math.floor(26 / 8), view.getUint8(0x25a3 + Math.floor(26 / 8)) | (1 << (26 % 8))); // Sandshrew (27)
    view.setUint8(0x25a3 + Math.floor(27 / 8), view.getUint8(0x25a3 + Math.floor(27 / 8)) | (1 << (27 % 8))); // Sandslash (28)
    view.setUint8(0x25a3 + Math.floor(36 / 8), view.getUint8(0x25a3 + Math.floor(36 / 8)) | (1 << (36 % 8))); // Vulpix (37)
    view.setUint8(0x25a3 + Math.floor(37 / 8), view.getUint8(0x25a3 + Math.floor(37 / 8)) | (1 << (37 % 8))); // Ninetales (38)
    view.setUint8(0x25a3 + Math.floor(51 / 8), view.getUint8(0x25a3 + Math.floor(51 / 8)) | (1 << (51 % 8))); // Meowth (52)

    view.setUint8(0x2f2c, 0); // party count
    view.setUint8(0x2f2d, 0xff); // terminator

    const result = parseGen1(view);
    expect(result.gameVersion).toBe('unknown');
  });
});
