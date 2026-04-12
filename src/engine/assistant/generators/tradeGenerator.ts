import { STATIC_NPC_TRADE_DATA } from '../../data/gen1/assistantData';
import type { PokemonInstance } from '../../saveParser/index';
import type { SuggestionContext } from './types';

export function generateTradeSuggestions(context: SuggestionContext) {
  const { saveData, displayVersion, missingIds, ownedSet, allInstances, suggestions } = context;

  // NPC Trades
  for (const trade of STATIC_NPC_TRADE_DATA) {
    if (trade.gen !== saveData.generation) continue;
    if (trade.versions && !trade.versions.includes(displayVersion)) continue;

    let isClaimed = false;

    // Gen 1 specific bit flag check
    if (saveData.generation === 1 && trade.tradeIndex !== undefined && saveData.npcTradeFlags !== undefined) {
      isClaimed = (saveData.npcTradeFlags & (1 << trade.tradeIndex)) !== 0;
    } else {
      // Fallback for Gen 2 or if bit flags are missing
      isClaimed = allInstances.some(
        (p: PokemonInstance) => p.speciesId === trade.receivedId && p.otName === trade.receivedOtName,
      );
    }

    if (!isClaimed && missingIds.includes(trade.receivedId)) {
      const hasOffered = ownedSet.has(trade.offeredId);
      if (hasOffered) {
        suggestions.push({
          id: `npc-trade-${trade.receivedId}`,
          category: 'Trade',
          title: `Trade for #${trade.receivedId}`,
          description: `You have #${trade.offeredId}! Trade it at ${trade.location} for #${trade.receivedId}.`,
          pokemonId: trade.receivedId,
          priority: 85,
        });
      } else {
        suggestions.push({
          id: `npc-trade-${trade.receivedId}`,
          category: 'Trade',
          title: `Trade for #${trade.receivedId}`,
          description: `Catch #${trade.offeredId} and trade it at ${trade.location} for #${trade.receivedId}.`,
          pokemonId: trade.receivedId,
          priority: 65,
        });
      }
    }
  }
}
