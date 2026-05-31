import { Archive, CircleDot, Settings2, Skull } from 'lucide-react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';
import { SettingsRow } from '../SettingsRow';

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
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Game Version">
          {versions.map((v) => (
            // oxlint-disable jsx-a11y/prefer-tag-over-role
            // biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling
            <button
              key={v.id}
              role="radio"
              type="button"
              onClick={() => setManualVersion(v.id === 'unknown' ? null : v.id)}
              className={`rounded-none border border-dashed px-3 py-2 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                effectiveVersion === v.id || (v.id === 'unknown' && effectiveVersion === 'unknown')
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300'
              }`}
              aria-checked={effectiveVersion === v.id || (v.id === 'unknown' && effectiveVersion === 'unknown')}
            >
              {v.label}
            </button>
          ))}
        </div>
      </SettingsRow>

      <SettingsRow
        icon={<Archive size={18} className="text-purple-500" />}
        iconColorClass="border-purple-500/20 bg-purple-500/10"
        label="Living Dex"
      >
        <div className="flex border border-zinc-800 border-dashed" role="radiogroup" aria-label="Living Dex Mode">
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
          {/* biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling */}
          <button
            role="radio"
            type="button"
            onClick={() => setIsLivingDex(false)}
            aria-checked={!isLivingDex}
            className={`flex-1 px-2 py-2 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
              !isLivingDex
                ? 'bg-zinc-800 text-white'
                : 'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400'
            }`}
          >
            [ STANDARD ]
          </button>
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
          {/* biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling */}
          <button
            role="radio"
            type="button"
            onClick={() => setIsLivingDex(true)}
            aria-checked={isLivingDex}
            className={`flex-1 border-zinc-800 border-l border-dashed px-2 py-2 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
              isLivingDex
                ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400'
            }`}
          >
            [ LIVING DEX ]
          </button>
        </div>
      </SettingsRow>

      <SettingsRow
        icon={<CircleDot size={18} className="text-amber-500" />}
        iconColorClass="border-amber-500/20 bg-amber-500/10"
        label="Ball Style"
      >
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Ball Style">
          {filteredPokeballs.map((pb) => (
            // oxlint-disable jsx-a11y/prefer-tag-over-role
            // biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling
            <button
              key={pb.value}
              role="radio"
              type="button"
              onClick={() => setGlobalPokeball(pb.value)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-none border border-dashed py-3 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                globalPokeball === pb.value
                  ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300'
              }`}
              aria-checked={globalPokeball === pb.value}
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
            </button>
          ))}
        </div>
      </SettingsRow>

      <SettingsRow
        icon={<Skull size={18} className="text-red-500" />}
        iconColorClass="border-red-500/20 bg-red-500/10"
        label="Graveyard"
      >
        <select
          aria-label="Select Nuzlocke Graveyard Box"
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
