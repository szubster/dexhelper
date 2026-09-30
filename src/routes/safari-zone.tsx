import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import React from 'react';
import { EmptyState } from '../components/EmptyState';
import { PokemonSprite } from '../components/pokemon/PokemonSprite';
import { TacticalBadge } from '../components/TacticalBadge';
import { TacticalCard } from '../components/TacticalCard';
import { TacticalPanel } from '../components/TacticalPanel';
import { getMissingGen1SafariEncounters } from '../engine/safariZone/gen1/missingEncounters';
import { getMissingGen3SafariEncounters } from '../engine/safariZone/gen3/missingEncounters';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

export const Route = createFileRoute('/safari-zone')({
  component: SafariZonePage,
});

function SafariZonePage() {
  const saveData = useStore((s) => s.saveData);
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, string>();
    pokemonList.forEach((p) => {
      map.set(p.id, p.name);
    });
    return map;
  }, [pokemonList]);

  if (!saveData) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="SAFARI ZONE TELEMETRY UNLINKED" />;
  }

  if (saveData.generation === 2) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="SAFARI ZONE UNAVAILABLE IN GEN 2" />;
  }

  const missingAreas =
    saveData.generation === 1
      ? getMissingGen1SafariEncounters(saveData)
      : saveData.generation === 3
        ? getMissingGen3SafariEncounters(saveData)
        : [];

  const gameVersion = saveData.gameVersion;

  return (
    <div className="flex h-full flex-col gap-6 pt-4 pb-20">
      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-4">
        <div>
          <span className="border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/10 px-2 py-0.5 font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
            SAFARI_ZONE.SYS
          </span>
          <h1 className="mt-1 font-black font-mono text-2xl text-white uppercase tracking-tight">
            SAFARI ZONE MISSING ENCOUNTERS
          </h1>
        </div>
        <TacticalBadge variant="emerald" dot pulse>
          [ MODE: {saveData.gameVersion.toUpperCase()} ]
        </TacticalBadge>
      </div>

      {missingAreas.length === 0 ? (
        <EmptyState icon={<ShieldAlert size={24} />} label="ALL SAFARI ENCOUNTERS SECURED" variant="default" />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {missingAreas.map((area) => {
            const encounters = area.encounters[gameVersion] || [];
            return (
              <TacticalPanel key={area.name} className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
                  <h2 className="font-bold font-mono text-lg text-white uppercase tracking-tight">{area.name}</h2>
                  <TacticalBadge variant="zinc">[ {encounters.length} MISSING ]</TacticalBadge>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {encounters.map((enc, idx) => {
                    const pokemonName = pokemonMap.get(enc.pokemon) || `Pokémon #${enc.pokemon}`;
                    return (
                      <TacticalCard
                        // biome-ignore lint/suspicious/noArrayIndexKey: Encounter slots in an area table require index disambiguation
                        key={`${area.name}-${enc.pokemon}-${enc.method}-${idx}`}
                        variant="storage-cyan"
                        className="p-3"
                      >
                        <div className="flex flex-col items-center text-center">
                          <PokemonSprite
                            pokemonId={enc.pokemon}
                            generation={saveData.generation}
                            alt={pokemonName}
                            className="h-16 w-16 object-contain"
                          />
                          <span className="mt-2 truncate font-bold font-mono text-white text-xs uppercase">
                            {pokemonName}
                          </span>
                          <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                            <span>RATE: {enc.chance}%</span>
                            {enc.minLevel && <span>• LV.{enc.minLevel}</span>}
                          </div>
                        </div>
                      </TacticalCard>
                    );
                  })}
                </div>
              </TacticalPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}
