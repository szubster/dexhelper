import { createMemo, For, Show } from 'solid-js';
import { Monitor, CircleDot, Sparkles, ChevronRight } from 'lucide-solid';
import { saveData, isLivingDex, searchTerm, filtersSet } from '../store';
import { useNavigate } from '@solidjs/router';
import { getGenerationConfig } from '../utils/generationConfig';
import { cn } from '../utils/cn';

export function PokedexGrid(props: { pokemonList: { id: number; name: string }[] }) {
  const navigate = useNavigate();

  const genConfig = createMemo(() => saveData() ? getGenerationConfig(saveData()!.generation) : null);
  const displayLimit = createMemo(() => genConfig()?.maxDex ?? 151);

  const partySet = createMemo(() => new Set(saveData()?.party || []));
  const pcSet = createMemo(() => new Set(saveData()?.pc || []));

  const finalPokemon = createMemo(() => {
    const list = props.pokemonList.slice(0, displayLimit());
    const data = saveData();
    const fSet = filtersSet();
    const term = searchTerm().toLowerCase();
    const currentPartySet = partySet();
    const currentPcSet = pcSet();

    return list.filter(pokemon => {
      if (!data || fSet.size === 0) return true;

      const inParty = currentPartySet.has(pokemon.id);
      const inPC = currentPcSet.has(pokemon.id);
      const hasInStorage = inParty || inPC;

      if (fSet.has('secured') && hasInStorage) return true;
      if (fSet.has('missing') && !hasInStorage) return true;
      if (fSet.has('dex-only') && (data.owned.has(pokemon.id) && !hasInStorage)) return true;

      return false;
    }).filter(pokemon => {
      if (!term) return true;
      return pokemon.name.toLowerCase().includes(term) || pokemon.id.toString().includes(term);
    });
  });

  const shinySpeciesIds = createMemo(() => {
    const set = new Set<number>();
    const data = saveData();
    if (data) {
      data.partyDetails.forEach(p => {
        if (p.isShiny) set.add(p.speciesId);
      });
      data.pcDetails.forEach(p => {
        if (p.isShiny) set.add(p.speciesId);
      });
    }
    return set;
  });

  return (
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-5 px-1 pb-10">
      <For each={finalPokemon()}>
        {(pokemon, idx) => {
          const inParty = createMemo(() => saveData() ? partySet().has(pokemon.id) : false);
          const inPC = createMemo(() => saveData() ? pcSet().has(pokemon.id) : false);
          const hasInStorage = createMemo(() => inParty() || inPC());

          const isOwnedInDex = createMemo(() => saveData() ? saveData()!.owned.has(pokemon.id) : false);
          const isSeenInDex = createMemo(() => saveData() ? saveData()!.seen.has(pokemon.id) : false);

          const isOwned = createMemo(() => saveData() ? (isLivingDex() ? hasInStorage() : (isOwnedInDex() || hasInStorage())) : false);
          const hadButLost = createMemo(() => saveData() ? (isOwnedInDex() && !hasInStorage()) : false);

          const isSeen = createMemo(() => saveData() ? (isSeenInDex() || isOwned() || hasInStorage()) : false);
          const isUnseen = createMemo(() => saveData() && !isSeen());
          const isSeenNotOwned = createMemo(() => saveData() && isSeen() && !isOwned());

          const isShiny = createMemo(() => shinySpeciesIds().has(pokemon.id));

          return (
            <div
              onClick={() => navigate(`/pokemon/${pokemon.id}?from=/`)}
              class={cn(
                "group relative flex flex-col p-4 rounded-[2rem] transition-all cursor-pointer overflow-hidden glass-card animate-in fade-in zoom-in duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95",
                hadButLost() ? "border-purple-500/30" : isOwned() ? (isShiny() ? "border-amber-500/30" : "border-[var(--theme-primary)]/30") : "border-white/5",
                isUnseen() && "opacity-40 grayscale"
              )}
              style={{ "animation-delay": `${(idx() % 20) * 0.02}s`, "animation-fill-mode": "both" }}
            >
              {/* Card Header: Num & Icons */}
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                  <span class="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">ID</span>
                  <span class="text-[10px] font-mono font-black text-zinc-300">
                    {pokemon.id.toString().padStart(3, '0')}
                  </span>
                </div>

                <Show when={saveData() && !isUnseen()}>
                  <div class="flex gap-1">
                    <Show when={inParty()}><CircleDot size={12} class="text-rose-500 animate-pulse" /></Show>
                    <Show when={inPC()}><Monitor size={12} class="text-[var(--theme-primary)]" /></Show>
                  </div>
                </Show>
              </div>

              {/* Sprite Container */}
              <div class="relative aspect-square mb-4 flex items-center justify-center rounded-2xl bg-black/20 overflow-hidden group-hover:bg-black/40 transition-colors">
                {/* LCD Grid Background */}
                <div class="absolute inset-0 opacity-[0.05] pointer-events-none"
                     style={{ "background-image": 'radial-gradient(circle, white 1px, transparent 1px)', "background-size": '4px 4px' }} />

                <Show when={isShiny()}>
                  <div
                    class="absolute -top-1 -right-1 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] z-10 animate-[spin_4s_linear_infinite]"
                  >
                    <Sparkles size={16} fill="currentColor" />
                  </div>
                </Show>

                <img
                  src={genConfig()
                    ? genConfig()!.spriteUrl(pokemon.id, isShiny())
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
                  }
                  alt={pokemon.name}
                  class={cn(
                    "w-[85%] h-[85%] object-contain transition-all duration-500 pixelated z-10",
                    isUnseen() ? "brightness-0 opacity-10" : (isSeenNotOwned() ? "grayscale opacity-50" : "drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110")
                  )}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = (genConfig()?.fallbackSpriteUrl ?? getGenerationConfig(1).fallbackSpriteUrl)(pokemon.id);
                  }}
                />

                {/* Scanline overlay for sprite */}
                <div class="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />
              </div>

              {/* Card Footer: Name & Status */}
              <div class="space-y-2">
                <h3 class={cn(
                  "text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-center truncate",
                  isUnseen() ? 'text-zinc-700' : isShiny() ? 'text-amber-400' : 'text-white'
                )}>
                  {pokemon.name}
                </h3>

                <Show when={saveData()}>
                  <div class="flex justify-center">
                    <Show when={hasInStorage()} fallback={
                      <Show when={isOwnedInDex()} fallback={
                        <Show when={isSeenInDex()} fallback={
                          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                            <span class="text-[8px] font-black uppercase tracking-tighter text-zinc-600">Unknown</span>
                          </div>
                        }>
                          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20">
                            <div class="w-1 h-1 rounded-full bg-rose-500" />
                            <span class="text-[8px] font-black uppercase tracking-tighter text-rose-400">Seen</span>
                          </div>
                        </Show>
                      }>
                        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <div class="w-1 h-1 rounded-full bg-amber-500" />
                          <span class="text-[8px] font-black uppercase tracking-tighter text-amber-400">Dex Only</span>
                        </div>
                      </Show>
                    }>
                      <div class={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border",
                        isShiny() ? "bg-amber-500/10 border-amber-500/20" : "bg-emerald-500/10 border-emerald-500/20"
                      )}>
                        <div class={cn("w-1 h-1 rounded-full", isShiny() ? "bg-amber-400" : "bg-emerald-500")} />
                        <span class={cn(
                          "text-[8px] font-black uppercase tracking-tighter",
                          isShiny() ? "text-amber-400" : "text-emerald-400"
                        )}>Secured</span>
                      </div>
                    </Show>
                  </div>
                </Show>
              </div>

              {/* Corner Accent */}
              <div class="absolute bottom-[-10px] right-[-10px] p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={14} class="text-[var(--theme-primary)]" />
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
}
