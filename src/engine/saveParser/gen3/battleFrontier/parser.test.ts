import { describe, expect, it } from 'vitest';
import {
  ARENA_GOLD_BIT,
  ARENA_RECORD_WIN_STREAKS_OFFSET,
  ARENA_SILVER_BIT,
  ARENA_WIN_STREAKS_OFFSET,
  BATTLE_POINTS_OFFSET,
  DOME_GOLD_BIT,
  DOME_RECORD_WIN_STREAKS_OFFSET,
  DOME_SILVER_BIT,
  DOME_WIN_STREAKS_OFFSET,
  FACTORY_GOLD_BIT,
  FACTORY_RECORD_WIN_STREAKS_OFFSET,
  FACTORY_SILVER_BIT,
  FACTORY_WIN_STREAKS_OFFSET,
  PALACE_GOLD_BIT,
  PALACE_RECORD_WIN_STREAKS_OFFSET,
  PALACE_SILVER_BIT,
  PALACE_SILVER_OFFSET,
  PALACE_WIN_STREAKS_OFFSET,
  PIKE_GOLD_BIT,
  PIKE_RECORD_WIN_STREAKS_OFFSET,
  PIKE_SILVER_BIT,
  PIKE_WIN_STREAKS_OFFSET,
  PYRAMID_GOLD_BIT,
  PYRAMID_RECORD_WIN_STREAKS_OFFSET,
  PYRAMID_SILVER_BIT,
  PYRAMID_SILVER_OFFSET,
  PYRAMID_WIN_STREAKS_OFFSET,
  parseGen3BattleFrontierSymbols,
  parseGen3BattleFrontierWinStreaks,
  parseGen3BattlePoints,
  parseGen3TotalBattlePoints,
  TOTAL_BATTLE_POINTS_OFFSET,
  TOWER_GOLD_BIT,
  TOWER_RECORD_WIN_STREAKS_OFFSET,
  TOWER_SILVER_BIT,
  TOWER_SILVER_OFFSET,
  TOWER_WIN_STREAKS_OFFSET,
} from './parser';

describe('Gen 3 Battle Frontier Parser', () => {
  describe('parseGen3BattleFrontierSymbols', () => {
    it('should correctly parse all frontier symbols', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0x0000; // Mock saveBlock1Offset

      view.setUint8(
        saveBlock1Offset + TOWER_SILVER_OFFSET,
        (1 << TOWER_SILVER_BIT) | (1 << TOWER_GOLD_BIT) | (1 << DOME_SILVER_BIT) | (1 << DOME_GOLD_BIT),
      );

      view.setUint8(
        saveBlock1Offset + PALACE_SILVER_OFFSET,
        (1 << PALACE_SILVER_BIT) |
          (1 << PALACE_GOLD_BIT) |
          (1 << ARENA_SILVER_BIT) |
          (1 << ARENA_GOLD_BIT) |
          (1 << FACTORY_SILVER_BIT) |
          (1 << FACTORY_GOLD_BIT) |
          (1 << PIKE_SILVER_BIT) |
          (1 << PIKE_GOLD_BIT),
      );

      view.setUint8(saveBlock1Offset + PYRAMID_SILVER_OFFSET, (1 << PYRAMID_SILVER_BIT) | (1 << PYRAMID_GOLD_BIT));

      const symbols = parseGen3BattleFrontierSymbols(view, saveBlock1Offset);
      expect(symbols.tower).toEqual({ silver: true, gold: true });
      expect(symbols.dome).toEqual({ silver: true, gold: true });
      expect(symbols.palace).toEqual({ silver: true, gold: true });
      expect(symbols.arena).toEqual({ silver: true, gold: true });
      expect(symbols.factory).toEqual({ silver: true, gold: true });
      expect(symbols.pike).toEqual({ silver: true, gold: true });
      expect(symbols.pyramid).toEqual({ silver: true, gold: true });
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(0); // Too small
      const view = new DataView(buffer);
      expect(() => parseGen3BattleFrontierSymbols(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseGen3BattlePoints', () => {
    it('should correctly parse battle points', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock2Offset = 0x0000;

      view.setUint16(saveBlock2Offset + BATTLE_POINTS_OFFSET, 1337, true);
      expect(parseGen3BattlePoints(view, saveBlock2Offset)).toBe(1337);
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(0);
      const view = new DataView(buffer);
      expect(() => parseGen3BattlePoints(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseGen3TotalBattlePoints', () => {
    it('should correctly parse total battle points', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock2Offset = 0x0000;

      view.setUint16(saveBlock2Offset + TOTAL_BATTLE_POINTS_OFFSET, 9001, true);
      expect(parseGen3TotalBattlePoints(view, saveBlock2Offset)).toBe(9001);
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(0);
      const view = new DataView(buffer);
      expect(() => parseGen3TotalBattlePoints(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseGen3BattleFrontierWinStreaks', () => {
    it('should correctly parse all win streaks', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock2Offset = 0x0000;

      view.setUint16(saveBlock2Offset + TOWER_WIN_STREAKS_OFFSET, 10, true);
      view.setUint16(saveBlock2Offset + TOWER_RECORD_WIN_STREAKS_OFFSET, 50, true);

      view.setUint16(saveBlock2Offset + DOME_WIN_STREAKS_OFFSET, 20, true);
      view.setUint16(saveBlock2Offset + DOME_RECORD_WIN_STREAKS_OFFSET, 60, true);

      view.setUint16(saveBlock2Offset + PALACE_WIN_STREAKS_OFFSET, 30, true);
      view.setUint16(saveBlock2Offset + PALACE_RECORD_WIN_STREAKS_OFFSET, 70, true);

      view.setUint16(saveBlock2Offset + ARENA_WIN_STREAKS_OFFSET, 40, true);
      view.setUint16(saveBlock2Offset + ARENA_RECORD_WIN_STREAKS_OFFSET, 80, true);

      view.setUint16(saveBlock2Offset + FACTORY_WIN_STREAKS_OFFSET, 50, true);
      view.setUint16(saveBlock2Offset + FACTORY_RECORD_WIN_STREAKS_OFFSET, 90, true);

      view.setUint16(saveBlock2Offset + PIKE_WIN_STREAKS_OFFSET, 60, true);
      view.setUint16(saveBlock2Offset + PIKE_RECORD_WIN_STREAKS_OFFSET, 100, true);

      view.setUint16(saveBlock2Offset + PYRAMID_WIN_STREAKS_OFFSET, 70, true);
      view.setUint16(saveBlock2Offset + PYRAMID_RECORD_WIN_STREAKS_OFFSET, 110, true);

      const streaks = parseGen3BattleFrontierWinStreaks(view, saveBlock2Offset);
      expect(streaks.tower).toEqual({ current: 10, record: 50 });
      expect(streaks.dome).toEqual({ current: 20, record: 60 });
      expect(streaks.palace).toEqual({ current: 30, record: 70 });
      expect(streaks.arena).toEqual({ current: 40, record: 80 });
      expect(streaks.factory).toEqual({ current: 50, record: 90 });
      expect(streaks.pike).toEqual({ current: 60, record: 100 });
      expect(streaks.pyramid).toEqual({ current: 70, record: 110 });
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(0);
      const view = new DataView(buffer);
      expect(() => parseGen3BattleFrontierWinStreaks(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
