import { X } from 'lucide-react';
import { saveDB } from '../db/SaveDB';
import { useStore } from '../store';
import { getGenerationConfig, POKEBALL_LABELS } from '../utils/generationConfig';
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
    .filter((pb) => pb !== 'safari') // Safari Ball cannot be a default
    .map((value) => ({ value, label: POKEBALL_LABELS[value] }));

  return (
    <TacticalModal
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
      ariaLabel="System Settings"
      containerClassName="z-[60] items-end p-0 sm:items-center sm:p-4"
      dialogClassName="slide-in-from-bottom-[100%] overflow-hidden border-zinc-800 border-t border-dashed bg-zinc-950 sm:max-w-md sm:border"
    >
      {/* Telemetry decoration */}
      <TelemetryDecoration label="SYS.CONFIG_ACTIVE" className="top-0 left-4" />

      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed p-8 pt-10">
        <div>
          <h2 className="font-black font-mono text-2xl uppercase tracking-tighter">SYS.CONFIG</h2>
          <p className="tactical-text mt-1 font-bold text-[10px] text-zinc-500">Configure your experience</p>
        </div>
        <TacticalButton
          onClick={() => setIsSettingsOpen(false)}
          aria-label="Close settings"
          title="Close settings"
          variant="secondary"
          size="icon"
          hasCrosshairs={true}
        >
          <X size={20} />
        </TacticalButton>
      </div>

      <div className="custom-scrollbar max-h-[70vh] space-y-8 overflow-y-auto p-8">
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
        <ClearStorageButton
          onClear={async () => {
            await saveDB.deleteSave('last_save_file');
            setSaveData(null);
            setManualVersion(null);
            setIsSettingsOpen(false);
          }}
        />
      </div>
    </TacticalModal>
  );
}
