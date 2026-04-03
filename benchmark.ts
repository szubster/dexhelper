import { performance } from 'perf_hooks';

// Mock data
const N = 1000; // number of pokemon
const M = 3000; // number of party/PC details

const pokemonList = Array.from({ length: N }, (_, i) => ({ id: i + 1, name: `Pokemon ${i + 1}` }));

const partyDetails = Array.from({ length: M }, (_, i) => ({
  speciesId: Math.floor(Math.random() * N) + 1,
  isShiny: Math.random() > 0.9
}));

const pcDetails = Array.from({ length: M }, (_, i) => ({
  speciesId: Math.floor(Math.random() * N) + 1,
  isShiny: Math.random() > 0.9
}));

const saveData = { partyDetails, pcDetails };

function testCurrent() {
  const start = performance.now();
  let shinyCount = 0;
  pokemonList.forEach(pokemon => {
    const isShiny = saveData ? (
      saveData.partyDetails.some(p => p.speciesId === pokemon.id && p.isShiny) ||
      saveData.pcDetails.some(p => p.speciesId === pokemon.id && p.isShiny)
    ) : false;
    if (isShiny) shinyCount++;
  });
  const end = performance.now();
  return { time: end - start, shinyCount };
}

function testOptimized() {
  const start = performance.now();
  let shinyCount = 0;

  const shinySet = new Set();
  if (saveData) {
    saveData.partyDetails.forEach(p => {
      if (p.isShiny) shinySet.add(p.speciesId);
    });
    saveData.pcDetails.forEach(p => {
      if (p.isShiny) shinySet.add(p.speciesId);
    });
  }

  pokemonList.forEach(pokemon => {
    const isShiny = shinySet.has(pokemon.id);
    if (isShiny) shinyCount++;
  });
  const end = performance.now();
  return { time: end - start, shinyCount };
}

const res1 = testCurrent();
const res2 = testOptimized();

console.log(`Current: ${res1.time.toFixed(2)}ms (Count: ${res1.shinyCount})`);
console.log(`Optimized: ${res2.time.toFixed(2)}ms (Count: ${res2.shinyCount})`);
