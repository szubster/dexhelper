import { describe, expect, it } from 'vitest';
import {
  OBEDIENCE_FLAG_BIT,
  RIBBON_ARTIST_BIT,
  RIBBON_BATTLE_CHAMPION_BIT,
  RIBBON_BEAUTY_SHIFT,
  RIBBON_CHAMPION_BIT,
  RIBBON_COOL_SHIFT,
  RIBBON_COUNTRY_BIT,
  RIBBON_CUTE_SHIFT,
  RIBBON_EARTH_BIT,
  RIBBON_EFFORT_BIT,
  RIBBON_NATIONAL_BIT,
  RIBBON_NATIONAL_CHAMPION_BIT,
  RIBBON_RANK_MASK,
  RIBBON_REGIONAL_CHAMPION_BIT,
  RIBBON_SMART_SHIFT,
  RIBBON_TOUGH_SHIFT,
  RIBBON_VICTORY_BIT,
  RIBBON_WINNING_BIT,
  RIBBON_WORLD_BIT,
  RIBBONS_OFFSET_IN_M,
} from './constants';

describe('Gen 3 Ribbon Constants', () => {
  it('should define correct offset for ribbons in substructure M', () => {
    expect(RIBBONS_OFFSET_IN_M).toBe(0x08);
  });

  it('should define correct mask and shifts for contest ribbons', () => {
    expect(RIBBON_RANK_MASK).toBe(0x07);
    expect(RIBBON_COOL_SHIFT).toBe(0);
    expect(RIBBON_BEAUTY_SHIFT).toBe(3);
    expect(RIBBON_CUTE_SHIFT).toBe(6);
    expect(RIBBON_SMART_SHIFT).toBe(9);
    expect(RIBBON_TOUGH_SHIFT).toBe(12);
  });

  it('should define correct bits for special ribbons', () => {
    expect(RIBBON_CHAMPION_BIT).toBe(15);
    expect(RIBBON_WINNING_BIT).toBe(16);
    expect(RIBBON_VICTORY_BIT).toBe(17);
    expect(RIBBON_ARTIST_BIT).toBe(18);
    expect(RIBBON_EFFORT_BIT).toBe(19);
    expect(RIBBON_BATTLE_CHAMPION_BIT).toBe(20);
    expect(RIBBON_REGIONAL_CHAMPION_BIT).toBe(21);
    expect(RIBBON_NATIONAL_CHAMPION_BIT).toBe(22);
    expect(RIBBON_COUNTRY_BIT).toBe(23);
    expect(RIBBON_NATIONAL_BIT).toBe(24);
    expect(RIBBON_EARTH_BIT).toBe(25);
    expect(RIBBON_WORLD_BIT).toBe(26);
  });

  it('should define correct bit for Obedience Flag', () => {
    expect(OBEDIENCE_FLAG_BIT).toBe(31);
  });
});
