import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PokemonDetails } from '../components/PokemonDetails';
import { useAppState } from '../state';
import { pokeapi } from '../utils/pokeapi';

export const Route = createFileRoute('/pokemon/$pokemonId')({
  component: PokemonPage,
});

const pokemonQueryOptions = {
  queryKey: ['pokemonList'],
  queryFn: async () => {
    const data = await pokeapi.getPokemonsList({ limit: 251, offset: 0 });
    return data.results.map((p: any) => {
      const urlParts = p.url.split('/').filter(Boolean);
      const id = parseInt(urlParts[urlParts.length - 1]);
      return {
        id,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      };
    }).sort((a: any, b: any) => a.id - b.id);
  }
};

function PokemonPage() {
  const { pokemonId } = Route.useParams();
  const navigate = useNavigate();
  const { saveData, isLivingDex, globalPokeball, manualVersion } = useAppState();

  const { data: pokemonList } = useSuspenseQuery(pokemonQueryOptions);

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
          onClose={() => {
            if (window.history.length > 2) {
              window.history.back();
            } else {
              navigate({ to: '/' });
            }
          }}
          onNavigate={(id, name) => navigate({ to: `/pokemon/${id}` })}
        />
      )}
    </>
  );
}
