import { describe, expect, it } from 'vitest';
import { evaluateSemanticCondition } from './evaluator';

describe('Semantic Evaluator', () => {
  it('should return true for semantically matching conditions', async () => {
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    if (process.env['RUN_LLM_INTEGRATION_TESTS'] !== 'true') return;
    const result = await evaluateSemanticCondition(
      'The user is asking for a list of items',
      'Could you give me a list of your top 5 favorite movies?',
    );
    expect(result).toBe(true);
  });

  it('should return false for semantically non-matching conditions', async () => {
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    if (process.env['RUN_LLM_INTEGRATION_TESTS'] !== 'true') return;
    const result = await evaluateSemanticCondition('The user is asking for a list of items', 'Hello world');
    expect(result).toBe(false);
  });
});
