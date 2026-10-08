import { describe, expect, it } from 'vitest';
import {
  CONDITION_BEAUTY_OFFSET,
  CONDITION_COOL_OFFSET,
  CONDITION_CUTE_OFFSET,
  CONDITION_SHEEN_OFFSET,
  CONDITION_SMART_OFFSET,
  CONDITION_TOUGH_OFFSET,
} from './constants';
import { parseGen3ConditionStats } from './parser';

describe('parseGen3ConditionStats', () => {
  it('correctly extracts condition stats', () => {
    const buffer = new ArrayBuffer(20);
    const view = new DataView(buffer);
    const offset = 0;

    view.setUint8(offset + CONDITION_COOL_OFFSET, 100);
    view.setUint8(offset + CONDITION_BEAUTY_OFFSET, 150);
    view.setUint8(offset + CONDITION_CUTE_OFFSET, 50);
    view.setUint8(offset + CONDITION_SMART_OFFSET, 200);
    view.setUint8(offset + CONDITION_TOUGH_OFFSET, 255);
    view.setUint8(offset + CONDITION_SHEEN_OFFSET, 10);

    const stats = parseGen3ConditionStats(view, offset);
    expect(stats.cool).toBe(100);
    expect(stats.beauty).toBe(150);
    expect(stats.cute).toBe(50);
    expect(stats.smart).toBe(200);
    expect(stats.tough).toBe(255);
    expect(stats.sheen).toBe(10);
  });

  it('correctly extracts condition stats with non-zero offset', () => {
    const buffer = new ArrayBuffer(50);
    const view = new DataView(buffer);
    const offset = 24;

    view.setUint8(offset + CONDITION_COOL_OFFSET, 255);
    view.setUint8(offset + CONDITION_BEAUTY_OFFSET, 255);
    view.setUint8(offset + CONDITION_CUTE_OFFSET, 255);
    view.setUint8(offset + CONDITION_SMART_OFFSET, 255);
    view.setUint8(offset + CONDITION_TOUGH_OFFSET, 255);
    view.setUint8(offset + CONDITION_SHEEN_OFFSET, 255);

    const stats = parseGen3ConditionStats(view, offset);
    expect(stats.cool).toBe(255);
    expect(stats.beauty).toBe(255);
    expect(stats.cute).toBe(255);
    expect(stats.smart).toBe(255);
    expect(stats.tough).toBe(255);
    expect(stats.sheen).toBe(255);
  });

  it('throws an error for incomplete buffers', () => {
    const buffer = new ArrayBuffer(5); // Too small
    const view = new DataView(buffer);
    expect(() => parseGen3ConditionStats(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});
