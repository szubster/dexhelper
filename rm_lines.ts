import * as fs from 'fs';

let content = fs.readFileSync('.github/scripts/foundry-orchestrator.test.ts', 'utf-8');

// The reviewer mentioned 10 blank lines before the test block
content = content.replace(/\n\n\n\n\n\n\n\n\n\n  test\('DAG/g, '\n\n  test(\'DAG');
fs.writeFileSync('.github/scripts/foundry-orchestrator.test.ts', content, 'utf-8');
