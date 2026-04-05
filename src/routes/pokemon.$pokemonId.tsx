import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PokemonDetails } from '../components/PokemonDetails';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

export const Route = createFileRoute('/pokemon/$pokemonId')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      from: (search.from as string) || '/',
    };
  },
  component: PokemonPage,
});

function PokemonPage() {
  const { pokemonId } = Route.useParams();
  const { from } = Route.useSearch();
  const navigate = useNavigate();
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const globalPokeball = useStore((s) => s.globalPokeball);
  const manualVersion = useStore((s) => s.manualVersion);

  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  const selectedPokemon = pokemonList.find(p => p.id === parseInt(pokemonId));
  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  return (
    <>
      {selectedPokemon && (
        <PokemonDetails
          pokemonId={selectedPokemon.id}
          pokemonName={selectedPokemon.name}
          gameVersion={effectiveVersion}
          saveData={saveData}
          isLivingDex={isLivingDex}
          pokeball={globalPokeball}
          onClose={() => navigate({ to: from })}
          onNavigate={(id) => navigate({
            to: `/pokemon/${id}`,
            search: { from }
          })}
        />
      )}
    </>
  );
}
