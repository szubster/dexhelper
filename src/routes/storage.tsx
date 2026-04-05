import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { StorageGrid } from "../components/StorageGrid";
import { pokemonListQueryOptions } from "../utils/pokemonQueries";

export const Route = createFileRoute("/storage")({
	component: StoragePage,
});

function StoragePage() {
	const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

	return <StorageGrid pokemonList={pokemonList} />;
}
