import { Show, For } from 'solid-js';
import { Search, X } from 'lucide-solid';
import { saveData, searchTerm, setSearchTerm, filtersSet, setFilters, toggleFilter } from '../store';
import type { FilterType } from '../store';
import { cn } from '../utils/cn';

export function SearchAndFilters() {
  return (
    <Show when={saveData()}>
      <div class="px-4 mb-6 space-y-5">
        <div class="flex flex-col lg:flex-row gap-4">
          {/* Modern Search Bar with Retro Flair */}
          <div class="flex-1 relative group">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center p-1.5 rounded-lg bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-white transition-all duration-300">
              <Search size={14} class="group-focus-within:scale-110 transition-transform" />
            </div>
            <input
              type="text"
              placeholder="Search Pokedex by name or ID..."
              aria-label="Search Pokedex by name or ID"
              value={searchTerm()}
              onInput={(e) => setSearchTerm(e.currentTarget.value)}
              class="w-full glass-card bg-zinc-900/40 border-white/5 rounded-2xl py-4 pl-14 pr-12 text-xs font-black text-white placeholder:text-zinc-600 focus:border-[var(--theme-primary)]/50 focus:bg-zinc-900/60 outline-none transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] tracking-widest uppercase font-mono"
            />
            <Show when={searchTerm()}>
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <X size={14} />
              </button>
            </Show>
            {/* LCD Effect on Input */}
            <div class="absolute inset-x-4 top-0 h-[1px] bg-white/5 pointer-events-none" />
          </div>

          {/* Filter Buttons designed as Retro Console Switches */}
          <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
            <button
              onClick={() => setFilters([])}
              class={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-2 shrink-0 retro-button relative overflow-hidden",
                filtersSet().size === 0
                  ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white shadow-[0_10px_20px_rgba(var(--theme-primary-rgb),0.3)]'
                  : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-white hover:bg-zinc-800'
              )}
            >
              <span class="relative z-10">All</span>
              <Show when={filtersSet().size === 0}>
                <div class="absolute inset-0 bg-white/10 lcd-flicker" />
              </Show>
            </button>

            <For each={['secured', 'missing', 'dex-only'] as FilterType[]}>
              {(f) => (
                <button
                  onClick={() => toggleFilter(f)}
                  class={cn(
                    "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-2 shrink-0 retro-button relative overflow-hidden",
                    filtersSet().has(f)
                      ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white shadow-[0_10px_20px_rgba(var(--theme-primary-rgb),0.3)]'
                      : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  <span class="relative z-10">
                    {f === 'secured' ? 'Secured' : f === 'missing' ? 'Missing' : 'Dex Only'}
                  </span>
                  <Show when={filtersSet().has(f)}>
                    <div class="absolute inset-0 bg-white/10 lcd-flicker" />
                  </Show>
                </button>
              )}
            </For>
          </div>
        </div>
      </div>
    </Show>
  );
}
