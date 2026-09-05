import { AlertTriangle, Trash2 } from 'lucide-react';
import React from 'react';
import { HardwareScrews } from '../HardwareScrews';
import { TacticalButton } from '../TacticalButton';

export function ClearStorageButton({ onClear }: { onClear: () => void }) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  return (
    <div className="group relative border-2 border-red-900/50 bg-red-950/20 p-5 transition-colors hover:border-red-800">
      <HardwareScrews className="text-red-900 opacity-60" />

      {/* Background hazard stripes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #7f1d1d 10px, #7f1d1d 20px)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3 border-red-900/50 border-b border-dashed pb-3">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-red-900 bg-red-950/50 text-red-500 shadow-[inset_0_0_10px_rgba(220,38,38,0.3)]">
            <AlertTriangle size={20} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-black font-mono text-lg text-red-500 tracking-widest">SYS.PURGE_MEMORY</span>
            <span className="font-mono text-[9px] text-red-400/70 uppercase">
              Warning: Irreversible Hardware Format
            </span>
          </div>
        </div>

        {isConfirming ? (
          <div className="fade-in zoom-in-95 flex w-full animate-in gap-3 duration-200">
            <TacticalButton
              type="button"
              title="Abort purge"
              onClick={() => setIsConfirming(false)}
              variant="secondary"
              className="flex-1 border-2 border-zinc-700 bg-zinc-900"
            >
              [ ABORT ]
            </TacticalButton>
            <TacticalButton
              type="button"
              title="Confirm purge"
              onClick={onClear}
              variant="danger"
              className="flex-1 border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              hasCrosshairs={true}
            >
              <Trash2 size={16} className="transition-transform group-hover:rotate-12" />[ CONFIRM.FORMAT ]
            </TacticalButton>
          </div>
        ) : (
          <TacticalButton
            type="button"
            title="Initiate system purge"
            onClick={() => setIsConfirming(true)}
            variant="danger-outline"
            className="fade-in zoom-in-95 w-full animate-in border-2 bg-red-950/30 duration-200 hover:bg-red-900/40"
            hasCrosshairs={true}
          >
            <Trash2 size={16} className="transition-transform group-hover:rotate-12" />
            INITIATE_FORMAT {/* ERASE SAVE DATA */}
          </TacticalButton>
        )}
      </div>
    </div>
  );
}
