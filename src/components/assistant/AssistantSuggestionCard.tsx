import { Link } from "@tanstack/react-router";
import { Fish, Target, Trees, Waves } from "lucide-react";
import type React from "react";
import type { SaveData } from "../../engine/saveParser/index";
import type { EncounterDetail, Suggestion } from "../../hooks/useAssistant";
import { getGenerationConfig } from "../../utils/generationConfig";
import { PokemonSprite } from "../pokemon/PokemonSprite";

interface AssistantSuggestionCardProps {
  suggestion: Suggestion;
  style: { icon: React.ReactNode; color: string; bg: string };
  showDebug: boolean;
  saveData: SaveData;
  getPokemonName: (id: number) => string;
}

export function AssistantSuggestionCard({
  suggestion: s,
  style,
  showDebug,
  saveData,
  getPokemonName,
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
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity ${style.bg}`}
      />

      <div className="relative z-10 flex flex-col h-full p-5 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div
              className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/10 ${style.bg} ${style.color.replace("border-", "text-")}`}
            >
              {style.icon}
              {s.category}
              {showDebug && (
                <span className="ml-1 text-[8px] opacity-70 border-l border-white/20 pl-1">
                  P: {s.priority}
                </span>
              )}
            </div>
            {s.pokemonId && (
              <div className="text-[10px] font-mono font-bold text-zinc-500">
                #{s.pokemonId.toString().padStart(3, "0")}
              </div>
            )}
          </div>

          <h3
            className={`font-bold text-white leading-tight ${s.category === "Catch" ? "text-xl" : "text-sm"}`}
          >
            {title}
          </h3>

          <p className="text-xs font-medium text-zinc-400 leading-relaxed max-w-[95%]">
            {desc}
          </p>
        </div>

        {s.pokemonId && (
          <div className="absolute bottom-4 right-4 w-20 h-20 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform origin-bottom-right">
            <PokemonSprite
              pokemonId={s.pokemonId}
              generation={saveData.generation}
              alt="Sprite"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        )}

        {hasMultiple && (
          <div className={`flex flex-col gap-4 relative z-20 mt-0`}>
            {s.category === "Catch" ? (
              Object.entries(
                s.pokemonIds!.reduce(
                  (
                    acc: Record<
                      string,
                      { pid: number; enc: EncounterDetail }[]
                    >,
                    pid: number,
                  ) => {
                    const encs = s.encounterInfo?.[pid];
                    if (!encs) return acc;
                    const mainEnc = [...encs].sort(
                      (a, b) => b.chance - a.chance,
                    )[0];
                    if (!mainEnc) return acc;
                    const method = mainEnc.method;
                    if (!acc[method]) acc[method] = [];
                    acc[method]!.push({ pid, enc: mainEnc });
                    return acc;
                  },
                  {} as Record<string, { pid: number; enc: EncounterDetail }[]>,
                ),
              ).map(
                ([method, pokes]: [
                  string,
                  { pid: number; enc: EncounterDetail }[],
                ]) => {
                  const isRod = method.includes("rod");
                  const isSurf = method === "surf";
                  const isGrass = method === "walk";

                  let isOwned = true;
                  if (isRod) {
                    const genConfig = getGenerationConfig(saveData.generation);
                    const rodIds = genConfig.rodIds;
                    if (!rodIds) {
                      isOwned = false;
                    } else {
                      const rodId = method.includes("old")
                        ? rodIds.OLD
                        : method.includes("good")
                          ? rodIds.GOOD
                          : rodIds.SUPER;
                      isOwned = saveData.inventory.some((i) => i.id === rodId);
                    }
                  }
                  const Icon = isRod
                    ? Fish
                    : isSurf
                      ? Waves
                      : isGrass
                        ? Trees
                        : Target;
                  const label = method.replace(/-/g, " ").toUpperCase();

                  return (
                    <div
                      key={method}
                      className={`space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5 transition-opacity ${!isOwned ? "opacity-40 grayscale-[0.5]" : ""}`}
                    >
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <Icon
                            size={14}
                            className={
                              isOwned ? "text-emerald-400" : "text-zinc-500"
                            }
                          />
                          <span
                            className={`text-[10px] font-black tracking-wider font-mono ${isOwned ? "text-zinc-300" : "text-zinc-500"}`}
                          >
                            {label}
                          </span>
                        </div>
                        {!isOwned && (
                          <span className="text-[8px] font-black bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 uppercase tracking-tighter">
                            Rod Missing
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {pokes.map(({ pid, enc }) => (
                          <div
                            key={pid}
                            className="flex flex-col items-center gap-1.5 group/sprite min-w-[56px]"
                          >
                            <Link
                              to="/pokemon/$pokemonId"
                              params={{ pokemonId: pid.toString() }}
                              search={{ from: "/assistant" }}
                              className="w-14 h-14 bg-zinc-800/80 rounded-2xl p-2 border border-white/10 hover:border-emerald-500/50 hover:scale-110 hover:bg-zinc-700 transition-all relative flex items-center justify-center shadow-md"
                              title={getPokemonName(pid)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pid}.png`}
                                alt={getPokemonName(pid)}
                                className="w-full h-full object-contain pixelated"
                              />
                              <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg border border-white/20 shadow-lg">
                                {enc.chance}%
                              </div>
                            </Link>
                            <div className="flex flex-col items-center leading-none">
                              <span className="text-[9px] font-black text-white group-hover/sprite:text-emerald-400 transition-colors">
                                Lv.{" "}
                                {enc.minLevel === enc.maxLevel
                                  ? enc.minLevel
                                  : `${enc.minLevel}-${enc.maxLevel}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
              )
            ) : (
              <div className="flex flex-wrap gap-2">
                {s.pokemonIds!.slice(0, 8).map((pid) => (
                  <Link
                    key={pid}
                    to="/pokemon/$pokemonId"
                    params={{ pokemonId: pid.toString() }}
                    search={{ from: "/assistant" }}
                    className="w-10 h-10 bg-black/40 rounded-lg p-1 border border-white/5 hover:border-white/40 hover:scale-110 hover:bg-black/60 transition-all group/sprite relative"
                    title={getPokemonName(pid)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pid}.png`}
                      alt={getPokemonName(pid)}
                      className="w-full h-full object-contain pixelated"
                    />
                  </Link>
                ))}
                {s.pokemonIds!.length > 8 && (
                  <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center border border-white/5 text-xs font-bold text-zinc-500">
                    +{s.pokemonIds!.length - 8}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  const isCritical = title.includes("CRITICAL");

  return (
    <div
      className={`relative rounded-2xl border ${isCritical ? "border-red-500 animate-[pulse_2s_infinite]" : style.color} bg-zinc-900 shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] ${!hasMultiple && s.pokemonId ? "cursor-pointer" : ""}`}
    >
      {!hasMultiple && s.pokemonId ? (
        <Link
          to="/pokemon/$pokemonId"
          params={{ pokemonId: s.pokemonId.toString() }}
          search={{ from: "/assistant" }}
          className="block w-full h-full"
        >
          {CardContent}
        </Link>
      ) : (
        <div className="w-full h-full">{CardContent}</div>
      )}
    </div>
  );
}
