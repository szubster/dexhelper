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
  return (
    <div className="space-y-4">
      <SettingsRow
        icon={<Settings2 size={18} className="text-blue-500" />}
        iconColorClass="border-blue-500/20 bg-blue-500/10"
        label="Version"
      >
        <select
          value={effectiveVersion}
          onChange={(e) => setManualVersion(e.target.value as GameVersion)}
          aria-label="Select Game Version"
          className="border border-zinc-800 border-dashed bg-zinc-950 px-4 py-2 font-bold font-mono text-xs text-zinc-200 transition-colors hover:border-zinc-600 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <option value="unknown">Auto</option>
          {(genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions]).map(
            (v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ),
          )}
        </select>
      </SettingsRow>

      <SettingsRow
        icon={<Archive size={18} className="text-purple-500" />}
        iconColorClass="border-purple-500/20 bg-purple-500/10"
        label="Living Dex"
      >
        <button
          type="button"
          role="switch"
          aria-checked={isLivingDex}
          aria-label="Toggle Living Dex Mode"
          title="Toggle Living Dex Mode"
          onClick={() => setIsLivingDex(!isLivingDex)}
          className={`relative inline-flex h-7 w-12 items-center border border-dashed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isLivingDex ? 'border-emerald-500/50 bg-emerald-950/50' : 'border-zinc-800 bg-zinc-900'}`}
        >
          <span
            className={`inline-block h-5 w-5 transform bg-white transition-transform ${isLivingDex ? 'translate-x-6 bg-emerald-500' : 'translate-x-1 bg-zinc-600'}`}
          />
        </button>
      </SettingsRow>

      <SettingsRow
        icon={<CircleDot size={18} className="text-amber-500" />}
        iconColorClass="border-amber-500/20 bg-amber-500/10"
        label="Ball Style"
      >
        <select
          value={globalPokeball}
          onChange={(e) => setGlobalPokeball(e.target.value as PokeballType)}
          aria-label="Select Ball Style"
          className="border border-zinc-800 border-dashed bg-zinc-950 px-4 py-2 font-bold font-mono text-xs text-zinc-200 transition-colors hover:border-zinc-600 focus-visible:border-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          {filteredPokeballs.map((pb) => (
            <option key={pb.value} value={pb.value}>
              {pb.label}
            </option>
          ))}
        </select>
      </SettingsRow>
    </div>
  );
}
