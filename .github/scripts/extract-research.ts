import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

const targetNodePath = process.argv[2];
if (!targetNodePath) {
  process.exit(0);
}

const idToPath = new Map<string, string>();

function discoverNodeFiles(dir: string): string[] {
  const results: string[] = [];
  function walk(current: string): void {
    if (!fs.existsSync(current)) return;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'journals' || entry.name === 'fixtures') continue;
        if (entry.name === 'docs') {
            const adrsPath = path.join(fullPath, 'adrs');
            if (fs.existsSync(adrsPath)) walk(adrsPath);
            continue;
        }
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  }
  walk(dir);
  return results;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const foundryDir = path.join(repoRoot, '.foundry');
const files = discoverNodeFiles(foundryDir);

for (const fp of files) {
  const repoPath = path.relative(repoRoot, fp).replace(/\\/g, '/');
  try {
    const content = fs.readFileSync(fp, 'utf-8');
    const parsed = matter(content);
    if (parsed.data && parsed.data.id) {
      idToPath.set(parsed.data.id, repoPath);
    }
  } catch {
    // Skip unparseable files
  }
}

const researchPaths = new Set<string>();
const visitedPaths = new Set<string>();
let currentPath: string | null = targetNodePath;

while (currentPath && !visitedPaths.has(currentPath)) {
  visitedPaths.add(currentPath);
  if (!fs.existsSync(currentPath)) break;
  try {
    const raw: string = fs.readFileSync(currentPath, 'utf-8');
    const parsed: any = matter(raw);
    const fm: any = parsed.data || {};

    if (Array.isArray(fm.research_references)) {
      fm.research_references.forEach((ref: any) => {
        if (typeof ref === 'string' && ref.endsWith('.md')) {
          researchPaths.add(ref);
        }
      });
    }

    const parent: any = fm.parent;
    if (typeof parent === 'string') {
      if (idToPath.has(parent)) {
        currentPath = idToPath.get(parent)!;
      } else if (parent.endsWith('.md')) {
        currentPath = parent;
      } else {
        currentPath = null;
      }

      if (currentPath === visitedPaths.values().next().value) { // Very basic circular check
         break;
      }
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
