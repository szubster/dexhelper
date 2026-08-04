import { Activity, Upload } from 'lucide-react';
import type React from 'react';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { TacticalFileInput } from '../TacticalFileInput';

interface OfflineControlsProps {
  requestSync: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OfflineControls({ requestSync, handleFileUpload }: OfflineControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <button
        type="button"
        aria-label="Upload Save File"
        onClick={() => document.getElementById('init-save-input')?.click()}
        className="group slide-in-from-bottom-2 fade-in tactical-text focus-visible:tactical-focus relative inline-flex w-full animate-in cursor-pointer items-center justify-center gap-4 rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-10 py-4 font-black text-[11px] text-[var(--theme-primary)] transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-zinc-950 active:scale-95 sm:w-auto"
      >
        <CornerCrosshairs className="h-2 w-2 border-current" />
        <Upload size={20} />[ UPLOAD.SYS ]
      </button>
      <TacticalFileInput id="init-save-input" aria-label="Initialize Pokedex" onChange={handleFileUpload} />

      {typeof window !== 'undefined' && 'showOpenFilePicker' in window && (
        <button
          type="button"
          aria-label="Start Live Sync"
          onClick={requestSync}
          className="group slide-in-from-bottom-2 fade-in tactical-text focus-visible:tactical-focus relative inline-flex w-full animate-in cursor-pointer items-center justify-center gap-4 rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-10 py-4 font-black text-[11px] text-[var(--theme-primary)] transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-zinc-950 active:scale-95 sm:w-auto"
        >
          <CornerCrosshairs className="h-2 w-2 border-current" />
          <Activity size={20} />[ LIVE_SYNC.SYS ]
        </button>
      )}
    </div>
  );
}
