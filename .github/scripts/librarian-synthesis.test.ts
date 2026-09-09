import { describe, it, expect, vi, afterEach } from 'vitest';
import { synthesizeRules } from './librarian-synthesis.ts';
import type { JournalEntry } from './librarian-ingestion.ts';

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: vi.fn<() => Promise<any>>().mockResolvedValue({
          text: JSON.stringify({
            rules: ['Rule 1', 'Rule 2'],
            summary: 'Test summary'
          })
        })
      };
    }
  };
});

describe('librarian-synthesis', () => {
  const mockEntries: JournalEntry[] = [
    { persona: 'coder', filePath: '/path/to/coder/1.md', content: 'Learned something about coding.' },
    { persona: 'pm', filePath: '/path/to/pm/1.md', content: 'Learned something about PMing.' }
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should synthesize rules from journal entries', async () => {
    const result = await synthesizeRules(mockEntries, 'test-key');
    expect(result.rules).toEqual(['Rule 1', 'Rule 2']);
    expect(result.summary).toBe('Test summary');
  });

  it('should throw error if API key is missing', async () => {
    await expect(synthesizeRules(mockEntries, '')).rejects.toThrow('GEMINI_API_KEY is required for synthesis.');
  });
});
