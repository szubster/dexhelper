const BASE_URL = 'https://pokeapi.co/api/v2';

const requestCache: Record<string, Promise<any>> = {};

const fetchWithCache = async (url: string) => {
  if (requestCache[url]) {
    return requestCache[url];
  }

  const promise = fetch(url).then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  }).catch(err => {
    delete requestCache[url];
    throw err;
  });

  requestCache[url] = promise;
  return promise;
};

export const pokeapi = {
  getPokemonsList: async ({ limit, offset }: { limit: number; offset: number }) => {
    return fetchWithCache(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  },
  getPokemonEncounterAreasByName: async (idOrName: string | number) => {
    return fetchWithCache(`${BASE_URL}/pokemon/${idOrName}/encounters`);
  },
  getPokemonByName: async (idOrName: string | number) => {
    return fetchWithCache(`${BASE_URL}/pokemon/${idOrName}`);
  },
  getPokemonSpeciesByName: async (idOrName: string | number) => {
    return fetchWithCache(`${BASE_URL}/pokemon-species/${idOrName}`);
  },
  resource: async (url: string) => {
    return fetchWithCache(url);
  },
  getItem: async (id: number | string) => {
    return fetchWithCache(`${BASE_URL}/item/${id}`);
  },
  getLocationArea: async (idOrSlug: number | string) => {
    return fetchWithCache(`${BASE_URL}/location-area/${idOrSlug}`);
  }
};
