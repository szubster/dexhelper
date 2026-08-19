import React from 'react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/index';
import { cn } from '../../../utils/cn';
import { CornerCrosshairs } from '../../CornerCrosshairs';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

interface UnownDexPanelProps {
  yourPokemon: (PokemonInstance & { location: string })[];
}

const UNOWN_FORMS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function UnownDexPanel({ yourPokemon }: UnownDexPanelProps) {
  const ownedForms = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of yourPokemon) {
      if (p.speciesId === 201 && p.unownForm) {
        set.add(p.unownForm);
      }
    }
    return set;
  }, [yourPokemon]);

  return (
    <TacticalPanel variant="cyan" className="relative mt-8 flex flex-col gap-6 p-4 pt-8 sm:p-6">
      <TelemetryDecoration label="SYS.UNKNOWN_ENCRYPTION_MATRIX" className="-top-[17px] left-[-1px]" />
      <div className="flex flex-col justify-between border-cyan-500/30 border-b border-dashed pb-4 sm:flex-row sm:items-center">
        <h3 className="font-bold font-mono text-sm text-white uppercase tracking-widest">[ UNOWN DATABASE ]</h3>
        <div className="mt-2 font-mono text-xs text-zinc-500 sm:mt-0">
          <span className="font-bold text-cyan-400">{ownedForms.size}</span> / 26 FORMS ACQUIRED
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-5 gap-3 sm:grid-cols-7">
        {UNOWN_FORMS.map((form) => {
          const isOwned = ownedForms.has(form);
          return (
            <div
              key={form}
              className={cn(
                'group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-none border border-dashed p-1 font-mono transition-colors duration-300',
                isOwned
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:border-cyan-400'
                  : 'border-zinc-800 bg-black/40 text-zinc-600 hover:border-zinc-700',
              )}
            >
              <LcdGrid className="opacity-[0.05]" />
              {isOwned && <HoverScanner />}
              <CornerCrosshairs className={cn('h-1.5 w-1.5', isOwned ? 'border-cyan-500/40' : 'border-zinc-700')} />

              {/* Data Pipe */}
              <div
                className={cn(
                  'absolute top-0 bottom-0 left-0 w-1 border-r border-dashed transition-colors',
                  isOwned ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-zinc-800 bg-black',
                )}
              />

              {/* Active LED */}
              {isOwned && (
                <div className="absolute top-1 left-[-1px] flex h-1.5 w-1.5 items-center justify-center border border-cyan-500 bg-black">
                  <div className="h-0.5 w-0.5 animate-pulse bg-cyan-400" />
                </div>
              )}

              <div className="z-10 font-black text-2xl drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">{form}</div>

              <div
                className={cn(
                  'z-10 mt-1 px-1 font-black text-[7px] uppercase tracking-widest',
                  isOwned ? 'border border-cyan-500/30 bg-cyan-500/20 text-cyan-300' : 'text-zinc-600',
                )}
              >
                {isOwned ? '[ ACQUIRED ]' : '[ ENCRYPTED ]'}
              </div>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
