import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, CircleDot, Monitor, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useMemo } from "react";
import { useStore } from "../store";
import { cn } from "../utils/cn";
import { getGenerationConfig } from "../utils/generationConfig";

export function PokedexGrid({
  pokemonList,
}: {
  pokemonList: { id: number; name: string }[];
}) {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const searchTerm = useStore((s) => s.searchTerm);
  const filters = useStore((s) => s.filters);
  const navigate = useNavigate();

  const filtersSet = React.useMemo(() => new Set(filters), [filters]);
  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const displayLimit = genConfig?.maxDex ?? 151;

  const partySet = React.useMemo(
    () => new Set(saveData?.party || []),
    [saveData?.party],
  );
  const pcSet = React.useMemo(
    () => new Set(saveData?.pc || []),
    [saveData?.pc],
  );
  const _shinyPartySet = React.useMemo(
    () =>
      new Set(
        saveData?.partyDetails
          .filter((p) => p.isShiny)
          .map((p) => p.speciesId) || [],
      ),
    [saveData?.partyDetails],
  );
  const _shinyPcSet = React.useMemo(
    () =>
      new Set(
        saveData?.pcDetails.filter((p) => p.isShiny).map((p) => p.speciesId) ||
          [],
      ),
    [saveData?.pcDetails],
  );

  const finalPokemon = pokemonList
    .slice(0, displayLimit)
    .filter((pokemon) => {
      if (!saveData || filtersSet.size === 0) return true;

      const inParty = partySet.has(pokemon.id);
      const inPC = pcSet.has(pokemon.id);
      const hasInStorage = inParty || inPC;

      if (filtersSet.has("secured") && hasInStorage) return true;
      if (filtersSet.has("missing") && !hasInStorage) return true;
      if (
        filtersSet.has("dex-only") &&
        saveData.owned.has(pokemon.id) &&
        !hasInStorage
      )
        return true;

      return false;
    })
    .filter((pokemon) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        pokemon.name.toLowerCase().includes(term) ||
        pokemon.id.toString().includes(term)
      );
    });

  const shinySpeciesIds = useMemo(() => {
    const set = new Set<number>();
    if (saveData) {
      saveData.partyDetails.forEach((p) => {
        if (p.isShiny) set.add(p.speciesId);
      });
      saveData.pcDetails.forEach((p) => {
        if (p.isShiny) set.add(p.speciesId);
      });
    }
    return set;
  }, [saveData]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-5 px-1 pb-10">
      <AnimatePresence mode="popLayout">
        {finalPokemon.map((pokemon, idx) => {
          const inParty = saveData ? partySet.has(pokemon.id) : false;
          const inPC = saveData ? pcSet.has(pokemon.id) : false;
          const hasInStorage = inParty || inPC;

          const isOwnedInDex = saveData
            ? saveData.owned.has(pokemon.id)
            : false;
          const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

          const isOwned = saveData
            ? isLivingDex
              ? hasInStorage
              : isOwnedInDex || hasInStorage
            : false;
          const hadButLost = saveData ? isOwnedInDex && !hasInStorage : false;

          const isSeen = saveData
            ? isSeenInDex || isOwned || hasInStorage
            : false;
          const isUnseen = saveData && !isSeen;
          const isSeenNotOwned = saveData && isSeen && !isOwned;

          const isShiny = shinySpeciesIds.has(pokemon.id);

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: (idx % 20) * 0.02 }}
              key={pokemon.id}
              onClick={() =>
                navigate({
                  to: `/pokemon/${pokemon.id}`,
                  search: { from: "/" },
                })
              }
              whileHover={{
                y: -6,
                transition: { duration: 0.15 },
              }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "group relative flex flex-col p-4 rounded-[2rem] transition-all cursor-pointer overflow-hidden glass-card",
                hadButLost
                  ? "border-purple-500/30"
                  : isOwned
                    ? isShiny
                      ? "border-amber-500/30"
                      : "border-[var(--theme-primary)]/30"
                    : "border-white/5",
                isUnseen && "opacity-40 grayscale",
              )}
            >
              {/* Card Header: Num & Icons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">
                    ID
                  </span>
                  <span className="text-[10px] font-mono font-black text-zinc-300">
                    {pokemon.id.toString().padStart(3, "0")}
                  </span>
                </div>

                {saveData && !isUnseen && (
                  <div className="flex gap-1">
                    {inParty && (
                      <CircleDot
                        size={12}
                        className="text-rose-500 animate-pulse"
                      />
                    )}
                    {inPC && (
                      <Monitor
                        size={12}
                        className="text-[var(--theme-primary)]"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Sprite Container */}
              <div className="relative aspect-square mb-4 flex items-center justify-center rounded-2xl bg-black/20 overflow-hidden group-hover:bg-black/40 transition-colors">
                {/* LCD Grid Background */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />

                {isShiny && (
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                    className="absolute -top-1 -right-1 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] z-10"
                  >
                    <Sparkles size={16} fill="currentColor" />
                  </motion.div>
                )}

                <img
                  src={
                    genConfig
                      ? genConfig.spriteUrl(pokemon.id, isShiny)
                      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
                  }
                  alt={pokemon.name}
                  className={cn(
                    "w-[85%] h-[85%] object-contain transition-all duration-500 pixelated z-10",
                    isUnseen
                      ? "brightness-0 opacity-10"
                      : isSeenNotOwned
                        ? "grayscale opacity-50"
                        : "drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110",
                  )}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = (
                      genConfig?.fallbackSpriteUrl ??
                      getGenerationConfig(1).fallbackSpriteUrl
                    )(pokemon.id);
                  }}
                />

                {/* Scanline overlay for sprite */}
                <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />
              </div>

              {/* Card Footer: Name & Status */}
              <div className="space-y-2">
                <h3
                  className={cn(
                    "text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-center truncate",
                    isUnseen
                      ? "text-zinc-700"
                      : isShiny
                        ? "text-amber-400"
                        : "text-white",
                  )}
                >
                  {pokemon.name}
                </h3>

                {saveData && (
                  <div className="flex justify-center">
                    {hasInStorage ? (
                      <div
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border",
                          isShiny
                            ? "bg-amber-500/10 border-amber-500/20"
                            : "bg-emerald-500/10 border-emerald-500/20",
                        )}
                      >
                        <div
                          className={cn(
                            "w-1 h-1 rounded-full",
                            isShiny ? "bg-amber-400" : "bg-emerald-500",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[8px] font-black uppercase tracking-tighter",
                            isShiny ? "text-amber-400" : "text-emerald-400",
                          )}
                        >
                          Secured
                        </span>
                      </div>
                    ) : isOwnedInDex ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="w-1 h-1 rounded-full bg-amber-500" />
                        <span className="text-[8px] font-black uppercase tracking-tighter text-amber-400">
                          Dex Only
                        </span>
                      </div>
                    ) : isSeenInDex ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        <div className="w-1 h-1 rounded-full bg-rose-500" />
                        <span className="text-[8px] font-black uppercase tracking-tighter text-rose-400">
                          Seen
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-600">
                          Unknown
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-[-10px] right-[-10px] p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight
                  size={14}
                  className="text-[var(--theme-primary)]"
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
