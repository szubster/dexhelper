import { describe, expect, it } from 'vitest';
import { isGen3Save, parseGen3 } from './gen3';

describe('gen3 parser scaffolding', () => {
  it('isGen3Save should return false', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    expect(isGen3Save(view)).toBe(false);
  });

  it('parseGen3 should throw an error', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    expect(() => parseGen3(view)).toThrowError('Gen 3 parsing not implemented yet');
  });
});
