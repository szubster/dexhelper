import { describe, expect, it } from 'vitest';
import { getDislikedCondition, getPreferredCondition, NATURE_CONDITION_MAPPING } from './natureMapping';
import type { Nature } from './types';

describe('natureMapping', () => {
  it('has 25 natures', () => {
    expect(Object.keys(NATURE_CONDITION_MAPPING).length).toBe(25);
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
      expect(NATURE_CONDITION_MAPPING).toHaveProperty(nature);
    }
  });

  describe('getPreferredCondition', () => {
    it('returns the correct preferred condition for bold', () => {
      expect(getPreferredCondition('bold')).toBe('tough');
    });

    it('returns null for hardy', () => {
      expect(getPreferredCondition('hardy')).toBeNull();
    });
  });

  describe('getDislikedCondition', () => {
    it('returns the correct disliked condition for bold', () => {
      expect(getDislikedCondition('bold')).toBe('cool');
    });

    it('returns null for hardy', () => {
      expect(getDislikedCondition('hardy')).toBeNull();
    });
  });
});
