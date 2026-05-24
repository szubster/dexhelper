const { performance } = require('perf_hooks');

const apiData = {
  localEncounters: Array.from({ length: 500 }, (_, i) => ({
    pid: i,
    enc: Array.from({ length: 5 }, (_, j) => ({
      aid: j % 2,
      v: 1,
      d: [{ c: 10, m: 1, min: 2, max: 4, t: 0 }]
    }))
  }))
};
const localAid = 1;
const displayVersionId = 1;
const myOtIds = new Set();
const missingIds = new Set(Array.from({ length: 500 }, (_, i) => i));
const STATIC_GIFT_DATA = {};
const METHOD_NAMES = { 1: 'walk' };

function oldMethod() {
  const localPids = new Set();
  const localEncounterInfo = {};
  for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      const relevantEncounters = lae.enc.filter((e) => e.aid === localAid && e.v === displayVersionId);
      if (relevantEncounters.length === 0) continue;

      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;

      if (missingIds.has(pid)) {
        localPids.add(pid);
        const details = [];
        for (let r = 0; r < relevantEncounters.length; r++) {
          const re = relevantEncounters[r];
          if (!re) continue;
          for (let d = 0; d < re.d.length; d++) {
            const ed = re.d[d];
            if (!ed) continue;
            details.push({
              chance: ed.c,
              method: METHOD_NAMES[ed.m] || 'walk',
              minLevel: ed.min,
              maxLevel: ed.max,
              aid: re.aid,
              time: ed.t,
            });
          }
        }
        localEncounterInfo[pid] = details;
      }
    }
}

function newMethod() {
  const localPids = new Set();
  const localEncounterInfo = {};
  for (const lae of apiData.localEncounters) {
      const pid = lae.pid;

      // early skip to avoid looping enc if we don't need it
      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;
      if (!missingIds.has(pid)) continue;

      let hasRelevant = false;
      const details = [];

      for (let r = 0; r < lae.enc.length; r++) {
          const re = lae.enc[r];
          if (!re || re.aid !== localAid || re.v !== displayVersionId) continue;

          hasRelevant = true;
          for (let d = 0; d < re.d.length; d++) {
            const ed = re.d[d];
            if (!ed) continue;
            details.push({
              chance: ed.c,
              method: METHOD_NAMES[ed.m] || 'walk',
              minLevel: ed.min,
              maxLevel: ed.max,
              aid: re.aid,
              time: ed.t,
            });
          }
      }

      if (hasRelevant) {
        localPids.add(pid);
        localEncounterInfo[pid] = details;
      }
    }
}

let start = performance.now();
for (let i = 0; i < 10000; i++) {
  oldMethod();
}
console.log('Old:', performance.now() - start);

start = performance.now();
for (let i = 0; i < 10000; i++) {
  newMethod();
}
console.log('New:', performance.now() - start);
