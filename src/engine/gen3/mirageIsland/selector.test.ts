import { describe, expect, it } from 'vitest';
import type { Gen3SaveData } from '../../saveParser/parsers/common.js';
import { getMirageIslandMatch } from './selector.js';

describe('getMirageIslandMatch', () => {
  it('should return found false if no pokemon matches', () => {
    const saveData = {
      partyDetails: [
        { speciesId: 1, level: 5, isShiny: false, isMirageIslandKey: false, moves: [], storageLocation: 'Party' },
      ],
      pcDetails: [
        { speciesId: 25, level: 5, isShiny: false, isMirageIslandKey: false, moves: [], storageLocation: 'Box 1' },
      ],
    } as unknown as Gen3SaveData;

    const result = getMirageIslandMatch(saveData);
    expect(result.found).toBe(false);
  });

  it('should find matching pokemon in party', () => {
    const saveData = {
      partyDetails: [
        { speciesId: 1, level: 5, isShiny: false, isMirageIslandKey: true, moves: [], storageLocation: 'Party' },
      ],
      pcDetails: [],
    } as unknown as Gen3SaveData;

    const result = getMirageIslandMatch(saveData);
    expect(result).toEqual({
      found: true,
      speciesId: 1,
      location: 'Party',
    });
  });

  it('should find matching pokemon in pc box with storageLocation', () => {
    // Put pokemon at index 35 (box 2, slot 5)
    const pcDetails = Array(420).fill(null);
    pcDetails[35] = {
      speciesId: 25,
      level: 5,
      isShiny: false,
      isMirageIslandKey: true,
      moves: [],
      storageLocation: 'CustomBox',
    };

    const saveData = {
      partyDetails: [],
      pcDetails,
    } as unknown as Gen3SaveData;

    const result = getMirageIslandMatch(saveData);
    expect(result).toEqual({
      found: true,
      speciesId: 25,
      location: 'CustomBox',
    });
  });

  it('should fallback to default Box N name if storageLocation is missing', () => {
    const pcDetails = Array(420).fill(null);
    pcDetails[60] = { speciesId: 25, level: 5, isShiny: false, isMirageIslandKey: true, moves: [] }; // Box 3

    const saveData = {
      partyDetails: [],
      pcDetails,
    } as unknown as Gen3SaveData;

    const result = getMirageIslandMatch(saveData);
    expect(result).toEqual({
      found: true,
      speciesId: 25,
      location: 'Box 3',
    });
  });
});
