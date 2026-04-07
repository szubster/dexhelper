import { fetchAssistantApiData } from './src/engine/assistant/suggestionEngine';
import { SaveData } from './src/engine/saveParser/index';
import { pokeapi } from './src/utils/pokeapi';

const dummySaveData: SaveData = {
  generation: 1,
  currentMapId: 0,
  party: [],
  pc: [],
  owned: new Set(),
  trainerName: 'ASH',
  gameVersion: 'red',
  partyDetails: [],
  pcDetails: [],
  inventory: [],
  badges: 0,
  currentBoxCount: 0,
  playTime: { hours: 0, minutes: 0, seconds: 0, frames: 0 },
  playerId: 0,
  money: 0,
} as unknown as SaveData;

const queryTargets = Array.from({length: 100}, (_, i) => i + 1);

let requestCounts: Record<string, number> = {};

pokeapi.resource = async (url: string) => {
  requestCounts[url] = (requestCounts[url] || 0) + 1;
  if (url.includes('encounters')) return [];
  if (url.includes('pokemon-species')) return { evolution_chain: { url: `fake_chain_url_${Math.floor(parseInt(url.split('/').filter(Boolean).pop()!)/3)}` } };
  if (url.includes('evolution-chain')) return { chain: { species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' }, evolves_to: [{ species: { url: 'https://pokeapi.co/api/v2/pokemon-species/2/' }, evolves_to: [{ species: { url: 'https://pokeapi.co/api/v2/pokemon-species/3/' }, evolves_to: [] }] }] } };
  if (url.includes('location-area')) return { pokemon_encounters: [] };
  return {};
};

async function run() {
  await fetchAssistantApiData(dummySaveData, queryTargets);
  const multipleFetches = Object.entries(requestCounts).filter(([k, v]) => v > 1);
  console.log(`Multiple fetches: ${multipleFetches.length}`);
  if (multipleFetches.length > 0) {
      console.log(multipleFetches.slice(0, 5));
  }
}

run();
