import { describe, expect, test } from 'vitest';
import { detectGen1GameVersion, isGen1Save } from './gen1';

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
      const u8 = new Uint8Array(32768);
      for (const [offset, value] of Object.entries(u8Mods)) {
        u8[Number(offset)] = value;
      }
      expect(detectGen1GameVersion(u8, new Set(owned), new Set(), trainerName, party)).toBe(expected);
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
      const u8 = new Uint8Array(32768);
      for (const [offset, value] of Object.entries(u8Mods)) {
        u8[Number(offset)] = value;
      }
      expect(isGen1Save(u8)).toBe(expected);
    });
  });
});
