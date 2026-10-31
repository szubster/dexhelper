export interface FameCheckerEntry {
  id: number;
  unlocked: boolean;
  flavorText: string;
}

export interface FameCheckerEntryListProps {
  npcName: string;
  entries: FameCheckerEntry[];
}

export function FameCheckerEntryList({ npcName, entries }: FameCheckerEntryListProps) {
  return (
    <div className="tactical-panel flex flex-col gap-4 p-4">
      <h2 className="tactical-text border-b border-dashed border-zinc-700 pb-2 text-xl">{npcName} Profile</h2>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`border border-dashed p-3 ${
              entry.unlocked
                ? 'border-green-500/50 bg-green-950/20 text-green-100'
                : 'border-zinc-800 bg-zinc-900/30 text-zinc-500'
            }`}
          >
            <div className="font-mono text-sm">{entry.unlocked ? entry.flavorText : '??? [DATA CORRUPTED]'}</div>
            {!entry.unlocked && (
              <div className="mt-2 font-mono text-[10px] text-zinc-600 uppercase">Unlock condition not met</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
