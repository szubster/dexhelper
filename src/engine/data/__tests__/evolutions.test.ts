import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Evolution Data Integrity', () => {
  it('should have correct evolution details for Eevee -> Espeon', () => {
    const dataPath = path.join(process.cwd(), 'data/db/pokemon.jsonl');
    const lines = fs
      .readFileSync(dataPath, 'utf-8')
      .split('\n')
      .filter((l) => l.trim().length > 0);
    const pData = lines.map((l) => JSON.parse(l));

    // Espeon is id 196
    const espeon = pData.find((p: { id: number; det: unknown[] }) => p.id === 196);
    expect(espeon).toBeDefined();

    // Evolution details: time: 1 (day), mh: 160 (but mh might be compacted out if it's 160)
    // Actually, in generate-pokedata.ts, if `mh === 160`, it's compacted out, but `time: 1` should be there.
    expect(espeon.det).toBeDefined();
    expect(espeon.det.some((d: { time?: number; tr?: number; item?: number }) => d.time === 1)).toBe(true);
  });

  it('should have correct evolution details for Eevee -> Flareon', () => {
    const dataPath = path.join(process.cwd(), 'data/db/pokemon.jsonl');
    const lines = fs
      .readFileSync(dataPath, 'utf-8')
      .split('\n')
      .filter((l) => l.trim().length > 0);
    const pData = lines.map((l) => JSON.parse(l));

    // Flareon is id 136
    const flareon = pData.find((p: { id: number; det: unknown[] }) => p.id === 136);
    expect(flareon).toBeDefined();

    // Evolution details: tr: 3 (use-item), item: 82 (fire-stone)
    expect(flareon.det).toBeDefined();
    expect(flareon.det.some((d: { time?: number; tr?: number; item?: number }) => d.tr === 3 && d.item === 82)).toBe(
      true,
    );
  });
});
