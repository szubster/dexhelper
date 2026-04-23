import fs from 'fs';

const path = 'src/engine/assistant/suggestionEngine.ts';
let content = fs.readFileSync(path, 'utf8');

const search = `  // A2. Nearby logic (1-8 areas away)
  // Distance is calculated via graph traversal in the generation's strategy.
  // Priority dynamically scales inversely with distance (closer = higher priority).
  // ⚡ Bolt: Cache distance results per map ID to avoid O(N) calculations in nested loops
  const mapDistanceCache = new Map<number, { distance: number; name: string } | null>();

  for (const pid of queryTargets) {`;

const replace = `  // A2. Nearby logic (1-8 areas away)
  // Distance is calculated via graph traversal in the generation's strategy.
  // Priority dynamically scales inversely with distance (closer = higher priority).
  for (const pid of queryTargets) {`;

content = content.replace(search, replace);

fs.writeFileSync(path, content, 'utf8');
