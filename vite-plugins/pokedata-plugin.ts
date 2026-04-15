import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Plugin } from 'vite';

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
  let cachedData: { finalContent: string; hash: string } | null = null;

  function generateData() {
    const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));
    const encounters = readJsonl(path.join(sourceDir, 'encounters.jsonl'));
    const locations = readJsonl(path.join(sourceDir, 'locations.jsonl'));
    const areas = readJsonl(path.join(sourceDir, 'areas.jsonl'));
    const locationIndex = readJsonl(path.join(sourceDir, 'location_index.jsonl'));
    const metadataPath = path.join(sourceDir, 'metadata.json');
    const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) : {};

    const exportData = {
      pokemon,
      encounters,
      locations,
      areas,
      locationIndex,
      sourceSha: metadata.sourceSha,
    };

    const content = JSON.stringify(exportData);
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    const finalData = { ...exportData, hash };
    const finalContent = JSON.stringify(finalData);

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

      // Middleware to serve the virtual pokedata.json
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const cleanUrl = url.replace(/\/$/, '');
        
        if (cleanUrl.endsWith('/data/pokedata.json')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.finalContent);
          return;
        }
        
        if (cleanUrl.endsWith('/data/pokedata.hash')) {
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
        fileName: 'data/pokedata.json',
        source: data.finalContent
      });

      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata.hash',
        source: data.hash
      });
    }
  };
}
