import { Activity, Upload } from 'lucide-react';
import type React from 'react';
import { TacticalButton } from '../TacticalButton';
import { TacticalFileInput } from '../TacticalFileInput';

interface OfflineControlsProps {
  requestSync: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OfflineControls({ requestSync, handleFileUpload }: OfflineControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <TacticalButton
        aria-label="Upload Save File"
        onClick={() => document.getElementById('init-save-input')?.click()}
        variant="primary"
        size="lg"
        hasCrosshairs={true}
        className="group slide-in-from-bottom-2 fade-in w-full animate-in gap-4 border-dashed px-10 sm:w-auto"
      >
        <Upload size={20} />[ UPLOAD.SYS ]
      </TacticalButton>
      <TacticalFileInput id="init-save-input" aria-label="Initialize Pokedex" onChange={handleFileUpload} />

      {typeof window !== 'undefined' && 'showOpenFilePicker' in window && (
        <TacticalButton
          aria-label="Start Live Sync"
          onClick={requestSync}
          variant="primary"
          size="lg"
          hasCrosshairs={true}
          className="group slide-in-from-bottom-2 fade-in w-full animate-in gap-4 border-dashed px-10 sm:w-auto"
        >
          <Activity size={20} />[ LIVE_SYNC.SYS ]
        </TacticalButton>
      )}
    </div>
  );
}
