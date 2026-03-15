import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { pokeapi } from '../utils/pokeapi';
import { AppLayout } from '../components/AppLayout';
import { PokedexGrid } from '../components/PokedexGrid';
import { PokemonDetails } from '../components/PokemonDetails';
import { useAppState } from '../state';

export const Route = createFileRoute('/pokemon/$pokemonId')({
  component: PokemonPage,
});

function PokemonPage() {
  const { pokemonId } = Route.useParams();
  const navigate = useNavigate();
  const { saveData, isLivingDex, globalPokeball, manualVersion } = useAppState();

  const { data: pokemonList = [] } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const data = await pokeapi.getPokemonsList({ limit: 251, offset: 0 });
      return data.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      }));
    }
  });

  const selectedPokemon = pokemonList.find(p => p.id === parseInt(pokemonId));
  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  return (
    <AppLayout>
      <PokedexGrid pokemonList={pokemonList} />
      {selectedPokemon && (
        <PokemonDetails 
          pokemonId={selectedPokemon.id}
          pokemonName={selectedPokemon.name}
          gameVersion={effectiveVersion}
          saveData={saveData}
          isLivingDex={isLivingDex}
          pokeball={globalPokeball}
          onClose={() => navigate({ to: '/' })}
          onNavigate={(id, name) => navigate({ to: `/pokemon/${id}` })}
        />
      )}
    </AppLayout>
  );
}
