import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useMemo } from 'react';
import { pokeDB } from '../../../db/PokeDB';
import type { PokemonMetadata } from '../../../db/schema';
import { calculateBreedingPairs, type PokemonWithMetadata } from '../../../engine/breeding/pair_algorithm';
import type { SaveData } from '../../../engine/saveParser';
import { useStore } from '../../../store';
import { calculateGen2Gender } from '../../../utils/gender';
import { ShinyBadge } from '../../ShinyBadge';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

function getBoxLocation(index: number): string {
  const boxNum = Math.floor(index / 20) + 1;
  const slotNum = (index % 20) + 1;
  return `BOX ${boxNum} - SLOT ${slotNum}`;
}

export const ShinyCarrierBreedingDashboard: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  // Fetch metadata for all Pokemon to resolve egg groups and gender rates
  const { data: pokemonMetaList } = useQuery({
    queryKey: ['pokemonMetaList'],
    queryFn: async () => {
      return pokeDB.getAllPokemon();
    },
  });

  const metadataMap = useMemo(() => {
    const map = new Map<number, PokemonMetadata>();
    if (pokemonMetaList) {
      for (const p of pokemonMetaList) {
        map.set(p.id, p);
      }
    }
    return map;
  }, [pokemonMetaList]);

  const breedingPairs = useMemo(() => {
    if (saveData?.generation !== 2 || metadataMap.size === 0) {
      return [];
    }

    const allPokemon: (PokemonWithMetadata & { _source: string; _speciesName: string })[] = [];

    const processList = (list: SaveData['partyDetails'], sourcePrefix: string) => {
      list.forEach((p, i) => {
        const meta = metadataMap.get(p.speciesId);
        if (!meta) return;

        const eggGroups = meta.eg || [];
        const genderRate = meta.gr ?? -1;
        const atkDv = p.dvs?.atk || 0;
        const genderRaw = calculateGen2Gender(atkDv, genderRate);
        const gender = genderRaw === 'male' ? 'Male' : genderRaw === 'female' ? 'Female' : 'Genderless';

        let sourceStr = '';
        if (sourcePrefix === 'PARTY') {
          sourceStr = `PARTY - SLOT ${i + 1}`;
        } else {
          sourceStr = getBoxLocation(i);
        }

        const mon: PokemonWithMetadata & { _source: string; _speciesName: string } = {
          id: `${sourcePrefix}-${i}`,
          speciesId: p.speciesId,
          gender,
          eggGroups,
          isShiny: !!p.isShiny,
          _source: sourceStr,
          _speciesName: meta.n.toUpperCase(),
        };

        if (p.isShinyCarrier !== undefined) {
          mon.isShinyCarrier = p.isShinyCarrier;
        }

        if (p.dvs) {
          mon.dvs = {
            attack: p.dvs.atk,
            defense: p.dvs.def,
            speed: p.dvs.spd,
            special: p.dvs.spc,
          };
        }

        allPokemon.push(mon);
      });
    };

    processList(saveData.partyDetails, 'PARTY');
    processList(saveData.pcDetails, 'PC');

    const pairs = calculateBreedingPairs(allPokemon);
    // Filter to only show optimal pairs (score > 0)
    return pairs.filter((p) => p.score > 0);
  }, [saveData, metadataMap]);

  if (saveData?.generation !== 2) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <TacticalPanel className="relative mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.BREEDING_OPTIMIZATION" className="-top-[17px] left-[-1px]" />

        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black text-lg text-white">OPTIMAL BREEDING PAIRS</span>
          <span className="tactical-text z-10 text-amber-500 text-xs">[ PRIORITY: SHINY CARRIERS ]</span>
        </div>

        {breedingPairs.length === 0 ? (
          <div className="tactical-panel border-2 border-zinc-800 bg-black/40 p-8 text-center">
            <span className="tactical-text text-zinc-500">NO SHINY CARRIER BREEDING PAIRS AVAILABLE</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {breedingPairs.map((pair) => {
              const pA = pair.parentA;
              const pB = pair.parentB;

              return (
                <div
                  key={`pair-${pA.id}-${pB.id}`}
                  className="tactical-panel relative flex flex-col gap-2 border-2 border-zinc-700 bg-black/60 p-3 text-xs hover:border-zinc-500"
                >
                  <div className="tactical-panel absolute top-0 right-0 border-zinc-700 border-b-2 border-l-2 bg-zinc-900/80 px-2 py-1 text-[10px] text-zinc-400">
                    SCORE: {pair.score}
                  </div>

                  <div className="flex w-full flex-col gap-3 pt-4">
                    {/* Parent A */}
                    <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">
                          {pA._speciesName}{' '}
                          <span className="text-[10px] text-zinc-500">
                            ({pA.gender === 'Male' ? 'M' : pA.gender === 'Female' ? 'F' : '-'})
                          </span>
                        </span>
                        <span className="text-[10px] text-zinc-500">LOC: {pA._source}</span>
                      </div>
                      <div className="relative mr-2 flex items-center justify-center">
                        {(pA.isShiny || pA.isShinyCarrier) && (
                          <ShinyBadge isShiny={!!pA.isShiny} isShinyCarrier={!!pA.isShinyCarrier} size="sm" />
                        )}
                      </div>
                    </div>

                    {/* Parent B */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">
                          {pB._speciesName}{' '}
                          <span className="text-[10px] text-zinc-500">
                            ({pB.gender === 'Male' ? 'M' : pB.gender === 'Female' ? 'F' : '-'})
                          </span>
                        </span>
                        <span className="text-[10px] text-zinc-500">LOC: {pB._source}</span>
                      </div>
                      <div className="relative mr-2 flex items-center justify-center">
                        {(pB.isShiny || pB.isShinyCarrier) && (
                          <ShinyBadge isShiny={!!pB.isShiny} isShinyCarrier={!!pB.isShinyCarrier} size="sm" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </TacticalPanel>
    </div>
  );
};
