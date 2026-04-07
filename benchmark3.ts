import { fetchAssistantApiData } from './src/engine/assistant/suggestionEngine';
import { SaveData } from './src/engine/saveParser/index';

const dummySaveData: SaveData = {
  generation: 1,
  currentMapId: 0,
  party: [4, 5, 6], // Add some party to test
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

async function run() {
  const start = performance.now();
  console.log("Starting fetchAssistantApiData");
  await fetchAssistantApiData(dummySaveData, queryTargets);
  const end = performance.now();
  console.log(`Duration: ${end - start}ms`);
  process.exit(0);
}

run();
