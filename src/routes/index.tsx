import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { BattleFrontierDashboard } from '../components/dashboard/BattleFrontierDashboard';
import { PokedexGrid } from '../components/PokedexGrid';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);
  const saveData = useStore((s) => s.saveData);

  return (
    <>
      {saveData?.gen3BattleFrontierProgress && (
        <div className="mb-6">
          <BattleFrontierDashboard progress={saveData.gen3BattleFrontierProgress} />
        </div>
      )}
      <SearchAndFilters />
      <PokedexGrid pokemonList={pokemonList} />
    </>
  );
}
