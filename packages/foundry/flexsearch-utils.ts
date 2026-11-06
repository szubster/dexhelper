import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const FlexSearch = require('flexsearch');


import { type NodeFrontmatter } from './schema.ts';

export function buildQuery(frontmatter: Partial<NodeFrontmatter>): string {
  const parts: string[] = [];
  if (frontmatter.title) parts.push(frontmatter.title);
  if (frontmatter.type) parts.push(frontmatter.type);
  if (frontmatter.tags && frontmatter.tags.length > 0) parts.push(...frontmatter.tags);
  if (frontmatter.layers && frontmatter.layers.length > 0) parts.push(...frontmatter.layers);
  return parts.join(' ');
}

export function buildDocumentationIndex(repoRoot: string) {
  const docsDirs = [
    path.join(repoRoot, '.foundry', 'docs'),
    path.join(repoRoot, '.foundry', 'archive', 'docs', 'adrs')
  ];

  const index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['content'],
      store: ['title', 'content']
    }
  });

  for (const dir of docsDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = walkSync(dir);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = fs.readFileSync(file, 'utf8');
      index.add({
        id: file,
        title: path.basename(file),
        content: content
      });
    }
  }

  return index;
}

function walkSync(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkSync(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

export function extractRelevantChunks(index: any, query: string, topK: number = 3): string {
  if (!query) return '';
  const results = index.search(query, { enrich: true, limit: topK });
  const chunks: string[] = [];
  for (const fieldResult of results) {
    if (fieldResult.result) {
      for (const res of fieldResult.result) {
        if (res.doc && res.doc.content) {
          chunks.push(res.doc.content);
        }
      }
    }
  }
  return chunks.join('\n\n');
}
