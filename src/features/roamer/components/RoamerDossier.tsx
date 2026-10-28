import { useQuery } from '@tanstack/react-query';
import { ShieldAlert } from 'lucide-react';
import { DataLabel } from '../../../components/DataLabel';
import { DataPoint } from '../../../components/DataPoint';
import { TacticalPanel } from '../../../components/TacticalPanel';
import type { SaveData } from '../../../engine/saveParser';
import { translateRoamerLocation } from '../../../engine/saveParser/parsers/gen2/roamer/translator';
import { pokemonListQueryOptions } from '../../../utils/pokemonQueries';

interface RoamerDossierProps {
  saveData: SaveData;
}

export function RoamerDossier({ saveData }: RoamerDossierProps) {
  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  if (!saveData.roamingLegendaries?.length) {
    return null;
  }

  const isGen2 = saveData.generation === 2;
  const isGen3 = saveData.generation === 3;

  if (!isGen2 && !isGen3) {
    return null;
  }

  const anyActive = saveData.roamingLegendaries.some((r) => r.isActive);

  return (
    <TacticalPanel className="p-4" variant={anyActive ? 'emerald' : 'default'}>
      <div className="mb-4 flex items-center justify-between border-zinc-600 border-b border-dashed pb-2">
        <h2 className="tactical-text font-bold text-xl text-zinc-300">Roamer Dossier</h2>
        {isGen3 &&
          (anyActive ? (
            <span className="tactical-text animate-pulse font-bold text-red-500">[ ACTIVE ]</span>
          ) : (
            <span className="tactical-text font-bold text-zinc-500">[ INACTIVE ]</span>
          ))}
      </div>

      <div className="flex flex-col gap-4">
        {saveData.roamingLegendaries.map((roamer) => {
          const speciesName = pokemonList?.find((p) => p.id === roamer.speciesId)?.name ?? `ID: ${roamer.speciesId}`;
          const isCaughtOrFainted = !roamer.isActive;

          // Check for Gen 3 Roamer IV Glitch (common in R/S/FR/LG)
          const isGlitchedIVs =
            isGen3 &&
            roamer.ivs &&
            roamer.ivs.def === 0 &&
            roamer.ivs.spd === 0 &&
            roamer.ivs.spAtk === 0 &&
            roamer.ivs.spDef === 0;

          if (isGen2) {
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
          }

          return (
            <div key={roamer.speciesId} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <DataLabel>Identification</DataLabel>
                  <div className="flex flex-col gap-1 border-zinc-700 border-l border-dashed pl-3">
                    <DataPoint label="SPECIES" value={speciesName} />
                    <DataPoint label="LEVEL" value={roamer.level} />
                    <DataPoint
                      label="STATUS"
                      value={roamer.statusCondition === 0 ? 'NONE' : `CODE: ${roamer.statusCondition}`}
                    />
                    <DataPoint label="HP" value={roamer.hp ?? 'UNKNOWN'} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <DataLabel>Internal State</DataLabel>
                  <div className="flex flex-col gap-1 border-zinc-700 border-l border-dashed pl-3">
                    <DataPoint
                      label="PERSONALITY"
                      value={
                        roamer.personalityValue != null
                          ? `0x${roamer.personalityValue.toString(16).toUpperCase().padStart(8, '0')}`
                          : 'UNKNOWN'
                      }
                    />
                  </div>
                </div>

                {roamer.ivs && (
                  <div className="flex flex-col gap-2">
                    <DataLabel>Individual Values</DataLabel>
                    <div className="grid grid-cols-2 gap-1 border-zinc-700 border-l border-dashed pl-3">
                      <DataPoint label="HP" value={roamer.ivs.hp} />
                      <DataPoint label="ATK" value={roamer.ivs.atk} />
                      <DataPoint label="DEF" value={roamer.ivs.def} />
                      <DataPoint label="SPA" value={roamer.ivs.spAtk} />
                      <DataPoint label="SPD" value={roamer.ivs.spDef} />
                      <DataPoint label="SPE" value={roamer.ivs.spd} />
                    </div>
                  </div>
                )}
              </div>

              {isGlitchedIVs && (
                <div className="mt-2 flex items-start gap-3 border border-amber-500 border-dashed bg-amber-500/10 p-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="tactical-text mb-1 font-bold text-amber-500 text-sm">
                      Warning: Severe IV Truncation Detected
                    </h3>
                    <p className="font-mono text-amber-400/80 text-xs">
                      This roamer exhibits the signature of the Gen 3 Roamer IV Glitch. Due to a programming error in
                      the game, its Defense, Speed, Sp. Atk, and Sp. Def IVs have been permanently set to 0.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
