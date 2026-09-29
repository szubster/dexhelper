import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Network } from 'lucide-react';
import React, { useMemo } from 'react';
import { useStore } from '../../store';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';
import { StorageCard } from '../StorageGrid';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalPanel } from '../TacticalPanel';

export function BoxAnalyzerView() {
  const saveData = useStore((s) => s.saveData);
  const searchTerm = useStore((s) => s.searchTerm);
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);
  const navigate = useNavigate();

  const handleNavigate = React.useCallback(
    (id: number) => {
      void navigate({ to: `/pokemon/${id}`, search: { from: '/box-analyzer' } });
    },
    [navigate],
  );

  const pokemonMap = useMemo(() => {
    const map = new Map<number, { id: number; name: string; nameLower: string }>();
    for (const p of pokemonList) {
      map.set(p.id, p);
    }
    return map;
  }, [pokemonList]);

  const filteredResults = useMemo(() => {
    if (!saveData?.pcDetails) return [];

    const term = searchTerm.toLowerCase().trim();
    if (!term) return []; // Only show results if searching, or adjust if you want to show all by default

    const results = [];
    for (const p of saveData.pcDetails) {
      const pokemon = pokemonMap.get(p.speciesId);
      if (!pokemon) continue;

      const matchesSpecies = pokemon.nameLower.includes(term);
      const matchesNickname = p.nickname?.toLowerCase().includes(term);
      const matchesOT = p.otName?.toLowerCase().includes(term);

      if (matchesSpecies || matchesNickname || matchesOT) {
        results.push({ p, pokemon });
      }
    }
    return results;
  }, [saveData, pokemonMap, searchTerm]);

  return (
    <div className="flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)]">
      <TacticalPanel className="p-4" variant="cyan">
        <TacticalBlockHeader
          title="Box Analyzer"
          trackingLabel="SYS.ANALYSIS.CORE"
          icon={<Network size={14} />}
          variant="primary"
        />
        <div className="mt-4">
          <span className="font-mono text-[var(--theme-primary)] uppercase">
            {saveData ? 'ANALYSIS CORE READY' : 'AWAITING DATA SYNC'}
          </span>
        </div>

        {saveData && searchTerm && (
          <div className="mt-6">
            <h3 className="mb-4 font-mono text-cyan-400 text-sm">SEARCH RESULTS: {filteredResults.length} FOUND</h3>

            {filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-cyan-900 border-dashed bg-cyan-950/20 p-8 text-center">
                <span className="font-mono text-cyan-600 text-xs uppercase tracking-widest">
                  [ NO TARGETS ACQUIRED ]
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredResults.map(({ p, pokemon }) => (
                  <StorageCard
                    key={p.hash}
                    p={p}
                    pokemon={pokemon}
                    location={p.storageLocation || 'Unknown'}
                    generation={saveData.generation}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </TacticalPanel>
    </div>
  );
}
