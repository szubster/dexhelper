import type { GameVersion } from '../../parsers/common';
import { FRLG_FLAGS_OFFSET, RSE_FLAGS_OFFSET_E, RSE_FLAGS_OFFSET_RS } from '../narrative/constants';
import {
  FRLG_FLAG_DEFEATED_ARTICUNO,
  FRLG_FLAG_DEFEATED_MEWTWO,
  FRLG_FLAG_DEFEATED_MOLTRES,
  FRLG_FLAG_DEFEATED_ZAPDOS,
  FRLG_FLAG_RECEIVED_MASTER_BALL,
  RSE_FLAG_DEFEATED_GROUDON,
  RSE_FLAG_DEFEATED_KYOGRE,
  RSE_FLAG_DEFEATED_RAYQUAZA,
  RSE_FLAG_RECEIVED_MASTER_BALL,
} from './constants';

const BITS_PER_BYTE = 8;
const BIT_MASK = 1;

export interface Gen3MissedItemsAndMilestones {
  missedMasterBall: boolean;
  missedLegendaries: string[];
}

/**
 * Extracts missed milestones and valuable items from Gen 3 saves.
 */
export function parseGen3MissedItemsAndMilestones(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): Gen3MissedItemsAndMilestones {
  try {
    let baseFlagsOffset = 0;

    if (gameVersion === 'emerald') {
      baseFlagsOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_E;
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      baseFlagsOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_RS;
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      baseFlagsOffset = saveBlock1Offset + FRLG_FLAGS_OFFSET;
    } else {
      return { missedMasterBall: false, missedLegendaries: [] };
    }

    const readFlag = (flagId: number) => {
      const byteOffset = baseFlagsOffset + Math.floor(flagId / BITS_PER_BYTE);
      const bitIndex = flagId % BITS_PER_BYTE;
      const byteValue = view.getUint8(byteOffset);
      return !!((byteValue >> bitIndex) & BIT_MASK);
    };

    let missedMasterBall = false;
    const missedLegendaries: string[] = [];

    if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      missedMasterBall = !readFlag(FRLG_FLAG_RECEIVED_MASTER_BALL);

      if (!readFlag(FRLG_FLAG_DEFEATED_MEWTWO)) missedLegendaries.push('Mewtwo');
      if (!readFlag(FRLG_FLAG_DEFEATED_ARTICUNO)) missedLegendaries.push('Articuno');
      if (!readFlag(FRLG_FLAG_DEFEATED_ZAPDOS)) missedLegendaries.push('Zapdos');
      if (!readFlag(FRLG_FLAG_DEFEATED_MOLTRES)) missedLegendaries.push('Moltres');
    } else {
      missedMasterBall = !readFlag(RSE_FLAG_RECEIVED_MASTER_BALL);

      if (gameVersion === 'emerald' || gameVersion === 'ruby') {
        if (!readFlag(RSE_FLAG_DEFEATED_GROUDON)) missedLegendaries.push('Groudon');
      }
      if (gameVersion === 'emerald' || gameVersion === 'sapphire') {
        if (!readFlag(RSE_FLAG_DEFEATED_KYOGRE)) missedLegendaries.push('Kyogre');
      }
      if (gameVersion === 'emerald') {
        if (!readFlag(RSE_FLAG_DEFEATED_RAYQUAZA)) missedLegendaries.push('Rayquaza');
      }
    }

    return {
      missedMasterBall,
      missedLegendaries,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
