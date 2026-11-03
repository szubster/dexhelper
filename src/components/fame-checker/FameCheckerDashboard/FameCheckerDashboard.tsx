import { useState } from 'react';
import { useEmulatorStore } from '../../../emulator/state/emulatorStore';
import { type FameCheckerEntry, FameCheckerEntryList } from '../FameCheckerEntryList';
import { MOCK_NPCS, NPCList } from '../NPCList';

export function FameCheckerDashboard() {
  const saveData = useEmulatorStore((state) => state.saveData);
  const [selectedNpcId, setSelectedNpcId] = useState<number | null>(null);

  const fameCheckerData = saveData && 'gen3FameChecker' in saveData ? saveData.gen3FameChecker : undefined;

  if (!fameCheckerData) {
    return (
      <div className="tactical-panel flex items-center justify-center p-8 text-center font-mono text-sm text-red-500">
        NO FAME CHECKER DATA FOUND
      </div>
    );
  }

  const selectedNpc = selectedNpcId !== null ? MOCK_NPCS.find((npc) => npc.id === selectedNpcId) : null;
  const selectedNpcData = selectedNpcId !== null ? fameCheckerData[selectedNpcId] : null;

  // Derive entries if an NPC is selected
  const entries: FameCheckerEntry[] = selectedNpcData
    ? selectedNpcData.flavorTextFlags.map((unlocked: boolean, index: number) => ({
        id: index,
        unlocked,
        flavorText: `Profile data fragment ${index + 1}`, // Placeholder for actual flavor text data not present in parser
      }))
    : [];

  return (
    <div className="flex h-full gap-4">
      <div className="w-1/3 min-w-[250px] border-r border-dashed border-zinc-700 pr-4">
        <NPCList selectedNpcId={selectedNpcId} onSelect={setSelectedNpcId} />
      </div>
      <div className="flex-1">
        {selectedNpc ? (
          <FameCheckerEntryList npcName={selectedNpc.name} entries={entries} />
        ) : (
          <div className="tactical-panel flex h-full items-center justify-center border-2 border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center font-mono text-sm text-zinc-500">
            AWAITING TARGET SELECTION
            <br />
            [Select an NPC from the list]
          </div>
        )}
      </div>
    </div>
  );
}
