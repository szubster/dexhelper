import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSaveFile } from './index';

describe('Yellow Save Repro', () => {
  it('should parse the user provided yellow save', async () => {
    const savePath = path.resolve(__dirname, '../../../tests/fixtures/yellow-2026-03-30.sav');
    const buffer = fs.readFileSync(savePath);
    const saveData = parseSaveFile(buffer.buffer);

    expect(saveData.gameVersion).toBe('yellow');

    // We can't easily run generateSuggestions because it's async and calls PokeAPI.
    // But we can check the currentMapId.
    expect(saveData.currentMapId).toBe(0x1f); // Route 20
  });
});
