import React from 'react';
import { Filter, X } from 'lucide-react';
import { useAppState, FilterType } from '../state';

export function SearchAndFilters() {
  const { saveData, searchTerm, setSearchTerm, filters, toggleFilter, setFilters } = useAppState();

  if (!saveData) return null;

  return (
    <div className="px-6 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-white placeholder:text-zinc-600 focus:border-red-500 outline-none transition-all shadow-inner"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setFilters(new Set())}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 shrink-0 ${
              filters.size === 0 
                ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            All
          </button>
          {(['caught', 'uncaught', 'lost'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 shrink-0 ${
                filters.has(f)
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
