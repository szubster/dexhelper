import { Archive, CircleDot, Settings2 } from 'lucide-react';
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
  const versions = [
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
        <div className="grid grid-cols-3 gap-2">
          {versions.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() =>
                setManualVersion((v.id as GameVersion | 'unknown') === 'unknown' ? null : (v.id as GameVersion))
              }
              className={`rounded-none border border-dashed px-3 py-2 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                effectiveVersion === v.id || (v.id === 'unknown' && effectiveVersion === 'unknown')
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300'
              }`}
              aria-pressed={effectiveVersion === v.id || (v.id === 'unknown' && effectiveVersion === 'unknown')}
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
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
        {/* biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling */}
        <div className="flex border border-zinc-800 border-dashed" role="group" aria-label="Living Dex Mode">
          <button
            type="button"
            onClick={() => setIsLivingDex(false)}
            aria-pressed={!isLivingDex}
            className={`flex-1 px-2 py-2 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
              !isLivingDex
                ? 'bg-zinc-800 text-white'
                : 'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400'
            }`}
          >
            [ STANDARD ]
          </button>
          <button
            type="button"
            onClick={() => setIsLivingDex(true)}
            aria-pressed={isLivingDex}
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
        <div className="grid grid-cols-3 gap-2">
          {filteredPokeballs.map((pb) => (
            <button
              key={pb.value}
              type="button"
              onClick={() => setGlobalPokeball(pb.value as PokeballType)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-none border border-dashed py-3 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                globalPokeball === pb.value
                  ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300'
              }`}
              aria-pressed={globalPokeball === pb.value}
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
    </div>
  );
}
