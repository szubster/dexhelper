import { EVO_TRIGGER } from '../../../db/schema';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from './types';

export const EVO_ITEM_NAMES: Record<number, string> = {
  80: 'Sun Stone',
  81: 'Moon Stone',
  82: 'Fire Stone',
  83: 'Thunder Stone',
  84: 'Water Stone',
  85: 'Leaf Stone',
  198: "King's Rock",
  210: 'Metal Coat',
  212: 'Dragon Scale',
  229: 'Up-Grade',
};

export const POKEAPI_TO_GEN1_ITEM: Record<number, number> = {
  81: 0x0a, // Moon Stone
  82: 0x20, // Fire Stone
  83: 0x21, // Thunder Stone
  84: 0x22, // Water Stone
  85: 0x2f, // Leaf Stone
};

export const POKEAPI_TO_GEN2_ITEM: Record<number, number> = {
  80: 0x11, // Sun Stone
  81: 0x08, // Moon Stone
  82: 0x16, // Fire Stone
  83: 0x17, // Thunder Stone
  84: 0x18, // Water Stone
  85: 0x22, // Leaf Stone
  198: 0x5a, // King's Rock
  210: 0x8f, // Metal Coat
  212: 0x82, // Dragon Scale
  229: 0xac, // Up-Grade
};

/**
 * Maps a modern PokeAPI evolution item ID to its corresponding internal item ID
 * for a specific game generation. This is necessary because Gen 1 and Gen 2 use
 * distinct hex values for items (e.g., Moon Stone is 0x0A in Gen 1, but 0x08 in Gen 2).
 *
 * @param pokeApiId - The item ID returned from the modern PokeAPI data source.
 * @param generation - The target game generation (1 or 2).
 * @returns The internal game item ID for the given generation, or the original ID as a fallback.
 */
export function getGameItemId(pokeApiId: number, generation: number): number {
  if (generation === 1) return POKEAPI_TO_GEN1_ITEM[pokeApiId] || pokeApiId;
  if (generation === 2) return POKEAPI_TO_GEN2_ITEM[pokeApiId] || pokeApiId;
  return pokeApiId;
}

/**
 * Evaluates the player's current party and PC boxes for evolution candidates.
 *
 * This function handles:
 * 1. **Level Evolutions:** Checks if a pre-evolution is close to or past its required level.
 * 2. **Item Evolutions:** Checks if the player has the required evolution stone (e.g. Fire Stone) in their bag.
 * 3. **Trade Evolutions:** Identifies Pokémon that need to be traded to evolve, including those requiring held items (Gen 2).
 * 4. **Happiness Evolutions:** Checks friendship values against the Gen 2 threshold (220).
 *
 * It intelligently handles intermediate evolutions (e.g., suggesting to evolve a Bulbasaur into an Ivysaur if Venusaur is missing).
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, containing inventory and Pokémon stats.
 * @param apiData - Pre-fetched metadata including Pokémon evolution chains.
 * @param instancesBySpecies - A Map grouping all possessed Pokémon instances by their species ID.
 * @param suggestions - The shared array where new evolution suggestions are pushed.
 * @param displayVersion - The current game version string.
 * @param missingIds - A Set of Pokémon IDs the player needs to obtain.
 */
export function generateEvolutionSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
  displayVersion: string,
  missingIds: Set<number>,
) {
  // E. Evolutions
  // Evaluates the player's current boxes and party to find pre-evolutions.
  // Priority boosts significantly if the evolution criteria are actively met (e.g. required level reached, evolution stone in inventory).

  queryTargets.forEach((targetId: number) => {
    const p = apiData.pokemonMetadata?.[targetId];
    if (!p) return;

    let closestOwnedParentId: number | undefined;
    let immediateEvoTargetId: number = targetId;

    for (let i = 0; i < p.efrm.length; i++) {
      const ancestorId = p.efrm[i];
      if (ancestorId !== undefined && instancesBySpecies.has(ancestorId)) {
        closestOwnedParentId = ancestorId;
        const nextTarget = i === 0 ? targetId : p.efrm[i - 1];
        if (nextTarget !== undefined) {
          immediateEvoTargetId = nextTarget;
        }
        break;
      }
    }

    if (closestOwnedParentId === undefined) return;
    const ownedInstances = instancesBySpecies.get(closestOwnedParentId) || [];
    if (ownedInstances.length === 0) return;

    const immediateEvoTarget = apiData.pokemonMetadata?.[immediateEvoTargetId];
    if (!immediateEvoTarget) return;

    // If we're looking at a multi-stage evolution (e.g., target is Charizard, immediate is Charmeleon)
    // AND the intermediate stage (Charmeleon) is ALSO missing from the Pokedex,
    // we should skip generating the suggestion for the final stage (Charizard) because
    // the engine will already generate an identical "Evolve Charmander -> Charmeleon" suggestion
    // when it evaluates Charmeleon as a target. This prevents redundant duplicates.
    if (immediateEvoTargetId !== targetId && missingIds.has(immediateEvoTargetId)) {
      return;
    }

    const details = immediateEvoTarget.det;
    if (!details || details.length === 0) return;

    for (const detail of details) {
      const tr = detail.tr;
      const min_l = detail.ml;
      const min_h = detail.mh;
      const item = detail.item;
      const held = detail.held;
      const tod = detail.time === 1 ? 'day' : detail.time === 2 ? 'night' : undefined;
      const rps = detail.rps;

      // Filter out Yellow Starter Pikachu as it refuses to evolve
      const evolvableInstances = ownedInstances.filter(
        (inst) => !(displayVersion === 'yellow' && closestOwnedParentId === 25 && inst.otName === saveData.trainerName),
      );

      if (evolvableInstances.length === 0) continue;

      let bestInstance = evolvableInstances[0];
      if (!bestInstance) continue;
      if (tr === EVO_TRIGGER.LEVEL_UP && min_h) {
        bestInstance = evolvableInstances.reduce((prev, current) =>
          (prev.friendship ?? 0) > (current.friendship ?? 0) ? prev : current,
        );
      } else {
        bestInstance = evolvableInstances.reduce((prev, current) => (prev.level > current.level ? prev : current));
      }

      const isIntermediate = immediateEvoTargetId !== targetId;
      const pathTitlePrefix = isIntermediate ? `Path to #${targetId}` : 'Evolution';
      const evolveTargetText = isIntermediate ? ` into #${immediateEvoTargetId} to progress towards #${targetId}` : '';

      if (tr === EVO_TRIGGER.LEVEL_UP) {
        if (min_l) {
          const isReady = bestInstance.level >= min_l;
          let rpsMet = true;
          if (rps !== undefined && bestInstance.dvs && bestInstance.statExp) {
            const baseAtk = 35;
            const baseDef = 35;
            const calcAtk =
              Math.floor(
                (((baseAtk + bestInstance.dvs.atk) * 2 +
                  Math.floor(Math.min(Math.floor(Math.ceil(Math.sqrt(bestInstance.statExp.atk))), 255) / 4)) *
                  bestInstance.level) /
                  100,
              ) + 5;
            const calcDef =
              Math.floor(
                (((baseDef + bestInstance.dvs.def) * 2 +
                  Math.floor(Math.min(Math.floor(Math.ceil(Math.sqrt(bestInstance.statExp.def))), 255) / 4)) *
                  bestInstance.level) /
                  100,
              ) + 5;
            if (rps === 1) rpsMet = calcAtk > calcDef;
            else if (rps === -1) rpsMet = calcAtk < calcDef;
            else if (rps === 0) rpsMet = calcAtk === calcDef;
          }
          const isActuallyReady = isReady && rpsMet;
          let rpsReq = '';
          if (rps === 1) rpsReq = ', Atk > Def';
          else if (rps === -1) rpsReq = ', Atk < Def';
          else if (rps === 0) rpsReq = ', Atk = Def';
          let specificReq = `(needs Lv. ${min_l}${rpsReq})`;
          if (!rpsReq) specificReq = `(needs Lv. ${min_l})`;

          suggestions.push({
            id: `evo-lvl-${targetId}`,
            category: 'Evolve',
            title: isIntermediate ? pathTitlePrefix : `Level Up Evolution: #${targetId}`,
            description: isActuallyReady
              ? `Your Lv. ${bestInstance.level} pre-evolution is ready to evolve${evolveTargetText} ${specificReq}!`
              : `Your Lv. ${bestInstance.level} pre-evolution evolves at Lv. ${min_l}${evolveTargetText} ${specificReq}.`,
            pokemonId: targetId,
            priority: isActuallyReady ? 90 : 75,
          });
        } else if (min_h) {
          const todMsg = tod ? ` during the ${tod}` : '';
          const isFriendlyEnough = bestInstance.friendship !== undefined && bestInstance.friendship >= min_h;
          const friendshipStatus =
            bestInstance.friendship !== undefined ? ` (${bestInstance.friendship}/${min_h})` : '';

          suggestions.push({
            id: `evo-happy-${targetId}`,
            category: 'Evolve',
            title: isIntermediate
              ? pathTitlePrefix
              : isFriendlyEnough
                ? `Ready to Evolve: #${targetId}!`
                : `Happiness Evolution: #${targetId}`,
            description: isFriendlyEnough
              ? `Your pre-evolution is friendly enough${friendshipStatus}! Level it up${todMsg} to evolve${evolveTargetText}.`
              : `Level up your pre-evolution with high happiness${friendshipStatus} to evolve${todMsg}${evolveTargetText}!`,
            pokemonId: targetId,
            priority: isFriendlyEnough ? 90 : 80,
          });
        } else {
          const todMsg = tod ? ` during the ${tod}` : '';
          suggestions.push({
            id: `evo-lvl-any-${targetId}`,
            category: 'Evolve',
            title: isIntermediate ? pathTitlePrefix : `Level Up Evolution: #${targetId}`,
            description: `Level up your pre-evolution${todMsg} to evolve${evolveTargetText}!`,
            pokemonId: targetId,
            priority: 70,
          });
        }
      } else if (tr === EVO_TRIGGER.USE_ITEM && item) {
        const gameItemId = getGameItemId(item, saveData.generation);
        const hasStone =
          saveData.inventory.some((i) => i.id === gameItemId && i.quantity > 0) ||
          (saveData.pcItems?.some((i) => i.id === gameItemId && i.quantity > 0) ?? false);
        const itemName = EVO_ITEM_NAMES[item] || 'item';
        suggestions.push({
          id: `evo-item-${targetId}-${item}`,
          category: 'Evolve',
          title: isIntermediate
            ? pathTitlePrefix
            : hasStone
              ? `Ready to Evolve: #${targetId}!`
              : `Item Needed: #${targetId}`,
          description: hasStone
            ? `Use your ${itemName} to evolve it${evolveTargetText}!`
            : `Find a ${itemName} to evolve it${evolveTargetText}.`,
          pokemonId: targetId,
          priority: hasStone ? 95 : 40,
        });
      } else if (tr === EVO_TRIGGER.TRADE) {
        if (held) {
          const gameHeldId = getGameItemId(held, saveData.generation);
          const hasHeldItemInBag =
            saveData.inventory.some((i) => i.id === gameHeldId && i.quantity > 0) ||
            (saveData.pcItems?.some((i) => i.id === gameHeldId && i.quantity > 0) ?? false);
          const holdingInstance =
            evolvableInstances.find((inst) => inst.item === gameHeldId) ||
            ownedInstances.find((inst) => inst.item === gameHeldId);
          const hasHeldItem = hasHeldItemInBag || !!holdingInstance;
          const itemName = EVO_ITEM_NAMES[held] || 'item';

          let description = `Find a ${itemName}, have your pre-evolution hold it, and trade to evolve${evolveTargetText}.`;
          if (holdingInstance) {
            description = `Your pre-evolution is already holding the ${itemName}! Trade it to evolve${evolveTargetText}!`;
          } else if (hasHeldItemInBag) {
            description = `Have your pre-evolution hold the ${itemName} and trade it to evolve${evolveTargetText}!`;
          }

          suggestions.push({
            id: `evo-trade-held-${targetId}`,
            category: 'Evolve',
            title: isIntermediate
              ? pathTitlePrefix
              : hasHeldItem
                ? `Ready to Trade Evolve: #${targetId}!`
                : `Item Needed for Trade: #${targetId}`,
            description,
            pokemonId: targetId,
            priority: hasHeldItem ? 90 : 45,
          });
        } else {
          suggestions.push({
            id: `evo-trade-${targetId}`,
            category: 'Evolve',
            title: isIntermediate ? pathTitlePrefix : `Trade Evolution: #${targetId}`,
            description: `Trade your pre-evolution to evolve it${evolveTargetText}!`,
            pokemonId: targetId,
            priority: 85,
          });
        }
      }
    }
  });
}
