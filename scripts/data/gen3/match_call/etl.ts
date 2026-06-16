import fs from 'node:fs';

const battleSetup = fs.readFileSync('scratch/pokeemerald/src/battle_setup.c', 'utf8');
const trainersH = fs.readFileSync('scratch/pokeemerald/src/data/trainers.h', 'utf8');
const trainerPartiesH = fs.readFileSync('scratch/pokeemerald/src/data/trainer_parties.h', 'utf8');
const speciesMapRaw = fs.readFileSync('scratch/species_map.txt', 'utf8');

const speciesToId: Record<string, number> = {};
speciesMapRaw.split('\n').forEach((line) => {
  const parts = line.trim().split(' ');
  if (parts.length >= 2 && parts[0] && parts[1]) {
    speciesToId[parts[0]] = parseInt(parts[1], 10);
  }
});

// Extract EV yields from PokeAPI
const evYields: Record<number, Record<string, number>> = {};
for (let id = 1; id <= 386; id++) {
  const pFile = `scratch/temp_pokeapi/data/api/v2/pokemon/${id}/index.json`;
  if (fs.existsSync(pFile)) {
    const d = JSON.parse(fs.readFileSync(pFile, 'utf8'));
    const evs: Record<string, number> = {};
    for (const stat of d.stats) {
      if (stat.effort > 0) {
        evs[stat.stat.name] = stat.effort;
      }
    }
    evYields[id] = evs;
  }
}

const rematchTableRegex =
  /const struct RematchTrainer gRematchTable\[REMATCH_TABLE_ENTRIES\] =([\s\S]*?)};/m;
const match = battleSetup.match(rematchTableRegex);
if (!match || !match[1]) {
  throw new Error('Could not find gRematchTable');
}

const tableContent = match[1];
const entryRegex =
  /\[(REMATCH_[A-Z0-9_]+)\]\s*=\s*REMATCH\(\s*(TRAINER_[A-Z0-9_]+),\s*(TRAINER_[A-Z0-9_]+),\s*(TRAINER_[A-Z0-9_]+),\s*(TRAINER_[A-Z0-9_]+),\s*(TRAINER_[A-Z0-9_]+),\s*(MAP_[A-Z0-9_]+)\)/g;

const trainers: any[] = [];

let entryMatch;
while ((entryMatch = entryRegex.exec(tableContent)) !== null) {
  const rematchId = entryMatch[1];
  const t1 = entryMatch[2];
  const t2 = entryMatch[3];
  const t3 = entryMatch[4];
  const t4 = entryMatch[5];
  const t5 = entryMatch[6];
  const map = entryMatch[7];

  trainers.push({
    rematchId,
    trainerIds: [t1, t2, t3, t4, t5],
    map,
  });
}

// Find actual trainer names
const trainerData: Record<string, any> = {};
const entries = trainersH.split(/\[(TRAINER_[A-Z0-9_]+)\]\s*=\s*\{/g);
for (let i = 1; i < entries.length; i += 2) {
  const trainerId = entries[i];
  const block = entries[i + 1];
  if (!trainerId || !block) continue;

  const nameMatch = block.match(/\.trainerName\s*=\s*_?\("([^"]+)"\)/);
  const partyMatch = block.match(/\.party\s*=\s*[A-Z_0-9]*\(\s*(sParty_[A-Za-z0-9_]+)\s*\)/);

  if (nameMatch && partyMatch && nameMatch[1] && partyMatch[1]) {
    trainerData[trainerId] = {
      name: nameMatch[1],
      partyName: partyMatch[1],
    };
  }
}

const statMap: Record<string, string> = {
  hp: 'hp',
  attack: 'atk',
  defense: 'def',
  'special-attack': 'spatk',
  'special-defense': 'spdef',
  speed: 'spd',
};

const output = [];

for (const t of trainers) {
  const tiers = [];
  let trainerName = '';

  for (let i = 0; i < t.trainerIds.length; i++) {
    const tId = t.trainerIds[i];
    if (!tId) continue;

    const data = trainerData[tId];
    if (!data) {
      continue;
    }

    if (i === 0) trainerName = data.name;

    // Parse party
    const partyName = data.partyName;
    // Find party array
    const partyRegex = new RegExp(`${partyName}\\[\\]\\s*=\\s*{([\\s\\S]*?)};`, 'm');
    const pMatch = trainerPartiesH.match(partyRegex);

    const totalEvs = { hp: 0, atk: 0, def: 0, spatk: 0, spdef: 0, spd: 0 };

    if (pMatch && pMatch[1]) {
      const pContent = pMatch[1];
      // find .species = SPECIES_XXX
      const speciesRegex = /\.species\s*=\s*(SPECIES_[A-Z0-9_]+)/g;
      let sMatch;
      while ((sMatch = speciesRegex.exec(pContent)) !== null) {
        if (!sMatch[1]) continue;
        const speciesName = sMatch[1];
        let pokeId = speciesToId[speciesName];

        // Some special mappings
        if (speciesName === 'SPECIES_UNOWN_A') pokeId = speciesToId['SPECIES_UNOWN'];
        else if (speciesName === 'SPECIES_NIDORAN_F') pokeId = 29;
        else if (speciesName === 'SPECIES_NIDORAN_M') pokeId = 32;
        else if (speciesName === 'SPECIES_MR_MIME') pokeId = 122;
        else if (speciesName === 'SPECIES_HO_OH') pokeId = 250;
        else if (speciesName === 'SPECIES_CHIMECHO') pokeId = 358;
        else if (speciesName === 'SPECIES_WYNAUT') pokeId = 360;
        // Add EV yields
        if (pokeId && evYields[pokeId]) {
          const yields = evYields[pokeId];
          if (yields) {
              for (const [s, v] of Object.entries(yields)) {
                totalEvs[statMap[s] as keyof typeof totalEvs] += v;
              }
          }
        }
      }
    }

    tiers.push({
      tier: i + 1,
      trainerId: tId,
      partyName,
      evYield: totalEvs,
    });
  }

  if (tiers.length > 0) {
    output.push({
      id: t.rematchId,
      name: trainerName,
      map: t.map,
      tiers,
    });
  }
}

const jsonlContent = output.map((row) => JSON.stringify(row)).join('\n') + '\n';
fs.writeFileSync('data/gen3_match_call.jsonl', jsonlContent);
