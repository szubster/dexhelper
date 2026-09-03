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
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TacticalIconButton } from './TacticalIconButton';

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
      <div className="relative flex flex-col justify-between gap-4 border-2 border-zinc-700 border-dashed bg-zinc-950 p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] sm:flex-row sm:items-center">
        <LcdGrid className="opacity-[0.03]" />
        <ScanlineOverlay opacityClass="opacity-10" />
        <CornerCrosshairs thickness={2} className="h-2 w-2 border-[var(--theme-primary)]/50" />
        <div className="absolute top-0 left-0 h-[3px] w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(var(--theme-primary-rgb),0.5)_10px,rgba(var(--theme-primary-rgb),0.5)_20px)]" />
        <EdgeLabel className="pointer-events-none -top-2.5 left-4 bg-zinc-950 px-2 font-mono text-[var(--theme-primary)] tracking-[0.2em]">
          [ SYS.ASST_MODULE ]
        </EdgeLabel>

        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="flex items-center gap-3 font-black font-display text-2xl text-white uppercase tracking-tight">
              <Sparkles className="animate-[pulse_2s_ease-in-out_infinite] text-[var(--theme-primary)]" size={24} />
              TACTICAL OPERATIONS AI
            </h2>
            <TacticalIconButton
              onClick={() => setShowDebug(!showDebug)}
              className={
                showDebug
                  ? 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.3)]'
                  : ''
              }
              aria-pressed={showDebug}
              title="Toggle Diagnostic Feed"
              aria-label="Toggle Diagnostic Feed"
            >
              <Bug size={18} />
            </TacticalIconButton>
          </div>
          <p className="mt-1 flex items-center gap-2 font-mono text-[10px] text-[var(--theme-primary)]/70 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 animate-ping rounded-none bg-[var(--theme-primary)]" />
            LIVE TELEMETRY SYNCED. STANDING BY.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div
          className="tactical-skeleton h-64 w-full" // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">CALCULATING VECTORS...</span>
        </div>
      ) : suggestions.length === 0 ? (
        <div className="relative flex flex-col items-start border border-zinc-800/80 border-l-4 border-l-emerald-500 bg-zinc-950 p-8 shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
          <CornerCrosshairs thickness={2} className="h-2 w-2 border-emerald-500/50" />
          <div className="mb-6 flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-none bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
            <h3 className="font-black font-mono text-emerald-400 text-xl uppercase tracking-widest">SYS.NOMINAL</h3>
          </div>
          <div className="space-y-2 border-zinc-800 border-l border-dashed pl-4 font-mono text-xs text-zinc-400 uppercase leading-relaxed tracking-wider">
            <p>&gt; ALL TARGETS ELIMINATED OR ACQUIRED.</p>
            <p>&gt; NO OUTSTANDING DIRECTIVES DETECTED IN CURRENT QUADRANT.</p>
            <p className="text-zinc-600">&gt; AWAITING FURTHER EXPLORATION PARAMETERS...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Operations Sidebar - Mechanical Switchboard */}
          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[280px]">
            <div className="relative w-full border border-zinc-700 bg-zinc-900 p-3 shadow-[inset_0_0_15px_rgba(0,0,0,0.8),0_4px_6px_rgba(0,0,0,0.5)]">
              {/* Fake hardware mounting screws */}
              <div className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full border border-zinc-800 bg-zinc-700" />
              <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full border border-zinc-800 bg-zinc-700" />
              <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 rounded-full border border-zinc-800 bg-zinc-700" />
              <div className="absolute right-1.5 bottom-1.5 h-1.5 w-1.5 rounded-full border border-zinc-800 bg-zinc-700" />

              <EdgeLabel className="-top-2 left-4 bg-zinc-900 px-2 font-mono text-zinc-500 tracking-widest">
                [ PATCH_PANEL ]
              </EdgeLabel>

              <div className="mt-2 flex flex-col gap-2">
                {orderedCategories.map((category) => {
                  const items = groupedSuggestions[category] || [];
                  const catStyle = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Utility;
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`group focus-visible:tactical-focus relative flex w-full items-center justify-between border px-4 py-3.5 transition-all duration-75 ${
                        isActive
                          ? 'translate-y-[2px] border-t-zinc-950 border-r-zinc-950 border-b-zinc-800 border-l-4 border-l-[var(--theme-primary)] bg-zinc-950 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.02)]'
                          : 'border-x-zinc-800 border-t-zinc-700 border-b-zinc-950 bg-zinc-800 text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.4)] hover:bg-zinc-700 hover:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Hardware LED Status Indicator */}
                        <div className="flex h-4 w-4 items-center justify-center border border-black bg-black p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                          <div
                            className={`h-full w-full rounded-none transition-colors duration-200 ${isActive ? `${catStyle.color.replace('border-', 'bg-').replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]` : 'bg-zinc-800'}`}
                          />
                        </div>
                        <span
                          className={`font-black font-mono text-[11px] uppercase tracking-widest ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}
                        >
                          {category === 'Catch' ? 'ENCOUNTERS' : category === 'Trade' ? 'TRADES' : category}
                        </span>
                      </div>
                      <div
                        className={`flex h-6 min-w-[28px] items-center justify-center border font-bold font-mono text-[10px] ${
                          isActive
                            ? `${catStyle.color.replace('border-', 'text-')} border-current border-dashed bg-black`
                            : 'border-zinc-900 bg-zinc-950 text-zinc-500 shadow-inner'
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
                {/* Active Category CRT Header */}
                <div className="relative flex items-center overflow-hidden border border-zinc-700 border-dashed bg-black p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  <LcdGrid className="opacity-10" color="currentColor" />
                  <ScanlineOverlay opacityClass="opacity-20" />
                  <div
                    className="absolute top-0 right-0 h-16 w-16 opacity-10 mix-blend-screen blur-xl"
                    style={{
                      backgroundColor:
                        CATEGORY_STYLES[activeCategory]?.color.split(' ')[0]?.replace('border-', '') || 'white',
                    }}
                  />

                  <div
                    className="absolute top-0 bottom-0 left-0 w-2 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)_5px,transparent_5px,transparent_10px)]"
                    style={{ backgroundColor: 'currentColor' }}
                  />
                  <EdgeLabel className="-top-2 left-6 bg-black px-2 font-mono text-zinc-400 tracking-widest">
                    [ DIAGNOSTIC_STREAM ]
                  </EdgeLabel>

                  <div
                    className={`relative z-10 ml-4 flex items-center gap-5 ${CATEGORY_STYLES[activeCategory]?.color.replace('border-', 'text-')}`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-current border-dashed bg-current/10 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                      {CATEGORY_STYLES[activeCategory]?.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-black font-display text-2xl text-white uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {activeCategory === 'Catch'
                          ? 'WILD ENCOUNTERS'
                          : activeCategory === 'Trade'
                            ? 'TRADE REQUIRED'
                            : activeCategory}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="border border-current/30 bg-current/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                          {groupedSuggestions[activeCategory]?.length || 0} TARGETS IDENTIFIED
                        </p>
                        <span className="animate-pulse font-mono text-[9px] opacity-70">STATUS: ACTIVE</span>
                      </div>
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
