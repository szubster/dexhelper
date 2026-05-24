const { performance } = require('perf_hooks');

const apiData = {
  localEncounters: Array.from({ length: 50 }, (_, i) => ({
    pid: i,
    enc: Array.from({ length: 5 }, (_, j) => ({
      aid: j % 2,
      v: 1,
      d: [{ c: 10, m: 1, min: 2, max: 4, t: 0 }]
    }))
  })),
  localAid: 1
};
const displayVersionId = 1;

function oldMethod() {
  for (const lae of apiData.localEncounters) {
    const relevantEncounters = lae.enc.filter((e) => e.aid === apiData.localAid && e.v === displayVersionId);
    if (relevantEncounters.length === 0) continue;
  }
}

function newMethod() {
  for (const lae of apiData.localEncounters) {
    let hasRelevant = false;
    for (let r = 0; r < lae.enc.length; r++) {
        const re = lae.enc[r];
        if (re && re.aid === apiData.localAid && re.v === displayVersionId) {
            hasRelevant = true;
            break;
        }
    }
    if (!hasRelevant) continue;
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
