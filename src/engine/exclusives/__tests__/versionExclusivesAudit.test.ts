import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { POKE_VERSION_MAP } from '../../../db/schema';
import { GEN1_VERSION_EXCLUSIVES } from '../gen1Exclusives';
import { GEN2_VERSION_EXCLUSIVES } from '../gen2Exclusives';
import { GEN3_VERSION_EXCLUSIVES } from '../gen3Exclusives';

interface RawEncounterDetail {
  c: number;
  m: number;
  min: number;
  t?: number;
}

interface RawEncounter {
  aid: number;
  v: number;
  d: RawEncounterDetail[];
}

interface RawPokemonEncounter {
  pid: number;
  enc: RawEncounter[];
}

describe('Version Exclusives Audit', () => {
  const encountersFilePath = path.resolve(process.cwd(), 'data/db/encounters.jsonl');
  const encountersLines = fs.readFileSync(encountersFilePath, 'utf-8').split('\n').filter(Boolean);

  const encountersByPokemon = new Map<number, Set<number>>();
  for (const line of encountersLines) {
    const data: RawPokemonEncounter = JSON.parse(line);
    const vSet = new Set<number>();
    for (const enc of data.enc || []) {
      if (enc.d && enc.d.length > 0) {
        vSet.add(enc.v);
      }
    }
    encountersByPokemon.set(data.pid, vSet);
  }

  const allExclusives: Record<string, number[]> = {
    ...GEN1_VERSION_EXCLUSIVES,
    ...GEN2_VERSION_EXCLUSIVES,
    ...GEN3_VERSION_EXCLUSIVES,
  };

  for (const [versionName, vId] of Object.entries(POKE_VERSION_MAP)) {
    it(`should ensure missing unobtainable Pokémon for ${versionName} (v=${vId}) have no wild encounters in encounters.jsonl`, () => {
      const missingList = allExclusives[versionName] || [];
      expect(missingList.length).toBeGreaterThan(0);

      const invalidEncounters: number[] = [];
      for (const pid of missingList) {
        const wildVersions = encountersByPokemon.get(pid);
        if (wildVersions?.has(vId)) {
          invalidEncounters.push(pid);
        }
      }

      expect(
        invalidEncounters,
        `Pokémon IDs ${invalidEncounters.join(', ')} are listed as unobtainable version exclusives in ${versionName}, but have wild encounters recorded in encounters.jsonl!`,
      ).toEqual([]);
    });
  }
});
