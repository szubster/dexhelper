import { useQuery } from '@tanstack/react-query';
import { Bug, Egg, Flag, Info, Loader2, Sparkles, Target, Zap } from 'lucide-react';
import React from 'react';
import { DB_CONFIG, getDB } from '../db/PokeDB';
import type { SaveData } from '../engine/saveParser/index';
import { type Suggestion, useAssistant } from '../hooks/useAssistant';
import { AssistantDebugView } from './assistant/AssistantDebugView';
import { AssistantSuggestionCard } from './assistant/AssistantSuggestionCard';

interface AssistantPanelProps {
  saveData: SaveData;
  isLivingDex: boolean;
  manualVersion: string | null;
}

const CATEGORY_STYLES: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
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
  const { suggestions, debug, isLoading } = useAssistant(saveData, isLivingDex, manualVersion);
  const [showDebug, setShowDebug] = React.useState(false);

  const { data: pokemonList } = useQuery<{ id: number; name: string }[]>({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const db = await getDB();
      const all = await db.getAll(DB_CONFIG.STORES.POKEMON);
      return all.map((p) => ({ id: p.id, name: p.n }));
    },
    staleTime: Infinity,
  });

  const pokemonNameRecord = React.useMemo(() => {
    const record: Record<number, string> = {};
    if (pokemonList) {
      for (const p of pokemonList) {
        record[p.id] = p.name;
      }
    }
    return record;
  }, [pokemonList]);

  const getPokemonName = React.useCallback(
    (id: number) => {
      if (!pokemonList) return `#${id}`;
      return pokemonNameRecord[id] ?? `#${id}`;
    },
    [pokemonList, pokemonNameRecord],
  );

  return (
    <div className="flex-1 space-y-6">
      <div className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:flex-row sm:items-center">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500" />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="flex items-center gap-3 font-black font-display text-2xl text-white uppercase tracking-tight">
              <Sparkles className="text-amber-400" size={24} />
              AI Assistant
            </h2>
            <button
              type="button"
              onClick={() => setShowDebug(!showDebug)}
              className={`rounded-xl border p-2 transition-all ${showDebug ? 'border-amber-500/50 bg-amber-500/20 text-amber-400' : 'border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
              title="Toggle Debug Mode"
            >
              <Bug size={18} />
            </button>
          </div>
          <p className="mt-1 font-bold text-xs text-zinc-500 uppercase tracking-widest">
            Smart suggestions based on your save file
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-[2rem] border border-zinc-800/50 bg-zinc-900/50 p-12">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-zinc-800/50 bg-zinc-900/50 p-12 text-center">
          <Sparkles className="mb-4 text-zinc-700" size={48} />
          <h3 className="font-bold text-lg text-zinc-400 uppercase tracking-wide">You're all caught up!</h3>
          <p className="mt-2 max-w-sm font-medium text-sm text-zinc-600">
            No new suggestions at the moment. Keep exploring to discover more Pokémon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(
            suggestions.reduce(
              (acc, s) => {
                if (!acc[s.category]) acc[s.category] = [];
                acc[s.category]?.push(s);
                return acc;
              },
              {} as Record<string, Suggestion[]>,
            ),
            // Custom sort order for categories
          )
            .sort(([a], [b]) => {
              const order = ['Catch', 'Gift', 'Evolve', 'Trade', 'Progress', 'Event', 'Utility'];
              return (
                (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) - (order.indexOf(b) !== -1 ? order.indexOf(b) : 99)
              );
            })
            .map(([category, items]) => {
              const defaultStyle = CATEGORY_STYLES.Utility as { icon: React.ReactNode; color: string; bg: string };
              const catStyle = CATEGORY_STYLES[category] ?? defaultStyle;

              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div
                      className={`rounded-xl border p-2 ${catStyle.bg} ${catStyle.color.replace('border-', 'text-')}`}
                    >
                      {catStyle.icon}
                    </div>
                    <h3 className="font-black font-display text-white text-xl uppercase tracking-widest">
                      {category === 'Catch' ? 'Wild Encounters' : category === 'Trade' ? 'Trade Required' : category}
                    </h3>
                  </div>

                  <div
                    className={`fade-in grid animate-in gap-6 duration-500 ${category === 'Catch' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                  >
                    {items.map((s, idx) => {
                      const defaultStyle = CATEGORY_STYLES.Utility as {
                        icon: React.ReactNode;
                        color: string;
                        bg: string;
                      };
                      const style = CATEGORY_STYLES[s.category] ?? defaultStyle;
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
