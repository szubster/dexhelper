import type { SaveData } from '../engine/saveParser';
import { getGenerationConfig } from '../utils/generationConfig';

interface RetroBackgroundProps {
  saveData: SaveData | null;
}

export function RetroBackground({ saveData }: RetroBackgroundProps) {
  return (
    <>
      {/* Retro Background Pattern */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-[0.03]">
        <div className="scanline-overlay absolute inset-0" />
        <div className="flex rotate-[30deg] scale-150 flex-wrap gap-40 p-20">
          {Array.from({ length: getGenerationConfig(saveData?.generation ?? 1).maxDex }).map((_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable representing pokedex number
              key={`dex-bg-${i + 1}`}
              className="font-retro text-4xl text-white"
            >
              #{(i + 1).toString().padStart(3, '0')}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
