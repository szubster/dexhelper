import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../../saveParser/index';
import { getMatchCallSuggestions } from './matchCall';

describe('getMatchCallSuggestions', () => {
  it('returns empty array if not emerald', () => {
    const saveData = { gameVersion: 'ruby' } as SaveData;
    expect(getMatchCallSuggestions(saveData)).toEqual([]);
  });

  it('returns empty array if match call is not unlocked', () => {
    const saveData = {
      gameVersion: 'emerald',
      gen3MatchCall: { hasMatchCall: false, rematchStates: [], registeredTrainers: [] },
    } as unknown as SaveData;
    expect(getMatchCallSuggestions(saveData)).toEqual([]);
  });

  it('returns empty array if no rematches are available', () => {
    const saveData = {
      gameVersion: 'emerald',
      gen3MatchCall: { hasMatchCall: true, rematchStates: [0, 0, 0], registeredTrainers: [true, true, true] },
    } as unknown as SaveData;
    expect(getMatchCallSuggestions(saveData)).toEqual([]);
  });

  it('returns a suggestion if rematches are available', () => {
    const saveData = {
      gameVersion: 'emerald',
      gen3MatchCall: { hasMatchCall: true, rematchStates: [0, 2, 0, 5], registeredTrainers: [true, true, true, true] },
    } as unknown as SaveData;
    const result = getMatchCallSuggestions(saveData);
    expect(result).toHaveLength(1);
    expect(result[0]?.category).toBe('Utility');
    expect(result[0]?.title).toBe('Match Call Rematches');
    expect(result[0]?.description).toContain('2 trainers ready for a rematch');
  });
});
