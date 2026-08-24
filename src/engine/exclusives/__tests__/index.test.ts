import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import { getGameExclusives } from '../index';

describe('getGameExclusives', () => {
  it('should return missing exclusives for gen 1 red', () => {
    const saveData = { generation: 1, gameVersion: 'red' } as SaveData;
    const exclusives = getGameExclusives(saveData);
    expect(exclusives.missing).toContain(27); // Sandshrew is missing in Red
    expect(exclusives.available).toContain(23); // Ekans is available in Red (missing in Blue)
  });

  it('should return missing exclusives for gen 2 gold', () => {
    const saveData = { generation: 2, gameVersion: 'gold' } as SaveData;
    const exclusives = getGameExclusives(saveData);
    expect(exclusives.missing).toContain(37); // Vulpix is missing in Gold
    expect(exclusives.available).toContain(56); // Mankey is missing in Silver, so available in Gold
  });

  it('should return missing exclusives for gen 3 ruby', () => {
    const saveData = { generation: 3, gameVersion: 'ruby' } as SaveData;
    const exclusives = getGameExclusives(saveData);
    expect(exclusives.missing).toContain(270); // Lotad is missing in Ruby
    expect(exclusives.available).toContain(273); // Seedot is missing in Sapphire, so available in Ruby
  });
});
