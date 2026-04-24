import { AlertCircle, Bug } from 'lucide-react';
import type { SaveData } from '../../engine/saveParser/index';
import type { RejectedSuggestion } from '../../hooks/useAssistant';
import { PokemonSprite } from '../pokemon/PokemonSprite';

interface AssistantDebugViewProps {
  rejected: RejectedSuggestion[];
  getPokemonName: (id: number) => string;
  saveData: SaveData | null;
}

export function AssistantDebugView({ rejected, getPokemonName, saveData }: AssistantDebugViewProps) {
  if (!saveData) return null;

  return (
    <div className="fade-in slide-in-from-bottom-4 mt-12 animate-in space-y-6 duration-500">
      <div className="flex items-center gap-3 px-2">
        <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-2 text-zinc-400">
          <Bug size={16} />
        </div>
        <h3 className="font-black font-display text-white text-xl uppercase tracking-widest">Assistant Diagnostics</h3>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-6 shadow-inner">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-4 shadow-sm">
            <p className="mb-1 font-black text-[10px] text-zinc-500 uppercase tracking-widest">Current Map</p>
            <p className="font-black font-display text-lg text-white">{saveData.currentMapName}</p>
            <p className="font-mono text-[10px] text-zinc-600">
              ID: {saveData.currentMapId} (0x
              {saveData.currentMapId.toString(16).toUpperCase().padStart(2, '0')})
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-4 shadow-sm">
            <p className="mb-1 font-black text-[10px] text-zinc-500 uppercase tracking-widest">Game Version</p>
            <p className="font-black font-display text-lg text-white uppercase">{saveData.gameVersion}</p>
            <p className="font-mono text-[10px] text-zinc-600">Gen: {saveData.generation}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-4 shadow-sm">
            <p className="mb-1 font-black text-[10px] text-zinc-500 uppercase tracking-widest">Pokédex</p>
            <p className="font-black font-display text-lg text-white">{saveData.owned.size}</p>
            <p className="font-mono text-[10px] text-zinc-600">Owned</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-4 shadow-sm">
            <p className="mb-1 font-black text-[10px] text-zinc-500 uppercase tracking-widest">Trainer</p>
            <p className="truncate px-2 font-black font-display text-lg text-white">{saveData.trainerName}</p>
            <p className="font-mono text-[10px] text-zinc-600">ID: {saveData.trainerId}</p>
          </div>
        </div>
      </div>

      {rejected.length > 0 && (
        <div className="flex items-center gap-3 px-2 pt-4">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400">
            <AlertCircle size={16} />
          </div>
          <h4 className="font-black font-display text-lg text-white uppercase tracking-widest">Rejected Suggestions</h4>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rejected.map((r, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
            key={`${r.pokemonId}-${i}`}
            className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
          >
            <div className="relative h-12 w-12 flex-shrink-0 rounded-xl border border-white/5 bg-zinc-800 p-1">
              <PokemonSprite
                pokemonId={r.pokemonId}
                generation={saveData.generation ?? 1}
                alt="Sprite"
                className="h-full w-full object-contain opacity-50 grayscale"
              />
              <div className="absolute -top-1 -right-1">
                <AlertCircle size={14} className="fill-zinc-900 text-amber-500" />
              </div>
            </div>
            <div className="space-y-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono text-[10px] text-zinc-500">
                  #{r.pokemonId.toString().padStart(3, '0')}
                </span>
                <span className="truncate font-black text-xs text-zinc-300 uppercase tracking-tight">
                  {getPokemonName(r.pokemonId)}
                </span>
                <span className="rounded border border-white/5 bg-zinc-800 px-1 py-0.5 font-black text-[8px] text-zinc-500 uppercase">
                  {r.code}
                </span>
              </div>
              <p className="font-medium text-[10px] text-zinc-500 italic leading-tight">"{r.reason}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
