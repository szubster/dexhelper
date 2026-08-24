import { ServerCrash } from 'lucide-react';

import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';
import { EdgeLabel } from './EdgeLabel';
import { HoverScanner } from './HoverScanner';
import { TacticalModal } from './TacticalModal';
import { TacticalPanel } from './TacticalPanel';
import { TelemetryDecoration } from './TelemetryDecoration';

export function VersionModal() {
  const isVersionModalOpen = useStore((s) => s.isVersionModalOpen);
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const saveData = useStore((s) => s.saveData);

  if (!isVersionModalOpen) return null;

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const versions = genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions];

  return (
    <TacticalModal
      isOpen={isVersionModalOpen}
      ariaLabel="Version Conflict Resolution"
      containerClassName="z-[70] items-center justify-center p-4"
      backdropClassName="bg-black/90 backdrop-blur-md"
      dialogClassName="w-full max-w-4xl border-none bg-transparent"
    >
      <TacticalPanel variant="amber" className="flex flex-col overflow-hidden border-2 sm:flex-row">
        <TelemetryDecoration
          label="SYS.ARBITRATION_MATRIX"
          className="top-0 right-4 bg-zinc-950 text-amber-500"
          dotClassName="text-amber-500 animate-pulse"
        />

        {/* Left Pane: Diagnostic Readout */}
        <div className="relative flex w-full flex-col border-amber-500/30 border-b border-dashed bg-black/60 p-6 sm:w-1/3 sm:border-r sm:border-b-0 sm:p-8">
          <EdgeLabel className="-top-2 left-4 bg-amber-950 px-2 text-amber-500">[ DIAGNOSTIC_READOUT ]</EdgeLabel>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center border border-amber-500/50 border-dashed bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <CornerCrosshairs className="h-2 w-2 border-amber-500" />
              <div className="absolute inset-0 scale-75 animate-[spin_3s_linear_infinite] rounded-none border border-amber-500/20 opacity-50" />
              <div className="absolute inset-0 scale-50 animate-[ping_2s_ease-out_infinite] rounded-none border border-amber-500/40" />
              <ServerCrash className="relative z-10 text-amber-500" size={32} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-black font-mono text-amber-500 text-xl uppercase tracking-tighter shadow-amber-500/20 drop-shadow-md">
                SYS.CONFLICT
              </h2>
              <div className="mt-2 border-amber-500/50 border-l-2 pl-3 text-left">
                <p className="tactical-text font-bold text-[9px] text-zinc-400 uppercase leading-relaxed">
                  [ ANOMALY ] Game version signature indistinguishable.
                </p>
                <p className="tactical-text mt-1 font-bold text-[9px] text-amber-500 uppercase leading-relaxed">
                  [ ACTION ] Manual user arbitration required to resume uplink.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Arbitration Matrix */}
        <div className="relative flex w-full flex-col bg-black/40 p-6 sm:w-2/3 sm:p-8">
          <EdgeLabel className="-top-2 left-4 bg-zinc-950 px-2 text-zinc-500">[ ARBITRATION_MATRIX ]</EdgeLabel>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {versions.map((v) => (
              <button
                type="button"
                key={v.id}
                aria-label={`Select ${v.label} version`}
                onClick={() => {
                  setManualVersion(v.id);
                  setIsVersionModalOpen(false);
                }}
                className="group focus-visible:tactical-focus relative flex flex-col border border-zinc-800 border-dashed bg-zinc-950 p-4 transition-all hover:scale-[1.02] hover:border-amber-500/50 hover:bg-amber-950/20 active:scale-95"
              >
                <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700 transition-colors group-hover:border-amber-500" />
                <HoverScanner colorClass="via-amber-500/20" />

                {/* Hardware node layout */}
                <div className="relative z-10 flex w-full flex-row items-center justify-between border-zinc-800 border-b border-dashed pb-3 group-hover:border-amber-500/30">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 border border-black shadow-lg ${v.dotColor} group-hover:animate-pulse`}
                    />
                    <span className="font-black font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] transition-colors group-hover:text-amber-500">
                      SYS.VER
                    </span>
                  </div>
                  <span className="font-black font-mono text-[9px] text-zinc-600 uppercase transition-colors group-hover:text-amber-400">
                    [ SELECT ]
                  </span>
                </div>

                <div className="relative z-10 mt-3 flex items-center justify-center py-2">
                  <span className="font-black font-mono text-lg text-white uppercase tracking-widest drop-shadow-sm transition-colors group-hover:text-amber-400">
                    {v.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </TacticalPanel>
    </TacticalModal>
  );
}
