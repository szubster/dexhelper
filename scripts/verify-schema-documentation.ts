import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const schemaPath = path.join(rootDir, '.foundry/docs/schema.md');

export function checkSchemaDocumentation(): boolean {
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    const requiredPatterns = [
        "Orchestrator Safeguard (E2E/Integration Requirement)",
        "tagged with `e2e` or `integration`",
        "An EPIC cannot be COMPLETED without it."
    ];

    let allPatternsFound = true;
    for (const pattern of requiredPatterns) {
        if (!schemaContent.includes(pattern)) {
            console.error(`Error: Missing required documentation pattern in schema.md: "${pattern}"`);
            allPatternsFound = false;
        }
    }

    return allPatternsFound;
}

function main() {
    console.log('Verifying Schema Documentation for E2E Requirement...');

    if (!fs.existsSync(schemaPath)) {
        console.error(`Error: Schema file not found at ${schemaPath}`);
        process.exit(1);
    }

    const success = checkSchemaDocumentation();

    if (success) {
        console.log('Schema Documentation check passed.');
        process.exit(0);
    } else {
        console.error('Schema Documentation check failed.');
        process.exit(1);
    }
}

// Only run if called directly
if (process.argv[1] === __filename || process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
