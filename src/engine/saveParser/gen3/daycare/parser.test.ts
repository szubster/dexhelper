import { describe, expect, it } from 'vitest';
import { parseGen3Daycare } from './parser';

describe('parseGen3Daycare', () => {
  it('should parse daycare data for ruby/sapphire correctly', () => {
    // 128 KB buffer
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);
    // Let's test standard bounds. The parser will try to decrypt things, so for simple test, let's just make sure it doesn't crash

    const res = parseGen3Daycare(view, 0, 'ruby');
    expect(res.mons).toEqual([]);
    expect(res.offspringPersonality).toBe(0);
    expect(res.stepCounter).toBe(0);
  });

  it('should throw RangeError for corrupted save file', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3Daycare(view, 0, 'emerald')).toThrow('The save file is corrupted or incomplete.');
  });
});
