import { GoogleGenAI } from '@google/genai';
import { JournalEntry } from './librarian-ingestion.ts';

export interface SynthesisResult {
  rules: string[];
  summary: string;
}

export async function synthesizeRules(
  entries: JournalEntry[],
  apiKey: string = process.env['GEMINI_API_KEY'] || ''
): Promise<SynthesisResult> {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required for synthesis.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are an expert system rule synthesizer. Analyze the following agent journal entries and extract systemic rules, learning, and constraints. Output your result in JSON format containing an array of strings called "rules" and a string called "summary".`;

  const inputPrompt = `Agent Journals:\n\n${entries.map(e => `[Persona: ${e.persona}]\n${e.content}`).join('\n\n---\n\n')}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: inputPrompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
    },
  });

  let textContent = response.text;

  if (!textContent) {
    throw new Error('Failed to extract text content from LLM response.');
  }

  textContent = textContent.trim();
  const match = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    textContent = match[1];
  }

  try {
    const result = JSON.parse(textContent);
    return {
      rules: Array.isArray(result.rules) ? result.rules : [],
      summary: result.summary || 'No summary provided.',
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to parse LLM response as JSON: ${textContent} - ${errorMessage}`);
  }
}
