/**
 * @module generateMapLocations
 *
 * Downloads and parses original Game Boy assembly (.asm) files from decompiled Game Boy ROM repositories
 * (`pret/pokered` and `pret/pokecrystal`) to construct Map ID and Landmark dictionaries.
 *
 * **Why this is necessary:**
 * The save files use internal ROM Map IDs (e.g. `0x00` is Pallet Town in Gen 1, or Group/Map pairs in Gen 2)
 * to track player location, caught locations, and wild encounters. Standard API sources like PokeAPI only provide
 * modern generic string names, not lower-level Game Boy ROM IDs. By parsing decompilation `.asm` source files,
 * we extract exact map constants and internal grouping structures to translate binary save data into UI-friendly names.
 *
 * **Data Sources:**
 * - [`pret/pokered`](https://github.com/pret/pokered) (`constants/map_constants.asm`, `data/maps/town_map_entries.asm`)
 * - [`pret/pokecrystal`](https://github.com/pret/pokecrystal) (`constants/map_constants.asm`, `constants/landmark_constants.asm`, `data/maps/maps.asm`)
 *
 * **Outputs:**
 * - `src/engine/data/gen1/mapLocations.json` - Map ID to Name dictionary for Gen 1 (Kanto).
 * - `src/engine/data/gen2/mapLocations.json` - Map Group + Map ID to Landmark dictionary for Gen 2 (Johto/Kanto).
 * - `src/engine/data/gen2/landmarks.json` - Landmark ID dictionary for Gen 2.
 *
 * **Regeneration:**
 * To run this script locally and regenerate the map JSON files, execute:
 * `pnpm run data:gen-maps`
 */

import fs from 'node:fs';
import https from 'node:https';

/**
 * Helper function to download raw text content from a remote URL over HTTPS.
 *
 * @param url - The direct HTTPS URL of the file to download (e.g. raw GitHub content).
 * @returns A promise resolving to the utf-8 text response body.
 * @example
 * const asmContent = await download('https://raw.githubusercontent.com/pret/pokered/master/constants/map_constants.asm');
 */
function download(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Transforms snake_case ROM constant strings or raw identifiers into title-cased, human-readable UI names.
 *
 * @param str - The snake_case identifier string to capitalize (e.g., 'RUINS_OF_ALPH').
 * @returns The formatted title-case string (e.g., 'Ruins Of Alph').
 * @example
 * const formattedName = capitalize('LAKE_OF_RAGE'); // returns 'Lake Of Rage'
 */
function capitalize(str: string): string {
  return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

interface Gen1MapInfo {
  name: string;
  id: number;
  group: string | null;
}

/**
 * Downloads and parses original Game Boy assembly (.asm) files to generate Map ID dictionaries.
 *
 * **Why this is necessary:**
 * The save files use internal ROM Map IDs (e.g., `0x00` is Pallet Town) to track player location,
 * caught locations, and encounters. PokeAPI only provides modern, generic string names, not Game Boy IDs.
 * By directly parsing the `pret` decompilation projects (pokered / pokecrystal), we can extract the exact
 * map constants and internal grouping structures the game engine actually uses and translate them into
 * human-readable names for the UI.
 *
 * **Regeneration Steps:**
 * To regenerate this data locally after changes, run: `pnpm run data:gen-maps`
 */
async function run() {
  console.log('Fetching map data from pret repositories...');

  const gen1MapConstants = await download('https://raw.githubusercontent.com/pret/pokered/master/constants/map_constants.asm');
  const gen1TownMapEntries = await download('https://raw.githubusercontent.com/pret/pokered/master/data/maps/town_map_entries.asm');

  const gen2Maps = await download('https://raw.githubusercontent.com/pret/pokecrystal/master/data/maps/maps.asm');
  const gen2LandmarksLines = await download('https://raw.githubusercontent.com/pret/pokecrystal/master/constants/landmark_constants.asm');
  const gen2MapConstantsLines = await download('https://raw.githubusercontent.com/pret/pokecrystal/master/constants/map_constants.asm');

  // === GEN 1 ===
  console.log('Generating Gen 1 mapping...');

  const gen1MapToLocation: Record<number, Gen1MapInfo> = {};
  const indoorGroupToName: Record<string, string> = {};

  // 1. Parse Gen 1 indoor map groups from pret/pokered data/maps/town_map_entries.asm
  // This maps internal indoor map group constants (e.g. INDOOR_VIRIDIAN) to human-readable names.
  const indoorMatches = [...gen1TownMapEntries.matchAll(/indoor_map\s+(\w+),\s*\d+,\s*\d+,\s*(\w+)/g)];
  for (const match of indoorMatches) {
    const group = match[1];
    let name = match[2];
    if (!group || !name) continue;

    // Strip the trailing 'Name' string symbol suffix if present (e.g., ViridianCityName -> ViridianCity)
    if (name.endsWith('Name')) name = name.slice(0, -4);

    // Normalize specific compound names that require custom spacing or punctuation
    if (name === 'SeaCottage') name = 'Sea Cottage';
    else if (name === 'SSAnne') name = 'S.S. Anne';
    else if (name === 'MountMoon') name = 'Mt. Moon';
    else if (name === 'PokemonLeague') name = 'Indigo Plateau';
    else if (name === 'RocketHQ') name = 'Rocket Hideout';
    else {
      // Convert PascalCase names to spaced words (e.g., PalletTown -> Pallet Town)
      name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    indoorGroupToName[group] = name;
  }

  // 2. Parse Gen 1 map_const declarations from constants/map_constants.asm
  // The ROM assigns sequential map IDs based on the order of `map_const` macro calls.
  let activeGroup: string | null = null;
  let mapsSinceLastGroup: number[] = [];
  let currentMapConstId = 0;

  const gen1Lines = gen1MapConstants.split('\n');
  for (const line of gen1Lines) {
    // Reset sequential ID counter when encountering a new constant block
    if (line.includes('const_def')) {
       currentMapConstId = 0;
    }

    const mapConstMatch = line.match(/^\s*map_const\s+(\w+),/);
    if (mapConstMatch) {
      let mapName = mapConstMatch[1];
      if (!mapName) continue;
      
      gen1MapToLocation[currentMapConstId] = { name: mapName, id: currentMapConstId, group: null };

      // Map IDs 0-37 correspond to primary outdoor maps (Cities, Towns, Routes)
      if (currentMapConstId <= 37) {
        if (mapName !== 'UNUSED_MAP_0B') {
           // Format snake_case constant names nicely (e.g. ROUTE_1 -> Route 1)
           mapName = mapName.replace(/_/g, ' ');
           mapName = mapName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
           gen1MapToLocation[currentMapConstId]!.group = mapName;
        }
      } else {
        // Collect indoor map IDs to associate with their parent group when `end_indoor_group` is encountered
        mapsSinceLastGroup.push(currentMapConstId);
      }
      currentMapConstId++;
    }

    // `end_indoor_group` defines the group header that owns all preceding indoor map IDs
    const endGroupMatch = line.match(/^\s*end_indoor_group\s+(\w+)/);
    if (endGroupMatch) {
      activeGroup = endGroupMatch[1] ?? null;
      for (const id of mapsSinceLastGroup) {
        const item = gen1MapToLocation[id];
        if (item) {
          item.group = activeGroup;
        }
      }
      mapsSinceLastGroup = [];
    }
  }

  for (const idStr in gen1MapToLocation) {
    const id = parseInt(idStr);
    const item = gen1MapToLocation[id];
    if (item && !item.group) {
        let mapName = item.name;
        mapName = mapName.replace(/_/g, ' ');
        mapName = mapName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        item.group = mapName;
    }
  }

  const finalGen1Mapping: Record<number, string> = {};
  for (const idStr in gen1MapToLocation) {
     const id = parseInt(idStr);
     const item = gen1MapToLocation[id];
     if (!item) continue;
     
     const group = item.group;
     if (!group) continue;
     
     let finalName = indoorGroupToName[group] || capitalize(group.replace(/ /g, '_'));
     // Clean up
     finalName = finalName.replace(/ \d+$/, '');
     if (finalName === 'Cerulean City 2' || finalName === 'Cerulean City 3') finalName = 'Cerulean City';
     if (finalName === 'Vermilion City 2' || finalName === 'Vermilion City 3') finalName = 'Vermilion City';
     if (finalName === 'Fuchsia City 2' || finalName === 'Fuchsia City 3') finalName = 'Fuchsia City';
     if (finalName === 'Lavender Town 2' || finalName === 'Lavender Town 3') finalName = 'Lavender Town';
     if (finalName === 'Pokemon Mansion 2') finalName = 'Pokemon Mansion';
     if (finalName === 'Safari Zone 2') finalName = 'Safari Zone';
     if (finalName === 'Seafoam Islands 2') finalName = 'Seafoam Islands';
     if (finalName === 'Victory Road 2' || finalName === 'Victory Road 3') finalName = 'Victory Road';
     if (finalName === 'Rock Tunnel 2') finalName = 'Rock Tunnel';
     if (finalName === 'Route 12 2' || finalName === 'Route 12 3') finalName = 'Route 12';
     if (finalName === 'Silph Co 2') finalName = 'Silph Co';
     if (finalName === 'Pokemon League 2' || finalName === 'Pokemon League 3') finalName = 'Indigo Plateau';
     // Re-replace for direct map matches that got stripped:
     if (group.startsWith('Route')) finalName = group;
     if (group.includes('City') || group.includes('Town')) finalName = group;

     finalGen1Mapping[id] = finalName;
  }

  fs.mkdirSync('src/engine/data/gen1', { recursive: true });
  fs.writeFileSync('src/engine/data/gen1/mapLocations.json', JSON.stringify(finalGen1Mapping, null, 2));
  console.log('Gen 1 mapped', Object.keys(finalGen1Mapping).length, 'maps');


  // === GEN 2 ===
  console.log('Generating Gen 2 mapping...');

  // 1. Parse Gen 2 landmark constants from constants/landmark_constants.asm
  // Gen 2 uses landmark constants (e.g. LANDMARK_NEW_BARK_TOWN) to map caught locations in Pokemon data.
  const gen2LandmarkConstToName: Record<string, { id: number, name: string }> = {};
  let currentLandmarkId2 = 0;
  for (const line of gen2LandmarksLines.split('\n')) {
    const match = line.match(/^\s*const\s+(LANDMARK_\w+)/);
    if (match) {
       const constName = match[1];
       if (!constName) continue;
       
       let name = constName.replace('LANDMARK_', '');
       name = capitalize(name);
       if (name === 'Special') {
           currentLandmarkId2++;
           continue;
       }
       if (name === 'Event') name = 'Event/Gift';
       if (name === 'Gift') name = 'Special Event/Traded';

       // Apply specific punctuation and casing fixes for Gen 2 landmarks
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

       gen2LandmarkConstToName[constName] = { id: currentLandmarkId2, name: name };
       currentLandmarkId2++;
    } else if (line.match(/^\s*const_def\s+\$7f/)) {
       // $7F is special offset 127 in Gen 2 landmark constants (used for Special/Traded origins)
       currentLandmarkId2 = 127;
    }
  }

  // 2. Parse Gen 2 Map Groups and Map IDs from constants/map_constants.asm and data/maps/maps.asm
  // Gen 2 uses 2-byte location keys: [MapGroup, MapID]. Each map is assigned to a Landmark ID in `maps.asm`.
  const finalGen2Mapping: Record<number, Record<number, string>> = {};

  let currentGroup2 = 0;
  let mapIdInGroup = 1;

  for (const line of gen2MapConstantsLines.split('\n')) {
      // `newgroup` increments the 1-based Map Group index in pokecrystal
      const groupMatch = line.match(/^\s*newgroup\s+(\w+)/);
      if (groupMatch) {
         currentGroup2++;
         mapIdInGroup = 1;
         finalGen2Mapping[currentGroup2] = {};
      }

      const mapConstMatch = line.match(/^\s*map_const\s+(\w+),/);
      if (mapConstMatch) {
         const mapName = mapConstMatch[1];
         if (!mapName) continue;

         // Cross-reference map name with data/maps/maps.asm to extract associated LANDMARK_* constant
         const mapNameRegexStr = mapName.replace(/_/g, '');
         const mapRegex = new RegExp(`^\\s*map\\s+${mapNameRegexStr}\\s*,[^,]*,[^,]*,\\s*(LANDMARK_\\w+)`, 'im');
         const mapAsmMatch = gen2Maps.match(mapRegex);

         let landmarkName = "Unknown";
         if (mapAsmMatch) {
             const landmarkConst = mapAsmMatch[1];
             if (landmarkConst && gen2LandmarkConstToName[landmarkConst]) {
                 landmarkName = gen2LandmarkConstToName[landmarkConst]!.name;
             }
         }

         if (finalGen2Mapping[currentGroup2]) {
             finalGen2Mapping[currentGroup2]![mapIdInGroup] = landmarkName;
         }
         mapIdInGroup++;
      }
  }

  const finalGen2Landmarks: Record<number, string> = {};
  for (const value of Object.values(gen2LandmarkConstToName)) {
    finalGen2Landmarks[value.id] = value.name;
  }
  // Gen 2 location catch maps 126 to Event/Gift and 127 to Special
  // Let's explicitly hardcode the overrides to match Gen2 internal behavior
  finalGen2Landmarks[126] = 'Event/Gift';
  finalGen2Landmarks[127] = 'Special Event/Traded';

  fs.mkdirSync('src/engine/data/gen2', { recursive: true });
  fs.writeFileSync('src/engine/data/gen2/mapLocations.json', JSON.stringify(finalGen2Mapping, null, 2));
  fs.writeFileSync('src/engine/data/gen2/landmarks.json', JSON.stringify(finalGen2Landmarks, null, 2));
  console.log('Gen 2 mapped', Object.keys(finalGen2Mapping).length, 'map groups and', Object.keys(finalGen2Landmarks).length, 'landmarks');

}

run().catch((err) => console.error(err instanceof Error ? err.message : String(err)));
