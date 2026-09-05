import { Crosshair, Fingerprint, Radio } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FILTER_TYPES, type FilterType, useStore } from '../store';
import { cn } from '../utils/cn';
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

function generateHexStream(length: number) {
  let result = '';
  const characters = '0123456789ABCDEF';
  const randomValues = globalThis.crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += characters.charAt((randomValues[i] || 0) & 0x0f);
  }
  return result;
}

export function SearchAndFilters() {
  const inputRef = useRef<HTMLInputElement>(null);
  const saveData = useStore((s) => s.saveData);
  const searchTerm = useStore((s) => s.searchTerm);
  const setSearchTerm = useStore((s) => s.setSearchTerm);
  const filters = useStore((s) => s.filters);
  const toggleFilter = useStore((s) => s.toggleFilter);
  const setFilters = useStore((s) => s.setFilters);

  const [hexStream, setHexStream] = useState(generateHexStream(32));

  useEffect(() => {
    if (searchTerm) {
      const interval = setInterval(() => {
        setHexStream(generateHexStream(32));
      }, 100);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [searchTerm]);

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

        <div className="relative z-10 flex flex-col gap-6 pt-4 xl:flex-row xl:items-stretch">
          {/* Left Pane: Target Acquisition Array */}
          <div className="group relative flex-1 overflow-hidden border border-cyan-500/30 border-dashed bg-cyan-950/10 p-5 shadow-[inset_0_0_30px_rgba(6,182,212,0.03)] transition-colors hover:bg-cyan-950/20">
            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 h-3 w-3 border-cyan-500/60 border-t-2 border-l-2" />
            <div className="absolute top-0 right-0 h-3 w-3 border-cyan-500/60 border-t-2 border-r-2" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-cyan-500/60 border-b-2 border-l-2" />
            <div className="absolute right-0 bottom-0 h-3 w-3 border-cyan-500/60 border-r-2 border-b-2" />

            {/* Background Hex Stream */}
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-end p-2 opacity-10">
              <div className="break-all font-mono text-[10px] text-cyan-400 leading-tight">{hexStream.repeat(5)}</div>
            </div>

            <EdgeLabel className="-top-2 left-5 bg-zinc-950 px-2 text-cyan-400 tracking-[0.2em]">
              [ TARGET_ACQUISITION_ARRAY ]
            </EdgeLabel>

            <div className="relative z-10 mt-3 flex items-center gap-5">
              {/* Complex Targeting Reticle */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center border border-cyan-500/30 bg-black/50">
                <Crosshair
                  size={24}
                  className="relative z-10 text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                />
                <div
                  className={cn(
                    'absolute inset-0 border-[1px] border-cyan-500/40 border-dashed opacity-50',
                    searchTerm ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_10s_linear_infinite]',
                  )}
                />
                <div
                  className={cn(
                    'absolute inset-2 rounded-none border-[1px] border-cyan-400/20 opacity-40',
                    searchTerm
                      ? 'animate-[spin_3s_linear_infinite_reverse]'
                      : 'animate-[spin_8s_linear_infinite_reverse]',
                  )}
                />
                <div className="absolute top-1/2 left-[-10px] h-[1px] w-[calc(100%+20px)] bg-cyan-500/30" />
                <div className="absolute top-[-10px] left-1/2 h-[calc(100%+20px)] w-[1px] bg-cyan-500/30" />

                {/* Data readout next to crosshair */}
                <div className="absolute right-0 -bottom-4 left-0 text-center font-mono text-[8px] text-cyan-600 transition-colors group-hover:text-cyan-400">
                  SCAN_FREQ: {searchTerm ? '94.2' : '14.0'}Hz
                </div>
              </div>

              {/* Input Area */}
              <div className="flex flex-1 flex-col gap-1">
                <div className="mb-1 flex items-center gap-2">
                  <Fingerprint size={10} className="text-cyan-500" />
                  <span className="font-mono text-[8px] text-cyan-500 uppercase tracking-widest">
                    Input Stream Active
                  </span>
                  <div className="ml-auto h-1 w-1 animate-pulse bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)]" />
                </div>
                <TacticalInput
                  ref={inputRef}
                  type="text"
                  data-testid="search-input"
                  placeholder="[ ENTER COORDINATES, ID OR ENTITY ]"
                  aria-label="Search Pokedex by name, ID, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClear={handleClearSearch}
                  containerClassName="w-full"
                  className="!border-l-2 !border-b !border-r-0 !border-t-0 !border-cyan-500/50 !bg-cyan-950/20 !py-3 !pl-3 focus:!border-cyan-300 focus:!bg-cyan-950/40 font-mono text-cyan-50 transition-all placeholder:text-cyan-700/60 hover:bg-cyan-950/30"
                >
                  <LocationSuggestions />
                </TacticalInput>
                {searchTerm && (
                  <div className="mt-1 ml-1 animate-pulse font-mono text-[9px] text-cyan-400">
                    PROCESSING_QUERY: 0x{hexStream.substring(0, 8)}...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Pane: Filter Parameters - Hardware Switches */}
          <div className="relative flex-1 border border-zinc-700 border-dashed bg-black/80 p-5 xl:max-w-[40%]">
            <EdgeLabel className="-top-2 left-5 bg-zinc-950 px-2 text-zinc-400 tracking-[0.2em]">
              [ PARAMETER_ROUTING ]
            </EdgeLabel>

            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-50">
              <Radio size={10} className="text-zinc-500" />
              <span className="font-mono text-[8px] text-zinc-500">UPLINK_STABLE</span>
            </div>

            <TacticalMultiSelectControl<FilterType>
              ariaLabel="Filter Pokémon"
              containerClassName="h-full justify-center pt-4"
              buttonBaseClassName="relative group min-w-[80px] xl:min-w-[90px] h-14 flex flex-col items-center justify-center !border border-solid transition-all overflow-hidden"
              selectedValues={filtersSet}
              onValueToggle={(f) => toggleFilter(f)}
              defaultActiveClassName="!border-cyan-500 bg-cyan-950 text-cyan-300 shadow-[inset_0_4px_10px_rgba(6,182,212,0.15)]"
              defaultInactiveClassName="!border-zinc-800 bg-zinc-900 text-zinc-500 hover:!border-zinc-600 hover:bg-zinc-800 hover:text-zinc-300 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.5)]"
              renderPrefixItem={() => (
                <ClearFiltersBadge isActive={filtersSet.size === 0} onClick={() => setFilters([])} />
              )}
              items={FILTER_TYPES.map((f) => ({
                id: f,
                label: (
                  <div className="relative z-10 flex w-full flex-col items-center gap-1.5 px-2">
                    <div
                      className={`h-1.5 w-6 rounded-none border border-black/50 ${filtersSet.has(f) ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-zinc-800'}`}
                    />
                    <FilterBadge
                      isActive={filtersSet.has(f)}
                      label={f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX_ONLY'}
                    />
                  </div>
                ),
                ariaLabel: f === 'secured' ? 'Secured filter' : f === 'missing' ? 'Missing filter' : 'Dex Only filter',
                testId: `filter-${f}`,
              }))}
            />
            {/* Fake venting slots at bottom */}
            <div className="absolute right-4 bottom-2 flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-1 w-3 border border-zinc-800 bg-zinc-900" />
              ))}
            </div>
          </div>
        </div>
      </TacticalPanel>
    </div>
  );
}
