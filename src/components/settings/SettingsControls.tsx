import { Archive, CircleDot, Settings2, Skull } from 'lucide-react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalNode } from '../TacticalNode';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';
import { TelemetryDecoration } from '../TelemetryDecoration';

interface SettingsControlsProps {
  effectiveVersion: GameVersion | 'unknown';
  setManualVersion: (v: GameVersion | null) => void;
  isLivingDex: boolean;
  setIsLivingDex: (v: boolean) => void;
  globalPokeball: PokeballType;
  setGlobalPokeball: (v: PokeballType) => void;
  filteredPokeballs: { value: PokeballType; label: string }[];
  genConfig: GenerationConfig | null;
  nuzlockeGraveyardBox: string | null;
  setNuzlockeGraveyardBox: (v: string | null) => void;
  storageLocations: string[];
}

export function SettingsControls({
  effectiveVersion,
  setManualVersion,
  isLivingDex,
  setIsLivingDex,
  globalPokeball,
  setGlobalPokeball,
  filteredPokeballs,
  genConfig,
  nuzlockeGraveyardBox,
  setNuzlockeGraveyardBox,
  storageLocations,
}: SettingsControlsProps) {
  const versions: { id: GameVersion | 'unknown'; label: string }[] = [
    { id: 'unknown', label: 'AUTO' },
    ...(genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions]),
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
      {/* VERSION PANEL */}
      <TacticalNode variant="blue" className="col-span-1 flex flex-col">
        <TelemetryDecoration label="SYS.VER_CONF" className="top-0 left-4" textClassName="text-blue-500" />
        <div className="flex h-full flex-col gap-4 p-4 pt-6 pl-6">
          <TacticalBlockHeader
            variant="blue"
            icon={<Settings2 size={12} />}
            trackingLabel="[ HW_SYS_VER ]"
            title="VERSION OVERRIDE"
            className="border-zinc-800"
          />
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed">
              Force hardware emulation to a specific version payload. Leave as [AUTO] for dynamic resolution based on
              cartridge header.
            </p>
            <TacticalSegmentedControl
              ariaLabel="Game Version"
              containerClassName="grid grid-cols-2 gap-2 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
              buttonBaseClassName="!border-dashed !border focus-visible:ring-blue-500 px-3 py-4 text-[10px]"
              defaultActiveClassName="border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              defaultInactiveClassName="border-zinc-800 bg-black/50 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
              selectedValue={effectiveVersion}
              onValueChange={(val) => setManualVersion(val === 'unknown' ? null : val)}
              items={versions.map((v) => ({
                id: v.id,
                label: v.label,
              }))}
            />
          </div>
        </div>
      </TacticalNode>

      {/* LIVING DEX PANEL */}
      <TacticalNode variant="purple" className="col-span-1 flex flex-col">
        <TelemetryDecoration label="SYS.DB_MODE" className="top-0 left-4" textClassName="text-purple-500" />
        <div className="flex h-full flex-col gap-4 p-4 pt-6 pl-6">
          <TacticalBlockHeader
            variant="purple"
            icon={<Archive size={12} />}
            trackingLabel="[ DB_MODE ]"
            title="COLLECTION MODE"
            className="border-zinc-800"
          />
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed">
              Define the primary tracking heuristic for the dex. STANDARD tracks Pokédex flags, while LIVING requires
              physical entities in storage.
            </p>
            <TacticalSegmentedControl
              ariaLabel="Living Dex Mode"
              containerClassName="grid grid-cols-1 gap-2 [&>div]:grid [&>div]:grid-cols-1 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
              buttonBaseClassName="!border-dashed !border focus-visible:ring-emerald-500 px-4 py-4 text-[10px]"
              selectedValue={isLivingDex ? 'living' : 'standard'}
              onValueChange={(val) => setIsLivingDex(val === 'living')}
              items={[
                {
                  id: 'standard',
                  label: '[ STANDARD PROTOCOL ]',
                  activeClassName: 'border-zinc-500 bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]',
                  inactiveClassName:
                    'border-zinc-800 bg-black/50 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400 hover:border-zinc-600',
                },
                {
                  id: 'living',
                  label: '[ LIVING DEX PROTOCOL ]',
                  activeClassName:
                    'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
                  inactiveClassName:
                    'border-zinc-800 bg-black/50 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400 hover:border-zinc-600',
                },
              ]}
            />
          </div>
        </div>
      </TacticalNode>

      {/* BALL STYLE PANEL */}
      <TacticalNode variant="amber" className="col-span-1 flex flex-col">
        <TelemetryDecoration label="SYS.UI_PREF" className="top-0 left-4" textClassName="text-amber-500" />
        <div className="flex h-full flex-col gap-4 p-4 pt-6 pl-6">
          <TacticalBlockHeader
            variant="amber"
            icon={<CircleDot size={12} />}
            trackingLabel="[ UI_PREF ]"
            title="CONTAINMENT STYLE"
            className="border-zinc-800"
          />
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed">
              Global hardware preference for rendering containment vessels in probability displays.
            </p>
            <TacticalSegmentedControl<PokeballType>
              ariaLabel="Ball Style"
              containerClassName="grid grid-cols-2 gap-2 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
              buttonBaseClassName="flex flex-col items-center justify-center gap-2 py-4 text-[10px] !border-dashed !border focus-visible:ring-amber-500"
              defaultActiveClassName="border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              defaultInactiveClassName="border-zinc-800 bg-black/50 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
              selectedValue={globalPokeball}
              onValueChange={(val) => setGlobalPokeball(val)}
              items={filteredPokeballs.map((pb) => ({
                id: pb.value,
                ariaLabel: `${pb.label}`,
                label: (
                  <>
                    <div
                      className={`h-6 w-6 rounded-none border ${
                        pb.value === 'safari' || pb.value === 'friend' || pb.value === 'lure'
                          ? 'border-emerald-500 bg-emerald-500/20'
                          : pb.value === 'ultra' || pb.value === 'level'
                            ? 'border-yellow-500 bg-yellow-500/20'
                            : pb.value === 'great' || pb.value === 'heavy' || pb.value === 'moon'
                              ? 'border-blue-500 bg-blue-500/20'
                              : pb.value === 'love'
                                ? 'border-pink-500 bg-pink-500/20'
                                : 'border-red-500 bg-red-500/20'
                      }`}
                    />
                    <span className="mt-1">{pb.label}</span>
                  </>
                ),
              }))}
            />
          </div>
        </div>
      </TacticalNode>

      {/* GRAVEYARD PANEL */}
      <TacticalNode variant="red" className="col-span-1 flex flex-col">
        <TelemetryDecoration label="SYS.SEC_PROT" className="top-0 left-4" textClassName="text-red-500" />
        <div className="flex h-full flex-col gap-4 p-4 pt-6 pl-6">
          <TacticalBlockHeader
            variant="red"
            icon={<Skull size={12} />}
            trackingLabel="[ SEC_PROTOCOL ]"
            title="GRAVEYARD ASSIGNMENT"
            className="border-zinc-800"
          />
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed">
              Designate a specific storage unit as a Nuzlocke graveyard to exclude its entities from standard viability
              tracking.
            </p>
            <div className="custom-scrollbar max-h-[220px] overflow-y-auto border border-zinc-800 border-dashed bg-black/50 p-2">
              <TacticalSegmentedControl<string>
                ariaLabel="Select Nuzlocke Graveyard Box"
                containerClassName="[&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div]:border-none [&>button]:border"
                buttonBaseClassName="!border-dashed !border focus-visible:ring-red-500 px-3 py-2 text-[10px] w-full text-left justify-start"
                defaultActiveClassName="border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                defaultInactiveClassName="border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
                selectedValue={nuzlockeGraveyardBox || ''}
                onValueChange={(val) => setNuzlockeGraveyardBox(val === '' ? null : val)}
                items={[
                  { id: '', label: '[ NO ASSIGNMENT ]' },
                  ...storageLocations.map((loc) => ({
                    id: loc,
                    label: `[ ${loc.toUpperCase()} ]`,
                  })),
                ]}
              />
            </div>
          </div>
        </div>
      </TacticalNode>
    </div>
  );
}
