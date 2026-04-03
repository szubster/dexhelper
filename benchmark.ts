const NUM_POKEMON = 1000;
const NUM_LOOKUPS = 1000;

const pokemonList = Array.from({ length: NUM_POKEMON }, (_, i) => ({
  id: i + 1,
  name: `Pokemon-${i + 1}`,
}));

const lookups = Array.from({ length: NUM_LOOKUPS }, () => Math.floor(Math.random() * NUM_POKEMON) + 1);

function benchFind() {
  const start = performance.now();
  for (let i = 0; i < NUM_LOOKUPS; i++) {
    const id = lookups[i];
    const p = pokemonList.find(x => x.id === id);
    const name = p ? p.name : `#${id}`;
  }
  const end = performance.now();
  return end - start;
}

function benchMap() {
  const start = performance.now();
  const pokemonMap = new Map();
  for (let i = 0; i < pokemonList.length; i++) {
    const p = pokemonList[i];
    pokemonMap.set(p.id, p.name);
  }
  for (let i = 0; i < NUM_LOOKUPS; i++) {
    const id = lookups[i];
    const name = pokemonMap.get(id) || `#${id}`;
  }
  const end = performance.now();
  return end - start;
}

// Warmup
for(let i=0; i<100; i++) { benchFind(); benchMap(); }

let findTotal = 0;
let mapTotal = 0;
const iterations = 1000;

for(let i=0; i<iterations; i++) {
    findTotal += benchFind();
    mapTotal += benchMap();
}

console.log(`Array.find baseline: ${(findTotal / iterations).toFixed(4)}ms`);
console.log(`Map optimization: ${(mapTotal / iterations).toFixed(4)}ms`);
console.log(`Improvement: ${((findTotal - mapTotal) / findTotal * 100).toFixed(2)}%`);
