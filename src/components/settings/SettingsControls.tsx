import { Archive, CircleDot, Settings2 } from 'lucide-react';
import React from 'react';
import type { GameVersion, PokeballType } from '../../store';
import type { GenerationConfig } from '../../utils/generationConfig';
import { getGenerationConfig } from '../../utils/generationConfig';

export interface SettingsControlsProps {
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
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Settings2 size={18} className="text-blue-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Version</span>
        </div>
        <select
          value={effectiveVersion}
          onChange={(e) => setManualVersion(e.target.value as GameVersion)}
          aria-label="Select Game Version"
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 font-bold text-xs text-zinc-200 outline-none transition-colors focus:border-blue-500"
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

      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-500/10 p-2">
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
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isLivingDex ? 'bg-emerald-600' : 'bg-zinc-800'}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isLivingDex ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/10 p-2">
            <CircleDot size={18} className="text-amber-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Ball Style</span>
        </div>
        <select
          value={globalPokeball}
          onChange={(e) => setGlobalPokeball(e.target.value as PokeballType)}
          aria-label="Select Ball Style"
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 font-bold text-xs text-zinc-200 outline-none transition-colors focus:border-amber-500"
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
