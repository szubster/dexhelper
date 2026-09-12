import { Info } from 'lucide-react';
import { TacticalPanel } from '../TacticalPanel';

export function RngExplainer() {
  return (
    <TacticalPanel className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-zinc-400">
        <Info className="h-4 w-4" />
        <h3 className="font-mono text-sm uppercase tracking-wider">RNG Tool Integration</h3>
      </div>

      <div className="flex flex-col gap-2 font-mono text-xs text-zinc-500">
        <p>
          Your Trainer ID (TID) and Secret ID (SID) are cryptographic keys that determine your save file's random number
          generation seed.
        </p>
        <p>
          When using external manipulation tools (like RNG Reporter or PokéFinder), you must input both your TID and SID
          to accurately predict shiny frames and PID generation.
        </p>
        <ul className="mt-1 flex list-disc flex-col gap-1 pl-4 marker:text-zinc-600">
          <li>The TID is publicly visible on your Trainer Card.</li>
          <li>The SID is normally hidden and requires external extraction.</li>
          <li>Both values are required to target shiny encounters.</li>
        </ul>
      </div>
    </TacticalPanel>
  );
}
