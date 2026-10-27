import type React from 'react';
import { generateWallpaperPhrases } from '../../engine/gen3/wallpaper/phraseGenerator';
import { TacticalChecklistItem } from '../TacticalChecklistItem';
import { TacticalPanel } from '../TacticalPanel';

export const WallpaperDashboard: React.FC = () => {
  // Placeholder TID for now until state integration
  const PLACEHOLDER_TID = 12345;
  const phrases = generateWallpaperPhrases(PLACEHOLDER_TID);

  return (
    <TacticalPanel className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1 border-zinc-800 border-b border-dashed pb-2">
        <h2 className="tactical-text font-bold text-emerald-400 text-lg">PC Box Wallpapers</h2>
        <p className="tactical-text text-xs text-zinc-500">
          Unlock custom wallpapers by providing the generated phrases to Walda in Rustboro City. Using placeholder TID{' '}
          {PLACEHOLDER_TID}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(phrases).map(([themeName, phrase]) => (
          <TacticalChecklistItem
            key={themeName}
            label={themeName}
            subtitle={
              <span className="mt-1 inline-block border border-emerald-900/50 border-dashed bg-emerald-950/30 px-1 py-0.5 font-mono text-emerald-300 text-xs tracking-widest">
                {phrase}
              </span>
            }
            acquired={false}
            interactive={true}
            showCrosshairs={true}
            codeTag={themeName.substring(0, 4).toUpperCase()}
          />
        ))}
      </div>
    </TacticalPanel>
  );
};
