import fs from 'fs';
import path from 'path';

function findReferences(filename: string) {
    const dirs = ['.foundry/tasks', '.foundry/stories', '.foundry/epics', '.foundry/ideas', '.foundry/prds', '.foundry/journals'];
    const references = [];

    for (const dir of dirs) {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (!file.endsWith('.md')) continue;
            const fullPath = path.join(dir, file);
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (content.includes(filename)) {
                references.push(fullPath);
            }
        }
    }
    return references;
}

const targetFile = 'task-016-056-fix-heartbeat-test-types.md';
console.log(`References for ${targetFile}:`);
console.log(findReferences(targetFile));
