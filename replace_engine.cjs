const fs = require('fs');

let content = fs.readFileSync('src/engine/assistant/suggestionEngine.ts', 'utf8');

const SEARCH = `    for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      const relevantEncounters = lae.enc.filter((e) => e.aid === localAid && e.v === displayVersionId);
      if (relevantEncounters.length === 0) continue;

      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;

      if (missingIds.has(pid)) {
        localPids.add(pid);
        const details: EncounterDetail[] = [];
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
    }`;

const REPLACE = `    for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      // ⚡ Bolt: Early exit to prevent processing if the pokemon is already owned or a static gift
      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;
      if (!missingIds.has(pid)) continue;

      // ⚡ Bolt: Replaced .filter() with a for loop to eliminate intermediate array allocations
      let hasRelevant = false;
      const details: EncounterDetail[] = [];

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
    }`;

if (content.includes(SEARCH)) {
  content = content.replace(SEARCH, REPLACE);
  fs.writeFileSync('src/engine/assistant/suggestionEngine.ts', content);
  console.log('Replaced successfully');
} else {
  console.log('SEARCH string not found');
}
