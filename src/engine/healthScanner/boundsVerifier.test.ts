import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import { verifyBounds } from './boundsVerifier';

describe('verifyBounds', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-10T12:00:00Z'));
  });

  const createMockPokemon = (overrides: Partial<PokemonInstance>): PokemonInstance => ({
    speciesId: 1,
    level: 5,
    isShiny: false,
    hash: '',
    moves: [1],
    storageLocation: 'Party',
    ...overrides,
  });

  const createMockSaveData = (overrides: Partial<SaveData>): SaveData => ({
    generation: 1,
    owned: new Set(),
    seen: new Set(),
    party: [],
    pc: [],
    partyDetails: [],
    pcDetails: [],
    gameVersion: 'red',
    badges: 0,
    trainerName: 'ASH',
    trainerId: 12345,
    currentMapId: 1,
    inventory: [],
    currentBoxCount: 0,
    hallOfFameCount: 0,
    ...overrides,
  });

  it('should return isValid true when all Pokemon are within bounds', () => {
    const saveData = createMockSaveData({
      generation: 1,
      partyDetails: [createMockPokemon({ speciesId: 1, dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 } })],
      pcDetails: [
        createMockPokemon({
          speciesId: 151,
          storageLocation: 'Box 1',
          slot: 1,
          dvs: { hp: 0, atk: 0, def: 0, spd: 0, spc: 0 },
        }),
      ],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(true);
    expect(result.anomalies).toHaveLength(0);
  });

  it('should report OutOfBoundsId for Gen 1 Pokemon ID > 151', () => {
    const saveData = createMockSaveData({
      generation: 1,
      partyDetails: [createMockPokemon({ speciesId: 152 })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies).toHaveLength(1);
    expect(result.anomalies[0]).toMatchObject({
      code: 'OutOfBoundsId',
      severity: 'Critical',
      location: { type: 'party', index: 0 },
    });
    expect(result.anomalies[0]?.description).toContain('Pokemon ID 152 is out of Gen 1 bounds');
  });

  it('should report OutOfBoundsId for Gen 1 Pokemon ID < 0', () => {
    const saveData = createMockSaveData({
      generation: 1,
      partyDetails: [createMockPokemon({ speciesId: -1 })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies[0]?.code).toBe('OutOfBoundsId');
  });

  it('should not report OutOfBoundsId for Gen 2 Pokemon ID 251', () => {
    const saveData = createMockSaveData({
      generation: 2,
      partyDetails: [createMockPokemon({ speciesId: 251 })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(true);
    expect(result.anomalies).toHaveLength(0);
  });

  it('should report OutOfBoundsId for Gen 2 Pokemon ID > 251', () => {
    const saveData = createMockSaveData({
      generation: 2,
      pcDetails: [createMockPokemon({ speciesId: 252, storageLocation: 'Box 2', slot: 5 })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies[0]).toMatchObject({
      code: 'OutOfBoundsId',
      severity: 'Critical',
      location: { type: 'pc_box', boxNumber: 2, slot: 5 },
    });
    expect(result.anomalies[0]?.description).toContain('Pokemon ID 252 is out of Gen 2 bounds');
  });

  it('should report InvalidStat for DV > 15', () => {
    const saveData = createMockSaveData({
      generation: 1,
      // @ts-expect-error test mock
      daycare: [createMockPokemon({ speciesId: 10, dvs: { hp: 16, atk: 15, def: 15, spd: 15, spc: 15 } })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies).toHaveLength(1);
    expect(result.anomalies[0]).toMatchObject({
      code: 'InvalidStat',
      severity: 'Critical',
      location: { type: 'daycare', index: 0 },
    });
    expect(result.anomalies[0]?.description).toContain('DV for HP is out of bounds');
  });

  it('should report InvalidStat for DV < 0', () => {
    const saveData = createMockSaveData({
      generation: 1,
      partyDetails: [createMockPokemon({ speciesId: 10, dvs: { hp: 10, atk: -1, def: 15, spd: 15, spc: 15 } })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies[0]?.code).toBe('InvalidStat');
    expect(result.anomalies[0]?.description).toContain('DV for ATK is out of bounds');
  });

  it('should handle multiple anomalies in a single scan', () => {
    const saveData = createMockSaveData({
      generation: 1,
      partyDetails: [createMockPokemon({ speciesId: 152, dvs: { hp: 16, atk: 15, def: 16, spd: 15, spc: -1 } })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies).toHaveLength(4); // One for ID, three for DV
    expect(result.anomalies.map((a) => a.code)).toEqual(['OutOfBoundsId', 'InvalidStat', 'InvalidStat', 'InvalidStat']);
  });

  it('should test remaining stat anomalies', () => {
    const saveData = createMockSaveData({
      generation: 1,
      partyDetails: [createMockPokemon({ speciesId: 1, dvs: { hp: 15, atk: 15, def: 16, spd: 16, spc: 16 } })],
    });

    const result = verifyBounds(saveData);

    expect(result.isValid).toBe(false);
    expect(result.anomalies).toHaveLength(3);
    const descriptions = result.anomalies.map((a) => a.description);
    expect(descriptions[0]).toContain('DV for DEF is out of bounds');
    expect(descriptions[1]).toContain('DV for SPD is out of bounds');
    expect(descriptions[2]).toContain('DV for SPC is out of bounds');
  });
});
