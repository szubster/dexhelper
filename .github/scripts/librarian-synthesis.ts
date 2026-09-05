import { GoogleGenAI } from '@google/genai';
import * as fs from 'node:fs';

export async function synthesizeRules(journalsText: string): Promise<string> {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is required to synthesize rules.');
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const prompt = `
You are the Librarian persona in The Foundry. Your job is to extract systemic rules and lessons from the following agent journals.

Journals:
${journalsText}

Extract actionable, systemic rules. Return them in a clear Markdown format, summarizing the key lessons that should be applied moving forward. Do not include logbook-style entries, focus purely on structural lessons, architectural constraints, and recurring failures.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "No rules extracted.";
    } catch (error) {
        console.error("Error synthesizing rules:", error);
        throw error;
    }
}

if (import.meta.url.startsWith('file:')) {
    const isMain = process.argv[1] === new URL(import.meta.url).pathname;
    if (isMain) {
        const inputPath = process.argv[2];
        if (!inputPath) {
            console.error('Usage: node --experimental-strip-types librarian-synthesis.ts <path-to-combined-journals.md>');
            process.exit(1);
        }

        try {
            const journalsText = fs.readFileSync(inputPath, 'utf8');
            synthesizeRules(journalsText).then(rules => {
                console.log(rules);
            }).catch(err => {
                console.error(err);
                process.exit(1);
            });
        } catch (err) {
            console.error(`Failed to read file ${inputPath}:`, err);
            process.exit(1);
        }
    }
}
