import { fetchAssistantApiData } from './src/engine/assistant/suggestionEngine';
import { pokeapi } from './src/utils/pokeapi';

let concurrentRequests = 0;
let maxConcurrentRequests = 0;

// Mock pokeapi
pokeapi.resource = async (url: string) => {
    concurrentRequests++;
    if (concurrentRequests > maxConcurrentRequests) {
        maxConcurrentRequests = concurrentRequests;
    }

    // simulate network delay
    await new Promise(r => setTimeout(r, 10));

    concurrentRequests--;

    if (url.includes('encounters')) {
        return [];
    }
    if (url.includes('pokemon-species')) {
        const id = url.split('/').filter(Boolean).pop();
        return { evolution_chain: { url: `https://pokeapi.co/api/v2/evolution-chain/${id}/` } };
    }
    if (url.includes('evolution-chain')) {
        const id = url.split('/').filter(Boolean).pop();
        // create a fake evolution chain to test ancestors fetching
        return {
            chain: {
                species: { url: `https://pokeapi.co/api/v2/pokemon-species/1/` }, // bulbasaur
                evolves_to: [
                    {
                        species: { url: `https://pokeapi.co/api/v2/pokemon-species/2/` }, // ivysaur
                        evolves_to: [
                            {
                                species: { url: `https://pokeapi.co/api/v2/pokemon-species/3/` }, // venusaur
                                evolves_to: []
                            }
                        ]
                    }
                ]
            }
        };
    }
    return {};
};

const mockSaveData = {
    generation: 1,
    currentMapId: 1,
    party: [1, 4, 7]
};

const queryTargets = Array.from({length: 30}, (_, i) => i + 1);

async function runBenchmark() {
    console.log('Starting benchmark...');
    const start = performance.now();
    await fetchAssistantApiData(mockSaveData as any, queryTargets);
    const end = performance.now();
    console.log(`Time taken: ${(end - start).toFixed(2)}ms`);
    console.log(`Max concurrent requests: ${maxConcurrentRequests}`);
}

runBenchmark();
