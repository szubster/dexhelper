/**
 * @module generate-pokedata
 *
 * This script serves as the primary data ingestion and transformation pipeline.
 *
 * It bridges the gap between massive, generalized external datasets (PokeAPI)
 * and the specific, highly-optimized needs of the DexHelper client application.
 *
 * **Data Sources:**
 * - **PokeAPI Data Repository:** Cloned dynamically from `https://github.com/PokeAPI/api-data.git`.
 *   This provides the raw JSON for Pokemon metadata, encounters, evolutions, moves, and items.
 * - **Decompiled ROM Mappings:** Static mapping configurations (e.g., `src/data/gen1/mapping.ts`,
 *   `src/data/gen2/mapping.ts`, `src/data/gen3/mapping.ts`) bridge PokeAPI's location IDs with
 *   the internal Map IDs used by the actual Game Boy game code (necessary for save file parsing).
 *
 * **Input:**
 * 1. Clones the entire PokeAPI `api-data` repository into a temporary scratch folder.
 * 2. Reads thousands of granular JSON files.
 *
 * **Output:**
 * Generates tightly-packed, normalized JSONL files in `data/db/`:
 * - `pokemon.jsonl`
 * - `encounters.jsonl`
 * - `locations.jsonl`
 * - `moves.jsonl`
 * - `items.jsonl`
 * - `berries.jsonl`
 * - `metadata.json` (tracking the upstream commit SHA for caching/invalidation).
 *
 * These artifacts are shipped with the application and loaded into IndexedDB by the client.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync, execFileSync } from 'node:child_process';
import {
  type CompactChainLink,
  type CompactEncounterDetail,
  type PokemonMetadata,
  type UnifiedLocation,
  type CompactEncounter,
  POKE_VERSION_MAP,
  ENCOUNTER_METHOD_MAP,
  EVO_TRIGGER_MAP,
  EGG_GROUP_MAP,
  MOVE_DAMAGE_CLASS,
  POKEMON_TYPE_MAP
} from '../src/db/schema.ts';
import { GEN1_MAPS, INDOOR_TO_PARENT_MAP } from './data/gen1/mapping.ts';
import { GEN2_MAP_TO_AID, decodeGen2Id } from './data/gen2/mapping.ts';
import { GEN3_MAPS, GEN3_INDOOR_TO_PARENT_MAP } from './data/gen3/mapping.ts';

const POKEMON_COUNT = 386; // Gen 1, 2, & 3
const REPO_URL = 'https://github.com/PokeAPI/api-data.git';
const TEMP_DIR = path.join(process.cwd(), 'scratch/temp_pokeapi');
const OUTPUT_DIR = path.join(process.cwd(), 'data/db');



/**
 * Synchronously reads and parses a JSON file from the filesystem.
 *
 * @param filePath - The absolute or relative path to the JSON file to read.
 * @returns The parsed JavaScript object, or `null` if the file does not exist.
 *
 * @remarks
 * **Why synchronous?**
 * This pipeline sequentially extracts and transforms data from thousands of small,
 * deeply nested JSON files located in the cloned PokeAPI repository. Using `readFileSync`
 * avoids asynchronous callback overhead and memory pressure from firing thousands of concurrent
 * promises, keeping the transformation logic linear and easier to debug.
 */
function readJson(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

interface PokeApiName {
  language: { name: string };
  name: string;
}

interface PokeApiEncounterDetail {
  chance: number;
  method: { name: string };
  min_level: number;
  max_level: number;
  condition_values?: { name: string }[];
}

interface PokeApiVersionDetail {
  version: { name: string };
  encounter_details: PokeApiEncounterDetail[];
}

interface PokeApiEvolutionDetail {
  trigger: { name: string };
  min_level?: number;
  min_happiness?: number;
  item?: { url: string };
  held_item?: { url: string };
  time_of_day?: string;
  relative_physical_stats?: number;
}

interface PokeApiChainLink {
  species: { url: string };
  evolves_to: PokeApiChainLink[];
  evolution_details: PokeApiEvolutionDetail[];
}

/**
 * Writes an array of objects to a file in JSON Lines (JSONL) format.
 *
 * @param filePath - The output path for the JSONL file.
 * @param data - An array of objects to be stringified.
 *
 * @remarks
 * **Why JSONL?**
 * The output data (encounters, locations, pokemon metadata) is extremely large.
 * JSONL provides a human-readable format that can be easily diffed and committed
 * to version control. At build time, Vitest and the pipeline parse these `.jsonl`
 * files and transform them into a highly compact `msgpack` payload using `msgpackr`.
 * This approach guarantees both human-readable source data and extremely fast,
 * memory-efficient runtime parsing in the browser.
 */
function writeJsonl(filePath: string, data: any[]) {
  const content = data.map(item => JSON.stringify(item)).join('\n');
  fs.writeFileSync(filePath, content + '\n');
}

// Helper to ensure stable object key order for better readability/diffs
function sortObj(obj: any, order: string[]): any {
  const result: any = {};
  for (const key of order) {
    if (key in obj) result[key] = obj[key];
  }
  for (const key in obj) {
    if (!(key in result)) result[key] = obj[key];
  }
  return result;
}

/**
 * Orchestrates the full Extract, Transform, Load (ETL) pipeline for static game data.
 *
 * **Architecture Overview**
 * This script is the core data pipeline for DexHelper. It fetches raw game data from
 * the PokeAPI repository, transforms it to match our highly optimized internal schemas,
 * maps encounters to exact decompiled ROM Map IDs, and generates the graph distance matrix.
 *
 * **Inputs:**
 * - Remote GitHub Repository: `PokeAPI/api-data` (cloned locally to `scratch/temp_pokeapi/data/api/v2`).
 *   This provides the raw JSON files for encounters, locations, pokemon, and evolution chains.
 * - Local Mapping Files: `scripts/data/gen1/mapping.ts`, `scripts/data/gen2/mapping.ts`,
 *   and `scripts/data/gen3/mapping.ts`. These provide the crucial link between generic
 *   PokeAPI area IDs and actual Game Boy ROM Map IDs (extracted from `pret` decompilations).
 *
 * **Outputs:**
 * - `.jsonl` files generated in the `data/db/` directory:
 *   - `pokemon.jsonl`: Core stats, types, and Dex IDs.
 *   - `encounters.jsonl`: Locations where Pokémon can be caught, including version exclusives.
 *   - `locations.jsonl`: The unified map graph, complete with Floyd-Warshall precomputed distances.
 *   - `evolutions.jsonl`: The parsed evolution chains for all supported generations.
 *
 * **Why this exists:**
 * The application relies on massive datasets (all Pokémon, stats, encounters, and evolutions).
 * Shipping this data raw to the browser or querying it live via HTTP would be too slow.
 * This pipeline extracts the data from PokeAPI, transforms it to map tightly to internal
 * Game Boy memory structures, and loads it into a compacted JSONL format for IndexedDB.
 *
 * **Pipeline Stages & Key Transformations:**
 * 1. **Data Ingestion:** Shallow clones the `PokeAPI/api-data` repository to avoid massive network payloads.
 *    This avoids making thousands of individual HTTP requests to the public API, preventing rate limits.
 * 2. **Extraction:** Reads the deeply nested JSON representations for Pokémon, Species, Evolution Chains, and Location Areas.
 * 3. **Transformation & Mapping:** Flattens the PokeAPI structure into DexHelper's compact JSON schemas (`src/db/schema.ts`).
 *    This includes mapping generic string IDs to internal integer keys (`POKE_VERSION_MAP`, `ENCOUNTER_METHOD_MAP`).
 * 4. **Location Resolution:** PokeAPI has generic area IDs, but the app needs exact ROM map IDs (`gameId`)
 *    to match the player's in-game save data. We cross-reference `GEN1_MAPS` and `GEN2_MAP_TO_AID`
 *    to map API coordinates to actual game memory values.
 * 5. **Bug Catching Contest Injection:** PokeAPI completely omits the Gen 2 Bug Catching Contest encounters.
 *    We manually inject these into the National Park (Map 783) to ensure 100% accurate Gen 2 data.
 * 6. **Graph Computation:** Computes the O(1) All-Pairs Shortest Paths map distance matrix using the Floyd-Warshall algorithm
 *    to prevent main thread freezing during runtime BFS calculations.
 * 7. **Load:** Outputs the transformed and compressed data as `.jsonl` files in `data/db/` for the React client to consume.
 *
 * **Regeneration Steps:**
 * To regenerate this data locally after changes, run: `pnpm run data:gen`
 *
 * ---
 *
 * Executes the primary data extraction, transformation, and load (ETL) pipeline.
 *
 * **Pipeline Execution Steps:**
 * 1. **Fetch Latest:** Retrieves the latest commit SHA from the PokeAPI `api-data` repo via the GitHub CLI.
 * 2. **Clone/Sync:** Clones the repo to `scratch/temp_pokeapi` (or pulls the latest changes if it exists).
 * 3. **Extract Locations:** Parses region-specific location and area data, linking them to internal game map IDs using static mapping files.
 * 4. **Calculate Distances:** Computes shortest-path distances between all map locations using the Floyd-Warshall algorithm, saving the engine from calculating paths dynamically at runtime.
 * 5. **Extract Pokemon & Encounters:** Parses base stats, types, and granular encounter rates for all Pokemon up to Gen 3.
 * 6. **Extract Evolutions:** Traverses evolution chains, mapping triggers (level, items, happiness).
 * 7. **Extract Moves & Items:** Parses move data (power, accuracy, type) mapping them to specific generations to handle historical changes (e.g. Gen 2 vs Gen 3 accuracy differences).
 * 8. **Compact & Load:** Recursively strips default, null, and empty values to drastically compress the final payload size, then writes the output to `.jsonl` files in `data/db/`.
 */
async function main() {
  console.log('--- PokéAPI Data Pipeline (GitHub Source) ---');

  // 1. Get Latest Commit SHA
  console.log('Checking upstream SHA...');
  let upstreamSha = '';
  try {
    upstreamSha = execFileSync('gh', ['api', 'repos/PokeAPI/api-data/commits/master', '--jq', '.sha'], { encoding: 'utf-8' }).trim();
  } catch {
    console.warn('Failed to fetch upstream SHA via gh CLI. Proceeding with sync anyway.');
  }

  // 2. Clone or Update Repo
  if (!fs.existsSync(TEMP_DIR)) {
    console.log('Cloning PokeAPI/api-data (shallow)...');
    fs.mkdirSync(path.dirname(TEMP_DIR), { recursive: true });
    execFileSync('git', ['clone', '--depth', '1', REPO_URL, TEMP_DIR]);
  } else {
    console.log('Updating local clone...');
    try {
      execSync('git pull', { cwd: TEMP_DIR });
    } catch {
      console.warn('Git pull failed. Re-cloning...');
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      execFileSync('git', ['clone', '--depth', '1', REPO_URL, TEMP_DIR]);
    }
  }

  const pokemon: PokemonMetadata[] = [];
  const pokemonEncounterMap = new Map<number, CompactEncounter[]>();

  // Unified structures
  const locationMap = new Map<number, UnifiedLocation>();

  const dataPath = path.join(TEMP_DIR, 'data/api/v2');

  console.log(`Processing ${POKEMON_COUNT} Pokémon and Species...`);
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    if (i % 10 === 0 || i === POKEMON_COUNT) {
      process.stdout.write(`\rProgress: ${Math.round((i / POKEMON_COUNT) * 100)}% (${i}/${POKEMON_COUNT})`);
    }

    const pDataPath = path.join(dataPath, `pokemon/${i}/index.json`);
    const sDataPath = path.join(dataPath, `pokemon-species/${i}/index.json`);

    const pData = readJson(pDataPath);
    const sData = readJson(sDataPath);

    if (!pData || !sData) {
      continue;
    }

    const encounterPath = path.join(dataPath, `pokemon/${i}/encounters/index.json`);
    const eData = readJson(encounterPath) || [];

    pokemon.push(sortObj({
      id: pData.id,
      n: sData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || sData.name,
      cr: sData.capture_rate,
      gr: sData.gender_rate,
      eg: sData.egg_groups?.map((g: any) => EGG_GROUP_MAP[g.name] || 0) || [],
      types: pData.types?.sort((a: any, b: any) => a.slot - b.slot).map((t: any) => POKEMON_TYPE_MAP[t.type.name] || 0) || [],
      baby: sData.is_baby,
      em: undefined, // Will be populated in second pass
      // Temporaries to be filled in second pass
      eto: [],
      efrm: [],
      det: [],
    }, ['id', 'n']));

    const pokemonEncounters: { aid: number; version_details: { v: number; d: CompactEncounterDetail[] }[] }[] = [];
    for (const areaEnc of eData) {
      const areaUrl = areaEnc.location_area.url;
      const areaId = parseInt(areaUrl.split('/').filter(Boolean).pop() || '0', 10);

      // Find ALL gameIds for this area (Source of truth)
      const matchingGameIds: { id: number; name: string }[] = [];

      // 1. Check Gen 1 mapping
      for (const [id, map] of Object.entries(GEN1_MAPS)) {
        if (map.aid === areaId) {
          matchingGameIds.push({ id: parseInt(id), name: map.name });
        }
      }

      // 2. Check Gen 2 mapping
      for (const [group, maps] of Object.entries(GEN2_MAP_TO_AID)) {
        for (const [mid, mapNode] of Object.entries(maps)) {
          if (mapNode.aid === areaId) {
            matchingGameIds.push({ id: (parseInt(group) << 8) | parseInt(mid), name: mapNode.name });
          }
        }
      }

      // 3. Check Gen 3 mapping
      for (const [group, maps] of Object.entries(GEN3_MAPS)) {
        for (const [mid, mapNode] of Object.entries(maps)) {
          if (mapNode.aid === areaId) {
            matchingGameIds.push({ id: (3 << 16) | (parseInt(group) << 8) | parseInt(mid), name: mapNode.name });
          }
        }
      }

      // If no ROM map ID found, we skip this encounter as we only care about real in-game locations
      if (matchingGameIds.length === 0) continue;

      for (const { id: gameId, name: localName } of matchingGameIds) {
        if (!locationMap.has(gameId)) {
          const areaData = readJson(path.join(dataPath, `location-area/${areaId}/index.json`));
          if (areaData) {
            const locUrl = areaData.location.url;
            const lid = parseInt(locUrl.split('/').filter(Boolean).pop() || '0', 10);

            const locData = readJson(path.join(dataPath, `location/${lid}/index.json`));
            if (locData) {
              let connections: number[] | undefined = undefined;

              // Map connections (edges) based on generation structure.
              // Gen 1: IDs are simple 8-bit integers (0-255).
              // Gen 3: IDs are encoded as (3 << 16) | (group << 8) | id.
              // Gen 2: IDs are encoded as (group << 8) | id.
              if (gameId < 256) {
                connections = GEN1_MAPS[gameId]?.connections;
              } else if ((gameId >> 16) === 3) {
                const group = (gameId >> 8) & 0xff;
                const mid = gameId & 0xff;
                connections = GEN3_MAPS[group]?.[mid]?.connections;
              } else {
                const { group, id: mid } = decodeGen2Id(gameId);
                connections = GEN2_MAP_TO_AID[group]?.[mid]?.connections;
              }

              locationMap.set(gameId, sortObj({
                id: gameId,
                n: localName || areaData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || locData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || locData.name,
                conn: connections,
                pids: [],
                dist: {}
              }, ['id', 'n']));
            }
          }
        }

        // Update Pokémon index
        const loc = locationMap.get(gameId);
        if (loc) {
          if (!loc.pids) loc.pids = [];
          if (!loc.pids.includes(i)) {
            loc.pids.push(i);
            loc.pids.sort((a, b) => a - b);
          }
        }
      }

      const vDetails: { v: number; d: CompactEncounterDetail[] }[] = [];
      for (const vd of (areaEnc.version_details as PokeApiVersionDetail[])) {
        const vId = POKE_VERSION_MAP[vd.version.name];
        if (!vId) continue;

        vDetails.push({
          v: vId,
          d: vd.encounter_details.map((ed) => {
            const det: CompactEncounterDetail = {
              c: ed.chance,
              m: ENCOUNTER_METHOD_MAP[ed.method.name] || 0,
              min: ed.min_level,
              max: ed.max_level,
            };

            if (ed.condition_values && ed.condition_values.length > 0) {
              let timeMask = 0;
              for (const cv of ed.condition_values) {
                if (cv.name === 'time-morning') timeMask |= 1;
                if (cv.name === 'time-day') timeMask |= 2;
                if (cv.name === 'time-night') timeMask |= 4;
              }
              if (timeMask > 0) det.t = timeMask;
            }
            return det;
          })
        });
      }

      if (vDetails.length > 0) {
        for (const { id: gameId } of matchingGameIds) {
          pokemonEncounters.push({
            aid: gameId,
            version_details: vDetails
          });
        }
      }
    }


    // --- INJECT BUG CATCHING CONTEST (Missing from PokeAPI) ---
    // National Park Map ID: 783 (Gen 2 aid)
    if ([10, 11, 12, 13, 14, 15, 46, 48, 123, 127].includes(i)) {
      const bccChance: Record<number, number> = {
        10: 20, 11: 10, 12: 5, 13: 20, 14: 10, 15: 5, 46: 10, 48: 10, 123: 5, 127: 5
      };

      const bccLevelRange: Record<number, {min: number, max: number}> = {
        10: { min: 7, max: 18 },
        13: { min: 7, max: 18 },
        11: { min: 9, max: 18 },
        14: { min: 9, max: 18 },
        12: { min: 12, max: 15 },
        15: { min: 12, max: 15 },
        48: { min: 10, max: 16 },
        46: { min: 10, max: 17 },
        123: { min: 13, max: 14 },
        127: { min: 13, max: 14 }
      };

      const bccData = {
        c: bccChance[i] || 5,
        m: ENCOUNTER_METHOD_MAP['bug-catching-contest'] || 18,
        min: bccLevelRange[i]?.min || 24,
        max: bccLevelRange[i]?.max || 36
      };

      let npEncounter = pokemonEncounters.find(e => e.aid === 783);
      if (!npEncounter) {
        npEncounter = { aid: 783, version_details: [] };
        pokemonEncounters.push(npEncounter);
      }

      for (const v of [4, 5, 6]) { // Gold, Silver, Crystal
        let vDetail = npEncounter.version_details.find(vd => vd.v === v);
        if (!vDetail) {
          vDetail = { v: v, d: [] };
          npEncounter.version_details.push(vDetail);
        }
        vDetail.d.push(bccData);
      }
    }

    if (pokemonEncounters.length > 0) {
      const finalEncs: CompactEncounter[] = [];
      for (const pe of pokemonEncounters) {
        for (const vd of pe.version_details) {
          finalEncs.push({
            aid: pe.aid,
            v: vd.v,
            d: vd.d
          });
        }
      }
      pokemonEncounterMap.set(i, finalEncs);
    }
  }

  // --- ENSURE ALL MAPS ARE IN GRAPH (Even if no encounters) ---
  console.log('\nEnsuring all maps are in locationMap...');
  for (const [id, map] of Object.entries(GEN1_MAPS)) {
    const gameId = parseInt(id);
    const existing = locationMap.get(gameId);
    if (existing) {
      if (map.connections) {
        existing.conn = Array.from(new Set([...(existing.conn || []), ...map.connections]));
      }
    } else {
      locationMap.set(gameId, sortObj({
        id: gameId,
        n: map.name,
        conn: map.connections,
        pids: [],
        dist: {}
      }, ['id', 'n']));
    }
  }
  for (const [group, maps] of Object.entries(GEN2_MAP_TO_AID)) {
    for (const [mid, mapNode] of Object.entries(maps)) {
      const gameId = (parseInt(group) << 8) | parseInt(mid);
      const existing = locationMap.get(gameId);
      if (existing) {
        if (mapNode.connections) {
          existing.conn = Array.from(new Set([...(existing.conn || []), ...mapNode.connections]));
        }
      } else {
        locationMap.set(gameId, sortObj({
          id: gameId,
          n: mapNode.name,
          conn: mapNode.connections,
          pids: [],
          dist: {}
        }, ['id', 'n']));
      }
    }
  }
  for (const [group, maps] of Object.entries(GEN3_MAPS)) {
    for (const [mid, mapNode] of Object.entries(maps)) {
      const gameId = (3 << 16) | (parseInt(group) << 8) | parseInt(mid);
      const existing = locationMap.get(gameId);
      if (existing) {
        if (mapNode.connections) {
          existing.conn = Array.from(new Set([...(existing.conn || []), ...mapNode.connections]));
        }
      } else {
        locationMap.set(gameId, sortObj({
          id: gameId,
          n: mapNode.name,
          conn: mapNode.connections,
          pids: [],
          dist: {}
        }, ['id', 'n']));
      }
    }
  }

// Reconcile parents
console.log('\nReconciling location parents...');
for (const loc of locationMap.values()) {
  if (loc.id < 256) {
    const parentId = INDOOR_TO_PARENT_MAP[loc.id];
    if (parentId !== undefined) loc.prnt = parentId;
  } else if ((loc.id >> 16) === 3) {
    const decodedId = loc.id & 0xffff;
    const parentId = GEN3_INDOOR_TO_PARENT_MAP[decodedId];
    if (parentId !== undefined) loc.prnt = (3 << 16) | parentId;
  }
}

console.log('Computing All-Pairs Shortest Paths...');
const locations = Array.from(locationMap.values());
const ids = locations.map(l => l.id);
const dist: Record<number, Record<number, number>> = {};

// Initialize distance matrix
for (const i of ids) {
  dist[i] = {};
  for (const j of ids) {
    dist[i][j] = (i === j) ? 0 : Infinity;
  }
}

// Set direct edges from conn and parent relations
for (const loc of locations) {
  const distLoc = dist[loc.id];
  if (distLoc) {
    if (loc.conn) {
      for (const target of loc.conn) {
        const distTarget = dist[target];
        if (distTarget) {
          distLoc[target] = 1;
          distTarget[loc.id] = 1;
        }
      }
    }
    if (loc.prnt !== undefined) {
      const p = loc.prnt;
      const distP = dist[p];
      if (distP) {
        distLoc[p] = 0; // Indoors are effectively "at" the town
        distP[loc.id] = 0;
      }
    }
  }
}

// Floyd-Warshall algorithm
for (const k of ids) {
  const distK = dist[k];
  if (!distK) continue;
  for (const i of ids) {
    const distI = dist[i];
    if (!distI) continue;
    const dIK = distI[k];
    if (dIK === undefined || dIK === Infinity) continue;
    for (const j of ids) {
      const dKJ = distK[j];
      const dIJ = distI[j];
      if (dKJ !== undefined && dIJ !== undefined && dIK + dKJ < dIJ) {
        distI[j] = dIK + dKJ;
      }
    }
  }
}

// Attach computed distances to locations (reachable only, excluding 0 self-dist)
for (const loc of locations) {
  const reachable: Record<number, number> = {};
  const distLoc = dist[loc.id];
  if (distLoc) {
    for (const target of ids) {
      const d = distLoc[target];
      if (d !== undefined && d !== Infinity && d > 0) {
        reachable[target] = d;
      }
    }
  }
  loc.dist = reachable;
}

console.log('\nProcessing Evolution Chains...');
const pokemonSpeciesToChain = new Map<number, number>();
for (let i = 1; i <= POKEMON_COUNT; i++) {
  const sData = readJson(path.join(dataPath, `pokemon-species/${i}/index.json`));
  if (sData) {
    const cid = parseInt(sData.evolution_chain.url.split('/').filter(Boolean).pop() || '0', 10);
    pokemonSpeciesToChain.set(i, cid);
  }
}

const uniqueChainIds = Array.from(new Set(pokemonSpeciesToChain.values()));
for (const cid of uniqueChainIds) {
  const chainFilePath = path.join(dataPath, `evolution-chain/${cid}/index.json`);
  const cData = readJson(chainFilePath);
  if (!cData) continue;

  const mapLink = (link: PokeApiChainLink, ef?: number): CompactChainLink => {
    const id = parseInt(link.species.url.split('/').filter(Boolean).pop() || '0', 10);

    const validEvolutionDetails = link.evolution_details.filter((ed: any) => !ed.evolved_form);

    return {
      id,
      eto: link.evolves_to.map(l => mapLink(l, id)),
      det: validEvolutionDetails.map((ed) => ({
        tr: EVO_TRIGGER_MAP[ed.trigger.name] || 0,
        ml: ed.min_level ?? undefined,
        mh: ed.min_happiness ?? undefined,
        item: ed.item
          ? parseInt(ed.item.url.split('/').filter(Boolean).pop() || '0', 10)
          : undefined,
        held: ed.held_item ? parseInt(ed.held_item.url.split('/').filter(Boolean).pop() || '0', 10) : undefined,
        time: ed.time_of_day === 'day' ? 1 : ed.time_of_day === 'night' ? 2 : undefined,
        rps: ed.relative_physical_stats ?? undefined,
      })),
      ef,
    };
  };

  const fullChain = mapLink(cData.chain);

  const registerChain = (node: CompactChainLink, ancestors: number[]) => {
    const p = pokemon.find(p => p.id === node.id);
    if (p) {
      p.eto = node.eto;
      p.efrm = ancestors;
      p.det = node.det;
    }

    node.eto.forEach(child => registerChain(child, [node.id, ...ancestors]));
  };

  registerChain(fullChain, []);
}

console.log('\nProcessing Moves...');
const moves: any[] = [];
const MAX_MOVE_ID = 354;

const genMap: Record<number, number> = {
  1: 1, 2: 1,
  3: 2, 4: 2,
  5: 3, 6: 3, 7: 3, 12: 3, 13: 3,
  8: 4, 9: 4, 10: 4,
  11: 5, 14: 5,
  15: 6, 16: 6,
  17: 7, 18: 7, 19: 7,
  20: 8
};

for (let i = 1; i <= MAX_MOVE_ID; i++) {
  const mDataPath = path.join(dataPath, `move/${i}/index.json`);
  const mData = readJson(mDataPath);
  if (!mData) continue;

  const typeId = parseInt(mData.type.url.split('/').filter(Boolean).pop() || '0', 10);

  let dmgClass = 0;
  if (mData.damage_class) {
    const dcId = parseInt(mData.damage_class.url.split('/').filter(Boolean).pop() || '0', 10);
    if (dcId === 2) dmgClass = MOVE_DAMAGE_CLASS.PHYSICAL;
    else if (dcId === 3) dmgClass = MOVE_DAMAGE_CLASS.SPECIAL;
    else if (dcId === 1) dmgClass = MOVE_DAMAGE_CLASS.STATUS;
  }

  let effect: number | undefined;
  if (mData.effect_chance !== null && mData.effect_chance > 0) {
    effect = mData.effect_chance;
  } else if (mData.meta && mData.meta.ailment && mData.meta.ailment.url) {
    const ailmentId = parseInt(mData.meta.ailment.url.split('/').filter(Boolean).pop() || '0', 10);
    if (ailmentId > 0) {
      effect = ailmentId;
    }
  }

  const move: any = {
    id: mData.id,
    name: mData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || mData.name,
    type: typeId,
    p: mData.power,
    acc: mData.accuracy,
    pp: mData.pp,
    dmg_class: dmgClass,
  };

  if (mData.past_values && mData.past_values.length > 0) {
    const targetGen = 3;
    const sortedPastValues = [...mData.past_values].sort((a, b) => {
      const vgA = parseInt(a.version_group.url.split('/').filter(Boolean).pop() || '0', 10);
      const vgB = parseInt(b.version_group.url.split('/').filter(Boolean).pop() || '0', 10);
      return (genMap[vgA] || 99) - (genMap[vgB] || 99);
    });

    for (const pv of sortedPastValues) {
      const vgId = parseInt(pv.version_group.url.split('/').filter(Boolean).pop() || '0', 10);
      const vgGen = genMap[vgId] || 99;

      if (vgGen > targetGen) {
        if (pv.accuracy !== null) move.acc = pv.accuracy;
        if (pv.power !== null) move.p = pv.power;
        if (pv.pp !== null) move.pp = pv.pp;
        if (pv.type !== null) {
          move.type = parseInt(pv.type.url.split('/').filter(Boolean).pop() || '0', 10);
        }
        break;
      }
    }
  }

  if (effect !== undefined) {
    move.effect = effect;
  }

  moves.push(move);
}

console.log('\nProcessing Items...');
const items: any[] = [];
const MAX_ITEM_ID = 2180;
for (let i = 1; i <= MAX_ITEM_ID; i++) {
  const iDataPath = path.join(dataPath, `item/${i}/index.json`);
  const iData = readJson(iDataPath);
  if (!iData) continue;

  const categoryUrlParts = iData.category?.url?.split('/').filter(Boolean) || [];
  const categoryId = categoryUrlParts.length ? parseInt(categoryUrlParts.pop() || '0', 10) : 0;

  const enEffect = iData.effect_entries?.find((e: any) => e.language?.name === 'en')?.short_effect;
  const spriteUrl = iData.sprites?.default;
  const spriteFilename = spriteUrl ? spriteUrl.split('/').pop() : undefined;

  const item: any = {
    id: iData.id,
    name: iData.names?.find((n: PokeApiName) => n.language.name === 'en')?.name || iData.name,
    cost: iData.cost,
    category: categoryId,
    fling_p: iData.fling_power,
    effect: enEffect,
    sprite: spriteFilename,
  };

  if (iData.game_indices) {
    for (const gi of iData.game_indices) {
      const genName = gi.generation?.name;
      if (genName === 'generation-i') {
        item.gen1_id = gi.game_index;
      } else if (genName === 'generation-ii') {
        item.gen2_id = gi.game_index;
      } else if (genName === 'generation-iii') {
        item.gen3_id = gi.game_index;
      }
    }
  }

  items.push(item);
}

console.log('\nProcessing Berries...');
const berries: any[] = [];
for (let i = 1; i <= 64; i++) {
  const bDataPath = path.join(dataPath, `berry/${i}/index.json`);
  const bData = readJson(bDataPath);
  if (!bData) continue;

  const firmnessId = bData.firmness ? parseInt(bData.firmness.url.split('/').filter(Boolean).pop() || '0', 10) : 0;
  const itemId = bData.item ? parseInt(bData.item.url.split('/').filter(Boolean).pop() || '0', 10) : 0;

  const flavors: any = {
    spicy: 0, dry: 0, sweet: 0, bitter: 0, sour: 0
  };
  if (bData.flavors) {
    for (const f of bData.flavors) {
      if (f.flavor && flavors[f.flavor.name] !== undefined) {
        flavors[f.flavor.name] = f.potency;
      }
    }
  }

  berries.push({
    id: bData.id,
    name: bData.name,
    item_id: itemId,
    growth_time: bData.growth_time,
    max_harvest: bData.max_harvest,
    size: bData.size,
    smoothness: bData.smoothness,
    soil_dryness: bData.soil_dryness,
    firmness: firmnessId,
    flavors
  });
}


/**
 * Recursively strips nulls, undefined values, default states, and empty arrays from an object.
 *
 * @param obj - The raw JSON-parsed object to be compressed.
 * @returns A structurally identical object with redundant keys entirely removed.
 */
function compact(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(compact);
  }
  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value) && value.length === 0) continue;
      if (key === 'baby' && value === false) continue;
      if (key === 'm' && value === 1) continue;
      if (value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) continue;
      
      if (key === 'gr' && value === 4) continue;
      if (key === 'tr' && value === 1) continue;
      if (key === 'mh' && value === 160) continue;
      if (key === 'max' && value === obj.min) continue;

      if (key === 'p' && (value === 0 || value === null)) continue;
      if (key === 'acc' && (value === 100 || value === null)) continue;

      if (key === 'cost' && (value === 0 || value === null)) continue;
      if (key === 'fling_p' && value === null) continue;
      if (key === 'effect' && (value === null || value === '')) continue;
      if (key === 'sprite' && value === null) continue;
      if (key === 'em' && (value === null || typeof value !== 'object' || Object.keys(value).length === 0)) continue;


      result[key] = compact(value);
    }
    return result;
  }
  return obj;
}


console.log('\nPrecomputing Egg Move Paths...');

// Collect learners
const nativeLearners = new Map<number, Set<number>>();
const eggLearners = new Map<number, Set<number>>();

for (let i = 1; i <= POKEMON_COUNT; i++) {
  const pDataPath = path.join(dataPath, `pokemon/${i}/index.json`);
  const pData = readJson(pDataPath);
  if (!pData) continue;

  for (const m of pData.moves) {
    const moveId = parseInt(m.move.url.split('/').filter(Boolean).pop() || '0', 10);
    if (moveId > MAX_MOVE_ID) continue;

    let isNative = false;
    let isEgg = false;

    for (const vg of m.version_group_details) {
      const vgId = parseInt(vg.version_group.url.split('/').filter(Boolean).pop() || '0', 10);
      const vgGen = genMap[vgId] || 99;

      if (vgGen <= 3) {
        if (vg.move_learn_method.name === 'egg') {
          isEgg = true;
        } else {
          isNative = true;
        }
      }
    }

    if (isNative) {
      if (!nativeLearners.has(moveId)) nativeLearners.set(moveId, new Set());
      nativeLearners.get(moveId)!.add(i);
    }
    if (isEgg) {
      if (!eggLearners.has(moveId)) eggLearners.set(moveId, new Set());
      eggLearners.get(moveId)!.add(i);
    }
  }
}


const speciesMap = new Map<number, PokemonMetadata>();
for (const p of pokemon) {
  speciesMap.set(p.id, p);
}

const getEffectiveEggGroups = (pid: number, visited = new Set<number>()): number[] => {
  if (visited.has(pid)) return [];
  visited.add(pid);

  const p = speciesMap.get(pid);
  if (!p) return [];

  if (p.eg && !p.eg.includes(15)) return p.eg;

  if (p.eto) {
    for (const link of p.eto) {
      const evolvedEg = getEffectiveEggGroups(link.id, visited);
      if (evolvedEg.length > 0 && !evolvedEg.includes(15)) return evolvedEg;
    }
  }
  return [];
};


const eggMovesIds = Array.from(eggLearners.keys());
let movesProcessed = 0;

for (const moveId of eggMovesIds) {
  movesProcessed++;
  if (movesProcessed % 10 === 0 || movesProcessed === eggMovesIds.length) {
    process.stdout.write(`\rEgg Move Progress: ${Math.round((movesProcessed / eggMovesIds.length) * 100)}% (${movesProcessed}/${eggMovesIds.length})`);
  }

  if (!nativeLearners.has(moveId)) {
    nativeLearners.set(moveId, new Set());
  }
  nativeLearners.get(moveId)!.add(235);

  const targets = eggLearners.get(moveId);
  if (!targets) continue;

  const sources = nativeLearners.get(moveId) || new Set<number>();
  if (sources.size === 0) continue;

  const queue: number[] = Array.from(sources);
  const distances = new Map<number, number>();
  const predecessors = new Map<number, number>();

  for (const s of sources) {
    distances.set(s, 0);
  }

  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    if (u === undefined) continue;

    const uData = speciesMap.get(u);
    if (!uData) continue;

    const uGr = uData.gr !== undefined ? uData.gr : 4;
      if (uGr === -1 || uGr === 8) continue;

      const uEg = uData.eg || [];
      if (uEg.length === 0 || uEg.includes(15)) continue;

    for (const vData of pokemon) {
      const v = vData.id;
      if (u === v) continue;

      if (!targets.has(v) && !sources.has(v)) continue;

      const vGr = vData.gr !== undefined ? vData.gr : 4;
      const vEg = getEffectiveEggGroups(v);

        if (vEg.length === 0 || vEg.includes(15)) continue;

      let canProduce = false;

      if (vGr !== -1 && vGr !== 0 && uEg.some((g: number) => vEg.includes(g))) {
        canProduce = true;
      }
      else if (v === 32 && uEg.some((g: number) => getEffectiveEggGroups(29).includes(g))) {
        canProduce = true;
      }
      else if (v === 313 && uEg.some((g: number) => getEffectiveEggGroups(314).includes(g))) {
        canProduce = true;
      }
      else if (v === 236 && (u === 106 || u === 107 || u === 237)) {
        canProduce = true;
      }

      if (canProduce) {
        if (!distances.has(v)) {
          distances.set(v, distances.get(u)! + 1);
          predecessors.set(v, u);
          queue.push(v);
        }
      }
    }
  }

  for (const target of targets) {
    if (distances.has(target)) {
      const path: number[] = [];
      let curr: number | undefined = target;
      while (curr !== undefined) {
        path.unshift(curr);
        curr = predecessors.get(curr);
      }

      const p = speciesMap.get(target);
      if (p) {
        if (!p.em) p.em = {};
        p.em[moveId] = path;
      }
    }
  }
}
console.log();

console.log('\nWriting split JSONL files...');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

writeJsonl(path.join(OUTPUT_DIR, 'pokemon.jsonl'), pokemon.map(compact));
writeJsonl(path.join(OUTPUT_DIR, 'encounters.jsonl'), Array.from(pokemonEncounterMap.entries()).map(([pid, encs]) => ({
  pid,
  enc: encs.map(compact)
})));
writeJsonl(path.join(OUTPUT_DIR, 'locations.jsonl'), Array.from(locationMap.values()).map(compact).sort((a, b) => a.id - b.id));
writeJsonl(path.join(OUTPUT_DIR, 'moves.jsonl'), moves.map(compact));
writeJsonl(path.join(OUTPUT_DIR, 'items.jsonl'), items.map(compact));
writeJsonl(path.join(OUTPUT_DIR, 'berries.jsonl'), berries.map(compact));

  fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify({
    sourceSha: upstreamSha,
    generatedAt: new Date().toISOString(),
  }, null, 2));

  console.log(`\nSuccess! Wrote data files to ${OUTPUT_DIR}`);
  console.log(`Source SHA: ${upstreamSha}`);
}

main().catch(err => {
  console.error('\nGeneration failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
