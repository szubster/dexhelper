const pokemonList = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, name: `Pokemon ${i + 1}` }));
const pokemonInLocation = Array.from({ length: 3000 }, (_, i) => ({ speciesId: Math.floor(Math.random() * 1000) + 1 }));

// Simulate render loop runs
const RUNS = 1000;

console.time('Baseline (Array.find)');
let result = 0;
for (let i=0; i<RUNS; i++) {
  pokemonInLocation.forEach((p) => {
    const pokemon = pokemonList.find(pl => pl.id === p.speciesId);
    if (pokemon) result++;
  });
}
console.timeEnd('Baseline (Array.find)');

console.time('Optimized (Map)');
let result2 = 0;
for (let i=0; i<RUNS; i++) {
  const pokemonMap = new Map(pokemonList.map(p => [p.id, p]));
  pokemonInLocation.forEach((p) => {
    const pokemon = pokemonMap.get(p.speciesId);
    if (pokemon) result2++;
  });
}
console.timeEnd('Optimized (Map)');
