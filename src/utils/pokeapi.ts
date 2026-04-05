import { queryClient } from "../queryClient";

const BASE_URL = "https://pokeapi.co/api/v2";

const fetchQuery = async (url: string) => {
	return queryClient.fetchQuery({
		queryKey: ["pokeapi", url],
		queryFn: async () => {
			const res = await fetch(url);
			if (!res.ok) throw new Error("Network response was not ok");
			return res.json();
		},
		staleTime: Infinity,
		gcTime: 1000 * 60 * 60 * 24, // 24 hours
	});
};

export const pokeapi = {
	getPokemonsList: async ({
		limit,
		offset,
	}: {
		limit: number;
		offset: number;
	}) => {
		return fetchQuery(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
	},
	getPokemonEncounterAreasByName: async (idOrName: string | number) => {
		return fetchQuery(`${BASE_URL}/pokemon/${idOrName}/encounters`);
	},
	getPokemonByName: async (idOrName: string | number) => {
		return fetchQuery(`${BASE_URL}/pokemon/${idOrName}`);
	},
	getPokemonSpeciesByName: async (idOrName: string | number) => {
		return fetchQuery(`${BASE_URL}/pokemon-species/${idOrName}`);
	},
	resource: async (url: string) => {
		return fetchQuery(url);
	},
	getItem: async (id: number | string) => {
		return fetchQuery(`${BASE_URL}/item/${id}`);
	},
	getLocationArea: async (idOrSlug: number | string) => {
		return fetchQuery(`${BASE_URL}/location-area/${idOrSlug}`);
	},
};
