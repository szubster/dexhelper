import { Archive, CircleDot, Settings2 } from 'lucide-react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';
import { CornerCrosshairs } from '../CornerCrosshairs';

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
      <div className="group relative flex items-center justify-between border border-zinc-800 border-dashed bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
        <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-600 transition-colors group-hover:border-[var(--theme-primary)]" />
        <div className="flex items-center gap-3">
          <div className="border border-blue-500/20 border-dashed bg-blue-500/10 p-2">
            <Settings2 size={18} className="text-blue-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Version</span>
        </div>
        <select
          value={effectiveVersion}
          onChange={(e) => setManualVersion(e.target.value as GameVersion)}
          aria-label="Select Game Version"
          className="border border-zinc-800 border-dashed bg-zinc-950 px-4 py-2 font-bold font-mono text-xs text-zinc-200 outline-none transition-colors hover:border-zinc-600 focus:border-blue-500"
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
      </div>

      <div className="group relative flex items-center justify-between border border-zinc-800 border-dashed bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
        <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-600 transition-colors group-hover:border-[var(--theme-primary)]" />
        <div className="flex items-center gap-3">
          <div className="border border-purple-500/20 border-dashed bg-purple-500/10 p-2">
            <Archive size={18} className="text-purple-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Living Dex</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isLivingDex}
          aria-label="Toggle Living Dex Mode"
          onClick={() => setIsLivingDex(!isLivingDex)}
          className={`relative inline-flex h-7 w-12 items-center border border-dashed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isLivingDex ? 'border-emerald-500/50 bg-emerald-950/50' : 'border-zinc-800 bg-zinc-900'}`}
        >
          <span
            className={`inline-block h-5 w-5 transform bg-white transition-transform ${isLivingDex ? 'translate-x-6 bg-emerald-500' : 'translate-x-1 bg-zinc-600'}`}
          />
        </button>
      </div>

      <div className="group relative flex items-center justify-between border border-zinc-800 border-dashed bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
        <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-600 transition-colors group-hover:border-[var(--theme-primary)]" />
        <div className="flex items-center gap-3">
          <div className="border border-amber-500/20 border-dashed bg-amber-500/10 p-2">
            <CircleDot size={18} className="text-amber-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Ball Style</span>
        </div>
        <select
          value={globalPokeball}
          onChange={(e) => setGlobalPokeball(e.target.value as PokeballType)}
          aria-label="Select Ball Style"
          className="border border-zinc-800 border-dashed bg-zinc-950 px-4 py-2 font-bold font-mono text-xs text-zinc-200 outline-none transition-colors hover:border-zinc-600 focus:border-amber-500"
        >
          {filteredPokeballs.map((pb) => (
            <option key={pb.value} value={pb.value}>
              {pb.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
