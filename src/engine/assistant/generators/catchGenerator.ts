import type { LocationAreaEncounter, VersionEncounterDetail } from 'pokenode-ts';
import { STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from '../../data/gen1/assistantData';
import { getUnobtainableReason } from '../../exclusives/gen1Exclusives';
import { getDistanceToMap } from '../../mapGraph/gen1Graph';
import type { PokemonInstance } from '../../saveParser/index';
import type { EncounterDetail } from '../strategies/types';
import { parseIdFromUrl } from '../suggestionEngine';
import type { SuggestionContext } from './types';

export function generateCatchSuggestions(context: SuggestionContext) {
  const {
    saveData,
    apiData,
    missingIds,
    ownedSet,
    ownedCount,
    myOtIds,
    displayVersion,
    queryTargets,
    suggestions,
    rejected,
  } = context;

  // A. Catch logic
  if (apiData.localEncounters) {
    const localPids: number[] = [];
    const localEncounterInfo: Record<number, EncounterDetail[]> = {};

    for (const encounter of apiData.localEncounters) {
      const pid = parseIdFromUrl(encounter.pokemon.url);

      const isStaticGift = !!STATIC_GIFT_DATA[pid];
      if (isStaticGift && myOtIds.has(pid)) {
        rejected.push({
          pokemonId: pid,
          reason: 'You already own this one-time gift (matched by Trainer Name).',
          code: 'GIFT_CLAIMED',
        });
        continue;
      }

      const gift = STATIC_GIFT_DATA[pid];
      if (saveData.eventFlags && gift?.eventFlag) {
        if (((saveData.eventFlags[Math.floor(gift.eventFlag / 8)] ?? 0) & (1 << (gift.eventFlag % 8))) !== 0) {
          rejected.push({
            pokemonId: pid,
            reason: `Event flag ${gift.eventFlag} is set. Gift already claimed.`,
            code: 'GIFT_CLAIMED',
          });
          continue;
        }
      }

      const versionDetail = encounter.version_details.find(
        (vd: VersionEncounterDetail) => vd.version.name === displayVersion,
      );
      if (versionDetail && missingIds.includes(pid)) {
        localPids.push(pid);
        localEncounterInfo[pid] = versionDetail.encounter_details.map((ed) => ({
          chance: ed.chance,
          method: ed.method.name,
          minLevel: ed.min_level,
          maxLevel: ed.max_level,
        }));
      }
    }
    if (localPids.length > 0) {
      const areaName = saveData.currentMapName || 'where you need to be';
      suggestions.push({
        id: 'catch-local',
        category: 'Catch',
        title: 'Catch Right Here',
        description: `You are exactly ${areaName}! There are ${localPids.length} missing Pokémon right here.`,
        pokemonIds: localPids,
        priority: 120,
        encounterInfo: localEncounterInfo,
      });
    }
  }

  if (apiData.missingEncounters) {
    const locationMap: Record<
      string,
      {
        name: string;
        distance: number;
        pids: Set<number>;
        slug: string;
        encounterMap: Map<number, EncounterDetail[]>;
      }
    > = {};

    for (const pid of queryTargets) {
      const isStaticGift = !!STATIC_GIFT_DATA[pid];
      if (isStaticGift && myOtIds.has(pid)) continue;

      const gift = STATIC_GIFT_DATA[pid];
      if (saveData.eventFlags && gift?.eventFlag) {
        if (((saveData.eventFlags[Math.floor(gift.eventFlag / 8)] ?? 0) & (1 << (gift.eventFlag % 8))) !== 0) continue;
      }

      const encounters = apiData.missingEncounters[pid] || [];
      const logicReason = getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
      if (logicReason) {
        rejected.push({ pokemonId: pid, reason: logicReason, code: 'CHOICE_TAKEN' });
        suggestions.push({
          id: `trade-${pid}`,
          category: 'Trade',
          title: `Trade Required: #${pid}`,
          description: logicReason,
          pokemonId: pid,
          priority: 60 - context.unobtainableCount,
          debugInfo: {
            priorityScore: 60 - context.unobtainableCount,
            reasoning: 'Explicit unobtainable logic rule',
          },
        });
        context.unobtainableCount++;
        continue;
      }

      let isCatchableSomewhere = encounters.some((enc: LocationAreaEncounter) =>
        enc.version_details.some((vd: VersionEncounterDetail) => vd.version.name === displayVersion),
      );

      if (!isCatchableSomewhere) {
        const aEncsMap = apiData.ancestralEncounters?.[pid] || {};
        for (const aid in aEncsMap) {
          if (
            aEncsMap[Number(aid)]?.some((enc: LocationAreaEncounter) =>
              enc.version_details.some((vd: VersionEncounterDetail) => vd.version.name === displayVersion),
            )
          ) {
            isCatchableSomewhere = true;
            break;
          }
        }

        if (!isCatchableSomewhere) {
          const chain = apiData.missingChains?.[pid];
          const baseId = chain ? parseIdFromUrl(chain.chain.species.url) : pid;
          const isInternalObtainable = [
            1,
            4,
            7, // Gen 1 Starters
            152,
            155,
            158, // Gen 2 Starters
            131,
            133, // Lapras, Eevee
            138,
            140,
            142, // Fossils
            106,
            107, // Hitmons
            143,
            144,
            145,
            146,
            150, // Gen 1 Legendaries/Snorlax
            130,
            185,
            245,
            249,
            250, // Gen 2 Statics
          ].includes(baseId);

          if (isInternalObtainable) {
            const isYellow = displayVersion === 'yellow';
            const isRedBlueStarter = [1, 4, 7].includes(baseId);
            if (isYellow && isRedBlueStarter) isCatchableSomewhere = true;
            else if (isInternalObtainable) isCatchableSomewhere = true;
          }
        }
      }

      if (!isCatchableSomewhere && !ownedSet.has(pid)) {
        // Suppress version exclusive if it can be obtained via NPC trade or Gift
        const isTradeAvailable = STATIC_NPC_TRADE_DATA.some(
          (t) =>
            t.gen === saveData.generation &&
            t.receivedId === pid &&
            (!t.versions || t.versions.includes(displayVersion)),
        );

        const giftEntry = STATIC_GIFT_DATA[pid];
        const hasDirectGift =
          !!giftEntry &&
          (!giftEntry.gen || giftEntry.gen === saveData.generation) &&
          (!giftEntry.name.includes('Yellow only') || displayVersion === 'yellow');

        if (!isTradeAvailable && !hasDirectGift) {
          rejected.push({
            pokemonId: pid,
            reason: `Not catchable in ${displayVersion} version.`,
            code: 'VERSION_EXCLUSIVE',
          });
          suggestions.push({
            id: `trade-${pid}`,
            category: 'Trade',
            title: `Version Exclusive: #${pid}`,
            description: `This Pokémon is not available in ${displayVersion}. You must trade for it.`,
            pokemonId: pid,
            priority: 50 - context.unobtainableCount,
            debugInfo: {
              priorityScore: 50 - context.unobtainableCount,
              reasoning: 'Version exclusivity check',
            },
          });
          context.unobtainableCount++;
          continue;
        }
      }

      const versionEncounters = encounters.filter((enc: LocationAreaEncounter) =>
        enc.version_details.some((vd: VersionEncounterDetail) => vd.version.name === displayVersion),
      );

      for (const enc of versionEncounters) {
        const targetAreaSlug = enc.location_area.name;
        if (!locationMap[targetAreaSlug]) {
          const route = getDistanceToMap(saveData.currentMapId, targetAreaSlug);
          if (route)
            locationMap[targetAreaSlug] = {
              name: route.name,
              distance: route.distance,
              pids: new Set(),
              slug: targetAreaSlug,
              encounterMap: new Map(),
            };
        }
        if (locationMap[targetAreaSlug]) {
          locationMap[targetAreaSlug].pids.add(pid);
          const versionDetail = enc.version_details.find(
            (vd: VersionEncounterDetail) => vd.version.name === displayVersion,
          );
          if (versionDetail) {
            locationMap[targetAreaSlug].encounterMap.set(
              pid,
              versionDetail.encounter_details.map((ed) => ({
                chance: ed.chance,
                method: ed.method.name,
                minLevel: ed.min_level,
                maxLevel: ed.max_level,
              })),
            );
          }
        }
      }
    }
    const locations = Object.values(locationMap).map((loc) => ({
      ...loc,
      yield: loc.pids.size,
    }));
    const partyHasFly = saveData.partyDetails?.some((p: PokemonInstance) => p.moves?.includes(19));
    locations.sort((a, b) =>
      partyHasFly
        ? b.yield !== a.yield
          ? b.yield - a.yield
          : a.distance - b.distance
        : a.distance !== b.distance
          ? a.distance - b.distance
          : b.yield - a.yield,
    );
    locations.slice(0, 4).forEach((loc) => {
      const pids = Array.from(loc.pids as Set<number>);
      const locEncounterInfo: Record<number, EncounterDetail[]> = {};

      pids.forEach((pid) => {
        const mappedEncounter = loc.encounterMap.get(pid);
        if (mappedEncounter) {
          locEncounterInfo[pid] = mappedEncounter;
        } else {
          // Check ancestral encounters if not found directly
          const aEncsMap = apiData.ancestralEncounters?.[pid] || {};
          for (const aid in aEncsMap) {
            const ancestorAreaEncounter = aEncsMap[Number(aid)]?.find(
              (enc: LocationAreaEncounter) =>
                enc.location_area.name === loc.slug &&
                enc.version_details.some((vd: VersionEncounterDetail) => vd.version.name === displayVersion),
            );
            if (ancestorAreaEncounter) {
              const vd = ancestorAreaEncounter.version_details.find(
                (v: VersionEncounterDetail) => v.version.name === displayVersion,
              );
              if (vd) {
                locEncounterInfo[pid] = vd.encounter_details.map((ed) => ({
                  chance: ed.chance,
                  method: ed.method.name,
                  minLevel: ed.min_level,
                  maxLevel: ed.max_level,
                }));
                break;
              }
            }
          }
        }
      });

      if (loc.distance === 0) {
        // This is already handled by the localEncounters block at the top with higher priority
        return;
      }
      suggestions.push({
        id: `catch-loc-${loc.name}`,
        category: 'Catch',
        title: `Travel to ${loc.name}`,
        description: partyHasFly
          ? `Use Fly to easily travel to ${loc.name} and catch ${pids.length} missing Pokémon!`
          : `Catch ${pids.length} missing Pokémon at ${loc.name}, only ${loc.distance === 1 ? '1 connection away' : `${loc.distance} connections away`}.`,
        pokemonIds: pids,
        priority: 80 + loc.yield - (partyHasFly ? 0 : loc.distance),
        encounterInfo: locEncounterInfo,
      });
    });
  }
}
