import { Link } from '@tanstack/react-router';
import { Fish, Target, Trees, Waves } from 'lucide-react';
import type React from 'react';
import type { SaveData } from '../../engine/saveParser/index';
import type { EncounterDetail, Suggestion } from '../../hooks/useAssistant';
import { getGenerationConfig } from '../../utils/generationConfig';
import { PokemonSprite } from '../pokemon/PokemonSprite';

interface AssistantSuggestionCardProps {
  suggestion: Suggestion;
  style: { icon: React.ReactNode; color: string; bg: string };
  showDebug: boolean;
  saveData: SaveData;
  getPokemonName: (id: number) => string;
  areaNames?: Record<number, string> | undefined;
}

export function AssistantSuggestionCard({
  suggestion: s,
  style,
  showDebug,
  saveData,
  getPokemonName,
  areaNames,
}: AssistantSuggestionCardProps) {
  let title = s.title;
  let desc = s.description;

  // Replace all occurrences of #<id> with the actual Pokémon name
  const replacePids = (text: string) => {
    return text.replace(/#(\d+)/g, (_, idStr) => {
      const id = parseInt(idStr, 10);
      return getPokemonName(id);
    });
  };

  title = replacePids(title);
  desc = replacePids(desc);

  const hasMultiple = s.pokemonIds && s.pokemonIds.length > 0;

  const CardContent = (
    <>
      {/* Radar / Scanline Background */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-[40px] transition-opacity group-hover:opacity-40 ${style.bg}`}
      />

      <div className="relative z-10 flex h-full flex-col gap-4 p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-1.5 border border-white/20 px-2 py-1 font-black text-[9px] uppercase tracking-widest ${style.bg} ${style.color.replace('border-', 'text-')} shadow-sm backdrop-blur-md`}
            >
              {style.icon}
              {s.category}
              {showDebug && (
                <span className="ml-1 border-white/20 border-l pl-1 text-[8px] opacity-70">P: {s.priority}</span>
              )}
            </div>
            {s.pokemonId && (
              <div className="flex flex-col items-end">
                <span className="font-black font-mono text-[8px] text-[var(--theme-primary)] tracking-widest">
                  [ TARGET ACQUIRED ]
                </span>
                <div className="font-bold font-mono text-[10px] text-zinc-400">
                  #{s.pokemonId.toString().padStart(3, '0')}
                </div>
              </div>
            )}
          </div>

          <h3 className={`font-bold text-white leading-tight ${s.category === 'Catch' ? 'text-xl' : 'text-sm'}`}>
            {title}
          </h3>

          <p className="max-w-[95%] font-medium text-xs text-zinc-400 leading-relaxed">{desc}</p>
        </div>

        {s.pokemonId && (
          <div className="absolute right-4 bottom-4 h-20 w-20 origin-bottom-right transform opacity-30 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
            <PokemonSprite
              pokemonId={s.pokemonId}
              generation={saveData.generation}
              alt="Sprite"
              className="h-full w-full object-contain drop-shadow-lg"
            />
          </div>
        )}

        {hasMultiple && (
          <div className={`relative z-20 mt-0 flex flex-col gap-4`}>
            {s.category === 'Catch' ? (
              Object.entries(
                (s.pokemonIds || []).reduce<Record<string, { pid: number; enc: EncounterDetail }[]>>((acc, pid) => {
                  const encs = s.encounterInfo?.[pid];
                  if (!encs) return acc;
                  const mainEnc = [...encs].sort((a, b) => b.chance - a.chance)[0];
                  if (!mainEnc) return acc;
                  const method = mainEnc.method;
                  if (!acc[method]) acc[method] = [];
                  acc[method]?.push({ pid, enc: mainEnc });
                  return acc;
                }, {}),
              ).map(([method, pokes]: [string, { pid: number; enc: EncounterDetail }[]]) => {
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
                    const rodId = method.includes('old')
                      ? rodIds.OLD
                      : method.includes('good')
                        ? rodIds.GOOD
                        : rodIds.SUPER;
                    isOwned = saveData.inventory.some((i) => i.id === rodId);
                  }
                }
                const Icon = isRod ? Fish : isSurf ? Waves : isGrass ? Trees : Target;
                const label = method.replace(/-/g, ' ').toUpperCase();

                return (
                  <div
                    key={method}
                    className={`space-y-3 rounded-2xl border border-white/5 bg-black/30 p-4 transition-opacity ${!isOwned ? 'opacity-40 grayscale-[0.5]' : ''}`}
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
                        <span className="rounded border border-red-500/30 bg-red-500/20 px-1.5 py-0.5 font-black text-[8px] text-red-400 uppercase tracking-tighter">
                          Rod Missing
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {pokes.map(({ pid, enc }) => (
                        <div key={pid} className="group/sprite flex min-w-[56px] flex-col items-center gap-1.5">
                          <Link
                            to="/pokemon/$pokemonId"
                            params={{ pokemonId: pid.toString() }}
                            search={{ from: '/assistant' }}
                            className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-800/80 p-2 shadow-md transition-all hover:scale-110 hover:border-emerald-500/50 hover:bg-zinc-700"
                            title={getPokemonName(pid)}
                            aria-label={`View details for ${getPokemonName(pid)}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pid}.png`}
                              alt={getPokemonName(pid)}
                              className="pixelated h-full w-full object-contain"
                            />
                            <div className="absolute -top-1.5 -right-1.5 rounded-lg border border-white/20 bg-emerald-500 px-1.5 py-0.5 font-black text-[9px] text-white shadow-lg">
                              {enc.chance}%
                            </div>
                          </Link>
                          <div className="flex flex-col items-center leading-none">
                            <span className="font-black text-[9px] text-white transition-colors group-hover/sprite:text-emerald-400">
                              Lv. {enc.minLevel === enc.maxLevel ? enc.minLevel : `${enc.minLevel}-${enc.maxLevel}`}
                            </span>
                            {areaNames?.[enc.aid] && (
                              <span className="max-w-[80px] truncate text-center text-[8px] text-zinc-500 uppercase">
                                {areaNames[enc.aid]}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-wrap gap-2">
                {(s.pokemonIds || []).slice(0, 8).map((pid) => (
                  <Link
                    key={pid}
                    to="/pokemon/$pokemonId"
                    params={{ pokemonId: pid.toString() }}
                    search={{ from: '/assistant' }}
                    className="group/sprite relative h-10 w-10 rounded-lg border border-white/5 bg-black/40 p-1 transition-all hover:scale-110 hover:border-white/40 hover:bg-black/60"
                    title={getPokemonName(pid)}
                    aria-label={`View details for ${getPokemonName(pid)}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pid}.png`}
                      alt={getPokemonName(pid)}
                      className="pixelated h-full w-full object-contain"
                    />
                  </Link>
                ))}
                {(s.pokemonIds?.length ?? 0) > 8 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-black/40 font-bold text-xs text-zinc-500">
                    +{(s.pokemonIds?.length ?? 0) - 8}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  const isCritical = title.includes('CRITICAL');

  return (
    <div
      data-testid="assistant-suggestion-card"
      className={`relative border-2 border-dashed ${isCritical ? 'animate-[pulse_2s_infinite] border-red-500/80' : 'border-zinc-700/80'} group overflow-hidden bg-black/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--theme-primary)]/50 ${!hasMultiple && s.pokemonId ? 'cursor-pointer' : ''}`}
    >
      {/* Tactical Corner Crosshairs */}
      <div className="absolute top-0 left-0 z-20 h-3 w-3 border-[var(--theme-primary)]/40 border-t-2 border-l-2 transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute top-0 right-0 z-20 h-3 w-3 border-[var(--theme-primary)]/40 border-t-2 border-r-2 transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute right-0 bottom-0 z-20 h-3 w-3 border-[var(--theme-primary)]/40 border-r-2 border-b-2 transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute bottom-0 left-0 z-20 h-3 w-3 border-[var(--theme-primary)]/40 border-b-2 border-l-2 transition-colors group-hover:border-[var(--theme-primary)]" />

      {!hasMultiple && s.pokemonId ? (
        <Link
          to="/pokemon/$pokemonId"
          params={{ pokemonId: s.pokemonId.toString() }}
          search={{ from: '/assistant' }}
          className="block h-full w-full"
        >
          {CardContent}
        </Link>
      ) : (
        <div className="h-full w-full">{CardContent}</div>
      )}
    </div>
  );
}
