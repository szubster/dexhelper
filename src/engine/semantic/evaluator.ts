export interface SemanticEvaluationResult {
  isEquivalent: boolean;
  reasoning: string;
}

export async function evaluateSemanticCondition(
  condition: string,
  prompt: string,
  // biome-ignore lint/complexity/useLiteralKeys: needed for types
  apiKey: string = process.env['JULES_API_KEY'] || '',
): Promise<SemanticEvaluationResult> {
  if (!apiKey) {
    throw new Error('JULES_API_KEY is required for semantic evaluation.');
  }

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are an expert prompt validator. Analyze the following prompt and determine if it strictly adheres to the given condition. Return the evaluation in JSON format containing a boolean "isEquivalent" field and a "reasoning" string explaining the decision.

Condition to evaluate:
${condition}

Prompt text:
${prompt}`,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(`LLM API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

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
