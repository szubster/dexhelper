import fs from 'fs';

const path = '.jules/bolt.md';
let content = fs.readFileSync(path, 'utf8');

const search = `
### 2023-11-20 - Cache map distance calculation in suggestion engine

*   **What:** Implemented a local \`Map\` cache inside \`generateSuggestions\` to store map distances (\`strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations)\`) keyed by \`e.aid\`.
*   **Why:** Previously, the distance was recalculated for every potential encounter across hundreds of missing Pokémon. Since the player's map (\`currentMapId\`) and the encounter area (\`e.aid\`) combinations are limited and repeat frequently, caching them locally eliminates redundant computations during nested loops.
*   **Measured Improvement:** Running a \`vitest bench\` benchmark doing 1000 iterations over realistic mocked data went from ~3354ms (~5,193,776 ops/sec) to ~3282ms (~5,361,871 ops/sec), representing a consistent 3-4% throughput improvement in the hot path.`;

const replace = ``;

content = content.replace(search, replace);

fs.writeFileSync(path, content, 'utf8');
