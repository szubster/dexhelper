const apiData = {
  localEncounters: [
    {
      pid: 1,
      enc: [
        { aid: 1, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, t: 0 }] },
        { aid: 2, v: 1, d: [{ c: 20, m: 1, min: 2, max: 4, t: 0 }] },
        { aid: 1, v: 1, d: [{ c: 30, m: 2, min: 2, max: 4, t: 0 }] }
      ]
    },
    {
      pid: 2,
      enc: [
        { aid: 2, v: 1, d: [{ c: 20, m: 1, min: 2, max: 4, t: 0 }] }
      ]
    }
  ],
  localAid: 1
};
const displayVersionId = 1;
const STATIC_GIFT_DATA = {};
const myOtIds = new Set();
const missingIds = new Set([1, 2]);
const METHOD_NAMES = { 1: 'walk', 2: 'surf' };

function oldMethod() {
  const localPids = new Set();
  const localEncounterInfo = {};
  for (const lae of apiData.localEncounters) {
    const pid = lae.pid;
    const relevantEncounters = lae.enc.filter((e) => e.aid === apiData.localAid && e.v === displayVersionId);
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
  return { localPids, localEncounterInfo };
}

function newMethod() {
  const localPids = new Set();
  const localEncounterInfo = {};
  for (const lae of apiData.localEncounters) {
    const pid = lae.pid;

    // Early skip
    if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;
    if (!missingIds.has(pid)) continue;

    let hasRelevant = false;
    const details = [];

    for (let r = 0; r < lae.enc.length; r++) {
      const re = lae.enc[r];
      if (!re || re.aid !== apiData.localAid || re.v !== displayVersionId) continue;

      hasRelevant = true;
      for (let d = 0; d < re.d.length; d++) {
        const ed = re.d[d];
        if (!ed) continue;
        details.push({
          chance: ed.c,
          method: METHOD_NAMES[ed.m] || 'walk',
          minLevel: ed.min,
          maxLevel: ed.max,
          aid: re.aid, // <-- undefined in actual structure but let's assume it works exactly the same
          time: ed.t,
        });
      }
    }

    if (hasRelevant) {
      localPids.add(pid);
      localEncounterInfo[pid] = details;
    }
  }
  return { localPids, localEncounterInfo };
}

const r1 = oldMethod();
const r2 = newMethod();

console.log(JSON.stringify(r1) === JSON.stringify(r2));
console.log(r1, r2);
