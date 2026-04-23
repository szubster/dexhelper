import fs from 'fs';

const path = 'src/engine/assistant/suggestionEngine.ts';
let content = fs.readFileSync(path, 'utf8');

const search = `      let distInfo = mapDistanceCache.get(e.aid);
      if (distInfo === undefined) {
        distInfo = strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations);
        mapDistanceCache.set(e.aid, distInfo);
      }`;

const replace = `      const distInfo = strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations);`;

content = content.replace(search, replace);

fs.writeFileSync(path, content, 'utf8');
