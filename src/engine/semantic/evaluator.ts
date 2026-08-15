import { GoogleGenAI } from '@google/genai';

export interface SemanticEvaluationResult {
  isEquivalent: boolean;
  reasoning: string;
}

export async function evaluateSemanticCondition(
  condition: string,
  prompt: string,
  // biome-ignore lint/complexity/useLiteralKeys: needed for types
  apiKey: string = process.env['GEMINI_API_KEY'] || '',
): Promise<SemanticEvaluationResult> {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required for semantic evaluation.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are an expert prompt validator. Analyze the following prompt and determine if it strictly adheres to the given condition. Return the evaluation in JSON format containing a boolean "isEquivalent" field and a "reasoning" string explaining the decision.`;

  const inputPrompt = `Condition to evaluate:\n${condition}\n\nPrompt text:\n${prompt}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: inputPrompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
    },
  });

  const textContent = response.text;

  if (!textContent) {
    throw new Error('Failed to extract text content from LLM response.');
  }

  try {
    const result = JSON.parse(textContent);
    return {
      isEquivalent: Boolean(result.isEquivalent),
      reasoning: result.reasoning || 'No reasoning provided.',
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to parse LLM response as JSON: ${textContent} - ${errorMessage}`);
  }
}
