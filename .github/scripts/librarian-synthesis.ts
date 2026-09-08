import * as fs from 'node:fs';
import { dispatchJulesSession } from './session-api.ts';

export async function synthesizeRules(journalsText: string): Promise<string> {
    const JULES_API_KEY = process.env.JULES_API_KEY;
    if (!JULES_API_KEY) {
        throw new Error('JULES_API_KEY is required to synthesize rules.');
    }
    const GITHUB_REPO = process.env.GITHUB_REPO || 'szubster/dexhelper';

    const prompt = `
You are the Librarian persona in The Foundry. Your job is to extract systemic rules and lessons from the following agent journals.

Journals:
${journalsText}

Extract actionable, systemic rules. Return them in a clear Markdown format, summarizing the key lessons that should be applied moving forward. Do not include logbook-style entries, focus purely on structural lessons, architectural constraints, and recurring failures.

Please use write_file or submit to provide the output.
`;

    try {
        const sessionId = await dispatchJulesSession(prompt, JULES_API_KEY, GITHUB_REPO);
        console.log(`Dispatched Jules session: ${sessionId}`);
        return "Rules synthesis dispatched to Jules.";
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
