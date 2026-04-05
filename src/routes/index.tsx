import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PokedexGrid } from "../components/PokedexGrid";
import { SearchAndFilters } from "../components/SearchAndFilters";
import { pokemonListQueryOptions } from "../utils/pokemonQueries";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

	return (
		<>
			<SearchAndFilters />
			<PokedexGrid pokemonList={pokemonList} />
		</>
	);
}
