import { Search } from 'lucide-react';
import { useRef } from 'react';
import { FILTER_TYPES, type FilterType, useStore } from '../store';
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

  if (!saveData) return null;

  const filtersSet = new Set(filters);

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
    <div className="sticky top-0 z-30 -mt-6 mb-6 border-[var(--theme-primary)]/30 border-b border-dashed bg-zinc-950/90 px-4 pt-6 pb-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <TacticalPanel className="p-4 sm:p-5" variant="default">
        <TelemetryDecoration label="SYS.QUERY_TERMINAL" className="top-0 right-4 bg-zinc-950" />

        <div className="flex flex-col gap-6 pt-3 xl:flex-row">
          {/* Left Pane: Query Uplink */}
          <div className="relative flex-1 border border-zinc-800 border-dashed bg-black/40 p-3">
            <span className="tactical-text absolute -top-2 left-2 bg-zinc-950 px-1 text-[9px] text-zinc-500">
              [ QUERY_UPLINK ]
            </span>
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/5">
                <Search size={16} className="relative z-10 text-[var(--theme-primary)]" />
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite] border-[1px] border-[var(--theme-primary)]/20 bg-[radial-gradient(circle_at_center,transparent_0,var(--theme-primary)_100%)] opacity-20" />
                <div className="absolute top-1/2 left-0 h-[1px] w-full bg-[var(--theme-primary)]/40 shadow-[0_0_8px_var(--theme-primary)]" />
              </div>
              <div className="flex-1">
                <TacticalInput
                  ref={inputRef}
                  type="text"
                  data-testid="search-input"
                  placeholder="[ ENTER QUERY_ ]"
                  aria-label="Search Pokedex by name, ID, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClear={handleClearSearch}
                  containerClassName="w-full"
                  className="!border-none !bg-transparent !py-2 !pl-2 focus:!bg-white/5"
                >
                  <LocationSuggestions />
                </TacticalInput>
              </div>
            </div>
          </div>

          {/* Right Pane: Parameter Matrix */}
          <div className="relative flex-1 border border-zinc-800 border-dashed bg-black/40 p-3 xl:max-w-2xl">
            <span className="tactical-text absolute -top-2 left-2 bg-zinc-950 px-1 text-[9px] text-zinc-500">
              [ PARAMETER_MATRIX ]
            </span>
            <TacticalMultiSelectControl<FilterType>
              ariaLabel="Filter Pokémon"
              containerClassName="h-full justify-center"
              buttonBaseClassName="relative group min-w-[80px] xl:min-w-[100px] h-10 flex flex-col items-center justify-center !border !border-dashed gap-1"
              selectedValues={filtersSet}
              onValueToggle={(f) => toggleFilter(f)}
              defaultActiveClassName="!border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_15px_rgba(var(--theme-primary-rgb),0.2)]"
              defaultInactiveClassName="!border-zinc-800 bg-zinc-950/80 text-zinc-600 hover:!border-zinc-600 hover:bg-zinc-900 hover:text-zinc-400"
              renderPrefixItem={() => (
                <button
                  type="button"
                  onClick={() => setFilters([])}
                  aria-pressed={filtersSet.size === 0}
                  title="Clear filters"
                  aria-label="Clear filters"
                  className={`group tactical-text focus-visible:tactical-focus !border !border-dashed relative flex h-10 min-w-[80px] flex-col items-center justify-center gap-1 font-black text-[10px] transition-all xl:min-w-[100px] ${
                    filtersSet.size === 0
                      ? '!border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_15px_rgba(var(--theme-primary-rgb),0.2)]'
                      : '!border-zinc-800 hover:!border-zinc-600 bg-zinc-950/80 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400'
                  }`}
                >
                  <div
                    className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${filtersSet.size === 0 ? 'bg-[var(--theme-primary)] shadow-[0_0_5px_var(--theme-primary)]' : 'bg-zinc-800'}`}
                  />
                  [ ALL ]
                </button>
              )}
              items={FILTER_TYPES.map((f) => ({
                id: f,
                label: (
                  <>
                    <div
                      className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${filtersSet.has(f) ? 'bg-[var(--theme-primary)] shadow-[0_0_5px_var(--theme-primary)]' : 'bg-zinc-800'}`}
                    />
                    <span>[ {f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX ONLY'} ]</span>
                  </>
                ),
                testId: `filter-${f}`,
              }))}
            />
          </div>
        </div>
      </TacticalPanel>
    </div>
  );
}
