const fs = require('node:fs');
const https = require('node:https');

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

function capitalize(str) {
  return str
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

async function run() {
  console.log('Fetching map data from pret repositories...');

  const gen1MapConstants = await download(
    'https://raw.githubusercontent.com/pret/pokered/master/constants/map_constants.asm',
  );
  const gen1TownMapEntries = await download(
    'https://raw.githubusercontent.com/pret/pokered/master/data/maps/town_map_entries.asm',
  );

  const gen2Maps = await download(
    'https://raw.githubusercontent.com/pret/pokecrystal/master/data/maps/maps.asm',
  );
  const gen2LandmarksLines = await download(
    'https://raw.githubusercontent.com/pret/pokecrystal/master/constants/landmark_constants.asm',
  );
  const gen2MapConstantsLines = await download(
    'https://raw.githubusercontent.com/pret/pokecrystal/master/constants/map_constants.asm',
  );

  // === GEN 1 ===
  console.log('Generating Gen 1 mapping...');

  const gen1MapToLocation = {};
  const indoorGroupToName = {};

  // Parse indoor groups
  const indoorMatches = [
    ...gen1TownMapEntries.matchAll(
      /indoor_map\s+(\w+),\s*\d+,\s*\d+,\s*(\w+)/g,
    ),
  ];
  for (const match of indoorMatches) {
    let [_, group, name] = match;
    if (name.endsWith('Name')) name = name.slice(0, -4);

    if (name === 'SeaCottage') name = 'Sea Cottage';
    else if (name === 'SSAnne') name = 'S.S. Anne';
    else if (name === 'MountMoon') name = 'Mt. Moon';
    else if (name === 'PokemonLeague') name = 'Indigo Plateau';
    else if (name === 'RocketHQ') name = 'Rocket Hideout';
    else {
      name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    indoorGroupToName[group] = name;
  }

  // Parse outdoor maps manually for gen 1 based on actual file ordering

  let activeGroup = null;
  let mapsSinceLastGroup = [];
  let currentMapConstId = 0;

  const gen1Lines = gen1MapConstants.split('\n');
  for (const line of gen1Lines) {
    if (line.includes('const_def')) {
      currentMapConstId = 0;
    }

    const mapConstMatch = line.match(/^\s*map_const\s+(\w+),/);
    if (mapConstMatch) {
      let mapName = mapConstMatch[1];
      gen1MapToLocation[currentMapConstId] = {
        name: mapName,
        id: currentMapConstId,
        group: null,
      };

      // Before FIRST_INDOOR_MAP (roughly map ID 37), maps are just outdoor
      if (currentMapConstId <= 37) {
        if (mapName !== 'UNUSED_MAP_0B') {
          // Capitalize nicely: e.g. ROUTE_1 -> Route 1
          mapName = mapName.replace(/_/g, ' ');
          mapName = mapName
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
          gen1MapToLocation[currentMapConstId].group = mapName;
        }
      } else {
        mapsSinceLastGroup.push(currentMapConstId);
      }
      currentMapConstId++;
    }

    const endGroupMatch = line.match(/^\s*end_indoor_group\s+(\w+)/);
    if (endGroupMatch) {
      activeGroup = endGroupMatch[1];
      for (const id of mapsSinceLastGroup) {
        if (gen1MapToLocation[id]) {
          gen1MapToLocation[id].group = activeGroup;
        }
      }
      mapsSinceLastGroup = [];
    }
  }

  for (const id in gen1MapToLocation) {
    if (!gen1MapToLocation[id].group) {
      let mapName = gen1MapToLocation[id].name;
      mapName = mapName.replace(/_/g, ' ');
      mapName = mapName
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      gen1MapToLocation[id].group = mapName;
    }
  }

  const finalGen1Mapping = {};
  for (const id in gen1MapToLocation) {
    const group = gen1MapToLocation[id].group;
    let finalName =
      indoorGroupToName[group] || capitalize(group.replace(/ /g, '_'));
    // Clean up
    finalName = finalName.replace(/ \d+$/, '');
    if (finalName === 'Cerulean City 2' || finalName === 'Cerulean City 3')
      finalName = 'Cerulean City';
    if (finalName === 'Vermilion City 2' || finalName === 'Vermilion City 3')
      finalName = 'Vermilion City';
    if (finalName === 'Fuchsia City 2' || finalName === 'Fuchsia City 3')
      finalName = 'Fuchsia City';
    if (finalName === 'Lavender Town 2' || finalName === 'Lavender Town 3')
      finalName = 'Lavender Town';
    if (finalName === 'Pokemon Mansion 2') finalName = 'Pokemon Mansion';
    if (finalName === 'Safari Zone 2') finalName = 'Safari Zone';
    if (finalName === 'Seafoam Islands 2') finalName = 'Seafoam Islands';
    if (finalName === 'Victory Road 2' || finalName === 'Victory Road 3')
      finalName = 'Victory Road';
    if (finalName === 'Rock Tunnel 2') finalName = 'Rock Tunnel';
    if (finalName === 'Route 12 2' || finalName === 'Route 12 3')
      finalName = 'Route 12';
    if (finalName === 'Silph Co 2') finalName = 'Silph Co';
    if (finalName === 'Pokemon League 2' || finalName === 'Pokemon League 3')
      finalName = 'Indigo Plateau';
    // Re-replace for direct map matches that got stripped:
    if (group.startsWith('Route')) finalName = group;
    if (group.includes('City') || group.includes('Town')) finalName = group;

    finalGen1Mapping[id] = finalName;
  }

  fs.mkdirSync('src/engine/data/gen1', { recursive: true });
  fs.writeFileSync(
    'src/engine/data/gen1/mapLocations.json',
    JSON.stringify(finalGen1Mapping, null, 2),
  );
  console.log('Gen 1 mapped', Object.keys(finalGen1Mapping).length, 'maps');

  // === GEN 2 ===
  console.log('Generating Gen 2 mapping...');

  const gen2LandmarkConstToName = {};
  let currentLandmarkId2 = 0;
  for (const line of gen2LandmarksLines.split('\n')) {
    const match = line.match(/^\s*const\s+(LANDMARK_\w+)/);
    if (match) {
      const constName = match[1];
      let name = constName.replace('LANDMARK_', '');
      name = capitalize(name);
      if (name === 'Special') {
        currentLandmarkId2++;
        continue;
      }
      if (name === 'Event') name = 'Event/Gift';
      if (name === 'Gift') name = 'Special Event/Traded';

      // specific fixes
      if (name === 'Mt Mortar') name = 'Mt. Mortar';
      if (name === 'Mt Moon') name = 'Mt. Moon';
      if (name === 'Ruins Of Alph') name = 'Ruins of Alph';
      if (name === 'Lake Of Rage') name = 'Lake of Rage';
      if (name === 'Ice Path') name = 'Ice Path';
      if (name === 'Dark Cave') name = 'Dark Cave';
      if (name === 'Dragons Den') name = "Dragon's Den";
      if (name === 'National Park') name = 'National Park';
      if (name === 'Radio Tower') name = 'Radio Tower';
      if (name === 'Lav Radio Tower') name = 'Lav Radio Tower';
      if (name === 'Fast Ship') name = 'Fast Ship';

      gen2LandmarkConstToName[constName] = {
        id: currentLandmarkId2,
        name: name,
      };
      currentLandmarkId2++;
    } else if (line.match(/^\s*const_def\s+\$7f/)) {
      currentLandmarkId2 = 127;
    }
  }

  const finalGen2Mapping = {};

  let currentGroup2 = 0;
  let mapIdInGroup = 1;

  for (const line of gen2MapConstantsLines.split('\n')) {
    const groupMatch = line.match(/^\s*newgroup\s+(\w+)/);
    if (groupMatch) {
      currentGroup2++;
      mapIdInGroup = 1;
      finalGen2Mapping[currentGroup2] = {};
    }

    const mapConstMatch = line.match(/^\s*map_const\s+(\w+),/);
    if (mapConstMatch) {
      const mapName = mapConstMatch[1];

      const mapNameRegexStr = mapName.replace(/_/g, '');
      const mapRegex = new RegExp(
        `^\\s*map\\s+${mapNameRegexStr}\\s*,[^,]*,[^,]*,\\s*(LANDMARK_\\w+)`,
        'im',
      );
      const mapAsmMatch = gen2Maps.match(mapRegex);

      let landmarkName = 'Unknown';
      if (mapAsmMatch) {
        const landmarkConst = mapAsmMatch[1];
        if (gen2LandmarkConstToName[landmarkConst]) {
          landmarkName = gen2LandmarkConstToName[landmarkConst].name;
        }
      }

      finalGen2Mapping[currentGroup2][mapIdInGroup] = landmarkName;
      mapIdInGroup++;
    }
  }

  const finalGen2Landmarks = {};
  for (const [_key, value] of Object.entries(gen2LandmarkConstToName)) {
    finalGen2Landmarks[value.id] = value.name;
  }
  // Gen 2 location catch maps 126 to Event/Gift and 127 to Special
  // Let's explicitly hardcode the overrides to match Gen2 internal behavior
  finalGen2Landmarks[126] = 'Event/Gift';
  finalGen2Landmarks[127] = 'Special Event/Traded';

  fs.mkdirSync('src/engine/data/gen2', { recursive: true });
  fs.writeFileSync(
    'src/engine/data/gen2/mapLocations.json',
    JSON.stringify(finalGen2Mapping, null, 2),
  );
  fs.writeFileSync(
    'src/engine/data/gen2/landmarks.json',
    JSON.stringify(finalGen2Landmarks, null, 2),
  );
  console.log(
    'Gen 2 mapped',
    Object.keys(finalGen2Mapping).length,
    'map groups and',
    Object.keys(finalGen2Landmarks).length,
    'landmarks',
  );
}

run().catch(console.error);
