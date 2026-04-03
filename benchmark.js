import { performance } from 'perf_hooks';

// Mock data
const gameVersion = 'red';
const numEncounters = 1000;
const numVersions = 20;

const mockEncounter = {
  location_area: { name: 'route-1-area' },
  version_details: Array.from({ length: numVersions }, (_, i) => ({
    version: { name: i === numVersions - 1 ? 'red' : `version-${i}` },
    encounter_details: [
      { min_level: 2, max_level: 5, method: { name: 'walk' }, chance: 10 },
      { min_level: 3, max_level: 4, method: { name: 'walk' }, chance: 5 }
    ]
  }))
};

const versionEnc = Array.from({ length: numEncounters }, () => mockEncounter);

function baseline() {
  const result = versionEnc.map((e) => {
    const lvls = e.version_details.find((v) => v.version.name === gameVersion)?.encounter_details.map((d) => `LV.${d.min_level}-${d.max_level}`);
    const methods = e.version_details.find((v) => v.version.name === gameVersion)?.encounter_details.map((d) => `• ${d.method.name} (${d.chance}%)`);
    return { lvls, methods };
  });
  return result;
}

function optimized() {
  const result = versionEnc.map((e) => {
    const versionDetail = e.version_details.find((v) => v.version.name === gameVersion);
    const lvls = versionDetail?.encounter_details.map((d) => `LV.${d.min_level}-${d.max_level}`);
    const methods = versionDetail?.encounter_details.map((d) => `• ${d.method.name} (${d.chance}%)`);
    return { lvls, methods };
  });
  return result;
}

// Warmup
for (let i = 0; i < 1000; i++) {
  baseline();
  optimized();
}

const ITERATIONS = 1000;

const startBaseline = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  baseline();
}
const endBaseline = performance.now();

const startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  optimized();
}
const endOptimized = performance.now();

console.log(`Baseline: ${(endBaseline - startBaseline).toFixed(2)}ms`);
console.log(`Optimized: ${(endOptimized - startOptimized).toFixed(2)}ms`);
console.log(`Improvement: ${(((endBaseline - startBaseline) - (endOptimized - startOptimized)) / (endBaseline - startBaseline) * 100).toFixed(2)}%`);
