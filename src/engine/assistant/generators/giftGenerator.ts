import type { ChainLink } from 'pokenode-ts';
import { getGenerationConfig } from '../../../utils/generationConfig';
import { STATIC_GIFT_DATA } from '../../data/gen1/assistantData';
import { parseIdFromUrl } from '../utils';
import type { SuggestionContext } from './types';

/**
 * Helper function to find all Pokemon IDs in an evolution chain.
 */
function getChainIds(node: ChainLink): number[] {
  const id = parseIdFromUrl(node.species.url);
  return [id, ...node.evolves_to.flatMap(getChainIds)];
}

export function generateGiftSuggestions(context: SuggestionContext) {
  const { saveData, displayVersion, missingIds, ownedSet, myOtIds, apiData, suggestions } = context;
  const genConfig = getGenerationConfig(saveData.generation);

  // Gifts/Statics
  for (const [pidStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
    const pid = parseInt(pidStr, 10);
    if (gift.gen && gift.gen !== saveData.generation) continue;
    if (gift.name.includes('Yellow only') && displayVersion !== 'yellow') continue;
    if (gift.reason.includes('Crystal') && displayVersion !== 'crystal') continue;

    const giftChain = apiData.giftChains?.[pid];
    const familyIds = giftChain ? getChainIds(giftChain.chain).filter((id) => id <= genConfig.maxDex) : [pid];

    const hasAnyFamily = familyIds.some((fid) => ownedSet.has(fid));
    const hasAnyWithMyOT = familyIds.some((fid) => myOtIds.has(fid));

    let isClaimedByEvent = false;
    if (saveData.eventFlags && gift.eventFlag) {
      isClaimedByEvent =
        ((saveData.eventFlags[Math.floor(gift.eventFlag / 8)] ?? 0) & (1 << (gift.eventFlag % 8))) !== 0;
    }

    if (!isClaimedByEvent && !hasAnyWithMyOT && !hasAnyFamily && missingIds.includes(pid)) {
      suggestions.push({
        id: `gift-${pid}`,
        category: 'Gift',
        title: `Secure Gift: ${gift.name}`,
        description: `Location: ${gift.location}. ${gift.reason}`,
        pokemonId: pid,
        priority: 85,
      });
    }
  }
}
