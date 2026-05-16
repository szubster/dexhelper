import * as fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

const targetNodePath = process.argv[2];
if (!targetNodePath) {
  process.exit(0);
}

const researchPaths = new Set<string>();
const visitedPaths = new Set<string>();
let currentPath = targetNodePath;

while (currentPath && !visitedPaths.has(currentPath)) {
  visitedPaths.add(currentPath);
  if (!fs.existsSync(currentPath)) break;
  try {
    const raw = fs.readFileSync(currentPath, 'utf-8');
    const parsed = matter(raw);
    const fm = parsed.data || {};

    if (Array.isArray(fm.research_references)) {
      fm.research_references.forEach((ref: any) => {
        if (typeof ref === 'string' && ref.endsWith('.md')) {
          researchPaths.add(ref);
        }
      });
    }

    const parent = fm.parent;
    if (typeof parent === 'string' && parent.endsWith('.md') && parent !== currentPath) {
      currentPath = parent;
    } else {
      break;
    }
  } catch {
    break;
  }
}

const list = Array.from(researchPaths).map(p => `- ${p}`).join('\n');
if (list) {
  console.log(list);
}
