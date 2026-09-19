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
  let cachedData: { finalContent: Buffer; finalContentGen1: Buffer; finalContentGen2: Buffer; finalContentGen3: Buffer; hash: string } | null = null;

  function generateData() {
    const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));

    const encountersGen1 = readJsonl(path.join(sourceDir, 'encounters-gen1.jsonl'));
    const locationsGen1 = readJsonl(path.join(sourceDir, 'locations-gen1.jsonl'));

    const encountersGen2 = readJsonl(path.join(sourceDir, 'encounters-gen2.jsonl'));
    const locationsGen2 = readJsonl(path.join(sourceDir, 'locations-gen2.jsonl'));

    const encountersGen3 = readJsonl(path.join(sourceDir, 'encounters-gen3.jsonl'));
    const locationsGen3 = readJsonl(path.join(sourceDir, 'locations-gen3.jsonl'));

    const items = readJsonl(path.join(sourceDir, 'items.jsonl'));
    const moves = readJsonl(path.join(sourceDir, 'moves.jsonl'));
    const berries = readJsonl(path.join(sourceDir, 'berries.jsonl'));
    const matchCalls = readJsonl(path.join(sourceDir, 'gen3_match_call.jsonl'));
    const metadataPath = path.join(sourceDir, 'metadata.json');
    const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) : {};

    const exportDataCore = {
      poke: pokemon,
      items: items,
      moves: moves,
      berries: berries,
      sourceSha: metadata.sourceSha,
    };

    const exportDataGen1 = { enc: encountersGen1, loc: locationsGen1 };
    const exportDataGen2 = { enc: encountersGen2, loc: locationsGen2 };
    const exportDataGen3 = { enc: encountersGen3, loc: locationsGen3, matchCalls: matchCalls };

    const finalDataCore = { ...exportDataCore, hash: '' }; // hash initially empty

    // Create configured Packr for optimal size
    const packr = new Packr({ useRecords: true, variableMapSize: true, bundleStrings: true });

    // Create initial pack to hash it
    const initialContent = packr.pack(finalDataCore);
    const hash = crypto.createHash('sha256').update(initialContent).digest('hex');

    finalDataCore.hash = hash;
    const finalContentCore = packr.pack(finalDataCore);

    const finalContentGen1 = packr.pack(exportDataGen1);
    const finalContentGen2 = packr.pack(exportDataGen2);
    const finalContentGen3 = packr.pack(exportDataGen3);

    cachedData = { finalContent: finalContentCore, finalContentGen1, finalContentGen2, finalContentGen3, hash };
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

      // Middleware to serve the virtual pokedata.msgpack
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const cleanUrl = url.replace(/\/$/, '');
        
        if (cleanUrl.endsWith('/data/pokedata-core.msgpack') || cleanUrl.endsWith('/data/pokedata.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.finalContent);
          return;
        }
        
        if (cleanUrl.endsWith('/data/pokedata-gen1.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.finalContentGen1);
          return;
        }

        if (cleanUrl.endsWith('/data/pokedata-gen2.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.finalContentGen2);
          return;
        }

        if (cleanUrl.endsWith('/data/pokedata-gen3.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.finalContentGen3);
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


    transformIndexHtml(_html, ctx) {
      // Don't inject prefetch in dev since the files are generated on the fly via middleware
      if (ctx.server) return;
      // Get base from resolved Vite config
      const basePath = '/dexhelper/';
      return [
        {
          tag: 'link',
          attrs: { rel: 'prefetch', href: `${basePath}data/pokedata-gen1.msgpack`, as: 'fetch', crossorigin: 'anonymous' },
          injectTo: 'head',
        },
        {
          tag: 'link',
          attrs: { rel: 'prefetch', href: `${basePath}data/pokedata-gen2.msgpack`, as: 'fetch', crossorigin: 'anonymous' },
          injectTo: 'head',
        },
        {
          tag: 'link',
          attrs: { rel: 'prefetch', href: `${basePath}data/pokedata-gen3.msgpack`, as: 'fetch', crossorigin: 'anonymous' },
          injectTo: 'head',
        }
      ];
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
        fileName: 'data/pokedata-gen1.msgpack',
        source: data.finalContentGen1
      });

      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-gen2.msgpack',
        source: data.finalContentGen2
      });

      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-gen3.msgpack',
        source: data.finalContentGen3
      });

      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata.hash',
        source: data.hash
      });
    }
  };
}
