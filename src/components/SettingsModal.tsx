import { X } from 'lucide-react';
import { saveDB } from '../db/SaveDB';
import { useStore } from '../store';
import { getGenerationConfig, POKEBALL_LABELS } from '../utils/generationConfig';
import { HardwareScrews } from './HardwareScrews';
import { ClearStorageButton } from './settings/ClearStorageButton';
import { SettingsControls } from './settings/SettingsControls';
import { SettingsLegend } from './settings/SettingsLegend';
import { TacticalButton } from './TacticalButton';
import { TacticalModal } from './TacticalModal';
import { TelemetryDecoration } from './TelemetryDecoration';

export function SettingsModal() {
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const saveData = useStore((s) => s.saveData);
  const setSaveData = useStore((s) => s.setSaveData);
  const manualVersion = useStore((s) => s.manualVersion);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const setIsLivingDex = useStore((s) => s.setIsLivingDex);
  const globalPokeball = useStore((s) => s.globalPokeball);
  const setGlobalPokeball = useStore((s) => s.setGlobalPokeball);

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  if (!isSettingsOpen) return null;

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;

  const filteredPokeballs = (genConfig?.pokeballs ?? ['poke', 'great', 'ultra'])
    .filter((pb) => pb !== 'safari') // Safari Ball cannot be a default
    .map((value) => ({ value, label: POKEBALL_LABELS[value] }));

  return (
    <TacticalModal
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
      ariaLabel="System Settings"
      containerClassName="z-[60] items-end p-0 sm:items-center sm:p-4"
      dialogClassName="slide-in-from-bottom-[100%] overflow-hidden sm:max-w-xl"
    >
      <div className="relative border-4 border-zinc-900 bg-black shadow-2xl">
        {/* Hardware Screws for outer bezel */}
        <HardwareScrews className="opacity-50" />

        {/* Hazard stripe top rim */}
        <div
          className="h-3 w-full border-zinc-950 border-b-2 opacity-80"
          style={{
            background: 'repeating-linear-gradient(45deg, #18181b, #18181b 10px, #3f3f46 10px, #3f3f46 20px)',
          }}
        />

        {/* Inner terminal container */}
        <div className="relative border-zinc-800 border-x-2 border-b-2 bg-zinc-950">
          <TelemetryDecoration label="SYS.CONFIG_ACTIVE" className="top-0 left-4" />

          {/* Heavy Header Block */}
          <div className="relative flex items-center justify-between border-zinc-900 border-b-4 bg-zinc-900/30 p-6 pt-10">
            <HardwareScrews className="opacity-30" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border-2 border-zinc-700 bg-zinc-950 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                </div>
                <h2 className="font-black font-mono text-3xl text-zinc-100 uppercase tracking-tighter shadow-zinc-900 drop-shadow-md">
                  SYS.CONFIG
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-zinc-700" />
                <p className="font-bold font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  Hardware Configuration Terminal
                </p>
                <div className="h-px w-24 bg-zinc-700" />
              </div>
            </div>

            <TacticalButton
              onClick={() => setIsSettingsOpen(false)}
              aria-label="Close settings"
              title="Close settings"
              variant="secondary"
              size="icon"
              hasCrosshairs={true}
              className="h-12 w-12 border-2 border-zinc-700 bg-zinc-950 hover:border-zinc-500"
            >
              <X size={24} className="text-zinc-500 transition-colors group-hover:text-zinc-300" />
            </TacticalButton>
          </div>

          {/* Scrolling Content Area */}
          <div className="custom-scrollbar relative max-h-[70vh] space-y-6 overflow-y-auto p-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)',
                backgroundSize: '50px 50px',
              }}
            />

            <SettingsLegend />

            <div className="h-px w-full bg-zinc-800/50" />

            <SettingsControls
              effectiveVersion={effectiveVersion}
              setManualVersion={setManualVersion}
              isLivingDex={isLivingDex}
              setIsLivingDex={setIsLivingDex}
              globalPokeball={globalPokeball}
              setGlobalPokeball={setGlobalPokeball}
              filteredPokeballs={filteredPokeballs}
              genConfig={genConfig}
            />

            <div className="h-px w-full bg-zinc-800/50" />

            <ClearStorageButton
              onClear={async () => {
                await saveDB.deleteSave('last_save_file');
                setSaveData(null);
                setManualVersion(null);
                setIsSettingsOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </TacticalModal>
  );
}
