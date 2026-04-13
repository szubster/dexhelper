import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import type { 
  CompactChainLink, 
  CompactEncounterDetail, 
  CompactEvolutionChain, 
  LocationAreaEncounters, 
  PokemonCompact, 
  SpeciesCompact,
  PokeDataExport
} from '../src/db/schema';
import { 
  POKE_VERSION_MAP, 
  ENCOUNTER_METHOD_MAP, 
  EVO_TRIGGER_MAP 
} from '../src/db/schema';

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
    upstreamSha = execSync('gh api repos/PokeAPI/api-data/commits/master --jq .sha', { encoding: 'utf-8' }).trim();
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
    execSync(`git clone --depth 1 ${REPO_URL} ${TEMP_DIR}`);
  } else {
    console.log('Updating local clone...');
    try {
      execSync('git pull', { cwd: TEMP_DIR });
    } catch (e) {
      console.warn('Git pull failed. Re-cloning...');
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      execSync(`git clone --depth 1 ${REPO_URL} ${TEMP_DIR}`);
    }
  }

  const pokemon: PokemonCompact[] = [];
  const species: SpeciesCompact[] = [];
  const chains: CompactEvolutionChain[] = [];
  const pokemonEncounterMap = new Map<number, LocationAreaEncounters[]>();

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
      console.warn(`\nMissing data for Pokémon ${i}, skipping.`);
      continue;
    }

    const encounterPath = path.join(dataPath, `pokemon/${i}/encounters/index.json`);
    const eData = readJson(encounterPath) || [];

    pokemon.push({
      id: pData.id,
      sid: i,
      n: pData.name,
      t: pData.types.map((t: any) => t.type.name),
      s: pData.stats.map((s: any) => s.base_stat),
    });

    const chainId = parseInt(sData.evolution_chain.url.split('/').filter(Boolean).pop() || '0', 10);
    const preEvoId = sData.evolves_from_species ? parseInt(sData.evolves_from_species.url.split('/').filter(Boolean).pop() || '0', 10) : undefined;

    species.push({
      id: sData.id,
      cid: chainId,
      n: sData.names.find((n: any) => n.language.name === 'en')?.name || sData.name,
      cr: sData.capture_rate,
      gr: sData.gender_rate,
      baby: sData.is_baby,
      pre: preEvoId,
    });

    // Mirror PokeAPI encounter structure: pid -> list of areas with version details
    // But we condense it to LocationAreaEncounters structure which our components expect
    const pokemonEncounters: any[] = [];
    for (const areaEnc of eData) {
      const areaName = areaEnc.location_area.name;
      const vDetails: any[] = [];

      for (const vd of areaEnc.version_details) {
        const vId = POKE_VERSION_MAP[vd.version.name];
        if (!vId) continue;

        vDetails.push({
          version: { name: vd.version.name },
          max_chance: vd.max_chance,
          encounter_details: vd.encounter_details.map((ed: any) => ({
            min_level: ed.min_level,
            max_level: ed.max_level,
            chance: ed.chance,
            method: { name: ed.method.name },
            condition_values: ed.condition_values || []
          }))
        });
      }

      if (vDetails.length > 0) {
        pokemonEncounters.push({
          location_area: { name: areaName },
          version_details: vDetails
        });
      }
    }
    
    if (pokemonEncounters.length > 0) {
      pokemonEncounterMap.set(i, pokemonEncounters);
    }
  }

  console.log('\nProcessing Evolution Chains...');
  const uniqueChainIds = Array.from(new Set(species.map(s => s.cid)));
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

  // Finalize Encounters for Export
  const encounters: any[] = Array.from(pokemonEncounterMap.entries()).map(([pid, encs]) => ({
    pid, 
    encounters: encs
  }));

  const exportData: Omit<PokeDataExport, 'hash'> & { hash?: string } = {
    pokemon,
    species,
    encounters,
    chains,
    sourceSha: upstreamSha,
  };

  const hash = crypto.createHash('sha256').update(JSON.stringify(exportData)).digest('hex');
  const finalData: PokeDataExport = { ...exportData, hash };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData));

  console.log(`\nSuccess! Wrote ${OUTPUT_PATH}`);
  console.log(`Hash: ${hash}`);
  console.log(`Source SHA: ${upstreamSha}`);
}

main().catch(err => {
  console.error('\nGeneration failed:', err);
  process.exit(1);
});
