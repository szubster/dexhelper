import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../../saveParser/index';
import { getRoamerSuggestions } from './roamer';

describe('getRoamerSuggestions', () => {
  const raikou = { id: 243, name: 'Raikou' };
  const entei = { id: 244, name: 'Entei' };
  const suicune = { id: 245, name: 'Suicune' };
  const allRoamers = [raikou, entei, suicune];

  it('returns suggestions for missing roamers with correct category, priority, and untracked description when untracked', () => {
    const missingSet = new Set([243, 244]);
    const saveData = {
      generation: 2,
      roamingLegendaries: [
        { speciesId: 243, mapId: 0 }, // untracked
      ],
    } as SaveData;

    const suggestions = getRoamerSuggestions(saveData, missingSet, allRoamers);

    expect(suggestions).toHaveLength(2);
    expect(suggestions[0]).toEqual({
      id: 'roamer-243',
      category: 'Catch',
      title: 'Track Raikou',
      description: 'Encounter Raikou in the wild, then use your Pokédex to track its location!',
      pokemonId: 243,
      priority: 85,
    });
    expect(suggestions[1]).toEqual({
      id: 'roamer-244',
      category: 'Catch',
      title: 'Track Entei',
      description: 'Encounter Entei in the wild, then use your Pokédex to track its location!',
      pokemonId: 244,
      priority: 85,
    });
  });

  it('returns tracked description when roamer mapId is non-zero', () => {
    const missingSet = new Set([243]);
    const saveData = {
      generation: 2,
      roamingLegendaries: [{ speciesId: 243, mapId: 15 }], // tracked
    } as SaveData;

    const suggestions = getRoamerSuggestions(saveData, missingSet, allRoamers);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toEqual({
      id: 'roamer-243',
      category: 'Catch',
      title: 'Track Raikou',
      description: 'Raikou is currently roaming! Check your Pokédex to see its current route.',
      pokemonId: 243,
      priority: 85,
    });
  });

  it('handles saveData when roamingLegendaries is undefined or null', () => {
    const missingSet = new Set([243]);
    const saveData = {
      generation: 2,
    } as SaveData;

    const suggestions = getRoamerSuggestions(saveData, missingSet, allRoamers);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.description).toBe(
      'Encounter Raikou in the wild, then use your Pokédex to track its location!',
    );
  });

  it('skips roamers that are not in missingSet', () => {
    const missingSet = new Set([244]); // only Entei missing
    const saveData = {
      generation: 2,
      roamingLegendaries: [
        { speciesId: 243, mapId: 10 },
        { speciesId: 244, mapId: 12 },
      ],
    } as SaveData;

    const suggestions = getRoamerSuggestions(saveData, missingSet, allRoamers);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.pokemonId).toBe(244);
  });

  it('suppresses Suicune (245) when isCrystal is true', () => {
    const missingSet = new Set([243, 244, 245]);
    const saveData = {
      generation: 2,
      gameVersion: 'crystal',
      roamingLegendaries: [
        { speciesId: 243, mapId: 10 },
        { speciesId: 244, mapId: 12 },
        { speciesId: 245, mapId: 14 },
      ],
    } as SaveData;

    const suggestions = getRoamerSuggestions(saveData, missingSet, allRoamers, true);

    expect(suggestions).toHaveLength(2);
    expect(suggestions.some((s) => s.pokemonId === 245)).toBe(false);
  });

  it('does not suppress Suicune (245) when isCrystal is false', () => {
    const missingSet = new Set([245]);
    const saveData = {
      generation: 2,
      gameVersion: 'gold',
      roamingLegendaries: [{ speciesId: 245, mapId: 14 }],
    } as SaveData;

    const suggestions = getRoamerSuggestions(saveData, missingSet, allRoamers, false);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.pokemonId).toBe(245);
  });
});
