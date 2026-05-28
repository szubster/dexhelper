import { Activity, ShieldAlert } from 'lucide-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalCard } from '../TacticalCard';

export interface AliveTeamViewProps {
  team: PokemonInstance[];
  generation: number;
}

export function AliveTeamView({ team, generation }: AliveTeamViewProps) {
  const aliveTeam = team.filter((p) => p.currentHp !== 0);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2 font-bold font-mono text-emerald-500 text-sm uppercase tracking-widest">
        <Activity className="h-4 w-4" />
        SYS.ALIVE_TEAM
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {aliveTeam.map((pokemon, idx) => (
          <TacticalCard
            // biome-ignore lint/suspicious/noArrayIndexKey: Team members might not have unique identifiers
            key={`alive-${idx}-${pokemon.speciesId}`}
            variant="default"
            className="flex flex-col items-center border-emerald-900/50 bg-emerald-950/10 p-3 hover:border-emerald-500/50"
          >
            <div className="relative mb-2 h-16 w-16">
              <PokemonSprite
                pokemonId={pokemon.speciesId}
                generation={generation}
                isShiny={pokemon.isShiny}
                className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              />
            </div>
            <div className="flex w-full flex-col items-center">
              <span className="w-full truncate text-center font-bold text-[10px] text-zinc-300 uppercase tracking-wider">
                {pokemon.otName ? pokemon.otName : `ID: ${pokemon.speciesId.toString().padStart(3, '0')}`}
              </span>
              <div className="mt-1 flex w-full items-center justify-between px-1">
                <span className="font-mono text-[9px] text-zinc-500">LVL {pokemon.level}</span>
                <span className="font-bold font-mono text-[9px] text-emerald-400">{pokemon.currentHp} HP</span>
              </div>
            </div>
          </TacticalCard>
        ))}
        {aliveTeam.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-none border border-red-900/50 border-dashed bg-red-950/20 p-8 text-center">
            <ShieldAlert className="mb-3 h-8 w-8 text-red-500" />
            <span className="font-bold font-mono text-red-400 text-sm uppercase tracking-widest">
              Team Wipe Detected
            </span>
            <span className="mt-1 font-mono text-red-500/70 text-xs uppercase">No vital signs found</span>
          </div>
        )}
      </div>
    </div>
  );
}
