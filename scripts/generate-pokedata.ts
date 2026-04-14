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
const OUTPUT_PATH = path.join(process.cwd(), 'public/data/pokedata.json');

function readJson(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
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

  // 2. Check current SHA
  if (!force && fs.existsSync(OUTPUT_PATH)) {
    const currentData: PokeDataExport = readJson(OUTPUT_PATH);
    if (currentData.sourceSha === upstreamSha && upstreamSha !== '') {
      console.log(`Data is already up to date (SHA: ${upstreamSha}). Use --force to override.`);
      return;
    }
  }

  // 3. Clone or Update Repo
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

    pokemon.push({
      id: pData.id,
      sid: i,
      n: sData.names.find((n: any) => n.language.name === 'en')?.name || sData.name,
      s: pData.stats.map((s: any) => s.base_stat),
      cid: chainId,
      cr: sData.capture_rate,
      gr: sData.gender_rate,
      baby: sData.is_baby,
      pre: preEvoId,
    });

    const pokemonEncounters: any[] = [];
    for (const areaEnc of eData) {
      const areaUrl = areaEnc.location_area.url;
      const areaId = parseInt(areaUrl.split('/').filter(Boolean).pop() || '0', 10);
      const areaSlug = areaEnc.location_area.name;

      // Extract location data if not seen
      if (!areaMap.has(areaId)) {
        const areaData = readJson(path.join(dataPath, `location-area/${areaId}/index.json`));
        if (areaData) {
          const locUrl = areaData.location.url;
          const lid = parseInt(locUrl.split('/').filter(Boolean).pop() || '0', 10);
          
          if (!locationMap.has(lid)) {
            const locData = readJson(path.join(dataPath, `location/${lid}/index.json`));
            if (locData) {
              // Find gameId for Gen 1 (exact Area ID match)
              let gameId: number | undefined = undefined;
              const g1Match = Object.entries(GEN1_MAPS).find(([_, map]) => map.aid === areaId);
              if (g1Match) {
                gameId = parseInt(g1Match[0]);
              }

              // Find gameId for Gen 2 (group:id -> encoded 16-bit)
              if (gameId === undefined) {
                // Peek into areas for this location to find an AID match in GEN2
                for (const area of locData.areas) {
                   const aid = parseInt(area.url.split('/').filter(Boolean).pop() || '0', 10);
                   for (const [group, maps] of Object.entries(GEN2_MAP_TO_AID)) {
                      for (const [mid, mapAid] of Object.entries(maps)) {
                        if (mapAid === aid) {
                          gameId = (parseInt(group) << 8) | parseInt(mid);
                          break;
                        }
                      }
                      if (gameId !== undefined) break;
                   }
                   if (gameId !== undefined) break;
                }
              }
              
              locationMap.set(lid, {
                id: lid,
                n: locData.names.find((n: any) => n.language.name === 'en')?.name || locData.name,
                gameId,
                connections: typeof gameId === 'number' && gameId < 256 ? GEN1_MAPS[gameId]?.connections : undefined
              });
            }
          }

          areaMap.set(areaId, {
            id: areaId,
            lid: lid,
            n: areaData.names.find((n: any) => n.language.name === 'en')?.name || areaData.name || areaSlug,
          });

          // Update inverse index
          if (!inverseIndexMap.has(lid)) inverseIndexMap.set(lid, new Set());
          inverseIndexMap.get(lid)?.add(i);
        }
      } else {
        const lid = areaMap.get(areaId)!.lid;
        if (!inverseIndexMap.has(lid)) inverseIndexMap.set(lid, new Set());
        inverseIndexMap.get(lid)?.add(i);
      }

      const vDetails: any[] = [];
      for (const vd of areaEnc.version_details) {
        const vId = POKE_VERSION_MAP[vd.version.name];
        if (!vId) continue;

        vDetails.push({
          v: vId,
          d: vd.encounter_details.map((ed: any) => ({
            c: ed.chance,
            m: ENCOUNTER_METHOD_MAP[ed.method.name] || 0,
            min: ed.min_level,
            max: ed.max_level,
          }))
        });
      }

      if (vDetails.length > 0) {
        pokemonEncounters.push({
          areaId: areaId,
          version_details: vDetails
        });
      }
    }
    
    if (pokemonEncounters.length > 0) {
      // Re-map to match CompactEncounter structure
      const finalEncs: CompactEncounter[] = [];
      for (const pe of pokemonEncounters) {
        for (const vd of pe.version_details) {
          finalEncs.push({
            aid: pe.areaId,
            v: vd.v,
            d: vd.d
          });
        }
      }
      pokemonEncounterMap.set(i, finalEncs);
    }
  }

  // Second pass on locations to reconcile parentIds
  console.log('Reconciling location parents...');
  // Create an internal name-to-location mapping for reconciliation
  const nameToLoc = new Map<string, GenericLocation>();
  for (const loc of locationMap.values()) {
    // Note: We use the internal 'PokeAPI name' which we can get from PokeAPI files if needed, 
    // but we saved it as 'n' (name). Let's use gameId mapping instead.
  }

  for (const loc of locationMap.values()) {
    if (loc.gameId !== undefined) {
      const parentGameId = INDOOR_TO_PARENT_MAP[loc.gameId];
      if (parentGameId !== undefined) {
        // Find the location that corresponds to the parentGameId
        const parentLoc = Array.from(locationMap.values()).find(l => l.gameId === parentGameId);
        if (parentLoc) {
          loc.parentId = parentLoc.id;
        }
      }
    }
  }

  console.log('\nProcessing Evolution Chains...');
  const uniqueChainIds = Array.from(new Set(pokemon.map(p => p.cid)));
  for (const cid of uniqueChainIds) {
    const chainFilePath = path.join(dataPath, `evolution-chain/${cid}/index.json`);
    const cData = readJson(chainFilePath);
    if (!cData) continue;
    
    const mapLink = (link: any): CompactChainLink => ({
      sid: parseInt(link.species.url.split('/').filter(Boolean).pop() || '0', 10),
      evolves_to: link.evolves_to.map(mapLink),
      details: link.evolution_details.map((ed: any) => ({
        tr: EVO_TRIGGER_MAP[ed.trigger.name] || 0,
        min_l: ed.min_level || undefined,
        min_h: ed.min_happiness || undefined,
        item: ed.item ? parseInt(ed.item.url.split('/').filter(Boolean).pop() || '0', 10) : undefined,
        held: ed.held_item ? parseInt(ed.held_item.url.split('/').filter(Boolean).pop() || '0', 10) : undefined,
        time: ed.time_of_day === 'day' ? 1 : ed.time_of_day === 'night' ? 2 : undefined,
        rel_s: ed.relative_physical_stats ?? undefined,
      })),
    });

    chains.push({
      id: cData.id,
      chain: mapLink(cData.chain),
    });
  }

  const exportData: Omit<PokeDataExport, 'hash'> = {
    pokemon,
    encounters: Array.from(pokemonEncounterMap.entries()).map(([pid, encs]) => ({
      pid, 
      encounters: encs
    })),
    chains,
    locations: Array.from(locationMap.values()),
    areas: Array.from(areaMap.values()),
    locationIndex: Object.fromEntries(
      Array.from(inverseIndexMap.entries()).map(([lid, pids]) => [
        lid,
        Array.from(pids).sort((a, b) => a - b)
      ])
    ),
    sourceSha: upstreamSha,
  };

  const hash = crypto.createHash('sha256').update(JSON.stringify(exportData)).digest('hex');
  const finalData: PokeDataExport = { ...exportData, hash };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData));
  
  // Write hash-only file for quick check
  const HASH_PATH = OUTPUT_PATH.replace('.json', '.hash');
  fs.writeFileSync(HASH_PATH, hash);

  console.log(`\nSuccess! Wrote ${OUTPUT_PATH} and ${HASH_PATH}`);
  console.log(`Hash: ${hash}`);
  console.log(`Source SHA: ${upstreamSha}`);
}

main().catch(err => {
  console.error('\nGeneration failed:', err);
  process.exit(1);
});
