import { describe, it, expect } from 'vitest';
import { parseSaveFile } from '../../saveParser/index';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

describe('suggestionEngine - Jynx Double Suggestion Repro', () => {
  const savPath = resolve(__dirname, '../../../../tests/fixtures/yellow-2026-03-30.sav');
  
  it('should load and parse the save file', () => {
    console.log('Path:', savPath);
    expect(existsSync(savPath)).toBe(true);
    
    const buffer = readFileSync(savPath);
    console.log('Loaded, size:', buffer.byteLength);
    
    const saveData = parseSaveFile(buffer.buffer);
    console.log('Parsed. Version:', saveData.gameVersion, 'Trainer:', saveData.trainerName);
    
    expect(saveData.generation).toBe(1);
    expect(saveData.gameVersion).toBe('yellow');
  });
});
