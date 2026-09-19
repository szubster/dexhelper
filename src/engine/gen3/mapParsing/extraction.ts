import type { ActiveSwarmData, BerryPatchData, PlayerLocationData, RoamerData } from '../../../db/schema';
import { type BerryTree, parseGen3BerryTrees } from '../../saveParser/gen3/berry/parser';
import type { GameVersion, Gen3RoamerData } from '../../saveParser/parsers/common';
import { parseGen3ActiveSwarm, TV_SHOWS_OFFSET } from '../../saveParser/parsers/gen3';
import { BERRY_TREE_LOCATIONS } from '../berryPatches/berryLocations';
import { calculateFeebasTiles, extractFeebasSeed, mapSpotIdsToCoordinates } from '../feebas';
import { extractPlayerLocation } from '../playerLocation/parser';
import { parseGen3EmeraldRoamer, parseGen3FRLGRoamer, parseGen3RSRoamer } from '../roamer/parser';

export function extractGen3PlayerLocation(saveData: DataView, saveBlock1Offset: number): PlayerLocationData {
  try {
    const location = extractPlayerLocation(saveData, saveBlock1Offset);
    return {
      mapGroup: location.mapGroup,
      mapNum: location.mapNum,
      mapId: location.mapId,
      x: location.x,
      y: location.y,
      warpId: location.warpId,
      nearestTrainer: location.nearestTrainer,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function extractGen3Roamers(
  saveData: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): RoamerData[] {
  try {
    let roamerData: Gen3RoamerData;

    if (gameVersion === 'emerald') {
      roamerData = parseGen3EmeraldRoamer(saveData, saveBlock1Offset);
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      roamerData = parseGen3FRLGRoamer(saveData, saveBlock1Offset);
    } else {
      roamerData = parseGen3RSRoamer(saveData, saveBlock1Offset);
    }

    // Only return active roamers to match schema design intent
    if (!roamerData.isActive) {
      return [];
    }

    return [roamerData];
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function extractGen3BerryPatches(saveData: DataView, saveBlock1Offset: number): BerryPatchData[] {
  try {
    const trees = parseGen3BerryTrees(saveData, saveBlock1Offset);

    return trees.map((tree: BerryTree, index: number) => {
      const patchData: BerryPatchData = {
        berryId: tree.berryId,
        stage: tree.stage,
        stopGrowth: tree.stopGrowth === 1,
        minutesUntilNextStage: tree.minutesUntilNextStage,
        berryYield: tree.berryYield,
        regrowthCount: tree.regrowthCount,
        watered1: tree.watered1 === 1,
        watered2: tree.watered2 === 1,
        watered3: tree.watered3 === 1,
        watered4: tree.watered4 === 1,
      };

      if (BERRY_TREE_LOCATIONS[index]) {
        patchData.locationName = BERRY_TREE_LOCATIONS[index];
      }

      return patchData;
    });
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function extractGen3ActiveSwarms(saveData: DataView, saveBlock1Offset: number): ActiveSwarmData[] {
  try {
    const swarm = parseGen3ActiveSwarm(saveData, saveBlock1Offset + TV_SHOWS_OFFSET);

    if (!swarm) {
      return [];
    }

    return [
      {
        speciesId: swarm.speciesId,
        mapId: swarm.mapId,
        mapGroup: swarm.mapGroup,
        daysRemaining: swarm.daysRemaining,
      },
    ];
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function extractGen3FeebasTiles(
  saveData: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): [number, number][] {
  if (
    gameVersion === 'firered' ||
    gameVersion === 'leafgreen' ||
    gameVersion === 'red' ||
    gameVersion === 'blue' ||
    gameVersion === 'yellow' ||
    gameVersion === 'gold' ||
    gameVersion === 'silver' ||
    gameVersion === 'crystal'
  ) {
    return []; // Only Hoenn has Feebas tiles
  }

  try {
    const seed = extractFeebasSeed(saveData, gameVersion, saveBlock1Offset);
    const spotIds = calculateFeebasTiles(seed);
    return mapSpotIdsToCoordinates(spotIds);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    // If we fail to extract due to a known error, just return empty.
    if (error instanceof Error && error.message.includes('The save file is corrupted')) {
      throw error;
    }
    return [];
  }
}
