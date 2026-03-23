import { describe, it, expect } from 'vitest';
import { generateSuggestions } from './useAssistant';
import { SaveData } from '../utils/saveParser';

describe('useAssistant - generateSuggestions logic', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'yellow',
    trainerName: 'YELLOW',
    trainerId: 12345,
    badges: 0,
    owned: new Set([25]), // Only Pikachu
    seen: new Set([25]),
    party: [25],
    pc: [],
    inventory: [],
    currentMapId: 0,
    currentBoxCount: 1,
    hallOfFameCount: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ 
        speciesId: 25, 
        level: 5, 
        otName: 'YELLOW', 
        moves: [], 
        isShiny: false, 
        dvs: { hp: 10, atk: 10, def: 10, spd: 10, spc: 10 },
        storageLocation: 'Party' 
    }],
    pcDetails: []
  };

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {
      39: [], // Jigglypuff 
      40: [], // Wigglytuff
      62: []  // Poliwrath
    },
    ancestralEncounters: {
      40: {
          39: [{ version_details: [{ version: { name: 'yellow' } }] }] // Jigglypuff is catchable in Yellow
      },
      62: {
          60: [{ version_details: [{ version: { name: 'yellow' } }] }], // Poliwag catchable
          61: [] // Poliwhirl not directly catchable in this mock
      }
    },
    missingChains: {
      39: { chain: { species: { url: 'https://pokeapi.co/api/v2/pokemon-species/39/' }, evolves_to: [] } },
      40: { chain: { species: { url: 'https://pokeapi.co/api/v2/pokemon-species/39/' }, evolves_to: [] } },
      62: { chain: { species: { url: 'https://pokeapi.co/api/v2/pokemon-species/60/' }, evolves_to: [] } }
    },
    partyEvolutions: {}
  };

  it('should NOT mark Wigglytuff as Trade Required in Pokémon Yellow (ancestor logic)', () => {
    const suggestions = generateSuggestions(mockSaveData, false, 'yellow', mockApiData);
    const wigglyTrade = suggestions.find(s => s.pokemonId === 40 && s.category === 'Trade');
    expect(wigglyTrade).toBeUndefined();
  });

  it('should NOT mark Poliwrath as Trade Required in Pokémon Yellow if Poliwag is catchable', () => {
    const suggestions = generateSuggestions(mockSaveData, false, 'yellow', mockApiData);
    const poliTrade = suggestions.find(s => s.pokemonId === 62 && s.category === 'Trade');
    expect(poliTrade).toBeUndefined();
  });

  it('should mark Version Exclusives as Trade Required', () => {
    const exclusiveApiData = {
      ...mockApiData,
      missingEncounters: {
        13: [] 
      },
      ancestralEncounters: {
        13: {} // No ancestors catchable either
      },
      missingChains: {
        13: { chain: { species: { url: 'https://pokeapi.co/api/v2/pokemon-species/13/' }, evolves_to: [] } }
      }
    };
    
    const suggestions = generateSuggestions(mockSaveData, false, 'yellow', exclusiveApiData);
    const weedleTrade = suggestions.find(s => s.pokemonId === 13 && s.category === 'Trade');
    expect(weedleTrade).toBeDefined();
    expect(weedleTrade?.title).toContain('Version Exclusive');
  });
});
