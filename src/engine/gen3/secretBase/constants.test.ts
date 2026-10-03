import * as Constants from '@dexhelper/core';
import { describe, expect, it } from 'vitest';

describe('Secret Base Constants', () => {
  it('should have correct values for Secret Base counts and offsets', () => {
    expect(Constants.SECRET_BASES_COUNT).toBe(20);
    expect(Constants.SECRET_BASE_SIZE).toBe(160);
    expect(Constants.SECRET_BASE_OFFSET_RS).toBe(0x1a08);
    expect(Constants.SECRET_BASE_OFFSET_EMERALD).toBe(0x1a9c);
  });

  it('should have correct values for Secret Base flags and IDs', () => {
    expect(Constants.SECRET_BASE_MAP_ID_DIVISOR).toBe(10);
    expect(Constants.FLAGS_OFFSET).toBe(0x01);
    expect(Constants.BATTLED_OWNER_TODAY_MASK).toBe(1 << 5);
    expect(Constants.EMPTY_SECRET_BASE_ID).toBe(0);
    expect(Constants.FLAG_FALSE).toBe(0);
  });

  it('should have correct values for Trainer offsets', () => {
    expect(Constants.TRAINER_NAME_OFFSET).toBe(0x02);
    expect(Constants.TRAINER_NAME_LENGTH).toBe(7);
    expect(Constants.TRAINER_ID_OFFSET).toBe(0x09);
  });

  it('should have correct values for Party offsets and sizes', () => {
    expect(Constants.PARTY_OFFSET).toBe(0x34);
    expect(Constants.PARTY_COUNT).toBe(6);

    expect(Constants.POKEMON_PERSONALITY_OFFSET).toBe(0x00);
    expect(Constants.POKEMON_MOVES_OFFSET).toBe(0x18);
    expect(Constants.POKEMON_SPECIES_OFFSET).toBe(0x48);
    expect(Constants.POKEMON_HELD_ITEM_OFFSET).toBe(0x54);
    expect(Constants.POKEMON_LEVEL_OFFSET).toBe(0x60);
    expect(Constants.POKEMON_EVS_OFFSET).toBe(0x66);

    expect(Constants.POKEMON_MOVES_COUNT).toBe(4);
    expect(Constants.POKEMON_MOVE_SIZE).toBe(2);
    expect(Constants.POKEMON_PERSONALITY_SIZE).toBe(4);
    expect(Constants.POKEMON_SPECIES_SIZE).toBe(2);
    expect(Constants.POKEMON_HELD_ITEM_SIZE).toBe(2);
    expect(Constants.POKEMON_LEVEL_SIZE).toBe(1);
    expect(Constants.POKEMON_EVS_SIZE).toBe(1);
  });

  it('should have correct values for Decoration offsets', () => {
    expect(Constants.DECOR_MAX_SECRET_BASE).toBe(16);
    expect(Constants.NUM_SECRET_BASES_RECEIVED_OFFSET).toBe(0x0e);
    expect(Constants.NUM_TIMES_ENTERED_OFFSET).toBe(0x10);
    expect(Constants.DECORATIONS_OFFSET).toBe(0x12);
    expect(Constants.DECORATION_POSITIONS_OFFSET).toBe(0x22);
  });
});
