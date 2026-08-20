import { beforeEach, describe, expect, it, vi } from 'vitest';
import { evaluateSemanticCondition } from './evaluator';

// Mock the GoogleGenAI module
vi.mock('@google/genai', () => {
  const mockGenerateContent = vi.fn<() => Promise<unknown>>();

  // Need to provide a constructor-compatible mock
  class MockGoogleGenAI {
    models = {
      generateContent: mockGenerateContent,
    };
  }

  return {
    GoogleGenAI: MockGoogleGenAI,
    // Export the mock so we can access it in tests
    __mockGenerateContent: mockGenerateContent,
  };
});

describe('evaluateSemanticCondition', () => {
  let mockGenerateContent: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    // dynamically import the mock to gain access to the injected function
    // biome-ignore lint/suspicious/noExplicitAny: Used for vi.mock interop
    const mockModule = (await import('@google/genai')) as any;
    mockGenerateContent = mockModule.__mockGenerateContent;

    vi.stubEnv('GEMINI_API_KEY', 'test-key');
  });

  it('throws an error if API key is missing', async () => {
    vi.unstubAllEnvs();
    await expect(evaluateSemanticCondition('condition', 'prompt', '')).rejects.toThrow(
      'GEMINI_API_KEY is required for semantic evaluation.',
    );
  });

  it('returns evaluation result on success', async () => {
    mockGenerateContent.mockResolvedValue({
      text: JSON.stringify({ isEquivalent: true, reasoning: 'Matches.' }),
    });

    const result = await evaluateSemanticCondition('is greeting', 'hello');

    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: 'gemini-2.5-flash',
      contents: 'Condition to evaluate:\nis greeting\n\nPrompt text:\nhello',
      config: {
        systemInstruction: expect.any(String),
        responseMimeType: 'application/json',
      },
    });

    expect(result).toEqual({ isEquivalent: true, reasoning: 'Matches.' });
  });

  it('throws an error if the API request fails', async () => {
    mockGenerateContent.mockRejectedValue(new Error('Internal Server Error'));

    await expect(evaluateSemanticCondition('condition', 'prompt')).rejects.toThrow('Internal Server Error');
  });

  it('throws an error if parsing JSON response fails', async () => {
    mockGenerateContent.mockResolvedValue({
      text: 'invalid json',
    });

    await expect(evaluateSemanticCondition('condition', 'prompt')).rejects.toThrow(
      'Failed to parse LLM response as JSON',
    );
  });

  it('successfully parses json wrapped in markdown code blocks', async () => {
    mockGenerateContent.mockResolvedValue({
      text: '```json\n{"isEquivalent": true, "reasoning": "Matches."}\n```',
    });

    const result = await evaluateSemanticCondition('is greeting', 'hello');
    expect(result).toEqual({ isEquivalent: true, reasoning: 'Matches.' });
  });

  it('works with a real API request if key is present AND explicitly requested (integration)', async () => {
    // Only run this test if explicitly requested via env var to prevent exhausting API limits in CI
    vi.unstubAllEnvs();

    // biome-ignore lint/complexity/useLiteralKeys: needed for types
    const runIntegration = process.env['RUN_LLM_INTEGRATION_TESTS'] === 'true';
    if (!runIntegration) {
      return; // Skip test to preserve quota
    }

    // biome-ignore lint/complexity/useLiteralKeys: needed for types
    const realKey = process.env['GEMINI_API_KEY'];
    if (!realKey) {
      throw new Error('RUN_LLM_INTEGRATION_TESTS is true, but GEMINI_API_KEY is missing.');
    }

    // Restore real implementation for integration test
    vi.doUnmock('@google/genai');

    // Need to dynamically import the REAL module now since it was previously mocked
    const { evaluateSemanticCondition: realEval } = await import('./evaluator');

    console.log('--- STARTING REAL SEMANTIC EVALUATION API TEST ---');
    const result = await realEval('is greeting', 'hello', realKey);
    console.log('--- RECEIVED REAL SEMANTIC EVALUATION RESULT ---');
    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
    expect(result.isEquivalent).toBeDefined();
    expect(typeof result.isEquivalent).toBe('boolean');
    expect(typeof result.reasoning).toBe('string');
  });
});
