import { useMemo } from 'react';
import { STATIC_NPC_TRADE_DATA as STATIC_NPC_TRADE_DATA_GEN1 } from '../engine/data/gen1/assistantData';
import { STATIC_NPC_TRADE_DATA as STATIC_NPC_TRADE_DATA_GEN2 } from '../engine/data/gen2/assistantData';
import { STATIC_NPC_TRADE_DATA as STATIC_NPC_TRADE_DATA_GEN3 } from '../engine/data/gen3/assistantData';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';

export type InGameTradeStatus = 'Claimed' | 'Available' | 'Incomplete';

export function useInGameTrades() {
  const saveData = useStore((s) => s.saveData);
  const manualVersion = useStore((s) => s.manualVersion);

  return useMemo(() => {
    if (!saveData) return [];

    const effectiveVersion = manualVersion || saveData.gameVersion;
    const displayVersion =
      effectiveVersion === 'unknown' ? getGenerationConfig(saveData.generation).defaultVersion : effectiveVersion;

    let tradeData = STATIC_NPC_TRADE_DATA_GEN1;
    if (saveData.generation === 2) {
      tradeData = STATIC_NPC_TRADE_DATA_GEN2;
    } else if (saveData.generation === 3) {
      tradeData = STATIC_NPC_TRADE_DATA_GEN3;
    }

    const ownedSet = new Set(saveData.owned || []);

    // Calculate if we have the offered pokemon
    // To properly calculate "Available", we need to know if we physically have it
    // The instructions say:
    // "Claimed" (received Pokemon is owned), "Available" (offered Pokemon is owned, but not claimed), and "Incomplete" (offered Pokemon is not owned) statuses.
    // Let's use the ownedSet (pokedex) for simplicity, or we should check the actual PC/party?
    // The requirement is: "Claimed" (received Pokemon is owned), "Available" (offered Pokemon is owned, but not claimed), and "Incomplete" (offered Pokemon is not owned).
    // Using `ownedSet.has(...)` should be sufficient as "owned".

    return tradeData
      .filter((t) => !t.versions || t.versions.includes(displayVersion))
      .map((trade) => {
        let isClaimed = false;
        if (saveData.generation === 3 && trade.gen3TradeKey && saveData.gen3NPCTrades) {
          isClaimed = saveData.gen3NPCTrades[trade.gen3TradeKey] ?? false;
        } else if (trade.tradeIndex !== undefined && saveData.npcTradeFlags !== undefined) {
          isClaimed = saveData.npcTradeFlags[trade.tradeIndex] ?? false;
        }

        // Even if we have a flag, if we somehow "own" the received pokemon we could consider it claimed
        // But let's use the flag primarily, and fallback to owned status of the received pokemon if flag says otherwise?
        // Let's just follow: "Claimed" (received Pokemon is owned)
        if (ownedSet.has(trade.receivedId) || isClaimed) {
          isClaimed = true;
        }

        let status: InGameTradeStatus = 'Incomplete';
        if (isClaimed) {
          status = 'Claimed';
        } else if (ownedSet.has(trade.offeredId)) {
          status = 'Available';
        }

        return {
          ...trade,
          status,
        };
      });
  }, [saveData, manualVersion]);
}
