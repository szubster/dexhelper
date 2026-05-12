import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

function resolveReferences(startFile: string): string[] {
  const references = new Set<string>();
  let currentFile: string | null = startFile;
  const repoRoot = process.cwd();

  while (currentFile) {
    const fullPath = path.resolve(repoRoot, currentFile);
    if (!fs.existsSync(fullPath)) break;

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    try {
      const parsed = matter(fileContent);
      const refs = parsed.data.research_references;
      if (Array.isArray(refs)) {
        for (const ref of refs) {
          references.add(ref);
        }
      }
      currentFile = parsed.data.parent || null;
    } catch {
      break;
    }
  }

  return Array.from(references);
}

const targetFile = process.env.TARGET_FILE;
if (!targetFile) {
  process.exit(1);
}

const references = resolveReferences(targetFile);
console.log(JSON.stringify(references));
