import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Plugin } from 'vite';

interface PokeDataPluginOptions {
  sourceDir: string;
  outputPath: string;
}

function readJsonl(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').filter(Boolean).map(line => JSON.parse(line));
}

export function pokedataPlugin(options: PokeDataPluginOptions): Plugin {
  const { sourceDir, outputPath } = options;

  function generateData() {
    const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));
    const encounters = readJsonl(path.join(sourceDir, 'encounters.jsonl'));
    const chains = readJsonl(path.join(sourceDir, 'chains.jsonl'));
    const locations = readJsonl(path.join(sourceDir, 'locations.jsonl'));
    const areas = readJsonl(path.join(sourceDir, 'areas.jsonl'));
    const locationIndex = readJsonl(path.join(sourceDir, 'location_index.jsonl'));
    const metadataPath = path.join(sourceDir, 'metadata.json');
    const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) : {};

    const exportData = {
      pokemon,
      encounters,
      chains,
      locations,
      areas,
      locationIndex,
      sourceSha: metadata.sourceSha,
    };

    const content = JSON.stringify(exportData);
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    const finalData = { ...exportData, hash };
    const finalContent = JSON.stringify(finalData);

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, finalContent);
    
    // Also write hash file for compatibility/debugging
    fs.writeFileSync(outputPath.replace('.json', '.hash'), hash);

    return hash;
  }

  return {
    name: 'vite-plugin-pokedata',
    
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
          // We don't necessarily need to reload the whole page if only the static asset changed,
          // but we might want to if the hash changed in 'define'.
          // However, 'define' is static at build time. 
          // For truly dynamic hashes in dev, we'd need a different approach,
          // but usually pokedata doesn't change frequently during a session.
        }
      });
    },

    // During build
    buildStart() {
      generateData();
    }
  };
}

// Utility to get the hash without the full plugin (used for define)
export function getPokeDataHash(sourceDir: string): string {
    const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));
    const encounters = readJsonl(path.join(sourceDir, 'encounters.jsonl'));
    const chains = readJsonl(path.join(sourceDir, 'chains.jsonl'));
    const locations = readJsonl(path.join(sourceDir, 'locations.jsonl'));
    const areas = readJsonl(path.join(sourceDir, 'areas.jsonl'));
    const locationIndex = readJsonl(path.join(sourceDir, 'location_index.jsonl'));
    const metadataPath = path.join(sourceDir, 'metadata.json');
    const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) : {};

    const exportData = {
      pokemon,
      encounters,
      chains,
      locations,
      areas,
      locationIndex,
      sourceSha: metadata.sourceSha,
    };

    const content = JSON.stringify(exportData);
    return crypto.createHash('sha256').update(content).digest('hex');
}
