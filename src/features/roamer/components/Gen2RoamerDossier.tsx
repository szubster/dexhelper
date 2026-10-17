import { useQuery } from '@tanstack/react-query';
import { TacticalPanel } from '../../../components/TacticalPanel';
import type { SaveData } from '../../../engine/saveParser';
import { translateRoamerLocation } from '../../../engine/saveParser/parsers/gen2/roamer/translator';
import { pokemonListQueryOptions } from '../../../utils/pokemonQueries';

interface Gen2RoamerDossierProps {
  saveData: SaveData;
}

export function Gen2RoamerDossier({ saveData }: Gen2RoamerDossierProps) {
  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  if (saveData.generation !== 2 || !saveData.roamingLegendaries?.length) {
    return null;
  }

  return (
    <TacticalPanel className="p-4" variant="default">
      <div className="mb-4 border-zinc-600 border-b border-dashed pb-2">
        <h2 className="tactical-text font-bold text-xl text-zinc-300">Roamer Dossier</h2>
      </div>

      <div className="flex flex-col gap-4">
        {saveData.roamingLegendaries.map((roamer) => {
          const speciesName = pokemonList?.find((p) => p.id === roamer.speciesId)?.name ?? `ID: ${roamer.speciesId}`;
          const isCaughtOrFainted = !roamer.isActive;
          const translatedLocation = translateRoamerLocation(roamer.mapGroup, roamer.mapId);

          return (
            <div
              key={roamer.speciesId}
              className="flex flex-col gap-3 border-zinc-700 border-b border-dashed pb-4 last:border-b-0 last:pb-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col gap-1">
                <span className="tactical-text font-bold text-lg text-zinc-200">{speciesName}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-500">LVL {roamer.level}</span>
                  <span className="font-mono text-xs text-zinc-600">•</span>
                  <span className="font-mono text-xs text-zinc-500">HP: {roamer.hp ?? 'UNKNOWN'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 md:items-end">
                {isCaughtOrFainted ? (
                  <span className="tactical-text font-bold text-sm text-zinc-500">[ INACTIVE ]</span>
                ) : (
                  <>
                    <span className="tactical-text animate-pulse font-bold text-emerald-500 text-sm">
                      [ TRACKING ACTIVE ]
                    </span>
                    <span className="tactical-text text-xs text-zinc-400">
                      LOC: {translatedLocation} (Group {roamer.mapGroup}, ID {roamer.mapId})
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
