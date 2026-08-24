import { describe, expect, it } from 'vitest';
import { evaluateSemanticCondition } from './evaluator';

describe('evaluateSemanticCondition', () => {
  it('returns true', async () => {
    const result = await evaluateSemanticCondition('test');
    expect(result).toBe(true);
  });
});
