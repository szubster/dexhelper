const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeapi = {
  getPokemonsList: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  getPokemonEncounterAreasByName: async (idOrName: string | number) => {
    const res = await fetch(`${BASE_URL}/pokemon/${idOrName}/encounters`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  getPokemonByName: async (idOrName: string | number) => {
    const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  getPokemonSpeciesByName: async (idOrName: string | number) => {
    const res = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  resource: async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  }
};
