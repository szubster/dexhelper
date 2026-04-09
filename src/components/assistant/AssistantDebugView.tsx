import { AlertCircle, Bug } from 'lucide-react';
import type { SaveData } from '../../engine/saveParser/index';
import type { RejectedSuggestion } from '../../hooks/useAssistant';

interface AssistantDebugViewProps {
  rejected: RejectedSuggestion[];
  getPokemonName: (id: number) => string;
  saveData: SaveData | null;
}

export function AssistantDebugView({ rejected, getPokemonName, saveData }: AssistantDebugViewProps) {
  if (!saveData) return null;

  return (
    <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 rounded-xl border bg-zinc-800 border-zinc-700 text-zinc-400">
          <Bug size={16} />
        </div>
        <h3 className="text-xl font-display font-black text-white uppercase tracking-widest">Assistant Diagnostics</h3>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-[2rem] space-y-4 shadow-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-zinc-800/50 p-4 rounded-2xl border border-white/5 shadow-sm">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Current Map</p>
            <p className="text-lg font-display font-black text-white">{saveData.currentMapName}</p>
            <p className="text-[10px] font-mono text-zinc-600">
              ID: {saveData.currentMapId} (0x
              {saveData.currentMapId.toString(16).toUpperCase().padStart(2, '0')})
            </p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-2xl border border-white/5 shadow-sm">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Game Version</p>
            <p className="text-lg font-display font-black text-white uppercase">{saveData.gameVersion}</p>
            <p className="text-[10px] font-mono text-zinc-600">Gen: {saveData.generation}</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-2xl border border-white/5 shadow-sm">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Pokédex</p>
            <p className="text-lg font-display font-black text-white">{saveData.owned.size}</p>
            <p className="text-[10px] font-mono text-zinc-600">Owned</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-2xl border border-white/5 shadow-sm">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Trainer</p>
            <p className="text-lg font-display font-black text-white truncate px-2">{saveData.trainerName}</p>
            <p className="text-[10px] font-mono text-zinc-600">ID: {saveData.trainerId}</p>
          </div>
        </div>
      </div>

      {rejected.length > 0 && (
        <div className="flex items-center gap-3 px-2 pt-4">
          <div className="p-2 rounded-xl border bg-amber-500/10 border-amber-500/30 text-amber-400">
            <AlertCircle size={16} />
          </div>
          <h4 className="text-lg font-display font-black text-white uppercase tracking-widest">Rejected Suggestions</h4>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {rejected.map((r, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
            key={`${r.pokemonId}-${i}`}
            className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex items-start gap-4 hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 bg-zinc-800 rounded-xl p-1 flex-shrink-0 border border-white/5 relative">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${r.pokemonId}.png`}
                alt="Sprite"
                className="w-full h-full object-contain pixelated grayscale opacity-50"
              />
              <div className="absolute -top-1 -right-1">
                <AlertCircle size={14} className="text-amber-500 fill-zinc-900" />
              </div>
            </div>
            <div className="space-y-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-zinc-500">
                  #{r.pokemonId.toString().padStart(3, '0')}
                </span>
                <span className="text-xs font-black text-zinc-300 uppercase tracking-tight truncate">
                  {getPokemonName(r.pokemonId)}
                </span>
                <span className="text-[8px] font-black bg-zinc-800 text-zinc-500 px-1 py-0.5 rounded border border-white/5 uppercase">
                  {r.code}
                </span>
              </div>
              <p className="text-[10px] font-medium text-zinc-500 leading-tight italic">"{r.reason}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
