import { pokeDB } from '@/db/PokeDB';
import { EVO_TRIGGER } from '@/db/schema';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { getGameItemId } from '../strategies/items/gameItemMap';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';

export function findInstanceHoldingItem(
  instancesMap: Map<number, PokemonInstance[]>,
  itemId: number,
): PokemonInstance | undefined {
  for (const instances of instancesMap.values()) {
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];
      if (inst && inst.item === itemId) {
        return inst;
      }
    }
  }
  return undefined;
}

/**
 * Evaluates the player's current boxes and party to find pre-evolutions that can be evolved
 * to obtain missing Pokédex entries.
 *
 * Checks against level requirements, required evolution items in the inventory,
 * time of day, and friendship levels.
 * Priority boosts significantly if the evolution criteria are actively met (e.g. required level reached).
 *
 * **Architecture Note: In-Place Mutation**
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The parsed save data for checking items, friendship, and daylight (tod).
 * @param apiData - Pre-fetched metadata containing evolution criteria (level, item, time of day).
 * @param instancesBySpecies - A Map of the player's physical Pokémon, used to find valid pre-evolutions in O(1) time.
 * @param suggestions - The shared array where new evolution suggestions are pushed in-place.
 * @param displayVersion - The current game version, used to handle special cases (like Yellow Pikachu refusing to evolve).
 * @param missingIds - A Set of Pokémon IDs the player needs to obtain, used to prevent redundant intermediate evolution suggestions.
 */
export async function generateEvolutionSuggestions(
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

  // ⚡ Bolt: Replaced .forEach with for loop to avoid closure creation and function call overhead
  for (let idx = 0; idx < queryTargets.length; idx++) {
    const targetId = queryTargets[idx];
    if (targetId === undefined) continue;

    const p = apiData.pokemonMetadata?.[targetId];
    if (!p) continue;

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

    if (closestOwnedParentId === undefined) continue;
    const ownedInstances = instancesBySpecies.get(closestOwnedParentId) || [];
    if (ownedInstances.length === 0) continue;

    const immediateEvoTarget = apiData.pokemonMetadata?.[immediateEvoTargetId];
    if (!immediateEvoTarget) continue;

    // If we're looking at a multi-stage evolution (e.g., target is Charizard, immediate is Charmeleon)
    // AND the intermediate stage (Charmeleon) is ALSO missing from the Pokedex,
    // we should skip generating the suggestion for the final stage (Charizard) because
    // the engine will already generate an identical "Evolve Charmander -> Charmeleon" suggestion
    // when it evaluates Charmeleon as a target. This prevents redundant duplicates.
    if (immediateEvoTargetId !== targetId && missingIds.has(immediateEvoTargetId)) {
      continue;
    }

    const details = immediateEvoTarget.det;
    if (!details || details.length === 0) continue;

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
      // ⚡ Bolt: Replace array reduce closure with explicit loop to eliminate intermediate array allocations and closure overhead on the hot path
      if (tr === EVO_TRIGGER.LEVEL_UP && min_h) {
        for (let i = 1; i < evolvableInstances.length; i++) {
          const inst = evolvableInstances[i];
          if (inst && (inst.friendship ?? 0) > (bestInstance.friendship ?? 0)) {
            bestInstance = inst;
          }
        }
      } else {
        for (let i = 1; i < evolvableInstances.length; i++) {
          const inst = evolvableInstances[i];
          if (inst && inst.level > bestInstance.level) {
            bestInstance = inst;
          }
        }
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
        const gameItemId = await getGameItemId(item, saveData.generation);
        const hasStoneInBag =
          saveData.inventory.some((i) => i.id === gameItemId && i.quantity > 0) ||
          (saveData.pcItems?.some((i) => i.id === gameItemId && i.quantity > 0) ?? false);
        const otherHoldingInstance = hasStoneInBag
          ? undefined
          : findInstanceHoldingItem(instancesBySpecies, gameItemId);
        const hasStone = hasStoneInBag || !!otherHoldingInstance;

        const itemRecord = await pokeDB.getItem(item);
        const itemName = itemRecord?.name || 'item';

        let description = hasStone
          ? `Use your ${itemName} to evolve it${evolveTargetText}!`
          : `Find a ${itemName} to evolve it${evolveTargetText}.`;

        if (!hasStoneInBag && otherHoldingInstance) {
          description = `Take the ${itemName} held by your Pokémon (#${otherHoldingInstance.speciesId}) and use it to evolve it${evolveTargetText}!`;
        }

        suggestions.push({
          id: `evo-item-${targetId}-${item}`,
          category: 'Evolve',
          title: isIntermediate
            ? pathTitlePrefix
            : hasStone
              ? `Ready to Evolve: #${targetId}!`
              : `Item Needed: #${targetId}`,
          description,
          pokemonId: targetId,
          priority: hasStone ? 95 : 40,
        });
      } else if (tr === EVO_TRIGGER.TRADE) {
        if (held) {
          const gameHeldId = await getGameItemId(held, saveData.generation);
          const hasHeldItemInBag =
            saveData.inventory.some((i) => i.id === gameHeldId && i.quantity > 0) ||
            (saveData.pcItems?.some((i) => i.id === gameHeldId && i.quantity > 0) ?? false);
          const holdingPreEvoInstance =
            evolvableInstances.find((inst) => inst.item === gameHeldId) ||
            ownedInstances.find((inst) => inst.item === gameHeldId);
          let otherHoldingInstance: PokemonInstance | undefined;
          if (!hasHeldItemInBag && !holdingPreEvoInstance) {
            otherHoldingInstance = findInstanceHoldingItem(instancesBySpecies, gameHeldId);
          }
          const hasHeldItem = hasHeldItemInBag || !!holdingPreEvoInstance || !!otherHoldingInstance;

          const heldRecord = await pokeDB.getItem(held);
          const itemName = heldRecord?.name || 'item';

          let description = `Find a ${itemName}, have your pre-evolution hold it, and trade to evolve${evolveTargetText}.`;
          if (holdingPreEvoInstance) {
            description = `Your pre-evolution is already holding the ${itemName}! Trade it to evolve${evolveTargetText}!`;
          } else if (hasHeldItemInBag) {
            description = `Have your pre-evolution hold the ${itemName} and trade it to evolve${evolveTargetText}!`;
          } else if (otherHoldingInstance) {
            description = `Take the ${itemName} held by your Pokémon (#${otherHoldingInstance.speciesId}), have your pre-evolution hold it, and trade to evolve${evolveTargetText}!`;
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
      } else if (tr === EVO_TRIGGER.SHED) {
        // In Generation 3, Shedinja does NOT require a Poké Ball in the bag to appear.
        // It only requires an empty party slot. The Poké Ball requirement was introduced in Gen 4.
        const requiresPokeball = saveData.generation >= 4;
        const pokeballId = await getGameItemId(4, saveData.generation); // 4 is standard Pokéball
        const hasPokeball = requiresPokeball
          ? saveData.inventory.some((i) => i.id === pokeballId && i.quantity > 0) ||
            (saveData.pcItems?.some((i) => i.id === pokeballId && i.quantity > 0) ?? false)
          : true;
        const hasPartySpace = (saveData.party?.length || 0) < 6;

        const pokeballText = requiresPokeball ? ' and a standard Poké Ball in your bag' : '';
        const pokeballTextShort = requiresPokeball ? ' and a Poké Ball' : '';

        let description = `Level up your pre-evolution to Lv. 20 with an empty slot in your party${pokeballText} to get #${targetId}!`;
        let priority = 75;

        if (bestInstance.level >= 20) {
          if (hasPartySpace && hasPokeball) {
            description = `Your pre-evolution is ready! Level it up once with an empty party slot${pokeballTextShort} to get #${targetId}!`;
            priority = 90;
          } else if (!hasPartySpace) {
            description = `Your pre-evolution is ready, but you need to deposit a Pokémon in the PC to have an empty party slot!`;
          } else if (!hasPokeball) {
            description = `Your pre-evolution is ready, but you need a standard Poké Ball in your bag!`;
          }
        }

        suggestions.push({
          id: `evo-shed-${targetId}`,
          category: 'Evolve',
          title: isIntermediate ? pathTitlePrefix : `Special Evolution: #${targetId}`,
          description,
          pokemonId: targetId,
          priority,
        });
      }
    }
  }
}
