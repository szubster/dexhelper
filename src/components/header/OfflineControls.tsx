import { Activity, Upload } from 'lucide-react';
import type React from 'react';
import { TacticalButton } from '../TacticalButton';

interface OfflineControlsProps {
  requestSync: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OfflineControls({ requestSync, handleFileUpload }: OfflineControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <TacticalButton
        variant="primary"
        size="lg"
        hasCrosshairs={true}
        aria-label="Upload Save File"
        onClick={() => document.getElementById('init-save-input')?.click()}
        className="slide-in-from-bottom-2 fade-in animate-in cursor-pointer justify-center sm:w-auto"
      >
        <Upload size={20} />[ UPLOAD.SYS ]
      </TacticalButton>
      <input
        id="init-save-input"
        type="file"
        tabIndex={-1}
        aria-label="Initialize Pokedex"
        accept=".sav"
        className="sr-only"
        onChange={handleFileUpload}
      />

      {typeof window !== 'undefined' && 'showOpenFilePicker' in window && (
        <TacticalButton
          variant="primary"
          size="lg"
          hasCrosshairs={true}
          aria-label="Start Live Sync"
          onClick={requestSync}
          className="slide-in-from-bottom-2 fade-in animate-in cursor-pointer justify-center sm:w-auto"
        >
          <Activity size={20} />[ LIVE_SYNC.SYS ]
        </TacticalButton>
      )}
    </div>
  );
}
