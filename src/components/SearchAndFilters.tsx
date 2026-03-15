import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useAppState, FilterType } from '../state';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SearchAndFilters() {
  const { saveData, searchTerm, setSearchTerm, filters, toggleFilter, setFilters } = useAppState();

  if (!saveData) return null;

  return (
    <div className="px-4 mb-6 space-y-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Modern Search Bar with Retro Flair */}
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center p-1.5 rounded-lg bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-white transition-all duration-300">
            <Search size={14} className="group-focus-within:scale-110 transition-transform" />
          </div>
          <input 
            type="text"
            placeholder="Search Pokedex by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-card bg-zinc-900/40 border-white/5 rounded-2xl py-4 pl-14 pr-12 text-xs font-black text-white placeholder:text-zinc-600 focus:border-[var(--theme-primary)]/50 focus:bg-zinc-900/60 outline-none transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] tracking-widest uppercase font-mono"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={14} />
            </button>
          )}
          {/* LCD Effect on Input */}
          <div className="absolute inset-x-4 top-0 h-[1px] bg-white/5 pointer-events-none" />
        </div>

        {/* Filter Buttons designed as Retro Console Switches */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
          <button
            onClick={() => setFilters(new Set())}
            className={cn(
              "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-2 shrink-0 retro-button relative overflow-hidden",
              filters.size === 0 
                ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white shadow-[0_10px_20px_rgba(var(--theme-primary-rgb),0.3)]' 
                : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-white hover:bg-zinc-800'
            )}
          >
            <span className="relative z-10">All</span>
            {filters.size === 0 && <div className="absolute inset-0 bg-white/10 lcd-flicker" />}
          </button>
          
          {(['secured', 'missing', 'dex-only'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-2 shrink-0 retro-button relative overflow-hidden",
                filters.has(f)
                  ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white shadow-[0_10px_20px_rgba(var(--theme-primary-rgb),0.3)]' 
                  : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-white hover:bg-zinc-800'
              )}
            >
              <span className="relative z-10">
                {f === 'secured' ? 'Secured' : f === 'missing' ? 'Missing' : 'Dex Only'}
              </span>
              {filters.has(f) && <div className="absolute inset-0 bg-white/10 lcd-flicker" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
