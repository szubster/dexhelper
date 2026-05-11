import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const repoPath = process.argv[2];
const repoRoot = process.cwd();

const nodeMap = new Map();
const idToPathMap = new Map();

function discover(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            discover(full);
        } else if (full.endsWith('.md')) {
            try {
                const rel = path.relative(repoRoot, full);
                const m = matter(fs.readFileSync(full, 'utf8'));
                nodeMap.set(rel, m);
                if (m.data.id) idToPathMap.set(m.data.id, rel);
            } catch (e) {}
        }
    }
}

discover(path.join(repoRoot, '.foundry'));

let current = repoPath;
const refs = new Set();

while (current && nodeMap.has(current)) {
    const m = nodeMap.get(current);
    const r = m.data.research_references || [];
    for (const ref of r) refs.add(ref);
    const p = m.data.parent;
    if (p && nodeMap.has(p)) current = p;
    else if (p && idToPathMap.has(p)) current = idToPathMap.get(p);
    else current = null;
}

console.log(Array.from(refs).join(','));
