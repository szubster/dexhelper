import { describe, it, expect } from 'vitest';
import { parseCliArgs } from './foundry-backfill-stats.ts';

describe('foundry-backfill-stats CLI args parser', () => {
  it('parses --daily flag correctly', () => {
    const values = parseCliArgs(['--daily']);
    expect(values.daily).toBe(true);
    expect(values.commit).toBeUndefined();
  });

  it('parses --commit <sha> flag correctly', () => {
    const values = parseCliArgs(['--commit', 'abcdef123456']);
    expect(values.commit).toBe('abcdef123456');
    expect(values.daily).toBeUndefined();
  });

  it('parses --help flag correctly', () => {
    const values = parseCliArgs(['--help']);
    expect(values.help).toBe(true);
  });

  it('throws an error for unknown arguments', () => {
    expect(() => parseCliArgs(['--unknown'])).toThrow(/Unknown option/);
  });
});
