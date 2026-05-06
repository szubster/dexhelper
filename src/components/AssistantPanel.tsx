import { useSuspenseQuery } from '@tanstack/react-query';
import { Bug, Egg, Flag, Info, Loader2, Sparkles, Target, Zap } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser/index';
import { type SuggestionCategory, useAssistant } from '../hooks/useAssistant';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';
import { AssistantDebugView } from './assistant/AssistantDebugView';
import { AssistantSuggestionCard } from './assistant/AssistantSuggestionCard';
import { CornerCrosshairs } from './CornerCrosshairs';

interface AssistantPanelProps {
  saveData: SaveData;
  isLivingDex: boolean;
  manualVersion: string | null;
}

const CATEGORY_STYLES: Record<SuggestionCategory, { icon: React.ReactNode; color: string; bg: string }> = {
  Catch: {
    icon: <Target size={16} className="text-emerald-400" />,
    color: 'border-emerald-500/30 text-emerald-100',
    bg: 'bg-emerald-500/10',
  },
  Evolve: {
    icon: <Zap size={16} className="text-blue-400" />,
    color: 'border-blue-500/30 text-blue-100',
    bg: 'bg-blue-500/10',
  },
  Trade: {
    icon: <Zap size={16} className="text-amber-400" />,
    color: 'border-amber-500/30 text-amber-100',
    bg: 'bg-amber-500/10',
  },
  Breed: {
    icon: <Egg size={16} className="text-pink-400" />,
    color: 'border-pink-500/30 text-pink-100',
    bg: 'bg-pink-500/10',
  },
  Progress: {
    icon: <Flag size={16} className="text-red-400" />,
    color: 'border-red-500/30 text-red-100',
    bg: 'bg-red-500/10',
  },
  Event: {
    icon: <Sparkles size={16} className="text-purple-400" />,
    color: 'border-purple-500/30 text-purple-100',
    bg: 'bg-purple-500/10',
  },
  Gift: {
    icon: <Zap size={16} className="text-indigo-400" />,
    color: 'border-indigo-500/30 text-indigo-100',
    bg: 'bg-indigo-500/10',
  },
  Utility: {
    icon: <Info size={16} className="text-zinc-400" />,
    color: 'border-zinc-500/30 text-zinc-100',
    bg: 'bg-zinc-500/10',
  },
};

export function AssistantPanel({ saveData, isLivingDex, manualVersion }: AssistantPanelProps) {
  const { suggestions, debug, isLoading, areaNames } = useAssistant(saveData, isLivingDex, manualVersion);
  const [showDebug, setShowDebug] = React.useState(false);

  // ⚡ Bolt: Removed redundant IDB query, use cached data from root route loader
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  const pokemonNameRecord = React.useMemo(() => {
    const record: Record<number, string> = {};
    for (const p of pokemonList) {
      record[p.id] = p.name;
    }
    return record;
  }, [pokemonList]);

  const getPokemonName = React.useCallback(
    (id: number) => {
      return pokemonNameRecord[id] ?? `#${id}`;
    },
    [pokemonNameRecord],
  );

  return (
    <div className="flex-1 space-y-6">
      <div className="relative flex flex-col justify-between gap-4 border border-zinc-800/80 bg-zinc-900/50 p-6 sm:flex-row sm:items-center">
        <CornerCrosshairs thickness={2} className="h-2 w-2 border-white/20" />
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-500/50 via-amber-500/50 to-purple-500/50" />
        <div className="pointer-events-none absolute -top-2.5 left-4 bg-zinc-950 px-1 font-mono text-[9px] text-[var(--theme-primary)] uppercase tracking-widest">
          SYS.ASST
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="flex items-center gap-3 font-black font-display text-2xl text-white uppercase tracking-tight">
              <Sparkles className="text-[var(--theme-primary)]" size={24} />
              AI Assistant
            </h2>
            <button
              type="button"
              onClick={() => setShowDebug(!showDebug)}
              className={`border border-dashed p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${showDebug ? 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' : 'border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
              title="Toggle Debug Mode"
              aria-label="Toggle Debug Mode"
            >
              <Bug size={18} />
            </button>
          </div>
          <p className="mt-1 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            [ SMART SUGGESTIONS GENERATED FROM SAVE TELEMETRY ]
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="relative flex items-center justify-center border border-zinc-800/50 bg-zinc-900/50 p-12">
          <CornerCrosshairs thickness={2} className="h-2 w-2 border-white/20" />
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="relative flex flex-col items-center justify-center border border-zinc-800/50 bg-zinc-900/50 p-12 text-center">
          <CornerCrosshairs thickness={2} className="h-2 w-2 border-white/20" />
          <Sparkles className="mb-4 text-zinc-700" size={48} />
          <h3 className="font-bold font-mono text-lg text-zinc-400 uppercase tracking-wide">
            [ YOU'RE ALL CAUGHT UP! ]
          </h3>
          <p className="mt-2 max-w-sm font-medium font-mono text-xs text-zinc-600">
            NO NEW SUGGESTIONS AT THE MOMENT. KEEP EXPLORING TO DISCOVER MORE POKÉMON!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(
            suggestions.reduce<Partial<Record<SuggestionCategory, typeof suggestions>>>((acc, s) => {
              if (!acc[s.category]) acc[s.category] = [];
              acc[s.category]?.push(s);
              return acc;
            }, {}),
            // Custom sort order for categories
          )
            .sort(([a], [b]) => {
              const order = ['Catch', 'Gift', 'Evolve', 'Trade', 'Progress', 'Event', 'Utility'];
              return (
                (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) - (order.indexOf(b) !== -1 ? order.indexOf(b) : 99)
              );
            })
            .map(([categoryStr, items]) => {
              const category = categoryStr as SuggestionCategory;
              const catStyle = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Utility;

              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div
                      className={`border border-dashed p-2 ${catStyle.bg} ${catStyle.color.replace('border-', 'text-')}`}
                    >
                      {catStyle.icon}
                    </div>
                    <h3 className="font-black font-mono text-lg text-white uppercase tracking-widest">
                      [{' '}
                      {category === 'Catch'
                        ? 'WILD ENCOUNTERS'
                        : category === 'Trade'
                          ? 'TRADE REQUIRED'
                          : category.toUpperCase()}{' '}
                      ]
                    </h3>
                  </div>

                  <div
                    className={`fade-in grid animate-in gap-6 duration-500 ${category === 'Catch' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                  >
                    {items.map((s, idx) => {
                      const style = CATEGORY_STYLES[s.category] ?? CATEGORY_STYLES.Utility;
                      return (
                        <div
                          key={s.id}
                          className="slide-in-from-bottom-4 animate-in fill-mode-both duration-500"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <AssistantSuggestionCard
                            suggestion={s}
                            style={style}
                            showDebug={showDebug}
                            saveData={saveData}
                            getPokemonName={getPokemonName}
                            areaNames={areaNames}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {showDebug && debug && (
        <AssistantDebugView rejected={debug.rejected} getPokemonName={getPokemonName} saveData={saveData} />
      )}
    </div>
  );
}
