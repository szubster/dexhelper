import { Crosshair } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { FILTER_TYPES, type FilterType, useStore } from '../store';
import { ClearFiltersBadge } from './ClearFiltersBadge';
import { EdgeLabel } from './EdgeLabel';
import { FilterBadge } from './FilterBadge';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { LocationSuggestions } from './LocationSuggestions';
import { TacticalInput } from './TacticalInput';
import { TacticalMultiSelectControl } from './TacticalMultiSelectControl';
import { TacticalPanel } from './TacticalPanel';
import { TelemetryDecoration } from './TelemetryDecoration';

export function SearchAndFilters() {
  const inputRef = useRef<HTMLInputElement>(null);
  const saveData = useStore((s) => s.saveData);
  const searchTerm = useStore((s) => s.searchTerm);
  const setSearchTerm = useStore((s) => s.setSearchTerm);
  const filters = useStore((s) => s.filters);
  const toggleFilter = useStore((s) => s.toggleFilter);
  const setFilters = useStore((s) => s.setFilters);

  // ⚡ Bolt: Memoized filter set creation to avoid redundant object allocation on every keystroke
  const filtersSet = useMemo(() => new Set(filters), [filters]);

  if (!saveData) return null;

  const handleClearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && searchTerm) {
      handleClearSearch();
    }
  };

  return (
    <div className="sticky top-0 z-30 -mt-6 mb-6 border-[var(--theme-primary)]/30 border-b-2 border-dashed bg-zinc-950/95 px-4 pt-6 pb-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <TacticalPanel className="p-4 sm:p-6" variant="cyan">
        <TelemetryDecoration
          label="SYS.RECON_MATRIX"
          className="top-0 right-4 bg-zinc-950"
          textClassName="text-cyan-500"
          dotClassName="text-cyan-500"
        />
        <LcdGrid className="opacity-[0.03]" />
        <HoverScanner />

        <div className="relative z-10 flex flex-col gap-8 pt-4 xl:flex-row xl:items-stretch">
          {/* Left Pane: Target Acquisition */}
          <div className="relative flex-1 border border-cyan-500/20 border-dashed bg-cyan-950/20 p-4 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
            <div className="absolute top-0 left-0 h-2 w-2 border-cyan-500/50 border-t border-l" />
            <div className="absolute top-0 right-0 h-2 w-2 border-cyan-500/50 border-t border-r" />
            <div className="absolute bottom-0 left-0 h-2 w-2 border-cyan-500/50 border-b border-l" />
            <div className="absolute right-0 bottom-0 h-2 w-2 border-cyan-500/50 border-r border-b" />

            <EdgeLabel className="-top-2 left-4 bg-zinc-950 text-cyan-500">[ TARGET_ACQUISITION ]</EdgeLabel>

            <div className="mt-2 flex items-center gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-cyan-500/40 bg-cyan-500/10">
                <Crosshair size={20} className="relative z-10 text-cyan-400" />
                <div className="absolute inset-0 animate-[spin_3s_linear_infinite] border-[1px] border-cyan-500/30 bg-[radial-gradient(circle_at_center,transparent_0,var(--theme-primary)_100%)] opacity-30" />
                <div className="absolute top-1/2 left-0 h-[1px] w-full bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="flex-1">
                <TacticalInput
                  ref={inputRef}
                  type="text"
                  data-testid="search-input"
                  placeholder="[ ENTER COORDINATES OR ID ]"
                  aria-label="Search Pokedex by name, ID, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClear={handleClearSearch}
                  containerClassName="w-full"
                  className="!border-b !border-cyan-500/30 !bg-transparent !py-3 !pl-2 focus:!border-cyan-400 focus:!bg-cyan-950/30 font-mono text-cyan-100 placeholder:text-cyan-700/50"
                >
                  <LocationSuggestions />
                </TacticalInput>
              </div>
            </div>
          </div>

          {/* Right Pane: Filter Parameters */}
          <div className="relative flex-1 border border-zinc-800 border-dashed bg-black/60 p-4 xl:max-w-2xl">
            <EdgeLabel className="-top-2 left-4">[ PARAMETER_MATRIX ]</EdgeLabel>
            <TacticalMultiSelectControl<FilterType>
              ariaLabel="Filter Pokémon"
              containerClassName="h-full justify-center pt-2"
              buttonBaseClassName="relative group min-w-[80px] xl:min-w-[100px] h-12 flex flex-col items-center justify-center !border !border-dashed gap-1 transition-all"
              selectedValues={filtersSet}
              onValueToggle={(f) => toggleFilter(f)}
              defaultActiveClassName="!border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)] scale-[0.98]"
              defaultInactiveClassName="!border-zinc-800 bg-zinc-950 text-zinc-500 hover:!border-zinc-600 hover:bg-zinc-900 hover:text-zinc-400 hover:-translate-y-0.5"
              renderPrefixItem={() => (
                <ClearFiltersBadge isActive={filtersSet.size === 0} onClick={() => setFilters([])} />
              )}
              items={FILTER_TYPES.map((f) => ({
                id: f,
                label: (
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`h-1 w-4 rounded-full ${filtersSet.has(f) ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-zinc-800'}`}
                    />
                    <FilterBadge
                      isActive={filtersSet.has(f)}
                      label={f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX ONLY'}
                    />
                  </div>
                ),
                ariaLabel: f === 'secured' ? 'Secured filter' : f === 'missing' ? 'Missing filter' : 'Dex Only filter',
                testId: `filter-${f}`,
              }))}
            />
          </div>
        </div>
      </TacticalPanel>
    </div>
  );
}
