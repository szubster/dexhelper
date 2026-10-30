import { Archive, CircleDot, Settings2 } from 'lucide-react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';
import { PokeballIcon } from '../PokeballIcon';
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
          variant="blue"
          buttonBaseClassName="!border-dashed !border focus-visible:ring-blue-500 px-3 py-2 text-[9px]"
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
              ariaLabel: '[ STANDARD ]',
              label: (
                <span>
                  <span aria-hidden="true">[ </span>STANDARD<span aria-hidden="true"> ]</span>
                </span>
              ),
            },
            {
              id: 'living',
              ariaLabel: '[ LIVING DEX ]',
              label: (
                <span>
                  <span aria-hidden="true">[ </span>LIVING DEX<span aria-hidden="true"> ]</span>
                </span>
              ),
              variant: 'emerald',
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
          variant="amber"
          buttonBaseClassName="flex flex-col items-center justify-center gap-1.5 py-3 text-[9px] !border-dashed !border focus-visible:ring-amber-500"
          selectedValue={globalPokeball}
          onValueChange={(val) => setGlobalPokeball(val)}
          items={filteredPokeballs.map((pb) => ({
            id: pb.value,
            ariaLabel: `${pb.label}`,
            label: (
              <>
                <PokeballIcon type={pb.value} size="sm" />
                {pb.label}
              </>
            ),
          }))}
        />
      </SettingsRow>
    </div>
  );
}
