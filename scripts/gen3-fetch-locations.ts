/**
 * @module gen3-fetch-locations
 *
 * This script bridges the gap between modern PokeAPI data and the actual internal memory structures
 * used by Generation 3 Game Boy Advance games (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
 *
 * **Why this is necessary:**
 * The save files track the player's location, caught data, and active swarms using a composite
 * Map ID system (`(MapGroup << 8) | MapIndex`). PokeAPI only provides modern, generic string
 * names for locations, which cannot be directly mapped to these binary values.
 *
 * **How it works:**
 * 1. It fetches the original Game Boy assembly and JSON configuration files directly from the
 *    `pret/pokeemerald` decompilation repository.
 * 2. It parses `map_groups.json` and individual `map.json` files to extract the exact binary
 *    `map_id` and `group_id` for every location.
 * 3. It traces `warp_events` to determine the parent/child relationship for indoor vs outdoor maps
 *    (critical for the `mapGraph` distance calculations).
 * 4. It outputs static mapping dictionaries (`scripts/data/gen3/mapping.ts`) that are later consumed
 *    by the main `generate-pokedata.ts` ETL pipeline to link PokeAPI encounters with ROM map IDs.
 *
 * **Regeneration Steps:**
 * This script is typically run as a precursor to the main data pipeline if Gen 3 mappings need updating.
 */

import fs from 'node:fs';
import https from 'node:https';

function download(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

const REPO_BASE = 'https://raw.githubusercontent.com/pret/pokeemerald/master';

/**
 * Orchestrates the fetching and parsing of map data from the pokeemerald repository.
 *
 * 1. Fetches the `map_groups.json` to understand the group ordering (which dictates the upper 8 bits of the Map ID).
 * 2. Iterates through every map folder to fetch its specific `map.json`.
 * 3. Extracts connections (adjacent maps) and warp events (doorways) to build a topological graph.
 * 4. Attempts to identify "indoor" maps by recording the first warp destination as its parent map.
 * 5. Writes the compiled, typed mapping data into `scripts/data/gen3/mapping.ts`.
 *
 * @returns A Promise that resolves when the mapping file has been generated.
 */
async function run() {
  console.log('Fetching map groups from pret/pokeemerald...');

  // 1. Fetch map groups
  const mapGroupsRaw = await download(`${REPO_BASE}/data/maps/map_groups.json`);
  const mapGroupsData = JSON.parse(mapGroupsRaw) as {
    group_order: string[];
    [key: string]: unknown;
  };

  const groupOrder: string[][] = [];
  for (const groupName of mapGroupsData.group_order) {
    if (mapGroupsData[groupName]) {
      groupOrder.push(mapGroupsData[groupName] as string[]);
    }
  }

  console.log(`Fetched ${groupOrder.length} map groups.`);

  // 2. Fetch region map sections (for localization)
  console.log('Fetching region map sections...');
  const regionMapSectionsRaw = await download(`${REPO_BASE}/src/data/region_map/region_map_sections.json`);
  const regionMapSectionsData = JSON.parse(regionMapSectionsRaw) as {
    map_sections: { id: string; name: string }[];
  };
  const secDict: Record<string, string> = {};
  for (const sec of regionMapSectionsData.map_sections) {
    secDict[sec.id] = sec.name;
  }

  // 3. Process each map group and fetch map.json
  const gen3Maps: Record<number, Record<number, any>> = {};
  const indoorToParentMap: Record<number, number> = {};

  let totalMaps = 0;
  // map folder name -> map ID
  const mapNameToId: Record<string, number> = {};

  // also map "MAP_" + folder name upper to map ID
  // e.g. "MAP_PETALBURG_CITY"

  // Actually, wait, let's load original mapping to keep aid values
  const originalAids: Record<number, number> = {};
  try {
    const originalMappingContent = fs.readFileSync('scripts/data/gen3/mapping.ts', 'utf-8');
    const aidRegex = /id: (\d+),\s*aid:\s*(\d+)/g;
    let match;
    while ((match = aidRegex.exec(originalMappingContent)) !== null) {
        if (match[1] && match[2]) {
            originalAids[parseInt(match[1])] = parseInt(match[2]);
        }
    }
  } catch {
    console.log('No existing mapping.ts found or failed to read, starting fresh for aids.');
  }

  // First pass: populate mapNameToId and gen3Maps structure
  for (let groupIndex = 0; groupIndex < groupOrder.length; groupIndex++) {
    const groupMaps = groupOrder[groupIndex];
    if (!groupMaps) continue;

    gen3Maps[groupIndex] = {};

    for (let mapIndex = 0; mapIndex < groupMaps.length; mapIndex++) {
      const mapFolderName = groupMaps[mapIndex];
      if (!mapFolderName) continue;

      const encodedId = (groupIndex << 8) | mapIndex;
      mapNameToId[mapFolderName] = encodedId;

      let mapConstantName = mapFolderName.replace(/([A-Z])/g, '_$1').toUpperCase();
      if (mapConstantName.startsWith('_')) {
          mapConstantName = mapConstantName.substring(1);
      }
      mapConstantName = "MAP_" + mapConstantName;
      mapNameToId[mapConstantName] = encodedId;

      totalMaps++;
    }
  }

  console.log(`Processing ${totalMaps} maps... this may take a moment.`);

  // Second pass: fetch map.json and parse
  let count = 0;
  for (let groupIndex = 0; groupIndex < groupOrder.length; groupIndex++) {
    const groupMaps = groupOrder[groupIndex];
    if (!groupMaps) continue;

    for (let mapIndex = 0; mapIndex < groupMaps.length; mapIndex++) {
      const mapFolderName = groupMaps[mapIndex];
      if (!mapFolderName) continue;

      const encodedId = (groupIndex << 8) | mapIndex;

      try {
        const mapRaw = await download(`${REPO_BASE}/data/maps/${mapFolderName}/map.json`);
        const mapData = JSON.parse(mapRaw);

        const connections: number[] = [];
        if (mapData.connections) {
          for (const conn of mapData.connections) {
            const destMap = conn.map;
            if (destMap && mapNameToId[destMap] !== undefined) {
              connections.push(mapNameToId[destMap] as number);
            }
          }
        }

        // Preserve original aid if it exists
        const aid = originalAids[encodedId] !== undefined ? originalAids[encodedId] : 0;

        // Sometimes the mapConstant string has extra underscores or diff caps,
        // fallback matching by just checking if map name exists in id map.
        // E.g. "MAP_PETALBURG_CITY"
        const connectionsMapped: number[] = [];
        if (mapData.connections) {
          for (const conn of mapData.connections) {
            let destMap = conn.map;
            if (destMap && mapNameToId[destMap] !== undefined) {
              connectionsMapped.push(mapNameToId[destMap] as number);
            } else if (destMap) {
                // Try matching exact string to another way
                let clean = destMap.replace("MAP_", "").replace(/_/g, "").toLowerCase();
                for (const key of Object.keys(mapNameToId)) {
                    if (key.toLowerCase() === clean) {
                        connectionsMapped.push(mapNameToId[key] as number);
                        break;
                    }
                }
            }
          }
        }

        gen3Maps[groupIndex]![mapIndex] = {
           id: encodedId,
           aid: aid,
           name: mapFolderName, // using folder name as name, matching previous mapping.ts
           connections: connectionsMapped
        };

        if (mapData.warp_events) {
           for (const warp of mapData.warp_events) {
               const destMap = warp.dest_map;
               if (destMap && mapNameToId[destMap] !== undefined) {
                   const destId = mapNameToId[destMap] as number;
                   // If this is an indoor map, link to parent.
                   // The research node says: warp_events pointing its dest_map property to an outdoor hub's string name
                   // We don't have a perfect "is indoor" check, but typically maps with 1 warp or specific warp structures.
                   // Usually, we just track the warp destination. Let's record the *first* warp destination as parent
                   // for simplicity if we don't have indoorToParentMap yet.
                   // Pokeemerald maps often have `MAPSEC_DYNAMIC` for indoor maps, but let's just grab the first warp dest
                   if (indoorToParentMap[encodedId] === undefined) {
                       indoorToParentMap[encodedId] = destId;
                   }
               }
           }
        }

      } catch(e) {
          const err = e instanceof Error ? e.message : String(e);
          console.warn(`Failed to process map ${mapFolderName}: ${err}`);
      }

      count++;
      if (count % 50 === 0) {
        console.log(`Processed ${count}/${totalMaps} maps...`);
      }
    }
  }

  console.log('Generating scripts/data/gen3/mapping.ts...');

  let output = `// Build-time mapping data for Gen 3\n\n`;
  output += `export const GEN3_MAPS: Record<number, Record<number, MapNode>> = {\n`;

  for (const groupIndexStr of Object.keys(gen3Maps).sort((a,b) => parseInt(a) - parseInt(b))) {
      const groupIndex = parseInt(groupIndexStr);
      output += `  ${groupIndex}: {\n`;
      const mapsInGroup = gen3Maps[groupIndex];
      if (mapsInGroup) {
          for (const mapIndexStr of Object.keys(mapsInGroup).sort((a,b) => parseInt(a) - parseInt(b))) {
              const mapIndex = parseInt(mapIndexStr);
              const mapObj = mapsInGroup[mapIndex];
              output += `    ${mapIndex}: { id: ${mapObj.id}, aid: ${mapObj.aid}, name: '${mapObj.name}', connections: [${mapObj.connections.join(', ')}] },\n`;
          }
      }
      output += `  },\n`;
  }

  output += `};\n\n`;

  output += `export const GEN3_INDOOR_TO_PARENT_MAP: Record<number, number> = {\n`;
  // Only export ones that actually map somewhere different? Or all warps?
  // Previous file was empty, let's just populate it
  for (const childIdStr of Object.keys(indoorToParentMap).sort((a,b) => parseInt(a) - parseInt(b))) {
      output += `  ${childIdStr}: ${indoorToParentMap[parseInt(childIdStr)]},\n`;
  }
  output += `};\n\n`;

  output += `export interface MapNode {\n  id: number;\n  aid: number;\n  name: string;\n  connections: number[];\n}\n`;

  fs.mkdirSync('scripts/data/gen3', { recursive: true });
  fs.writeFileSync('scripts/data/gen3/mapping.ts', output);

  console.log('Done!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
