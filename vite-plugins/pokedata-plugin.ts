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
  let cachedData: {
    hash: string;
    core: Buffer;
    gen1: Buffer;
    gen2: Buffer;
    gen3: Buffer;
  } | null = null;

  function generateData() {
    const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));
    const encounters = readJsonl(path.join(sourceDir, 'encounters.jsonl'));
    const locations = readJsonl(path.join(sourceDir, 'locations.jsonl'));
    const items = readJsonl(path.join(sourceDir, 'items.jsonl'));
    const moves = readJsonl(path.join(sourceDir, 'moves.jsonl'));
    const berries = readJsonl(path.join(sourceDir, 'berries.jsonl'));
    const matchCalls = readJsonl(path.join(sourceDir, 'gen3_match_call.jsonl'));
    const metadataPath = path.join(sourceDir, 'metadata.json');
    const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) : {};

    const gen1Versions = [1, 2, 3];
    const gen2Versions = [4, 5, 6];
    const gen3Versions = [7, 8, 9, 10, 11];

    const filterEnc = (encList: any[], genVs: number[]) => {
      return encList
        .map((p) => {
          const filtered = p.enc.filter((e: any) => genVs.includes(e.v));
          if (filtered.length === 0) return null;
          return { ...p, enc: filtered };
        })
        .filter(Boolean);
    };

    const filterLoc = (locList: any[], encListFiltered: any[]) => {
      const activeLocationIds = new Set<number>();
      for (const p of encListFiltered) {
        for (const e of p.enc) {
          if (e.aid !== undefined) activeLocationIds.add(e.aid);
        }
      }
      return locList.filter((loc) => activeLocationIds.has(loc.id));
    };

    const gen1Enc = filterEnc(encounters, gen1Versions);
    const gen1Loc = filterLoc(locations, gen1Enc);

    const gen2Enc = filterEnc(encounters, gen2Versions);
    const gen2Loc = filterLoc(locations, gen2Enc);

    const gen3Enc = filterEnc(encounters, gen3Versions);
    const gen3Loc = filterLoc(locations, gen3Enc);

    const exportData = {
      poke: pokemon,
      items: items,
      moves: moves,
      berries: berries,
      matchCalls: matchCalls,
      sourceSha: metadata.sourceSha,
    };

    const finalData = { ...exportData, hash: '' }; // hash initially empty

    // Create configured Packr for optimal size
    const packr = new Packr({ useRecords: true, variableMapSize: true, bundleStrings: true });

    // Create initial pack to hash it
    const initialContent = packr.pack(finalData);
    const hash = crypto.createHash('sha256').update(initialContent).digest('hex');

    finalData.hash = hash;
    const coreContent = packr.pack(finalData);
    const gen1Content = packr.pack({ enc: gen1Enc, loc: gen1Loc });
    const gen2Content = packr.pack({ enc: gen2Enc, loc: gen2Loc });
    const gen3Content = packr.pack({ enc: gen3Enc, loc: gen3Loc });

    cachedData = {
      hash,
      core: coreContent,
      gen1: gen1Content,
      gen2: gen2Content,
      gen3: gen3Content,
    };
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
        
        if (cleanUrl.endsWith('/data/pokedata.msgpack') || cleanUrl.endsWith('/data/pokedata-core.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.core);
          return;
        }

        if (cleanUrl.endsWith('/data/pokedata-gen1.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.gen1);
          return;
        }

        if (cleanUrl.endsWith('/data/pokedata-gen2.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.gen2);
          return;
        }

        if (cleanUrl.endsWith('/data/pokedata-gen3.msgpack')) {
          const data = cachedData || generateData();
          res.setHeader('Content-Type', 'application/msgpack');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(data.gen3);
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
        source: data.core
      });
      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-gen1.msgpack',
        source: data.gen1
      });
      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-gen2.msgpack',
        source: data.gen2
      });
      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata-gen3.msgpack',
        source: data.gen3
      });

      this.emitFile({
        type: 'asset',
        fileName: 'data/pokedata.hash',
        source: data.hash
      });
    }
  };
}
