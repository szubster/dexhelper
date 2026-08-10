import { Activity, X } from 'lucide-react';
import { saveDB } from '../db/SaveDB';
import { useStore } from '../store';
import { getGenerationConfig, POKEBALL_LABELS } from '../utils/generationConfig';
import { EdgeLabel } from './EdgeLabel';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
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
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const setNuzlockeGraveyardBox = useStore((s) => s.setNuzlockeGraveyardBox);

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  if (!isSettingsOpen) return null;

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;

  const storageLocations = genConfig ? Array.from({ length: genConfig.boxCount }, (_, i) => `Box ${i + 1}`) : [];

  const filteredPokeballs = (genConfig?.pokeballs ?? ['poke', 'great', 'ultra'])
    .filter((pb) => pb !== 'safari')
    .map((value) => ({ value, label: POKEBALL_LABELS[value] }));

  return (
    <TacticalModal
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
      ariaLabel="System Settings"
      containerClassName="z-[60] items-center p-2 sm:p-6"
      dialogClassName="slide-in-from-bottom-[10%] fade-in animate-in overflow-hidden border-[var(--theme-primary)]/50 border-dashed bg-zinc-950 sm:max-w-7xl h-[95vh] w-[95vw] border shadow-[0_0_100px_rgba(0,0,0,1)]"
    >
      <ScanlineOverlay opacityClass="opacity-20" />
      <LcdGrid className="opacity-[0.03]" />
      <TelemetryDecoration
        label="SYS.BIOS_CONFIG"
        className="top-0 left-4"
        textClassName="text-[var(--theme-primary)]"
      />
      <TelemetryDecoration label="RUNTIME: ACTIVE" className="right-4 bottom-0" textClassName="text-zinc-500" />

      <EdgeLabel className="-top-3 left-10 border border-[var(--theme-primary)] border-dashed bg-zinc-950 px-2 font-black font-display text-[var(--theme-primary)] text-xl tracking-[0.3em]">
        [ SYSTEM CONFIGURATION MENU ]
      </EdgeLabel>

      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <div className="hidden items-center gap-2 border border-zinc-800 border-dashed bg-black/50 px-4 py-1 sm:flex">
          <Activity size={12} className="animate-pulse text-emerald-500" />
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">MEM_CHECK: OK</span>
        </div>
        <TacticalButton
          onClick={() => setIsSettingsOpen(false)}
          aria-label="Close settings"
          title="Close settings"
          variant="secondary"
          size="icon"
          hasCrosshairs={true}
          className="border-[var(--theme-primary)]/50 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-black"
        >
          <X size={20} />
        </TacticalButton>
      </div>

      <div className="custom-scrollbar flex h-full flex-col overflow-y-auto px-6 pt-16 pb-6 lg:px-12 lg:pt-24 lg:pb-12">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] flex-1 space-y-8">
          <SettingsLegend />

          <SettingsControls
            effectiveVersion={effectiveVersion}
            setManualVersion={setManualVersion}
            isLivingDex={isLivingDex}
            setIsLivingDex={setIsLivingDex}
            globalPokeball={globalPokeball}
            setGlobalPokeball={setGlobalPokeball}
            filteredPokeballs={filteredPokeballs}
            genConfig={genConfig}
            nuzlockeGraveyardBox={nuzlockeGraveyardBox}
            setNuzlockeGraveyardBox={setNuzlockeGraveyardBox}
            storageLocations={storageLocations}
          />

          <div className="mt-8 max-w-sm border-zinc-800 border-t border-dashed pt-8">
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
