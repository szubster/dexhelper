import * as fs from 'node:fs';
import * as path from 'node:path';

// Construct path to fixtures from import.meta.dirname
const fixturesDir = path.resolve(import.meta.dirname, '../../.foundry/fixtures/orchestrator-prompts');

export function loadPromptFixture(name: string): string {
    return fs.readFileSync(path.join(fixturesDir, name), 'utf-8');
}
