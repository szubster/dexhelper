import type React from 'react';
import { generateWallpaperPhrases, WALLPAPER_THEMES } from '../../engine/gen3/wallpaper/phraseGenerator';
import { isGen3Save } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { TacticalChecklistItem } from '../TacticalChecklistItem';
import { TacticalPanel } from '../TacticalPanel';

export const WallpaperDashboard: React.FC = () => {
  // Placeholder TID for now until state integration
  const saveData = useStore((state) => state.saveData);
  const unlockedWallpapers = useStore((state) => state.unlockedWallpapers);
  const toggleWallpaperUnlocked = useStore((state) => state.toggleWallpaperUnlocked);

  const trainerId = saveData && isGen3Save(saveData) ? saveData.trainerId : 12345;
  const phrases = generateWallpaperPhrases(trainerId);

  return (
    <TacticalPanel className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1 border-b border-dashed border-zinc-800 pb-2">
        <h2 className="tactical-text text-lg font-bold text-emerald-400">PC Box Wallpapers</h2>
        <p className="tactical-text text-xs text-zinc-500">
          Unlock custom wallpapers by providing the generated phrases to Walda in Rustboro City. Using placeholder TID{' '}
          {trainerId}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {WALLPAPER_THEMES.map((theme, index) => {
          const phrase = phrases[theme.name] || '';
          const isUnlocked = unlockedWallpapers[trainerId]?.[index] || false;

          return (
            <TacticalChecklistItem
              key={theme.name}
              label={theme.name}
              subtitle={
                <span className="mt-1 inline-block border border-dashed border-emerald-900/50 bg-emerald-950/30 px-1 py-0.5 font-mono text-xs tracking-widest text-emerald-300">
                  {phrase}
                </span>
              }
              acquired={isUnlocked}
              interactive={true}
              onClick={() => toggleWallpaperUnlocked(trainerId, index)}
              className="cursor-pointer"
              showCrosshairs={true}
              codeTag={theme.name.substring(0, 4).toUpperCase()}
            />
          );
        })}
      </div>
    </TacticalPanel>
  );
};
