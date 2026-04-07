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

const queryTargets = Array.from({length: 151}, (_, i) => i + 1);

let activePromises = 0;
let maxConcurrent = 0;

pokeapi.resource = async (url: string) => {
  activePromises++;
  if (activePromises > maxConcurrent) {
    maxConcurrent = activePromises;
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 10));

  activePromises--;

  if (url.includes('encounters')) return [];
  if (url.includes('pokemon-species')) return { evolution_chain: { url: 'fake_chain_url' } };
  if (url.includes('evolution-chain')) return { chain: { species: { url: 'fake/1/' }, evolves_to: [{ species: { url: 'fake/2/' }, evolves_to: [{ species: { url: 'fake/3/' }, evolves_to: [] }] }] } };
  if (url.includes('location-area')) return { pokemon_encounters: [] };
  return {};
};

async function run() {
  const start = performance.now();
  await fetchAssistantApiData(dummySaveData, queryTargets);
  const end = performance.now();
  console.log(`Duration: ${end - start}ms`);
  console.log(`Max Concurrent Requests: ${maxConcurrent}`);
  process.exit(0);
}

run();
