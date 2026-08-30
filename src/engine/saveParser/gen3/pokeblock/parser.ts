import type { GameVersion } from '../../parsers/common';
import {
  BITTER_OFFSET,
  COLOR_OFFSET,
  DRY_OFFSET,
  FEEL_OFFSET,
  POKEBLOCK_ARRAY_OFFSET_EMERALD,
  POKEBLOCK_ARRAY_OFFSET_RS,
  POKEBLOCK_STRUCT_SIZE,
  POKEBLOCKS_COUNT,
  SOUR_OFFSET,
  SPICY_OFFSET,
  SWEET_OFFSET,
} from './constants';
import type { Gen3Pokeblock, PokeblockColor } from './types';

export function parseGen3Pokeblocks(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): Gen3Pokeblock[] | undefined {
  if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    return undefined; // Pokeblocks do not exist in FRLG
  }

  const baseOffset = gameVersion === 'emerald' ? POKEBLOCK_ARRAY_OFFSET_EMERALD : POKEBLOCK_ARRAY_OFFSET_RS;
  const pokeblocks: Gen3Pokeblock[] = [];

  try {
    for (let i = 0; i < POKEBLOCKS_COUNT; i++) {
      const blockOffset = saveBlock1Offset + baseOffset + i * POKEBLOCK_STRUCT_SIZE;
      const color = view.getUint8(blockOffset + COLOR_OFFSET);

      // If color is 0 (None), we skip or we can include it. Let's include it only if it's non-zero.
      if (color !== 0) {
        pokeblocks.push({
          color: color as PokeblockColor,
          spicy: view.getUint8(blockOffset + SPICY_OFFSET),
          dry: view.getUint8(blockOffset + DRY_OFFSET),
          sweet: view.getUint8(blockOffset + SWEET_OFFSET),
          bitter: view.getUint8(blockOffset + BITTER_OFFSET),
          sour: view.getUint8(blockOffset + SOUR_OFFSET),
          feel: view.getUint8(blockOffset + FEEL_OFFSET),
        });
      }
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return pokeblocks;
}
