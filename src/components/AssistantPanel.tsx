import { useSuspenseQuery } from '@tanstack/react-query';
import { Bug, Egg, Flag, Info, Sparkles, Target, Zap } from 'lucide-react';
import React from 'react';
import type { SuggestionCategory } from '../engine/assistant/strategies/types';
import type { SaveData } from '../engine/saveParser/index';
import { useAssistant } from '../hooks/useAssistant';
import { objectKeys } from '../utils/object';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';
import { AssistantDebugView } from './assistant/AssistantDebugView';
import { AssistantSuggestionCard } from './assistant/AssistantSuggestionCard';
import { MapUI } from './assistant/MapUI';
import { CornerCrosshairs } from './CornerCrosshairs';
import { EdgeLabel } from './EdgeLabel';

interface AssistantPanelProps {
  saveData: SaveData;
  isLivingDex: boolean;
  manualVersion: string | null;
}

function isValidCategory(category: string): category is SuggestionCategory {
  return category in CATEGORY_ORDER;
}

// ⚡ Bolt: Pre-calculate category sort order to avoid O(N) array allocation and indexOf lookups during render
const CATEGORY_ORDER: Record<SuggestionCategory, number> = {
  Catch: 0,
  Gift: 1,
  Evolve: 2,
  Trade: 3,
  Progress: 4,
  Event: 5,
  Utility: 6,

  Breed: 7,
};

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
  const { suggestions, debug, isLoading, areaNames, heatmap } = useAssistant(saveData, isLivingDex, manualVersion);

  const [showDebug, setShowDebug] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<SuggestionCategory | null>(null);

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

  // ⚡ Bolt: Precompute grouped suggestions in useMemo to prevent O(N) inline reduce reallocation every render
  const groupedSuggestions = React.useMemo(() => {
    const acc: Partial<Record<SuggestionCategory, typeof suggestions>> = {};
    for (let i = 0; i < suggestions.length; i++) {
      const s = suggestions[i];
      if (s) {
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category]?.push(s);
      }
    }
    return acc;
  }, [suggestions]);

  const orderedCategories = React.useMemo(() => {
    return objectKeys(groupedSuggestions).sort((a, b) => {
      const orderA = isValidCategory(a) ? CATEGORY_ORDER[a] : 99;
      const orderB = isValidCategory(b) ? CATEGORY_ORDER[b] : 99;
      return orderA - orderB;
    });
  }, [groupedSuggestions]);

  // Set active category initially or if it disappears
  React.useEffect(() => {
    if (orderedCategories.length > 0 && (!activeCategory || !orderedCategories.includes(activeCategory))) {
      // oxlint-disable-next-line react/set-state-in-effect
      setActiveCategory(orderedCategories[0] || null);
    }
  }, [orderedCategories, activeCategory]);

  return (
    <div className="flex-1 space-y-6">
      <div className="relative flex flex-col justify-between gap-4 border border-zinc-800/80 bg-zinc-900/50 p-6 sm:flex-row sm:items-center">
        <CornerCrosshairs thickness={2} className="h-2 w-2 border-white/20" />
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-500/50 via-amber-500/50 to-purple-500/50" />
        <EdgeLabel className="pointer-events-none -top-2.5 left-4 text-[var(--theme-primary)]">SYS.ASST</EdgeLabel>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="flex items-center gap-3 font-black font-display text-2xl text-white uppercase tracking-tight">
              <Sparkles className="text-[var(--theme-primary)]" size={24} />
              AI Assistant
            </h2>
            <button
              type="button"
              onClick={() => setShowDebug(!showDebug)}
              className={`focus-visible:tactical-focus border border-dashed p-2 transition-all ${showDebug ? 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' : 'border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
              aria-pressed={showDebug}
              title="Toggle Debug Mode"
              aria-label="Toggle Debug Mode"
            >
              <Bug size={18} />
            </button>
          </div>
          <p className="tactical-text mt-1 text-[10px] text-zinc-500">
            [ SMART SUGGESTIONS GENERATED FROM SAVE TELEMETRY ]
          </p>
        </div>
      </div>

      {isLoading ? (
        <div
          className="tactical-skeleton h-64 w-full" // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading suggestions...</span>
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Operations Sidebar */}
          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-64">
            <div className="relative w-full border border-zinc-800 border-dashed bg-black/40 p-2">
              <EdgeLabel className="-top-2.5 left-4 text-[var(--theme-primary)]">OPS.MATRIX</EdgeLabel>
              <div className="flex flex-col gap-1">
                {orderedCategories.map((category) => {
                  const items = groupedSuggestions[category] || [];
                  const catStyle = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Utility;
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`focus-visible:tactical-focus group relative flex items-center justify-between border border-dashed px-4 py-3 transition-all duration-300 ${
                        isActive
                          ? `border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[inset_4px_0_0_var(--theme-primary)]`
                          : 'border-zinc-800/50 bg-transparent text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`${isActive ? catStyle.color.replace('border-', 'text-') : 'text-zinc-600 group-hover:text-zinc-400'}`}
                        >
                          {catStyle.icon}
                        </div>
                        <span className="font-black font-mono text-[11px] uppercase tracking-wider">
                          {category === 'Catch' ? 'ENCOUNTERS' : category === 'Trade' ? 'TRADES' : category}
                        </span>
                      </div>
                      <div
                        className={`flex h-5 items-center justify-center border border-dashed px-2 font-mono text-[10px] ${
                          isActive
                            ? 'border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-600 group-hover:border-zinc-700 group-hover:text-zinc-400'
                        }`}
                      >
                        {items.length}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <MapUI heatmap={heatmap} {...(areaNames ? { areaNames } : {})} />
          </div>

          {/* Active Operation Content */}
          <div className="min-h-[500px] flex-1">
            {activeCategory && groupedSuggestions[activeCategory] && (
              <div className="fade-in animate-in space-y-6 duration-500">
                {/* Active Category Header */}
                <div className="relative flex items-center border border-zinc-800 border-dashed bg-zinc-900/40 p-4">
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[var(--theme-primary)]/80 to-[var(--theme-primary)]/10" />
                  <EdgeLabel className="-top-2.5 left-4 text-[var(--theme-primary)]">ACTIVE.OP</EdgeLabel>
                  <div className="flex items-center gap-4">
                    <div
                      className={`${CATEGORY_STYLES[activeCategory]?.bg} ${CATEGORY_STYLES[activeCategory]?.color.replace('border-', 'text-')} p-2`}
                    >
                      {CATEGORY_STYLES[activeCategory]?.icon}
                    </div>
                    <div>
                      <h3 className="font-black font-display text-white text-xl uppercase tracking-wider">
                        {activeCategory === 'Catch'
                          ? 'WILD ENCOUNTERS'
                          : activeCategory === 'Trade'
                            ? 'TRADE REQUIRED'
                            : activeCategory}
                      </h3>
                      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        [ {groupedSuggestions[activeCategory]?.length || 0} TARGETS IDENTIFIED ]
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`grid gap-6 ${
                    activeCategory === 'Catch' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
                  }`}
                >
                  {groupedSuggestions[activeCategory]?.map((s, idx) => {
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
            )}
          </div>
        </div>
      )}

      {showDebug && debug && (
        <AssistantDebugView rejected={debug.rejected} getPokemonName={getPokemonName} saveData={saveData} />
      )}
    </div>
  );
}
