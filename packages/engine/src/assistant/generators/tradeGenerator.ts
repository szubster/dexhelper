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
import { getUnobtainableReason } from '../../exclusives/gen1Exclusives';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getGen3UnobtainableReason } from '../../exclusives/gen3Exclusives';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';
import { checkFlag } from '@/utils/flags';

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
    let reason: string | null = null;
    if (saveData.generation === 3) {
      reason = getGen3UnobtainableReason(pid, displayVersion, ownedSet.size, ownedSet);
    } else if (saveData.generation === 2) {
      reason = getGen2UnobtainableReason(pid, displayVersion, ownedSet.size, ownedSet);
    } else {
      reason = getUnobtainableReason(pid, displayVersion, ownedSet.size, ownedSet);
    }
    if (reason) {
      pidsWithExclusives.add(pid);

      const isNpcTrade = validNpcTradeIds.has(pid);
      if (isNpcTrade) continue;

      // If they physically own a pre-evolution, they don't strictly need to trade, they can evolve it!
      const p = apiData.pokemonMetadata?.[pid];
      let hasPhysicalPreEvo = false;
      if (p?.efrm && p.efrm.length > 0) {
        // Iterate backwards through all ancestors (recursive ownership check)
        // The current logic only checked immediate parents, so if a player had Charmander,
        // Charizard might incorrectly be flagged as Unobtainable/Trade.
        for (let i = p.efrm.length - 1; i >= 0; i--) {
          const preId = p.efrm[i];
          if (preId !== undefined && instancesBySpecies.has(preId)) {
            hasPhysicalPreEvo = true;
            break;
          }
        }
      }
      if (hasPhysicalPreEvo) continue;

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
  // Priority boosts if the player already physically possesses the required "offered" Pokemon (65 -> 85).
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
    suggestions.push({
      id: `npc-trade-${trade.receivedId}`,
      category: 'Trade',
      title: `Trade for #${trade.receivedId}`,
      description: hasOffered
        ? `You have #${trade.offeredId}! Trade it at ${trade.location} for ${trade.nickname ? `${trade.nickname} the ` : ''}#${trade.receivedId}.`
        : `Catch #${trade.offeredId} and trade it at ${trade.location} for ${trade.nickname ? `${trade.nickname} the ` : ''}#${trade.receivedId}.`,
      pokemonId: trade.receivedId,
      priority: hasOffered ? 85 : 65,
    });
  }

  // D. Static Gifts
  // Suggests available static encounters and gifts that haven't been claimed yet.
  for (let i = 0; i < staticGiftEntries.length; i++) {
    const entry = staticGiftEntries[i];
    if (!entry) continue;
    const { giftId, gift } = entry;
    if (gift.gen && gift.gen !== saveData.generation) continue;
    if (!missingIds.has(giftId)) continue;

    const requiredBadges = gift.requiredBadges || 0;
    if (saveData.badges < requiredBadges) continue;

    const hasClaimed = checkFlag(saveData.eventFlags, gift.eventFlag);
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
