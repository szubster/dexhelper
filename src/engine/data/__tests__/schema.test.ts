import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ENCOUNTER_METHOD_MAP, type LocationAreaEncounters } from '../../../db/schema';

describe('schema', () => {
  describe('ENCOUNTER_METHOD_MAP', () => {
    it('should contain expected encounter methods including static and roaming-water', () => {
      expect(ENCOUNTER_METHOD_MAP['static']).toBe(19);
      expect(ENCOUNTER_METHOD_MAP['roaming-water']).toBe(20);
      expect(ENCOUNTER_METHOD_MAP['devon-scope']).toBe(21);
      expect(ENCOUNTER_METHOD_MAP['feebas-tile-fishing']).toBe(22);
      expect(ENCOUNTER_METHOD_MAP['walk']).toBe(1);
    });

    it('should preserve walk encounter method m: 1 in generated encounters.jsonl without stripping it to undefined', () => {
      const encountersPath = path.join(process.cwd(), 'data/db/encounters.jsonl');
      const encountersLines = fs.readFileSync(encountersPath, 'utf-8').trim().split('\n');
      const encounters: LocationAreaEncounters[] = encountersLines.map((line) => JSON.parse(line));

      let walkCount = 0;
      let undefinedMethodCount = 0;

      for (const encRecord of encounters) {
        for (const compactEnc of encRecord.enc) {
          for (const detail of compactEnc.d) {
            if (detail.m === 1) {
              walkCount++;
            }
            if (detail.m === undefined) {
              undefinedMethodCount++;
            }
          }
        }
      }

      expect(undefinedMethodCount).toBe(0);
      expect(walkCount).toBeGreaterThan(0);
    });

    it('should map Gen 1 water routes 19, 20, and 21 to their canonical PokeAPI area IDs with valid encounters', () => {
      const encountersPath = path.join(process.cwd(), 'data/db/encounters.jsonl');
      const encountersLines = fs.readFileSync(encountersPath, 'utf-8').trim().split('\n');
      const encounters: LocationAreaEncounters[] = encountersLines.map((line) => JSON.parse(line));

      const route19Encounters: number[] = [];
      const route20Encounters: number[] = [];
      const route21Encounters: number[] = [];

      for (const encRecord of encounters) {
        for (const compactEnc of encRecord.enc) {
          if (compactEnc.aid === 29) {
            route19Encounters.push(encRecord.pid);
          } else if (compactEnc.aid === 30) {
            route20Encounters.push(encRecord.pid);
          } else if (compactEnc.aid === 31) {
            route21Encounters.push(encRecord.pid);
          }
        }
      }

      expect(route19Encounters.length).toBeGreaterThan(0);
      expect(route20Encounters.length).toBeGreaterThan(0);
      expect(route21Encounters.length).toBeGreaterThan(0);
    });
  });
});
