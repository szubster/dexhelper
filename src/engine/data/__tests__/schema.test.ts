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
  });
});
