import { describe, expect, it } from 'vitest';
import {
  determineGen2HeldItemProbabilities,
  extractGen2WildEncounterArea,
  GEN2_WILD_GRASS_CHANCES,
  GEN2_WILD_WATER_CHANCES,
  parseGen2WildEncounterProbabilities,
} from '../gen2Wild';

describe('gen2Wild', () => {
  describe('parseGen2WildEncounterProbabilities', () => {
    it('should map grass encounter chances correctly', () => {
      const slots = Array.from({ length: 7 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 2, maxLevel: 5 }));
      const encounters = parseGen2WildEncounterProbabilities('grass', slots);

      expect(encounters).toHaveLength(7);
      expect(encounters[0]?.chance).toBe(30);
      expect(encounters[1]?.chance).toBe(30);
      expect(encounters[6]?.chance).toBe(1);
    });

    it('should map water encounter chances correctly', () => {
      const slots = Array.from({ length: 3 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 5, maxLevel: 35 }));
      const encounters = parseGen2WildEncounterProbabilities('water', slots);

      expect(encounters).toHaveLength(3);
      expect(encounters[0]?.chance).toBe(60);
      expect(encounters[1]?.chance).toBe(30);
      expect(encounters[2]?.chance).toBe(10);
    });

    it('should handle slot array being larger than chance array length', () => {
      const slots = Array.from({ length: 10 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 2, maxLevel: 5 }));
      const encounters = parseGen2WildEncounterProbabilities('grass', slots);

      expect(encounters).toHaveLength(10);
      expect(encounters[0]?.chance).toBe(30);
      expect(encounters[9]?.chance).toBe(0); // Out of bounds chance array
    });

    it('should fall back to 0 chance if chances[index] is undefined', () => {
      const originalValue = GEN2_WILD_GRASS_CHANCES[0];
      // biome-ignore lint/suspicious/noExplicitAny: deliberate modification for test coverage
      delete (GEN2_WILD_GRASS_CHANCES as any)[0];

      const slots = [{ pokemonId: 1, minLevel: 2, maxLevel: 5 }];
      const encounters = parseGen2WildEncounterProbabilities('grass', slots);

      expect(encounters[0]?.chance).toBe(0);

      if (originalValue !== undefined) {
        GEN2_WILD_GRASS_CHANCES[0] = originalValue;
      }
    });
  });

  describe('determineGen2HeldItemProbabilities', () => {
    it('should return 25% combined chance if common and rare items are identical', () => {
      const drops = determineGen2HeldItemProbabilities(15, 15);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(25); // 23 + 2
    });

    it('should return correct probabilities for distinct items', () => {
      const drops = determineGen2HeldItemProbabilities(15, 20);
      expect(drops).toHaveLength(2);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(23);
      expect(drops[1]?.itemId).toBe(20);
      expect(drops[1]?.chance).toBe(2);
    });

    it('should handle missing rare item', () => {
      const drops = determineGen2HeldItemProbabilities(15, 0);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(23);
    });

    it('should handle missing common item', () => {
      const drops = determineGen2HeldItemProbabilities(0, 15);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(2);
    });

    it('should handle no items', () => {
      const drops = determineGen2HeldItemProbabilities(0, 0);
      expect(drops).toHaveLength(0);
    });
  });
});

describe('extractGen2WildEncounterArea', () => {
  it('should extract a valid grass encounter area', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);

    // Slot 1 (Level 5 Pidgey #16)
    view.setUint8(0, 5);
    view.setUint8(1, 16);

    // Slot 2 (Level 4 Rattata #19)
    view.setUint8(2, 4);
    view.setUint8(3, 19);

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'grass');

    expect(area.areaId).toBe(1);
    expect(area.method).toBe('grass');
    expect(area.encounters).toHaveLength(2);
    expect(area.encounters[0]).toEqual({
      chance: 30,
      pokemonId: 16,
      minLevel: 5,
      maxLevel: 5,
    });
  });

  it('should throw corrupted error on out of bounds', () => {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);

    expect(() => extractGen2WildEncounterArea(view, 10, 1, 1, 'grass')).toThrow(
      'The save file is corrupted or incomplete.',
    );
  });
});

describe('extractGen2WildEncounterArea - water', () => {
  it('should extract a valid water encounter area', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);

    // Slot 1 (Level 15 Tentacool #72)
    view.setUint8(0, 15);
    view.setUint8(1, 72);

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'water');

    expect(area.areaId).toBe(1);
    expect(area.method).toBe('water');
    expect(area.encounters).toHaveLength(1);
    expect(area.encounters[0]).toEqual({
      chance: 60,
      pokemonId: 72,
      minLevel: 15,
      maxLevel: 15,
    });
  });
});

describe('extractGen2WildEncounterArea - edge cases', () => {
  it('should extract when some slots are empty', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);

    // Slot 1 (empty)
    view.setUint8(0, 0);
    view.setUint8(1, 0);

    // Slot 2 (Level 4 Rattata #19)
    view.setUint8(2, 4);
    view.setUint8(3, 19);

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'grass');

    expect(area.encounters).toHaveLength(1);
    expect(area.encounters[0]).toEqual({
      chance: 30, // Corresponds to the 2nd slot chance which is 30
      pokemonId: 19,
      minLevel: 4,
      maxLevel: 4,
    });
  });
});

describe('extractGen2WildEncounterArea - more cases', () => {
  it('should throw other errors', () => {
    const fakeView = {
      getUint8: () => {
        throw new Error('Some random error');
      },
    } as unknown as DataView;

    expect(() => extractGen2WildEncounterArea(fakeView, 0, 1, 1, 'grass')).toThrow('Some random error');
  });
});

describe('extractGen2WildEncounterArea - missing chance fallback', () => {
  it('should extract when chance falls back to 0', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);

    view.setUint8(0, 4);
    view.setUint8(1, 19);

    const original = GEN2_WILD_GRASS_CHANCES[0];
    // biome-ignore lint/suspicious/noExplicitAny: deliberate modification for test coverage
    delete (GEN2_WILD_GRASS_CHANCES as any)[0];

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'grass');

    expect(area.encounters[0]).toEqual({
      chance: 0,
      pokemonId: 19,
      minLevel: 4,
      maxLevel: 4,
    });

    if (original !== undefined) {
      GEN2_WILD_GRASS_CHANCES[0] = original;
    }
  });
});

describe('extractGen2WildEncounterArea - missing chance fallback 2', () => {
  const { extractGen2WildEncounterArea, GEN2_WILD_WATER_CHANCES } = require('../gen2Wild.ts');
  it('should extract when water chance falls back to 0', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);

    view.setUint8(0, 4);
    view.setUint8(1, 19);

    const original = GEN2_WILD_WATER_CHANCES[0];
    // biome-ignore lint/suspicious/noExplicitAny: deliberate modification for test coverage
    delete (GEN2_WILD_WATER_CHANCES as any)[0];

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'water');

    expect(area.encounters[0]).toEqual({
      chance: 0,
      pokemonId: 19,
      minLevel: 4,
      maxLevel: 4,
    });

    if (original !== undefined) {
      GEN2_WILD_WATER_CHANCES[0] = original;
    }
  });
});

describe('extractGen2WildEncounterArea - missing chance fallback 3', () => {
  it('should fall back to 0 chance for grass when chance index is missing', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);
    view.setUint8(0, 4);
    view.setUint8(1, 19);

    const original = GEN2_WILD_GRASS_CHANCES[0];
    // biome-ignore lint/suspicious/noExplicitAny: deliberate modification for test coverage
    delete (GEN2_WILD_GRASS_CHANCES as any)[0];

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'grass');

    expect(area.encounters[0]).toEqual({
      chance: 0,
      pokemonId: 19,
      minLevel: 4,
      maxLevel: 4,
    });

    if (original !== undefined) {
      GEN2_WILD_GRASS_CHANCES[0] = original;
    }
  });

  it('should fall back to 0 chance for water when chance index is missing', () => {
    const buffer = new ArrayBuffer(20);

    const view = new DataView(buffer);
    view.setUint8(0, 4);
    view.setUint8(1, 19);

    const original = GEN2_WILD_WATER_CHANCES[0];
    // biome-ignore lint/suspicious/noExplicitAny: deliberate modification for test coverage
    delete (GEN2_WILD_WATER_CHANCES as any)[0];

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'water');

    expect(area.encounters[0]).toEqual({
      chance: 0,
      pokemonId: 19,
      minLevel: 4,
      maxLevel: 4,
    });

    if (original !== undefined) {
      GEN2_WILD_WATER_CHANCES[0] = original;
    }
  });
});

describe('extractGen2WildEncounterArea - edge cases (zero slot loop bypass)', () => {
  it('should extract when zero slot bypass happens', () => {
    const buffer = new ArrayBuffer(20);
    const view = new DataView(buffer);

    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'other_method_meaning_seven');
    expect(area.encounters).toHaveLength(0);
  });
});

describe('extractGen2WildEncounterArea - additional coverage', () => {
  it('should extract encounters with correct version ID and method', () => {
    const buffer = new ArrayBuffer(20);
    const view = new DataView(buffer);

    // Setting up slot 1 for grass
    view.setUint8(0, 10); // min/max level
    view.setUint8(1, 25); // Pikachu

    const area = extractGen2WildEncounterArea(view, 0, 42, 2, 'grass');

    expect(area.areaId).toBe(42);
    expect(area.versionId).toBe(2);
    expect(area.method).toBe('grass');
    expect(area.encounters).toHaveLength(1);
    expect(area.encounters[0]).toEqual({
      chance: 30,
      pokemonId: 25,
      minLevel: 10,
      maxLevel: 10,
    });
  });
});

describe('determineGen2HeldItemProbabilities - additional coverage', () => {
  it('should return empty array if both items are 0 or less', () => {
    const drops = determineGen2HeldItemProbabilities(0, -1);
    expect(drops).toHaveLength(0);

    const drops2 = determineGen2HeldItemProbabilities(-5, 0);
    expect(drops2).toHaveLength(0);
  });
});
