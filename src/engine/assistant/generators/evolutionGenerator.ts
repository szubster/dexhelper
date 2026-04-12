import type { ChainLink } from 'pokenode-ts';
import { GEN1_ITEMS } from '../../data/gen1/assistantData';
import { gen2Items } from '../../data/gen2/legacyNameMap';
import type { PokemonInstance } from '../../saveParser/index';
import { parseIdFromUrl } from '../utils';
import type { SuggestionContext } from './types';

// Construct a reverse map for Gen 2 item names to their IDs.
// Normalize names for easier matching from PokeAPI (e.g. "thunder-stone" matches "thunderstone")
const GEN2_ITEM_IDS_BY_NAME: Record<string, number> = {};
for (const [idStr, name] of Object.entries(gen2Items)) {
  const normalizedName = name.toLowerCase().replace(/[-\s]/g, '');
  GEN2_ITEM_IDS_BY_NAME[normalizedName] = parseInt(idStr, 10);
}

export function generateEvolutionSuggestions(context: SuggestionContext) {
  const { saveData, displayVersion, queryTargets, allInstances, apiData, suggestions } = context;

  // Pre-calculate instances by species for O(1) lookup during evolution checks
  // ⚡ Bolt: Replaces O(N*M) filtering inside the loop below
  const instancesBySpecies = new Map<number, PokemonInstance[]>();
  for (const p of allInstances) {
    if (!instancesBySpecies.has(p.speciesId)) {
      instancesBySpecies.set(p.speciesId, []);
    }
    instancesBySpecies.get(p.speciesId)?.push(p);
  }

  // Evolutions
  queryTargets.forEach((targetId: number) => {
    const chain = apiData.missingChains?.[targetId];
    if (!chain) return;

    // Find the target node and its parent (pre-evolution)
    const findNodeAndParent = (
      node: ChainLink,
      parent: ChainLink | null = null,
    ): { targetNode: ChainLink; parentNode: ChainLink } | null => {
      const id = parseIdFromUrl(node.species.url);
      // biome-ignore lint/style/noNonNullAssertion: Guaranteed by recursive logic structure
      if (id === targetId) return { targetNode: node, parentNode: parent! };
      for (const child of node.evolves_to) {
        const res = findNodeAndParent(child, node);
        if (res) return res;
      }
      return null;
    };

    const nodes = findNodeAndParent(chain.chain);
    if (!nodes?.parentNode) return;

    const parentId = parseIdFromUrl(nodes.parentNode.species.url);

    // Check if we own the pre-evolution
    // ⚡ Bolt: Use pre-calculated map instead of array filter
    const ownedInstances = instancesBySpecies.get(parentId) || [];
    if (ownedInstances.length === 0) return;

    // Get the highest level instance to give the most optimistic suggestion
    const bestInstance = ownedInstances.reduce((prev, current) => (prev.level > current.level ? prev : current));

    // Get evolution details from the target node
    const details = nodes.targetNode.evolution_details[0];
    if (!details) return;

    const trigger = details.trigger.name;

    if (trigger === 'level-up') {
      if (details.min_level) {
        const isReady = bestInstance.level >= details.min_level;
        let statCondition = '';
        if (details.relative_physical_stats === 1) statCondition = ' (needs Attack > Defense)';
        else if (details.relative_physical_stats === -1) statCondition = ' (needs Attack < Defense)';
        else if (details.relative_physical_stats === 0) statCondition = ' (needs Attack = Defense)';

        suggestions.push({
          id: `evo-lvl-${targetId}`,
          category: 'Evolve',
          title: `Level Up Evolution: #${targetId}`,
          description: isReady
            ? `Your Lv. ${bestInstance.level} pre-evolution is ready to evolve (needs Lv. ${details.min_level})${statCondition}!`
            : `Your Lv. ${bestInstance.level} pre-evolution evolves at Lv. ${details.min_level}${statCondition}.`,
          pokemonId: targetId,
          priority: isReady ? 90 : 75,
        });
      } else if (details.min_happiness) {
        let timeCondition = '';
        if (details.time_of_day === 'Day' || (details.time_of_day as unknown as string) === 'day')
          timeCondition = ' during the day';
        else if (details.time_of_day === 'Night' || (details.time_of_day as unknown as string) === 'night')
          timeCondition = ' during the night';

        suggestions.push({
          id: `evo-happy-${targetId}`,
          category: 'Evolve',
          title: `Happiness Evolution: #${targetId}`,
          description: `Level up your pre-evolution with high happiness${timeCondition} to evolve!`,
          pokemonId: targetId,
          priority: 80,
        });
      }
    } else if (trigger === 'use-item' && details.item) {
      const itemName = details.item.name;
      const isYellowStarterPikachu =
        displayVersion === 'yellow' && parentId === 25 && bestInstance.otName === saveData.trainerName;
      if (isYellowStarterPikachu) return;

      let targetItemId = -1;
      if (saveData.generation === 1) {
        if (itemName.includes('fire')) targetItemId = GEN1_ITEMS.FIRE_STONE;
        else if (itemName.includes('thunder')) targetItemId = GEN1_ITEMS.THUNDER_STONE;
        else if (itemName.includes('water')) targetItemId = GEN1_ITEMS.WATER_STONE;
        else if (itemName.includes('leaf')) targetItemId = GEN1_ITEMS.LEAF_STONE;
        else targetItemId = GEN1_ITEMS.MOON_STONE; // Default to moon stone
      } else {
        // Gen 2
        const normalizedItemName = itemName.toLowerCase().replace(/[-\s]/g, '');
        targetItemId = GEN2_ITEM_IDS_BY_NAME[normalizedItemName] || -1;
      }

      const hasStone = saveData.inventory.some((i) => i.id === targetItemId);
      if (hasStone) {
        suggestions.push({
          id: `evo-stn-${targetId}`,
          category: 'Evolve',
          title: `Ready to Evolve: #${targetId}!`,
          description: `Use ${itemName.replace('-', ' ')} on your pre-evolution!`,
          pokemonId: targetId,
          priority: 95,
        });
      } else {
        suggestions.push({
          id: `evo-buy-${targetId}`,
          category: 'Evolve',
          title: `Get ${itemName.replace('-', ' ')}`,
          description: `Obtain a ${itemName.replace('-', ' ')} to evolve your pre-evolution into #${targetId}.`,
          pokemonId: targetId,
          priority: 40,
        });
      }
    } else if (trigger === 'trade') {
      const heldItem = details.held_item?.name;
      suggestions.push({
        id: `evo-trade-${targetId}`,
        category: 'Evolve',
        title: `Trade Evolution: #${targetId}`,
        description: heldItem
          ? `Trade your pre-evolution while holding ${heldItem.replace('-', ' ')}.`
          : `Trade your pre-evolution to evolve it!`,
        pokemonId: targetId,
        priority: 85,
      });
    }
  });
}
