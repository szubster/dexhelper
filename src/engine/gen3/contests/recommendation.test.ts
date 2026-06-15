import { describe, expect, it } from 'vitest';
import { getContestRecommendations } from './recommendation';

describe('getContestRecommendations', () => {
  it('recommends the preferred condition when stats are high', () => {
    // Adamant prefers Cool
    const conditions = {
      cool: 200,
      beauty: 50,
      cute: 50,
      smart: 50,
      tough: 50,
    };
    const recommendations = getContestRecommendations('adamant', conditions, 200);
    expect(recommendations[0]?.category).toBe('cool');
    expect(recommendations[0]?.score).toBeGreaterThan(200); // Because of the 1.1x multiplier
  });

  it('handles max Sheen scenario correctly', () => {
    // Sheen is 255, so remaining potential is 0. Base score should just be the condition value.
    const conditions = {
      cool: 100,
      beauty: 150,
      cute: 50,
      smart: 50,
      tough: 50,
    };
    // Modest prefers Beauty
    const recommendations = getContestRecommendations('modest', conditions, 255);
    expect(recommendations[0]?.category).toBe('beauty');
    expect(recommendations[0]?.score).toBe(150 * 1.1); // 165
  });

  it('handles conflicting natures and resolves ties based on preference', () => {
    // All stats equal
    const conditions = {
      cool: 100,
      beauty: 100,
      cute: 100,
      smart: 100,
      tough: 100,
    };
    // Bold prefers Tough, dislikes Cool
    const recommendations = getContestRecommendations('bold', conditions, 100);
    expect(recommendations[0]?.category).toBe('tough');

    // Check that cool is penalized and not in the top 2
    const coolScore = recommendations.find((r) => r.category === 'cool');
    expect(coolScore).toBeUndefined(); // It shouldn't be in the top 2
  });

  it('breaks ties on zero stats based on nature preference', () => {
    const conditions = {
      cool: 0,
      beauty: 0,
      cute: 0,
      smart: 0,
      tough: 0,
    };
    // Timid prefers Cute
    const recommendations = getContestRecommendations('timid', conditions, 0);
    expect(recommendations[0]?.category).toBe('cute');
    expect(recommendations[0]?.score).toBe(255 * 1.1); // Max potential * multiplier
  });
});
