import { fetchAssistantApiData } from './src/engine/assistant/suggestionEngine';

const mockSaveData = {
    generation: 1,
    currentMapId: 1,
    party: [1, 4, 7]
};

const queryTargets = Array.from({length: 30}, (_, i) => i + 10); // 30 missing ids

async function runBenchmark() {
    console.log('Starting benchmark...');
    const start = performance.now();
    await fetchAssistantApiData(mockSaveData as any, queryTargets);
    const end = performance.now();
    console.log(`Time taken: ${(end - start).toFixed(2)}ms`);
}

runBenchmark();
