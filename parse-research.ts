import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const repoPath = process.argv[2];

if (!repoPath) {
    console.error("Missing repoPath");
    process.exit(1);
}

const nodeMap = new Map();

function readNode(p) {
    if (nodeMap.has(p)) return nodeMap.get(p);
    if (!fs.existsSync(p)) return null;
    const m = matter(fs.readFileSync(p, 'utf8'));
    nodeMap.set(p, m);
    return m;
}

let allResearch = new Set<string>();

let curr = readNode(repoPath);

while (curr) {
    const refs = curr.data.research_references || [];
    for (const r of refs) {
        allResearch.add(r);
    }
    const parentPath = curr.data.parent;
    if (!parentPath) break;
    // Resolve parent? Usually parent is ID or path
    // Need to resolve parent properly
    // Let's assume parent is repo-relative path if it ends with .md
    if (parentPath.endsWith('.md')) {
        curr = readNode(parentPath);
    } else {
        break; // Would need ID mapping otherwise
    }
}

const references = Array.from(allResearch).join(' ');
console.log(references);
