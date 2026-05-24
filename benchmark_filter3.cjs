const { performance } = require('perf_hooks');

const suggestion = {
  pokemonIds: Array.from({ length: 100 }, (_, i) => i),
  encounterInfo: Object.fromEntries(Array.from({ length: 50 }, (_, i) => [i, true]))
};
const localPids = new Set(suggestion.pokemonIds);

function oldMethod() {
  const s = { ...suggestion };
  const l = new Set(localPids);

  if (s.pokemonIds) {
    s.pokemonIds = s.pokemonIds.filter((pid) => {
      if (s.encounterInfo?.[pid] !== undefined) {
        return true;
      } else {
        l.delete(pid);
        return false; // I should add this, it wasn't returning false in the actual code actually it does
      }
    });
  }
}

function newMethod() {
  const s = { ...suggestion };
  const l = new Set(localPids);

  if (s.pokemonIds) {
    const newIds = [];
    for (let i = 0; i < s.pokemonIds.length; i++) {
      const pid = s.pokemonIds[i];
      if (s.encounterInfo?.[pid] !== undefined) {
        newIds.push(pid);
      } else {
        l.delete(pid);
      }
    }
    s.pokemonIds = newIds;
  }
}

let start = performance.now();
for (let i = 0; i < 100000; i++) {
  oldMethod();
}
console.log('Old:', performance.now() - start);

start = performance.now();
for (let i = 0; i < 100000; i++) {
  newMethod();
}
console.log('New:', performance.now() - start);
