import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

function discoverNodeFiles(dir: string): string[] {
  const results: string[] = [];
  function walk(current: string): void {
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

const idToPath = new Map<string, string>();
const nodes: any[] = [];

for (const fp of files) {
  const repoPath = path.relative(repoRoot, fp).replace(/\\/g, '/');
  try {
    const content = fs.readFileSync(fp, 'utf-8');
    const parsed = matter(content);
    if (parsed.data && parsed.data.id) {
      idToPath.set(parsed.data.id, repoPath);
      nodes.push({ repoPath, fm: parsed.data });
    }
  } catch {
    process.stderr.write(`Failed to parse ${repoPath}\n`);
  }
}

let broken = 0;

function existsOrArchived(ref: string): boolean {
  if (fs.existsSync(path.join(repoRoot, ref))) return true;
  if (!ref.startsWith('.foundry/archive/')) {
    const archived = ref.replace(/^\.foundry\//, '.foundry/archive/');
    if (fs.existsSync(path.join(repoRoot, archived))) return true;
  }
  return false;
}

for (const node of nodes) {
  const deps = node.fm.depends_on || [];
  for (const dep of deps) {
    if (!idToPath.has(dep) && !dep.startsWith('.foundry/')) {
       process.stderr.write(`BROKEN DEP: ${node.repoPath} -> ${dep}\n`);
       broken++;
    } else if (dep.startsWith('.foundry/') && !existsOrArchived(dep)) {
       process.stderr.write(`BROKEN DEP PATH: ${node.repoPath} -> ${dep}\n`);
       broken++;
    }
  }

  const parent = node.fm.parent;
  if (parent) {
    if (!idToPath.has(parent) && !parent.startsWith('.foundry/')) {
       process.stderr.write(`BROKEN PARENT: ${node.repoPath} -> ${parent}\n`);
       broken++;
    } else if (parent.startsWith('.foundry/') && !existsOrArchived(parent)) {
       process.stderr.write(`BROKEN PARENT PATH: ${node.repoPath} -> ${parent}\n`);
       broken++;
    }
  }
}

let unfulfilledIdeas = 0;
for (const node of nodes) {
  if (node.fm.type === 'IDEA' && node.fm.status === 'COMPLETED') {
    const ideaId = node.fm.id;
    const matchNum = ideaId.match(/idea-(\d+)/);
    const num = matchNum ? matchNum[1] : null;

    const hasImpl = nodes.some(n => {
      if (['PRD', 'EPIC', 'STORY', 'TASK'].includes(n.fm.type)) {
        if (n.fm.parent === ideaId || n.fm.parent === node.repoPath) return true;
        if (num && n.fm.id && (n.fm.id.includes(`-${num}-`) || n.fm.id.startsWith(`prd-${num}-`) || n.fm.id.startsWith(`epic-${num}-`))) return true;
      }
      return false;
    });

    if (!hasImpl) {
      process.stderr.write(`UNFULFILLED COMPLETED IDEA WARNING: ${node.repoPath} (${ideaId}) is marked COMPLETED but has no implementation nodes (PRD/EPIC/STORY/TASK)!\n`);
      unfulfilledIdeas++;
    }
  }
}

process.stderr.write(`Total broken references: ${broken}\n`);
process.stderr.write(`Total unfulfilled completed ideas: ${unfulfilledIdeas}\n`);
if (broken > 0) process.exit(1);
process.exit(0);
