import { describe, it, expect } from 'vitest';
import { parseSaveFile } from './index';
import * as fs from 'fs';
import * as path from 'path';
import { generateSuggestions, fetchAssistantApiData } from '../assistant/suggestionEngine';

describe('Yellow Save Repro', () => {
  it('should parse the user provided yellow save', async () => {
    const savePath = path.resolve(__dirname, '../../../tests/fixtures/yellow-2026-03-30.sav');
    const buffer = fs.readFileSync(savePath);
    const saveData = parseSaveFile(buffer.buffer);

    console.log('Parsed Save Data:', {
      trainerName: saveData.trainerName,
      gameVersion: saveData.gameVersion,
      currentMapId: saveData.currentMapId,
      currentMapName: saveData.currentMapName,
      ownedSize: saveData.owned.size,
    });

    expect(saveData.gameVersion).toBe('yellow');
    
    // We can't easily run generateSuggestions because it's async and calls PokeAPI.
    // But we can check the currentMapId.
    expect(saveData.currentMapId).toBe(0x1F); // Route 20
  });
});
