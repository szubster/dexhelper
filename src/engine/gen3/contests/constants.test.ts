import { describe, expect, it } from 'vitest';
import { MAX_CONDITION, MAX_FEEL, NATURE_FLAVOR_MODIFIERS } from './constants';
import type { Nature } from './types';

describe('Gen 3 Contest Constants', () => {
  it('defines max feel as 255', () => {
    expect(MAX_FEEL).toBe(255);
  });

  it('defines max condition as 255', () => {
    expect(MAX_CONDITION).toBe(255);
  });

  describe('NATURE_FLAVOR_MODIFIERS', () => {
    it('has exactly 25 natures mapped', () => {
      expect(Object.keys(NATURE_FLAVOR_MODIFIERS).length).toBe(25);
    });

    const natures: Nature[] = [
      'hardy',
      'bold',
      'modest',
      'calm',
      'timid',
      'lonely',
      'docile',
      'mild',
      'gentle',
      'hasty',
      'adamant',
      'impish',
      'bashful',
      'careful',
      'rash',
      'jolly',
      'naughty',
      'lax',
      'quirky',
      'naive',
      'brave',
      'relaxed',
      'quiet',
      'sassy',
      'serious',
    ];

    it('covers all specific natures', () => {
      for (const nature of natures) {
        expect(NATURE_FLAVOR_MODIFIERS).toHaveProperty(nature);
      }
    });

    it('returns the correct flavor modifier for bold', () => {
      expect(NATURE_FLAVOR_MODIFIERS.bold).toEqual({
        likes: 'sour',
        dislikes: 'spicy',
      });
    });

    it('returns nulls for neutral natures like hardy', () => {
      expect(NATURE_FLAVOR_MODIFIERS.hardy).toEqual({
        likes: null,
        dislikes: null,
      });
    });
  });
});
