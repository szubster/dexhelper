import { AlertCircle, Bug } from 'lucide-react';
import type { RejectedSuggestion } from '@dexhelper/engine/assistant/strategies/types';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { DiagnosticCard } from '../DiagnosticCard';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalBadge } from '../TacticalBadge';
import { TacticalPanel } from '../TacticalPanel';

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
        <div className="rounded-none border border-zinc-700 border-dashed bg-zinc-800 p-2 text-zinc-400">
          <Bug size={16} />
        </div>
        <h3 className="tactical-text font-black text-[14px] text-[var(--theme-primary)]">[ SYS.DIAGNOSTICS ]</h3>
      </div>

      <TacticalPanel variant="default" className="space-y-4 rounded-none border-dashed p-6 shadow-inner">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <DiagnosticCard
            label="MAP.LOC"
            value={saveData.currentMapName}
            subValue={`ID: ${saveData.currentMapId} (0x${saveData.currentMapId.toString(16).toUpperCase().padStart(2, '0')})`}
          />
          <DiagnosticCard
            label="SYS.VER"
            value={saveData.gameVersion}
            valueClassName="uppercase"
            subValue={`Gen: ${saveData.generation}`}
          />
          <DiagnosticCard label="SYS.DEX" value={saveData.owned.size} subValue="Owned" />
          <DiagnosticCard
            label="USR.ID"
            value={saveData.trainerName}
            valueClassName="truncate px-2"
            subValue={`ID: ${saveData.trainerId}`}
          />
          {saveData.generation === 3 && saveData.gen3VolcanicAsh !== undefined && (
            <DiagnosticCard label="ASH.CNT" value={saveData.gen3VolcanicAsh} subValue="Volcanic Ash" />
          )}
        </div>
      </TacticalPanel>

      {rejected.length > 0 && (
        <div className="flex items-center gap-3 px-2 pt-4">
          <div className="rounded-none border border-amber-500/30 border-dashed bg-amber-500/10 p-2 text-amber-400">
            <AlertCircle size={16} />
          </div>
          <h4 className="tactical-text font-black text-[12px] text-amber-500">[ REJECTED_LOGS ]</h4>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rejected.map((r, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
            key={`${r.pokemonId}-${i}`}
            className="flex items-start gap-4 rounded-none border border-zinc-800 border-dashed bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
          >
            <div className="relative h-12 w-12 flex-shrink-0 rounded-none border border-white/10 border-dashed bg-zinc-800 p-1">
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
                <TacticalBadge variant="zinc" className="px-1 py-0.5 font-mono">
                  {r.code}
                </TacticalBadge>
              </div>
              <p className="font-medium text-[10px] text-zinc-500 italic leading-tight">"{r.reason}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
