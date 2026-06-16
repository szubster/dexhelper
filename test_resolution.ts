import * as fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const idToPathMap = new Map();
// We'll populate this from the actual files
const files = [
    '.foundry/stories/story-078-121-gen3-parse-battle-frontier-win-streaks.md',
    '.foundry/tasks/task-121-171-gen3-parse-battle-frontier-win-streaks-impl.md'
];

for (const f of files) {
    const content = fs.readFileSync(f, 'utf-8');
    const parsed = matter(content);
    idToPathMap.set(parsed.data.id, f);
}

function resolveNodePath(ref) {
    if (!ref) return null;
    if (idToPathMap.has(ref)) return idToPathMap.get(ref);
    return ref;
}

const taskPath = '.foundry/tasks/task-121-171-gen3-parse-battle-frontier-win-streaks-impl.md';
const content = fs.readFileSync(taskPath, 'utf-8');
const parsed = matter(content);
const fm = parsed.data;

console.log('Task ID:', fm.id);
console.log('Parent field:', fm.parent);
const resolvedParent = resolveNodePath(fm.parent);
console.log('Resolved Parent:', resolvedParent);
