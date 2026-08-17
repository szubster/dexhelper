import { GoogleGenAI } from '@google/genai';

// biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
const ai = new GoogleGenAI({ apiKey: process.env['GEMINI_API_KEY'] ?? '' });

export async function evaluateSemanticCondition(
  condition: string,
  prompt: string,
  genaiClient: typeof ai = ai,
): Promise<boolean> {
  const response = await genaiClient.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Evaluate the following condition against the prompt. Return ONLY "true" if the condition is met by the prompt, or "false" if it is not.
Condition: ${condition}
Prompt: ${prompt}`,
  });

  const text = response.text?.trim().toLowerCase();
  return text === 'true';
}
