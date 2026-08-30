import { Archive, CircleDot, Settings2, Skull } from 'lucide-react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';
import { SettingsRow } from '../SettingsRow';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';

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
    <div className="space-y-4">
      <SettingsRow
        icon={<Settings2 size={18} className="text-blue-500" />}
        iconColorClass="border-blue-500/20 bg-blue-500/10"
        label="Version"
      >
        <TacticalSegmentedControl
          ariaLabel="Game Version"
          containerClassName="grid grid-cols-3 gap-2 [&>div]:grid [&>div]:grid-cols-3 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
          buttonBaseClassName="!border-dashed !border focus-visible:ring-blue-500 px-3 py-2 text-[9px]"
          defaultActiveClassName="border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          defaultInactiveClassName="border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
          selectedValue={effectiveVersion}
          onValueChange={(val) => setManualVersion(val === 'unknown' ? null : val)}
          items={versions.map((v) => ({
            id: v.id,
            label: v.label,
          }))}
        />
      </SettingsRow>

      <SettingsRow
        icon={<Archive size={18} className="text-purple-500" />}
        iconColorClass="border-purple-500/20 bg-purple-500/10"
        label="Living Dex"
      >
        <TacticalSegmentedControl
          ariaLabel="Living Dex Mode"
          buttonBaseClassName="focus-visible:ring-emerald-500 px-2 py-2 text-[9px]"
          selectedValue={isLivingDex ? 'living' : 'standard'}
          onValueChange={(val) => setIsLivingDex(val === 'living')}
          items={[
            {
              id: 'standard',
              label: '[ STANDARD ]',
              activeClassName: 'bg-zinc-800 text-white',
              inactiveClassName: 'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400',
            },
            {
              id: 'living',
              label: '[ LIVING DEX ]',
              activeClassName: 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
              inactiveClassName: 'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400',
            },
          ]}
        />
      </SettingsRow>

      <SettingsRow
        icon={<CircleDot size={18} className="text-amber-500" />}
        iconColorClass="border-amber-500/20 bg-amber-500/10"
        label="Ball Style"
      >
        <TacticalSegmentedControl<PokeballType>
          ariaLabel="Ball Style"
          containerClassName="grid grid-cols-3 gap-2 [&>div]:grid [&>div]:grid-cols-3 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
          buttonBaseClassName="flex flex-col items-center justify-center gap-1.5 py-3 text-[9px] !border-dashed !border focus-visible:ring-amber-500"
          defaultActiveClassName="border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
          defaultInactiveClassName="border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
          selectedValue={globalPokeball}
          onValueChange={(val) => setGlobalPokeball(val)}
          items={filteredPokeballs.map((pb) => ({
            id: pb.value,
            ariaLabel: `${pb.label}`,
            label: (
              <>
                <div
                  className={`h-4 w-4 rounded-none border ${
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
                {pb.label}
              </>
            ),
          }))}
        />
      </SettingsRow>

      <SettingsRow
        icon={<Skull size={18} className="text-red-500" />}
        iconColorClass="border-red-500/20 bg-red-500/10"
        label="Graveyard"
      >
        <TacticalSegmentedControl<string>
          ariaLabel="Select Nuzlocke Graveyard Box"
          containerClassName="[&>div]:grid [&>div]:grid-cols-3 [&>div]:sm:grid-cols-4 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
          buttonBaseClassName="!border-dashed !border focus-visible:ring-red-500 px-2 py-2 text-[8px]"
          defaultActiveClassName="border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          defaultInactiveClassName="border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
          selectedValue={nuzlockeGraveyardBox || ''}
          onValueChange={(val) => setNuzlockeGraveyardBox(val === '' ? null : val)}
          items={[
            { id: '', label: '[ NONE ]' },
            ...storageLocations.map((loc) => ({
              id: loc,
              label: `[ ${loc.toUpperCase()} ]`,
            })),
          ]}
        />
      </SettingsRow>
    </div>
  );
}
