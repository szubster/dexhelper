import {
  STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN1,
  STATIC_NPC_TRADE_DATA as STATIC_NPC_TRADE_DATA_GEN1,
} from '../../data/gen1/assistantData';
import {
  STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN2,
  STATIC_NPC_TRADE_DATA as STATIC_NPC_TRADE_DATA_GEN2,
} from '../../data/gen2/assistantData';
import {
  STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN3,
  STATIC_NPC_TRADE_DATA as STATIC_NPC_TRADE_DATA_GEN3,
} from '../../data/gen3/assistantData';
import { getUnobtainableReason } from '../../exclusives/index';
import type { Gen3StaticEncounters } from '../../gen3/staticEncounters';
import type { PokemonInstance, SaveData } from '../../saveParser/index';

function isGen3StaticEncounterClaimed(encounters: Gen3StaticEncounters, key: string): boolean {
  if (key in encounters) {
    const val = encounters[key as keyof typeof encounters];
    return typeof val === 'boolean' ? val : false;
  }
  return false;
}

import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';
import { checkFlag } from '../utils/flags';

const STATIC_GIFT_ENTRIES_GEN1 = Object.entries(STATIC_GIFT_DATA_GEN1).map(([idStr, gift]) => ({
  giftId: parseInt(idStr, 10),
  gift,
}));

const STATIC_GIFT_ENTRIES_GEN2 = Object.entries(STATIC_GIFT_DATA_GEN2).map(([idStr, gift]) => ({
  giftId: parseInt(idStr, 10),
  gift,
}));

const STATIC_GIFT_ENTRIES_GEN3 = Object.entries(STATIC_GIFT_DATA_GEN3).map(([idStr, gift]) => ({
  giftId: parseInt(idStr, 10),
  gift,
}));

/**
 * Evaluates version exclusives, in-game NPC trades, and static gift encounters.
 *
 * **Architecture Note: In-Place Mutation**
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, containing badges and event flags.
 * @param displayVersion - The current game version string.
 * @param ownedSet - A Set of Pokémon IDs the player already owns, used to verify requirements in O(1) time.
 * @param apiData - Pre-fetched metadata for Pokémon definitions.
 * @param instancesBySpecies - A Map of the player's physical Pokémon, used to check for required trade offerings or pre-evolutions in O(1) time.
 * @param suggestions - The shared array where new suggestions are pushed in-place.
 * @param missingIds - A Set of Pokémon IDs the player needs to obtain, used to prune unneeded NPC trades or gifts.
 */
export function generateGiftAndTradeSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  displayVersion: string,
  ownedSet: Set<number>,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
  missingIds: Set<number>,
) {
  let staticNpcTradeData = STATIC_NPC_TRADE_DATA_GEN1;
  let staticGiftEntries = STATIC_GIFT_ENTRIES_GEN1;
  if (saveData.generation === 2) {
    staticNpcTradeData = STATIC_NPC_TRADE_DATA_GEN2;
    staticGiftEntries = STATIC_GIFT_ENTRIES_GEN2;
  } else if (saveData.generation === 3) {
    staticNpcTradeData = STATIC_NPC_TRADE_DATA_GEN3;
    staticGiftEntries = STATIC_GIFT_ENTRIES_GEN3;
  }

  // B. Unobtainable / Exclusive logic
  // Checks if the target is completely locked out of the current version (e.g. Red exclusives on Blue).
  // These are assigned the lowest base priority (10) since they require external action (link cable trades).
  // ⚡ Bolt: Convert O(N^2) array lookup to O(1) Set has for NPC trades
  const validNpcTradeIds = new Set<number>();
  for (let i = 0; i < staticNpcTradeData.length; i++) {
    const t = staticNpcTradeData[i];
    if (t && t.gen === saveData.generation && (!t.versions || t.versions.includes(displayVersion))) {
      let isClaimed = false;
      if (saveData.generation === 3 && t.gen3TradeKey && saveData.gen3NPCTrades) {
        isClaimed = saveData.gen3NPCTrades[t.gen3TradeKey] ?? false;
      } else if (t.tradeIndex !== undefined && saveData.npcTradeFlags !== undefined) {
        isClaimed = saveData.npcTradeFlags[t.tradeIndex] ?? false;
      }
      if (!isClaimed) {
        validNpcTradeIds.add(t.receivedId);
      }
    }
  }

  const pidsWithExclusives = new Set<number>();
  for (const pid of queryTargets) {
    const reason = getUnobtainableReason(pid, displayVersion, ownedSet, saveData.generation);
    if (reason) {
      pidsWithExclusives.add(pid);

      const isNpcTrade = validNpcTradeIds.has(pid);
      if (isNpcTrade) continue;

      // If they physically own a pre-evolution, they don't strictly need to trade, they can evolve it!
      const p = apiData.pokemonMetadata?.[pid];
      let hasPhysicalPreEvo = false;
      if (p?.efrm && p.efrm.length > 0) {
        for (let i = p.efrm.length - 1; i >= 0; i--) {
          const preId = p.efrm[i];
          if (preId !== undefined && instancesBySpecies.has(preId)) {
            hasPhysicalPreEvo = true;
            break;
          }
        }
      }
      if (hasPhysicalPreEvo) continue;

      let hasPhysicalPostEvoToBreed = false;
      if (saveData.generation >= 2 && p?.eto && p.eto.length > 0) {
        const stack = [...p.eto];
        while (stack.length > 0) {
          const evo = stack.pop();
          if (evo && instancesBySpecies.has(evo.id)) {
            hasPhysicalPostEvoToBreed = true;
            break;
          }
          if (evo?.eto && evo.eto.length > 0) {
            stack.push(...evo.eto);
          }
        }
      }
      if (hasPhysicalPostEvoToBreed) continue;

      suggestions.push({
        id: `exclusive-${pid}`,
        category: 'Trade',
        title: `Version Exclusive: #${pid}`,
        description: reason,
        pokemonId: pid,
        priority: 10,
      });
    }
  }

  // C. In-Game NPC Trades
  for (const trade of staticNpcTradeData) {
    if (trade.gen !== saveData.generation) continue;
    if (trade.versions && !trade.versions.includes(displayVersion)) continue;
    if (!missingIds.has(trade.receivedId)) continue;

    if (saveData.generation === 3 && trade.gen3TradeKey && saveData.gen3NPCTrades) {
      const isClaimed = saveData.gen3NPCTrades[trade.gen3TradeKey];
      if (isClaimed) continue;
    } else if (trade.tradeIndex !== undefined && saveData.npcTradeFlags !== undefined) {
      const isClaimed = saveData.npcTradeFlags[trade.tradeIndex];
      if (isClaimed) continue;
    }

    const hasOffered = instancesBySpecies.has(trade.offeredId);
    let preEvoId: number | null = null;
    let postEvoId: number | null = null;

    if (!hasOffered) {
      const offeredMeta = apiData.pokemonMetadata?.[trade.offeredId];
      if (offeredMeta?.efrm && offeredMeta.efrm.length > 0) {
        for (let i = offeredMeta.efrm.length - 1; i >= 0; i--) {
          const preId = offeredMeta.efrm[i];
          if (preId !== undefined && instancesBySpecies.has(preId)) {
            preEvoId = preId;
            break;
          }
        }
      }

      if (!preEvoId && saveData.generation >= 2 && offeredMeta?.eto && offeredMeta.eto.length > 0) {
        const stack = [...offeredMeta.eto];
        while (stack.length > 0) {
          const evo = stack.pop();
          if (evo && instancesBySpecies.has(evo.id)) {
            postEvoId = evo.id;
            break;
          }
          if (evo?.eto && evo.eto.length > 0) {
            stack.push(...evo.eto);
          }
        }
      }
    }

    let description = `Catch #${trade.offeredId} and trade it at ${trade.location} for ${trade.nickname ? `${trade.nickname} the ` : ''}#${trade.receivedId}.`;
    let priority = 65;

    if (hasOffered) {
      const inst = instancesBySpecies.get(trade.offeredId)?.[0];
      const locLabel = inst?.storageLocation ? ` (in ${inst.storageLocation})` : '';
      description = `You have #${trade.offeredId}${locLabel}! Trade it at ${trade.location} for ${trade.nickname ? `${trade.nickname} the ` : ''}#${trade.receivedId}.`;
      priority = 85;
    } else if (preEvoId) {
      const inst = instancesBySpecies.get(preEvoId)?.[0];
      const locLabel = inst?.storageLocation ? ` (in ${inst.storageLocation})` : '';
      description = `You have #${preEvoId}${locLabel}! Evolve it to #${trade.offeredId} and trade it at ${trade.location} for ${trade.nickname ? `${trade.nickname} the ` : ''}#${trade.receivedId}.`;
      priority = 75;
    } else if (postEvoId) {
      const inst = instancesBySpecies.get(postEvoId)?.[0];
      const locLabel = inst?.storageLocation ? ` (in ${inst.storageLocation})` : '';
      description = `Breed your #${postEvoId}${locLabel} to get #${trade.offeredId} and trade it at ${trade.location} for ${trade.nickname ? `${trade.nickname} the ` : ''}#${trade.receivedId}.`;
      priority = 70;
    }

    suggestions.push({
      id: `npc-trade-${trade.receivedId}`,
      category: 'Trade',
      title: `Trade for #${trade.receivedId}`,
      description,
      pokemonId: trade.receivedId,
      priority,
    });
  }

  // D. Static Gifts
  for (let i = 0; i < staticGiftEntries.length; i++) {
    const entry = staticGiftEntries[i];
    if (!entry) continue;
    const { giftId, gift } = entry;
    if (gift.gen && gift.gen !== saveData.generation) continue;
    if (gift.versions && !gift.versions.includes(displayVersion)) continue;
    if (!missingIds.has(giftId)) continue;

    const requiredBadges = gift.requiredBadges || 0;
    if (saveData.badges < requiredBadges) continue;

    let hasClaimed = false;
    if (saveData.generation === 3) {
      if (gift.gen3StaticKey && saveData.gen3StaticEncounters) {
        hasClaimed = isGen3StaticEncounterClaimed(saveData.gen3StaticEncounters, gift.gen3StaticKey);
      }
    } else {
      hasClaimed = checkFlag(saveData.eventFlags, gift.eventFlag);
    }

    if (hasClaimed) continue;

    suggestions.push({
      id: `gift-${giftId}`,
      category: 'Gift',
      title: `Claim Gift: #${giftId}`,
      description: `Get ${gift.name} at ${gift.location} (${gift.reason}).`,
      pokemonId: giftId,
      priority: 85,
    });
  }
}
