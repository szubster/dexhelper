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
  EVO_TRIGGER_MAP
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
 * @param filePath - The absolute or relative path to the JSON file.
 * @returns The parsed JavaScript object, or `null` if the file does not exist.
 *
 * @remarks
 * This utility handles the vast amount of individual JSON files extracted from the
 * PokeAPI repository. Synchronous reading is preferred in this build script to maintain
 * sequential processing order and simplify the ETL data flow.
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
      eg: sData.egg_groups?.map((g: any) => g.name) || [],
      baby: sData.is_baby,
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

// Second pass on locations to reconcile prnt for indoors
console.log('\nReconciling location parents...');
for (const loc of locationMap.values()) {
  if (loc.id < 256) {
    const parentId = INDOOR_TO_PARENT_MAP[loc.id];
    if (parentId !== undefined) loc.prnt = parentId;
  } else if ((loc.id >> 16) === 3) {
    // Decode Gen 3 id to look up in the map, then re-encode the parent
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
// We need cid temporarily for the pass, so we extract it again (could have stored it in a map)
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

    // Filter out Alolan/Galarian/etc base forms.
    // If an evolution detail has a `base_form`, it means it's a regional variant evolution.
    // For Gen 1/2 DexHelper, we only care about base form null (original).
    // Note: PokeAPI recently added base_form but older instances might not have it.
    // A safe heuristic is to check if there are duplicate evolution details.

    const validEvolutionDetails = link.evolution_details.filter((ed: any) => !ed.base_form || ed.base_form === null);

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
// We primarily care about moves present up to Gen 3
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
    // PokeAPI: 1=status, 2=physical, 3=special
    // Our DB: 1=physical, 2=special, 3=status
    if (dcId === 2) dmgClass = 1;
    else if (dcId === 3) dmgClass = 2;
    else if (dcId === 1) dmgClass = 3;
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

  items.push(item);
}


/**
 * Recursively strips nulls, undefined values, default falsy states, and empty arrays from an object.
 *
 * @param obj - The object to compact.
 * @returns A structurally identical object with redundant keys removed.
 *
 * @remarks
 * **Why this is critical:**
 * The generated JSON represents thousands of encounters and evolutions.
 * Fields like `baby: false`, `m: 1` (walking), or empty arrays (`condition_values: []`)
 * represent over 90% of the dataset. Because this data is shipped to the user's browser
 * and stored in IndexedDB, omitting these redundant keys drastically reduces the final `.jsonl`
 * payload size, ensuring fast initialization times and staying within storage quota limits.
 * The client re-inflates these defaults upon load (see `src/db/PokeDB.ts`).
 */
function compact(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(compact);
  }
  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Omit empty arrays
      if (Array.isArray(value) && value.length === 0) continue;
      // Omit baby: false
      if (key === 'baby' && value === false) continue;
      // Omit m: 1 (WALK)
      if (key === 'm' && value === 1) continue;
      // Omit empty objects (dist: {})
      if (value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) continue;
      
      // Omit gr: 4 (gender_rate default)
      if (key === 'gr' && value === 4) continue;
      // Omit tr: 1 (EVO_TRIGGER.LEVEL_UP default)
      if (key === 'tr' && value === 1) continue;
      // Omit mh: 160 (min_happiness default)
      if (key === 'mh' && value === 160) continue;
      // Omit max if same as min (encounter levels)
      if (key === 'max' && value === obj.min) continue;

      // Omit move power p if 0 or null
      if (key === 'p' && (value === 0 || value === null)) continue;
      // Omit move acc if 100 or null
      if (key === 'acc' && (value === 100 || value === null)) continue;

      // Omit item cost if 0 or null
      if (key === 'cost' && (value === 0 || value === null)) continue;
      // Omit item fling_p if null
      if (key === 'fling_p' && value === null) continue;
      // Omit item effect if null or empty
      if (key === 'effect' && (value === null || value === '')) continue;
      // Omit item sprite if null
      if (key === 'sprite' && value === null) continue;


      result[key] = compact(value);
    }
    return result;
  }
  return obj;
}

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

  // Write metadata
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
