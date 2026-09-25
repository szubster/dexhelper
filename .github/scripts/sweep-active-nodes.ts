import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { NodeFrontmatterSchema } from './schema.ts';

const _require = createRequire(import.meta.url);
const matter = _require('gray-matter') as typeof import('gray-matter');

export interface SweepOptions {
  archive?: boolean;
}

export function sweepActiveNodes(repoRoot: string, options: SweepOptions = { archive: true }): string[] {
  const foundryDir = path.join(repoRoot, '.foundry');
  if (!fs.existsSync(foundryDir)) {
    return [];
  }

  const results: string[] = [];

  function walk(current: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const e of entries) {
      if (e.isDirectory()) {
        if (e.name === 'archive' && current === foundryDir) {
          continue;
        }
        walk(path.join(current, e.name));
      } else if (e.isFile() && e.name.endsWith('.md')) {
        results.push(path.join(current, e.name));
      }
    }
  }

  walk(foundryDir);

  const activeNodes: string[] = [];

  const nodes: { fp: string; id: string; parent: string | null | undefined; status: string }[] = [];
  const nodeMap = new Map<string, typeof nodes[0]>();

  for (const fp of results) {
    try {
      const content = fs.readFileSync(fp, 'utf-8');
      const parsed = matter(content);
      const parseResult = NodeFrontmatterSchema.safeParse(parsed.data);

      if (parseResult.success) {
        const node = {
          fp,
          id: parseResult.data.id,
          parent: parseResult.data.parent,
          status: parseResult.data.status
        };
        nodes.push(node);
        nodeMap.set(node.fp, node);
      }
    } catch {
      // Ignore parse errors
    }
  }

  const graph: Record<string, string[]> = {};
  for (const node of nodes) {
    graph[node.fp] = [];
  }

  for (const node of nodes) {
    if (node.parent) {
      // Find parent node by id
      const parentNode = nodes.find(n => n.id === node.parent);
      if (parentNode) {
        if (!graph[node.fp].includes(parentNode.fp)) graph[node.fp].push(parentNode.fp);
        if (!graph[parentNode.fp].includes(node.fp)) graph[parentNode.fp].push(node.fp);
      }
    }
  }

  const visited = new Set<string>();
  const components: (typeof nodes)[] = [];

  for (const node of nodes) {
    if (!visited.has(node.fp)) {
      const component = [];
      const queue = [node.fp];
      visited.add(node.fp);

      while (queue.length > 0) {
        const currFp = queue.shift()!;
        const currNode = nodeMap.get(currFp);
        if (currNode) {
          component.push(currNode);
        }

        for (const neighborFp of graph[currFp] || []) {
          if (!visited.has(neighborFp)) {
            visited.add(neighborFp);
            queue.push(neighborFp);
          }
        }
      }
      components.push(component);
    }
  }

  for (const component of components) {
    const isTerminal = component.every(n => n.status === 'COMPLETED' || n.status === 'CANCELLED');

    for (const node of component) {
      if (node.status === 'ACTIVE') {
        const relativePath = path.relative(repoRoot, node.fp);
        activeNodes.push(relativePath);
      }

      if ((node.status === 'COMPLETED' || node.status === 'CANCELLED') && options.archive !== false && isTerminal) {
        const relativeToFoundry = path.relative(foundryDir, node.fp);
        const archivePath = path.join(foundryDir, 'archive', relativeToFoundry);
        const archiveDir = path.dirname(archivePath);

        fs.mkdirSync(archiveDir, { recursive: true });
        fs.renameSync(node.fp, archivePath);
      }
    }
  }

  return activeNodes;
}
