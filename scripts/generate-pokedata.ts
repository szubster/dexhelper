import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { 
  type CompactChainLink, 
  type CompactEncounterDetail, 
  type CompactEvolutionChain, 
  type LocationAreaEncounters, 
  type PokemonMetadata, 
  type PokeDataExport,
  type GenericLocation,
  type SpecificArea,
  type CompactEncounter,
  POKE_VERSION_MAP,
  ENCOUNTER_METHOD_MAP,
  EVO_TRIGGER_MAP
} from '../src/db/schema.ts';
import { GEN1_MAPS, INDOOR_TO_PARENT_MAP } from './data/gen1/mapping.ts';
import { GEN2_MAP_TO_AID } from './data/gen2/mapping.ts';

const POKEMON_COUNT = 251; // Gen 1 & 2
const REPO_URL = 'https://github.com/PokeAPI/api-data.git';
const TEMP_DIR = path.join(process.cwd(), 'scratch/temp_pokeapi');
const OUTPUT_DIR = path.join(process.cwd(), 'data/db');

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
}

interface PokeApiChainLink {
  species: { url: string };
  evolves_to: PokeApiChainLink[];
  evolution_details: PokeApiEvolutionDetail[];
}

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

async function main() {
  const force = process.argv.includes('--force');
  console.log('--- PokéAPI Data Pipeline (GitHub Source) ---');

  // 1. Get Latest Commit SHA
  console.log('Checking upstream SHA...');
  let upstreamSha = '';
  try {
    upstreamSha = execFileSync('gh', ['api', 'repos/PokeAPI/api-data/commits/master', '--jq', '.sha'], { encoding: 'utf-8' }).trim();
  } catch (e) {
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
    } catch (e) {
      console.warn('Git pull failed. Re-cloning...');
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      execFileSync('git', ['clone', '--depth', '1', REPO_URL, TEMP_DIR]);
    }
  }

  const pokemon: PokemonMetadata[] = [];
  const chains: CompactEvolutionChain[] = [];
  const pokemonEncounterMap = new Map<number, CompactEncounter[]>();
  
  // New structures
  const locationMap = new Map<number, GenericLocation>();
  const areaMap = new Map<number, SpecificArea>();
  const inverseIndexMap = new Map<number, Set<number>>(); // lid -> Set<pid>

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

    const chainId = parseInt(sData.evolution_chain.url.split('/').filter(Boolean).pop() || '0', 10);
    const preEvoId = sData.evolves_from_species ? parseInt(sData.evolves_from_species.url.split('/').filter(Boolean).pop() || '0', 10) : undefined;

    pokemon.push(sortObj({
      id: pData.id,
      n: sData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || sData.name,
      cid: chainId,
      cr: sData.capture_rate,
      gr: sData.gender_rate,
      baby: sData.is_baby,
      pre: preEvoId,
    }, ['id', 'n', 'cid']));

    const pokemonEncounters: { aid: number; version_details: { v: number; d: CompactEncounterDetail[] }[] }[] = [];
    for (const areaEnc of eData) {
      const areaUrl = areaEnc.location_area.url;
      const areaId = parseInt(areaUrl.split('/').filter(Boolean).pop() || '0', 10);
      
      // Find gameId for this area (Source of truth)
      let gameId: number | undefined = undefined;
      
      // 1. Check Gen 1 mapping
      const g1Match = Object.entries(GEN1_MAPS).find(([_, map]) => map.aid === areaId);
      let localName: string | undefined = undefined;
      
      if (g1Match) {
         gameId = parseInt(g1Match[0]);
         localName = g1Match[1].name;
      } else {
         // 2. Check Gen 2 mapping
         for (const [group, maps] of Object.entries(GEN2_MAP_TO_AID)) {
            for (const [mid, mapNode] of Object.entries(maps)) {
               if (mapNode.aid === areaId) {
                  gameId = (parseInt(group) << 8) | parseInt(mid);
                  localName = mapNode.name;
                  break;
               }
            }
            if (gameId !== undefined) break;
         }
      }

      // If no ROM map ID found, we skip this encounter as we only care about real in-game locations
      if (gameId === undefined) continue;

      if (!areaMap.has(gameId)) {
        const areaData = readJson(path.join(dataPath, `location-area/${areaId}/index.json`));
        if (areaData) {
          const locUrl = areaData.location.url;
          const lid = parseInt(locUrl.split('/').filter(Boolean).pop() || '0', 10);
          
          if (!locationMap.has(gameId)) {
            const locData = readJson(path.join(dataPath, `location/${lid}/index.json`));
            if (locData) {
              locationMap.set(gameId, sortObj({
                id: gameId,
                n: locData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || locData.name,
                connections: gameId < 256 ? GEN1_MAPS[gameId]?.connections : undefined
              }, ['id', 'n']));
            }
          }

          areaMap.set(gameId, sortObj({
            id: gameId,
            lid: gameId, // For now, we use map ID as location ID too if they match
            n: localName || areaData.names.find((n: PokeApiName) => n.language.name === 'en')?.name || areaData.name || areaId.toString(),
          }, ['id', 'n', 'lid']));

          // Update inverse index
          if (!inverseIndexMap.has(gameId)) inverseIndexMap.set(gameId, new Set());
          inverseIndexMap.get(gameId)?.add(i);
        }
      } else {
        if (!inverseIndexMap.has(gameId)) inverseIndexMap.set(gameId, new Set());
        inverseIndexMap.get(gameId)?.add(i);
      }

      const vDetails: { v: number; d: CompactEncounterDetail[] }[] = [];
      for (const vd of (areaEnc.version_details as PokeApiVersionDetail[])) {
        const vId = POKE_VERSION_MAP[vd.version.name];
        if (!vId) continue;

        vDetails.push({
          v: vId,
          d: vd.encounter_details.map((ed) => ({
            c: ed.chance,
            m: ENCOUNTER_METHOD_MAP[ed.method.name] || 0,
            min: ed.min_level,
            max: ed.max_level,
          }))
        });
      }

      if (vDetails.length > 0) {
        pokemonEncounters.push({
          aid: gameId,
          version_details: vDetails
        });
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

  // Second pass on locations to reconcile parentIds for indoors
  console.log('\nReconciling location parents...');
  for (const loc of locationMap.values()) {
    const parentId = INDOOR_TO_PARENT_MAP[loc.id];
    if (parentId !== undefined) {
      loc.parentId = parentId;
    }
  }

  console.log('\nProcessing Evolution Chains...');
  const uniqueChainIds = Array.from(new Set(pokemon.map(p => p.cid)));
  for (const cid of uniqueChainIds) {
    const chainFilePath = path.join(dataPath, `evolution-chain/${cid}/index.json`);
    const cData = readJson(chainFilePath);
    if (!cData) continue;
    
    const mapLink = (link: PokeApiChainLink): CompactChainLink => ({
      id: parseInt(link.species.url.split('/').filter(Boolean).pop() || '0', 10),
      evolves_to: link.evolves_to.map(mapLink),
      details: link.evolution_details.map((ed) => ({
        tr: EVO_TRIGGER_MAP[ed.trigger.name] || 0,
        min_l: ed.min_level || undefined,
        min_h: ed.min_happiness || undefined,
        item: ed.item ? parseInt(ed.item.url.split('/').filter(Boolean).pop() || '0', 10) : undefined,
        held: ed.held_item ? parseInt(ed.held_item.url.split('/').filter(Boolean).pop() || '0', 10) : undefined,
        time: ed.time_of_day === 'day' ? 1 : ed.time_of_day === 'night' ? 2 : undefined,
      })),
    });

    chains.push(sortObj({
      id: cData.id,
      chain: mapLink(cData.chain),
    }, ['id', 'chain']));
  }

  console.log('\nWriting split JSONL files...');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  writeJsonl(path.join(OUTPUT_DIR, 'pokemon.jsonl'), pokemon);
  writeJsonl(path.join(OUTPUT_DIR, 'encounters.jsonl'), Array.from(pokemonEncounterMap.entries()).map(([pid, encs]) => ({
    pid, 
    encounters: encs
  })));
  writeJsonl(path.join(OUTPUT_DIR, 'chains.jsonl'), chains);
  writeJsonl(path.join(OUTPUT_DIR, 'locations.jsonl'), Array.from(locationMap.values()));
  writeJsonl(path.join(OUTPUT_DIR, 'areas.jsonl'), Array.from(areaMap.values()));
  writeJsonl(path.join(OUTPUT_DIR, 'location_index.jsonl'), Array.from(inverseIndexMap.entries()).map(([lid, pids]) => sortObj({
    lid,
    pids: Array.from(pids).sort((a, b) => a - b)
  }, ['lid', 'pids'])));

  // Write metadata
  fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify({
    sourceSha: upstreamSha,
    generatedAt: new Date().toISOString(),
  }, null, 2));

  console.log(`\nSuccess! Wrote data files to ${OUTPUT_DIR}`);
  console.log(`Source SHA: ${upstreamSha}`);
}

main().catch(err => {
  console.error('\nGeneration failed:', err);
  process.exit(1);
});
