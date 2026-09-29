import { useNavigate } from '@tanstack/react-router';
import { Database, Network } from 'lucide-react';
import React, { useMemo } from 'react';
import { useStore } from '../../store';
import type { PokemonListItem } from '../../utils/pokemonQueries';
import { getTimeCapsuleValidation } from '../../utils/timeCapsule';
import { StorageCard } from '../StorageGrid';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalPanel } from '../TacticalPanel';

interface BoxAnalyzerViewProps {
  pokemonList?: PokemonListItem[];
}

export function BoxAnalyzerView({ pokemonList = [] }: BoxAnalyzerViewProps) {
  const saveData = useStore((s) => s.saveData);
  const searchTerm = useStore((s) => s.searchTerm);
  const navigate = useNavigate();

  const handleNavigate = React.useCallback(
    (id: number) => {
      void navigate({ to: `/pokemon/${id}`, search: { from: '/box-analyzer' } });
    },
    [navigate],
  );

  const deferredSearchTerm = React.useDeferredValue(searchTerm);

  const pokemonNameMap = useMemo(() => {
    const map = new Map<number, PokemonListItem>();
    for (const p of pokemonList) {
      map.set(p.id, p);
    }
    return map;
  }, [pokemonList]);

  const filteredBoxPokemon = useMemo(() => {
    if (!saveData?.pcDetails) return [];

    const term = deferredSearchTerm ? deferredSearchTerm.toLowerCase() : '';

    const result = [];
    for (let i = 0; i < saveData.pcDetails.length; i++) {
      const p = saveData.pcDetails[i];
      if (p === undefined) continue;

      const listItem = pokemonNameMap.get(p.speciesId);
      if (!listItem) continue;

      if (!term) {
        result.push({ p, listItem });
        continue;
      }

      const nicknameMatch = p.nickname ? p.nickname.toLowerCase().includes(term) : false;
      const otNameMatch = p.otName ? p.otName.toLowerCase().includes(term) : false;
      const speciesMatch = listItem.nameLower.includes(term);

      if (nicknameMatch || otNameMatch || speciesMatch) {
        result.push({ p, listItem });
      }
    }

    return result;
  }, [saveData, deferredSearchTerm, pokemonNameMap]);

  if (!saveData) {
    return null;
  }

  return (
    <div className="flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)]">
      <TacticalPanel className="flex flex-col p-4 sm:p-6" variant="cyan">
        <div className="flex items-center justify-between border-cyan-500/30 border-b border-dashed pb-4">
          <TacticalBlockHeader
            title="Box Search Engine"
            trackingLabel="SYS.SEARCH.CORE"
            icon={<Network size={16} className="text-cyan-400" />}
            variant="primary"
          />
          <div className="flex items-center gap-3 border border-cyan-500/20 bg-black/40 px-3 py-1.5">
            <Database size={12} className="text-cyan-500" />
            <span className="font-mono text-[10px] text-cyan-400 tracking-widest">
              MATCHES: {filteredBoxPokemon.length}
            </span>
          </div>
        </div>

        <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-2">
          {filteredBoxPokemon.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Network size={32} className="mb-4 text-cyan-500/20" />
              <span className="font-mono text-cyan-500/60 text-sm uppercase tracking-widest">
                NO TARGETS FOUND IN DB
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredBoxPokemon.map(({ p, listItem }, idx) => (
                <StorageCard
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                  key={`${p.storageLocation}-${p.speciesId}-${idx}`}
                  p={p}
                  pokemon={{ id: listItem.id, name: listItem.name }}
                  location={p.storageLocation}
                  generation={saveData.generation}
                  onNavigate={handleNavigate}
                  timeCapsuleValidation={
                    saveData.generation === 2 ? getTimeCapsuleValidation(p.speciesId, p.moves) : undefined
                  }
                />
              ))}
            </div>
          )}
        </div>
      </TacticalPanel>
    </div>
  );
}
