import { useQuery } from "@tanstack/react-query";
import {
  Bug,
  Egg,
  Flag,
  Info,
  Loader2,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import React from "react";
import type { SaveData } from "../engine/saveParser/index";
import { type Suggestion, useAssistant } from "../hooks/useAssistant";
import { MAX_DEX_ACROSS_GENS } from "../utils/generationConfig";
import { pokeapi } from "../utils/pokeapi";
import { AssistantDebugView } from "./assistant/AssistantDebugView";
import { AssistantSuggestionCard } from "./assistant/AssistantSuggestionCard";

interface AssistantPanelProps {
  saveData: SaveData;
  isLivingDex: boolean;
  manualVersion: string | null;
}

const CATEGORY_STYLES: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  Catch: {
    icon: <Target size={16} className="text-emerald-400" />,
    color: "border-emerald-500/30 text-emerald-100",
    bg: "bg-emerald-500/10",
  },
  Evolve: {
    icon: <Zap size={16} className="text-blue-400" />,
    color: "border-blue-500/30 text-blue-100",
    bg: "bg-blue-500/10",
  },
  Trade: {
    icon: <Zap size={16} className="text-amber-400" />,
    color: "border-amber-500/30 text-amber-100",
    bg: "bg-amber-500/10",
  },
  Breed: {
    icon: <Egg size={16} className="text-pink-400" />,
    color: "border-pink-500/30 text-pink-100",
    bg: "bg-pink-500/10",
  },
  Progress: {
    icon: <Flag size={16} className="text-red-400" />,
    color: "border-red-500/30 text-red-100",
    bg: "bg-red-500/10",
  },
  Event: {
    icon: <Sparkles size={16} className="text-purple-400" />,
    color: "border-purple-500/30 text-purple-100",
    bg: "bg-purple-500/10",
  },
  Gift: {
    icon: <Zap size={16} className="text-indigo-400" />,
    color: "border-indigo-500/30 text-indigo-100",
    bg: "bg-indigo-500/10",
  },
  Utility: {
    icon: <Info size={16} className="text-zinc-400" />,
    color: "border-zinc-500/30 text-zinc-100",
    bg: "bg-zinc-500/10",
  },
};

export function AssistantPanel({
  saveData,
  isLivingDex,
  manualVersion,
}: AssistantPanelProps) {
  const { suggestions, debug, isLoading } = useAssistant(
    saveData,
    isLivingDex,
    manualVersion,
  );
  const [showDebug, setShowDebug] = React.useState(false);

  const { data: pokemonList } = useQuery<{ id: number; name: string }[]>({
    queryKey: ["pokemonList"],
    queryFn: () =>
      pokeapi
        .getPokemonsList({ limit: MAX_DEX_ACROSS_GENS, offset: 0 })
        .then((res) =>
          res.results.map((p: any, i: number) => ({ id: i + 1, name: p.name })),
        ),
    staleTime: Infinity,
  });

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, string>();
    if (pokemonList) {
      for (const p of pokemonList) {
        map.set(p.id, p.name);
      }
    }
    return map;
  }, [pokemonList]);

  const getPokemonName = React.useCallback(
    (id: number) => {
      if (!pokemonList) return `#${id}`;
      return pokemonMap.get(id) ?? `#${id}`;
    },
    [pokemonList, pokemonMap],
  );

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500" />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white flex items-center gap-3">
              <Sparkles className="text-amber-400" size={24} />
              AI Assistant
            </h2>
            <button
              onClick={() => setShowDebug(!showDebug)}
              className={`p-2 rounded-xl border transition-all ${showDebug ? "bg-amber-500/20 border-amber-500/50 text-amber-400" : "bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-zinc-300"}`}
              title="Toggle Debug Mode"
            >
              <Bug size={18} />
            </button>
          </div>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
            Smart suggestions based on your save file
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-zinc-900/50 rounded-[2rem] border border-zinc-800/50">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/50 rounded-[2rem] border border-zinc-800/50 text-center">
          <Sparkles className="text-zinc-700 mb-4" size={48} />
          <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-wide">
            You're all caught up!
          </h3>
          <p className="text-sm font-medium text-zinc-600 mt-2 max-w-sm">
            No new suggestions at the moment. Keep exploring to discover more
            Pokémon!
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
              const order = [
                "Catch",
                "Gift",
                "Evolve",
                "Trade",
                "Progress",
                "Event",
                "Utility",
              ];
              return (
                (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) -
                (order.indexOf(b) !== -1 ? order.indexOf(b) : 99)
              );
            })
            .map(([category, items]) => {
              const catStyle =
                CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Utility!;

              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div
                      className={`p-2 rounded-xl border ${catStyle.bg} ${catStyle.color.replace("border-", "text-")}`}
                    >
                      {catStyle.icon}
                    </div>
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-widest">
                      {category === "Catch"
                        ? "Wild Encounters"
                        : category === "Trade"
                          ? "Trade Required"
                          : category}
                    </h3>
                  </div>

                  <div
                    className={`grid gap-6 animate-in fade-in duration-500 ${category === "Catch" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
                  >
                    {items.map((s, idx) => {
                      const style =
                        CATEGORY_STYLES[s.category] ?? CATEGORY_STYLES.Utility!;
                      return (
                        <div
                          key={s.id}
                          className="animate-in slide-in-from-bottom-4 duration-500 fill-mode-both"
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
        <AssistantDebugView
          rejected={debug.rejected}
          getPokemonName={getPokemonName}
        />
      )}
    </div>
  );
}
