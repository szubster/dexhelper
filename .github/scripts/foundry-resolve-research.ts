import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// We will only use this script via tsx which should resolve gray-matter from the project root if run there
const matter = require('gray-matter') as typeof import('gray-matter');

function discoverNodeFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (filePath.includes('journals') || filePath.includes('docs') || filePath.includes('archive')) {
        continue;
      }
      discoverNodeFiles(filePath, fileList);
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main() {
  const repoPath = process.argv[2];
  if (!repoPath) {
    process.exit(1);
  }

  const repoRoot = process.cwd();
  const allFiles = discoverNodeFiles(path.join(repoRoot, '.foundry'));

  const nodeMap = new Map<string, any>();
  const idToPathMap = new Map<string, string>();

  for (const f of allFiles) {
    try {
      const relPath = path.relative(repoRoot, f);
      const content = fs.readFileSync(f, 'utf8');
      const parsed = matter(content);
      const node = { ...parsed, repoPath: relPath };
      nodeMap.set(relPath, node);
      if (parsed.data.id) {
        idToPathMap.set(parsed.data.id, relPath);
      }
    } catch (e) {
      // ignore
    }
  }

  function resolvePath(ref: string): string | null {
    if (!ref) return null;
    if (ref.endsWith('.md') && nodeMap.has(ref)) {
      return ref;
    }
    if (idToPathMap.has(ref)) {
      return idToPathMap.get(ref) || null;
    }
    return null;
  }

  const researchRefs = new Set<string>();
  let currentPath: string | null = repoPath;

  while (currentPath && nodeMap.has(currentPath)) {
    const node = nodeMap.get(currentPath)!;
    const refs = node.data.research_references || [];
    for (const r of refs) {
      researchRefs.add(r);
    }
    const parentRef = node.data.parent;
    currentPath = parentRef ? resolvePath(parentRef) : null;
  }

  // Output comma-separated list of paths
  console.log(Array.from(researchRefs).join(','));
}

main().catch(() => process.exit(1));
