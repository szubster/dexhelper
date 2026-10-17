import { Fingerprint } from 'lucide-react';
import type React from 'react';
import { useRef, useState, useTransition } from 'react';
import { useStore } from '../../store';
import { TacticalInput } from '../TacticalInput';

export function MultiBoxSearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTerm = useStore((s) => s.searchTerm);
  const setSearchTerm = useStore((s) => s.setSearchTerm);

  const [isPending, startTransition] = useTransition();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  if (searchTerm !== localSearchTerm && !isPending) {
    setLocalSearchTerm(searchTerm);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearchTerm(val);
    startTransition(() => {
      setSearchTerm(val);
    });
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    startTransition(() => {
      setSearchTerm('');
    });
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && localSearchTerm) {
      handleClearSearch();
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="mb-1 flex items-center gap-2">
        <Fingerprint size={10} className="text-cyan-500" />
        <span className="font-mono text-[8px] text-cyan-500 uppercase tracking-widest">Box Search Active</span>
        <div className="ml-auto h-1 w-1 animate-pulse bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)]" />
      </div>
      <TacticalInput
        ref={inputRef}
        type="text"
        data-testid="multi-box-search-input"
        placeholder="[ ENTER NICKNAME, OT, OR SPECIES ]"
        aria-label="Search boxes by nickname, OT, or species"
        value={localSearchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onClear={handleClearSearch}
        containerClassName="w-full"
        className="!border-cyan-500/50 !bg-cyan-950/20 focus:!border-cyan-300 focus:!bg-cyan-950/40 font-mono text-cyan-50 transition-all placeholder:text-cyan-700/60 hover:bg-cyan-950/30"
      />
      {(localSearchTerm || isPending) && (
        <div className="mt-1 ml-1 animate-pulse font-mono text-[9px] text-cyan-400">
          PROCESSING_QUERY: IN_PROGRESS...
        </div>
      )}
    </div>
  );
}
