import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { describe, expect, it } from 'vitest';
import type { LocationAreaEncounters } from '../schema';

describe('Oak Data Integrity: Missing Johto Mappings', () => {
  it('Sudowoodo (185) should exist in encounters via squirt-bottle (method 16)', () => {
    const data = nodeFs.readFileSync(nodePath.resolve(__dirname, '../../../data/db/encounters.jsonl'), 'utf-8');
    const encountersData = data
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as LocationAreaEncounters);

    const sudo = encountersData.find((p) => p.pid === 185);
    expect(sudo).toBeDefined();

    const hasSquirtBottle = sudo?.enc.some((e) => e.d.some((detail) => detail.m === 16));
    expect(hasSquirtBottle).toBe(true);
  });

  it('Raikou (243) should exist in encounters via roaming-grass (method 17)', () => {
    const data = nodeFs.readFileSync(nodePath.resolve(__dirname, '../../../data/db/encounters.jsonl'), 'utf-8');
    const encountersData = data
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as LocationAreaEncounters);

    const raikou = encountersData.find((p) => p.pid === 243);
    expect(raikou).toBeDefined();

    const hasRoamingGrass = raikou?.enc.some((e) => e.d.some((detail) => detail.m === 17));
    expect(hasRoamingGrass).toBe(true);
  });

  it('Entei (244) should exist in encounters via roaming-grass (method 17)', () => {
    const data = nodeFs.readFileSync(nodePath.resolve(__dirname, '../../../data/db/encounters.jsonl'), 'utf-8');
    const encountersData = data
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as LocationAreaEncounters);

    const entei = encountersData.find((p) => p.pid === 244);
    expect(entei).toBeDefined();

    const hasRoamingGrass = entei?.enc.some((e) => e.d.some((detail) => detail.m === 17));
    expect(hasRoamingGrass).toBe(true);
  });

  it('Suicune (245) should exist in encounters via roaming-grass (method 17)', () => {
    const data = nodeFs.readFileSync(nodePath.resolve(__dirname, '../../../data/db/encounters.jsonl'), 'utf-8');
    const encountersData = data
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as LocationAreaEncounters);

    const suicune = encountersData.find((p) => p.pid === 245);
    expect(suicune).toBeDefined();

    const hasRoamingGrass = suicune?.enc.some((e) => e.d.some((detail) => detail.m === 17));
    expect(hasRoamingGrass).toBe(true);
  });
});
