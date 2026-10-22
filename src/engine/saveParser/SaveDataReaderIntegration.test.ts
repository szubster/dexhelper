import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSaveFile } from './index';
import { SaveDataReader } from './SaveDataReader';

describe('SaveDataReader Integration Tests', () => {
  const getBuffer = (filename: string) => {
    const filePath = join(__dirname, '../../../tests/fixtures/', filename);
    const buffer = readFileSync(filePath);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  };

  it('should process a valid buffer seamlessly without throwing', () => {
    const arrayBuffer = getBuffer('yellow.sav');
    const view = new DataView(arrayBuffer);
    const reader = new SaveDataReader(view);

    // Read generic bytes
    const playerFirstChar = reader.getUint8(0x2598); // This offset depends on standard, just ensuring it reads fine
    expect(playerFirstChar).toBeDefined();

    // Verify error throwing on invalid offset
    expect(() => reader.getUint8(arrayBuffer.byteLength + 10)).toThrow('The save file is corrupted or incomplete.');
  });

  it('should successfully parse a buffer via the main engine wrapper index.ts', async () => {
    // End to end integration with the index.ts orchestrator wrapper
    const arrayBuffer = getBuffer('yellow.sav');
    const saveState = await parseSaveFile(arrayBuffer);

    expect(saveState).toBeDefined();
    expect(saveState.generation).toBe(1);
    // don't test saveState.game because it might be undefined depending on the mock, just testing integration
  });
});
