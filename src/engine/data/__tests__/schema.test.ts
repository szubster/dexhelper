import { describe, expect, it } from 'vitest';
import { ENCOUNTER_METHOD_MAP } from '../../../db/schema';

describe('schema', () => {
  describe('ENCOUNTER_METHOD_MAP', () => {
    it('should contain expected encounter methods including static and roaming-water', () => {
      expect(ENCOUNTER_METHOD_MAP['static']).toBe(19);
      expect(ENCOUNTER_METHOD_MAP['roaming-water']).toBe(20);
      expect(ENCOUNTER_METHOD_MAP['devon-scope']).toBe(21);
      expect(ENCOUNTER_METHOD_MAP['feebas-tile-fishing']).toBe(22);
      expect(ENCOUNTER_METHOD_MAP['walk']).toBe(1);
    });
  });
});
