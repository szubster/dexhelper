import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSaveFile } from '../../saveParser/index';

describe('suggestionEngine - Jynx Double Suggestion Repro', () => {
  const savPath = resolve(
    __dirname,
    '../../../../tests/fixtures/yellow-2026-03-30.sav',
  );

  it('should load and parse the save file', () => {
    console.log('Path:', savPath);
    expect(existsSync(savPath)).toBe(true);

    const buffer = readFileSync(savPath);
    console.log('Loaded, size:', buffer.byteLength);

    const saveData = parseSaveFile(buffer.buffer);
    console.log(
      'Parsed. Version:',
      saveData.gameVersion,
      'Trainer:',
      saveData.trainerName,
    );

    expect(saveData.generation).toBe(1);
    expect(saveData.gameVersion).toBe('yellow');
  });
});
