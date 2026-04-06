import { parseSaveFile } from './src/engine/saveParser/index.js';
import fs from 'fs';
const buffer = fs.readFileSync('tests/fixtures/yellow-2026-03-30.sav');
const saveData = parseSaveFile(buffer.buffer);
console.log(JSON.stringify({
  trainerName: saveData.trainerName,
  gameVersion: saveData.gameVersion,
  currentMapId: saveData.currentMapId,
  currentMapName: saveData.currentMapName,
  owned: Array.from(saveData.owned),
  pc: saveData.pc,
  party: saveData.party,
  badges: saveData.badges,
}, null, 2));
