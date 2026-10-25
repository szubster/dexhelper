import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isGen3Save } from '../../../src/engine/saveParser/utils/detection';

describe('Gen 3 Heuristic Integration', () => {
  const getBuffer = (filename: string) => {
    const filePath = join(__dirname, '../../fixtures', filename);
    const buffer = readFileSync(filePath);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  };

  it('should correctly identify emerald.sav as a Gen 3 save', () => {
    const view = new DataView(getBuffer('emerald.sav'));
    expect(isGen3Save(view)).toBe(true);
  });

  it('should correctly identify ruby-vithuang.sav as a Gen 3 save', () => {
    const view = new DataView(getBuffer('ruby-vithuang.sav'));
    expect(isGen3Save(view)).toBe(true);
  });

  it('should correctly identify firered.sav as a Gen 3 save', () => {
    const view = new DataView(getBuffer('firered.sav'));
    expect(isGen3Save(view)).toBe(true);
  });

  it('should not identify Gen 1 save (red.sav) as Gen 3', () => {
    const view = new DataView(getBuffer('red.sav'));
    expect(isGen3Save(view)).toBe(false);
  });

  it('should not identify Gen 2 save (crystal.sav) as Gen 3', () => {
    const view = new DataView(getBuffer('crystal.sav'));
    expect(isGen3Save(view)).toBe(false);
  });
});
