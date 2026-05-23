import { Archive, CircleDot, Settings2, Skull } from 'lucide-react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';
import { SettingsRow } from '../SettingsRow';
import { TacticalRadioGroup, TacticalRadioGroupItem } from '../TacticalRadioGroup';

interface SettingsControlsProps {
  effectiveVersion: string;
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
        <TacticalRadioGroup
          value={effectiveVersion}
          onChange={(val) => setManualVersion(val === 'unknown' ? null : (val as GameVersion))}
          variant="blue"
          layout="grid"
          columns={3}
          aria-label="Game Version"
        >
          {versions.map((v) => (
            <TacticalRadioGroupItem key={v.id} value={v.id} className="py-2">
              {v.label}
            </TacticalRadioGroupItem>
          ))}
        </TacticalRadioGroup>
      </SettingsRow>

      <SettingsRow
        icon={<Archive size={18} className="text-purple-500" />}
        iconColorClass="border-purple-500/20 bg-purple-500/10"
        label="Living Dex"
      >
        <TacticalRadioGroup
          value={isLivingDex ? 'true' : 'false'}
          onChange={(val) => setIsLivingDex(val === 'true')}
          variant="emerald"
          layout="flex"
          aria-label="Living Dex Mode"
        >
          <TacticalRadioGroupItem
            value="false"
            activeClassName="bg-zinc-800 text-white shadow-none border-none focus-visible:ring-emerald-500"
          >
            [ STANDARD ]
          </TacticalRadioGroupItem>
          <TacticalRadioGroupItem value="true">[ LIVING DEX ]</TacticalRadioGroupItem>
        </TacticalRadioGroup>
      </SettingsRow>

      <SettingsRow
        icon={<CircleDot size={18} className="text-amber-500" />}
        iconColorClass="border-amber-500/20 bg-amber-500/10"
        label="Ball Style"
      >
        <TacticalRadioGroup
          value={globalPokeball}
          onChange={(val) => setGlobalPokeball(val as PokeballType)}
          variant="amber"
          layout="grid"
          columns={3}
          aria-label="Ball Style"
        >
          {filteredPokeballs.map((pb) => (
            <TacticalRadioGroupItem
              key={pb.value}
              value={pb.value}
              className="flex flex-col items-center justify-center gap-1.5 py-3"
            >
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
            </TacticalRadioGroupItem>
          ))}
        </TacticalRadioGroup>
      </SettingsRow>

      <SettingsRow
        icon={<Skull size={18} className="text-red-500" />}
        iconColorClass="border-red-500/20 bg-red-500/10"
        label="Graveyard"
      >
        <select
          value={nuzlockeGraveyardBox || ''}
          onChange={(e) => setNuzlockeGraveyardBox(e.target.value === '' ? null : e.target.value)}
          className="w-full appearance-none rounded-none border border-zinc-800 border-dashed bg-zinc-950 px-3 py-2 font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <option value="">[ NONE ]</option>
          {storageLocations.map((loc) => (
            <option key={loc} value={loc}>
              [ {loc.toUpperCase()} ]
            </option>
          ))}
        </select>
      </SettingsRow>
    </div>
  );
}
