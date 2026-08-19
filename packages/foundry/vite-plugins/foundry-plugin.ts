import fs from 'node:fs';
import path from 'node:path';
import matter from '@11ty/gray-matter';
import type { Plugin } from 'vite';

interface FoundryNodeData {
  id: string;
  type: string;
  status: string;
  owner_persona: string;
  depends_on: string[];
  rejection_count: number;
}

export interface ParsedNode {
  filePath: string;
  data: FoundryNodeData;
}

export function foundryPlugin(): Plugin {
  const foundryDir = path.resolve(process.cwd(), '.foundry');
  let cachedData: string | null = null;

  function generateData(): string {
    const nodes: ParsedNode[] = [];
    const dirsToScan = ['ideas', 'prds', 'epics', 'stories', 'tasks'];

    for (const dir of dirsToScan) {
      const fullPath = path.join(foundryDir, dir);
      if (!fs.existsSync(fullPath)) continue;

      const files = fs.readdirSync(fullPath);
      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const filePath = path.join(fullPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        try {
          const parsed = matter(content);
          const data = parsed.data;

          if (
            typeof data['id'] === 'string' &&
            typeof data['type'] === 'string' &&
            typeof data['status'] === 'string' &&
            typeof data['owner_persona'] === 'string' &&
            Array.isArray(data['depends_on'])
          ) {
            nodes.push({
              filePath: `.foundry/${dir}/${file}`,
              data: {
                id: data['id'],
                type: data['type'],
                status: data['status'],
                owner_persona: data['owner_persona'],
                depends_on: data['depends_on'],
                rejection_count: typeof data['rejection_count'] === 'number' ? data['rejection_count'] : 0,
              },
            });
          }
        } catch {
          // Ignore parse errors
        }
      }
    }

    const finalContent = JSON.stringify(nodes);
    cachedData = finalContent;
    return finalContent;
  }

  return {
    name: 'vite-plugin-foundry',

    configResolved() {
      generateData();
    },

    configureServer(server) {
      server.watcher.add(path.resolve(foundryDir, '**/*.md'));
      server.watcher.on('change', (file) => {
        if (file.endsWith('.md')) {
          console.log('[foundry-plugin] Foundry node changed, regenerating...');
          generateData();
        }
      });

      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.endsWith('foundry.json')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data);
          return;
        }

        next();
      });
    },

    generateBundle() {
      const data = cachedData || generateData();

      this.emitFile({
        type: 'asset',
        fileName: 'data/foundry.json',
        source: data,
      });
    }
  };
}
