import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Plugin } from 'vite';
import { Packr } from 'msgpackr';

interface PokeDataPluginOptions {
  sourceDir: string;
}

function readJsonl(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').filter(Boolean).map(line => JSON.parse(line));
}

export function pokedataPlugin(options: PokeDataPluginOptions): Plugin {
  const { sourceDir } = options;
  let cachedData: { finalContent: Buffer; hash: string } | null = null;

  function generateData() {
    const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));
    const items = readJsonl(path.join(sourceDir, 'items.jsonl'));
    const moves = readJsonl(path.join(sourceDir, 'moves.jsonl'));
    const metadataPath = path.join(sourceDir, 'metadata.json');
    const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) : {};

    const exportData = {
      poke: pokemon,
      items: items,
      moves: moves,
      sourceSha: metadata.sourceSha,
    };

    const finalData = { ...exportData, hash: '' }; // hash initially empty

    // Create configured Packr for optimal size
    const packr = new Packr({ useRecords: true, variableMapSize: true, bundleStrings: true });

    // Create initial pack to hash it
    const initialContent = packr.pack(finalData);
    const hash = crypto.createHash('sha256').update(initialContent).digest('hex');

    finalData.hash = hash;
    const finalContent = packr.pack(finalData);

    cachedData = { finalContent, hash };
    return cachedData;
  }

  return {
    name: 'vite-plugin-pokedata',

    // Return custom config to Vite, including the build-time hash definition
    config() {
      const data = cachedData || generateData();
      return {
        define: {
          __POKEDATA_HASH__: JSON.stringify(data.hash),
        },
      };
    },
    
    // During development, generate data on startup and watch for changes
    configResolved() {
      generateData();
    },

    configureServer(server) {
      server.watcher.add(path.resolve(sourceDir, '*.jsonl'));
      server.watcher.on('change', (file) => {
        if (file.endsWith('.jsonl') || file.endsWith('metadata.json')) {
          console.log('[pokedata-plugin] Data changed, regenerating...');
          generateData();
        }
      });

      // Middleware to serve the virtual pokedata-core.msgpack
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const cleanUrl = url.replace(/\/$/, '');
        
        if (cleanUrl.endsWith('/data/pokedata-core.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.finalContent);
          return;
        }
        
        if (cleanUrl.endsWith('/data/pokedata-core.hash')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.hash);
          return;
        }

        next();
      });
    },

    // During build, emit the files as assets
    generateBundle() {
      const data = cachedData || generateData();
      
      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-core.msgpack',
        source: data.finalContent
      });

      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-core.hash',
        source: data.hash
      });
    }
  };
}
