import { fetchAssistantApiData } from './src/engine/assistant/suggestionEngine';
import { SaveData } from './src/engine/saveParser/index';
import { pokeapi } from './src/utils/pokeapi';

const dummySaveData: SaveData = {
  generation: 1,
  currentMapId: 0,
  party: [4, 5, 6],
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

const queryTargets = Array.from({length: 30}, (_, i) => i + 1);

let callCount = 0;
const originalResource = pokeapi.resource;
pokeapi.resource = async (url: string) => {
  callCount++;
  return originalResource(url);
};

async function run() {
  const start = performance.now();
  await fetchAssistantApiData(dummySaveData, queryTargets);
  const end = performance.now();
  console.log(`Duration: ${end - start}ms`);
  console.log(`pokeapi.resource called ${callCount} times`);
  process.exit(0);
}

run();
