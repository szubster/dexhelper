import { bench, describe } from 'vitest';
import { fetchAssistantApiData } from './suggestionEngine';
import { pokeapi } from '../../utils/pokeapi';
import { queryClient } from '../../queryClient';

// Mock pokeapi network requests to be instant but async
const originalFetchQuery = queryClient.fetchQuery.bind(queryClient);
queryClient.fetchQuery = async ({ queryFn }: any) => {
  return queryFn();
};

pokeapi.resource = async (url: string) => {
    await new Promise(r => setTimeout(r, 1));
    if (url.includes('encounters')) {
        return [];
    }
    if (url.includes('pokemon-species')) {
        const id = url.split('/').filter(Boolean).pop();
        return { evolution_chain: { url: `https://pokeapi.co/api/v2/evolution-chain/${id}/` } };
    }
    if (url.includes('evolution-chain')) {
        const id = url.split('/').filter(Boolean).pop();
        return {
            chain: {
                species: { url: `https://pokeapi.co/api/v2/pokemon-species/${id}/` },
                evolves_to: []
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

describe('fetchAssistantApiData', () => {
  bench('current implementation', async () => {
    await fetchAssistantApiData(mockSaveData as any, queryTargets);
  });
});
