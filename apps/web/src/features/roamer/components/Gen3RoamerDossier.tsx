import { useQuery } from '@tanstack/react-query';
import { ShieldAlert } from 'lucide-react';
import { useMemo } from 'react';
import { DataLabel } from '../../../components/DataLabel';
import { DataPoint } from '../../../components/DataPoint';
import { TacticalPanel } from '../../../components/TacticalPanel';
import type { SaveData } from '@dexhelper/engine/saveParser';
import { pokemonListQueryOptions } from '../../../utils/pokemonQueries';

interface Gen3RoamerDossierProps {
  saveData: SaveData;
}

export function Gen3RoamerDossier({ saveData }: Gen3RoamerDossierProps) {
  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  const roamer = useMemo(() => {
    if (saveData.generation !== 3 || !saveData.roamingLegendaries?.length) {
      return null;
    }
    // Gen 3 only has one roamer
    return saveData.roamingLegendaries[0];
  }, [saveData]);

  if (!roamer) {
    return null;
  }

  const speciesName = pokemonList?.find((p) => p.id === roamer.speciesId)?.name ?? `ID: ${roamer.speciesId}`;

  // Check for Gen 3 Roamer IV Glitch (common in Ruby/Sapphire/FireRed/LeafGreen)
  // Glitch sets all IVs to 0 except HP (and sometimes a small portion of Attack)
  // We'll consider it glitched if multiple non-HP IVs are exactly 0, which is extremely rare legitimately
  const isGlitchedIVs =
    roamer.ivs && roamer.ivs.def === 0 && roamer.ivs.spd === 0 && roamer.ivs.spAtk === 0 && roamer.ivs.spDef === 0;

  return (
    <TacticalPanel className="p-4" variant={roamer.isActive ? 'emerald' : 'default'}>
      <div className="mb-4 flex justify-between border-zinc-600 border-b border-dashed pb-2">
        <h2 className="font-bold font-mono text-xl text-zinc-300 uppercase tracking-widest">Roamer Dossier</h2>
        {roamer.isActive ? (
          <span className="animate-pulse font-bold font-mono text-red-500 tracking-widest">[ ACTIVE ]</span>
        ) : (
          <span className="font-bold font-mono text-zinc-500 tracking-widest">[ INACTIVE ]</span>
        )}
      </div>

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
        <div className="mt-6 flex items-start gap-3 border border-amber-500 border-dashed bg-amber-500/10 p-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <h3 className="mb-1 font-bold font-mono text-amber-500 text-sm uppercase tracking-wider">
              Warning: Severe IV Truncation Detected
            </h3>
            <p className="font-mono text-amber-400/80 text-xs">
              This roamer exhibits the signature of the Gen 3 Roamer IV Glitch. Due to a programming error in the game,
              its Defense, Speed, Sp. Atk, and Sp. Def IVs have been permanently set to 0.
            </p>
          </div>
        </div>
      )}
    </TacticalPanel>
  );
}
