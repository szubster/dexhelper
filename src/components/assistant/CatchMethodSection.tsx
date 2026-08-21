import { Link } from '@tanstack/react-router';
import { Fish, Moon, Sun, Sunrise, Target, Trees, Waves } from 'lucide-react';
import type { EncounterDetail } from '../../engine/assistant/strategies/types';
import type { SaveData } from '../../engine/saveParser/index';
import { getGenerationConfig } from '../../utils/generationConfig';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalBadge } from '../TacticalBadge';

export function CatchMethodSection({
  catchMethods,
  saveData,
  areaNames,
  getPokemonName,
}: {
  catchMethods: [string, { pid: number; enc: EncounterDetail }[]][];
  saveData: SaveData;
  areaNames?: Record<number, string> | undefined;
  getPokemonName: (id: number) => string;
}) {
  return (
    <>
      {catchMethods.map(([method, pokes]: [string, { pid: number; enc: EncounterDetail }[]]) => {
        const isRod = method.includes('rod');
        const isSurf = method === 'surf';
        const isGrass = method === 'walk';

        let isOwned = true;
        if (isRod) {
          const genConfig = getGenerationConfig(saveData.generation);
          const rodIds = genConfig.rodIds;
          if (!rodIds) {
            isOwned = false;
          } else {
            const rodId = method.includes('old') ? rodIds.OLD : method.includes('good') ? rodIds.GOOD : rodIds.SUPER;
            isOwned =
              saveData.inventory.some((i) => i.id === rodId) ||
              (saveData.pcItems?.some((i) => i.id === rodId) ?? false);
          }
        }
        const Icon = isRod ? Fish : isSurf ? Waves : isGrass ? Trees : Target;
        const label = method.replace(/-/g, ' ').toUpperCase();

        return (
          <div
            key={method}
            className={`space-y-3 rounded-none border border-white/10 border-dashed bg-black/30 p-4 transition-opacity ${!isOwned ? 'opacity-40 grayscale-[0.5]' : ''}`}
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Icon size={14} className={isOwned ? 'text-emerald-400' : 'text-zinc-500'} />
                <span
                  className={`font-black font-mono text-[10px] tracking-wider ${isOwned ? 'text-zinc-300' : 'text-zinc-500'}`}
                >
                  {label}
                </span>
              </div>
              {!isOwned && (
                <TacticalBadge variant="red" className="px-1.5 py-0.5 font-mono tracking-tighter">
                  [ MISSING_ROD ]
                </TacticalBadge>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {pokes.map(({ pid, enc }) => (
                <div key={pid} className="group/sprite flex min-w-[56px] flex-col items-center gap-1.5">
                  <Link
                    to="/pokemon/$pokemonId"
                    params={{ pokemonId: pid.toString() }}
                    search={{ from: '/assistant' }}
                    className="focus-visible:tactical-focus relative flex h-14 w-14 items-center justify-center rounded-none border border-white/10 border-dashed bg-zinc-800/80 p-2 shadow-md transition-all hover:scale-110 hover:border-emerald-500/50 hover:bg-zinc-700"
                    title={getPokemonName(pid)}
                    aria-label={`View details for ${getPokemonName(pid)}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PokemonSprite
                      pokemonId={pid}
                      generation={saveData.generation}
                      alt={getPokemonName(pid)}
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute -top-1.5 -right-1.5 rounded-none border border-white/20 border-dashed bg-emerald-500 px-1.5 py-0.5 font-black font-mono text-[9px] text-white shadow-lg">
                      {enc.chance}%
                    </div>
                  </Link>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-black text-[9px] text-white transition-colors group-hover/sprite:text-emerald-400">
                      Lv. {enc.minLevel === enc.maxLevel ? enc.minLevel : `${enc.minLevel}-${enc.maxLevel}`}
                    </span>
                    {areaNames?.[enc.areaId] && (
                      <span className="max-w-[80px] truncate text-center text-[8px] text-zinc-500 uppercase">
                        {areaNames[enc.areaId]}
                      </span>
                    )}
                    {enc.time !== undefined && (
                      <div className="mt-1 flex items-center gap-0.5">
                        {(enc.time & 1) === 1 && (
                          <span title="Morning">
                            <Sunrise size={10} className="text-amber-400" aria-label="Morning" />
                          </span>
                        )}
                        {(enc.time & 2) === 2 && (
                          <span title="Day">
                            <Sun size={10} className="text-amber-300" aria-label="Day" />
                          </span>
                        )}
                        {(enc.time & 4) === 4 && (
                          <span title="Night">
                            <Moon size={10} className="text-indigo-400" aria-label="Night" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
