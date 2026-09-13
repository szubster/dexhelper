export const BERRY_TREES_OFFSET = 0x169c;
export const BERRY_TREES_COUNT = 128;
export const BERRY_TREE_STRUCT_SIZE = 8;

export interface BerryTree {
  berryId: number;
  stage: number;
  stopGrowth: number;
  minutesUntilNextStage: number;
  berryYield: number;
  regrowthCount: number;
  watered1: number;
  watered2: number;
  watered3: number;
  watered4: number;
}

export function parseGen3BerryTrees(saveBlock1: DataView, sectionOffset: number): BerryTree[] {
  const trees: BerryTree[] = [];

  try {
    for (let i = 0; i < BERRY_TREES_COUNT; i++) {
      const offset = sectionOffset + BERRY_TREES_OFFSET + i * BERRY_TREE_STRUCT_SIZE;

      const berryId = saveBlock1.getUint8(offset + 0);
      const stageAndStop = saveBlock1.getUint8(offset + 1);
      const stage = stageAndStop & 0x7f;
      const stopGrowth = (stageAndStop & 0x80) >> 7;
      const minutesUntilNextStage = saveBlock1.getUint16(offset + 2, true);
      const berryYield = saveBlock1.getUint8(offset + 4);

      const misc = saveBlock1.getUint8(offset + 5);
      const regrowthCount = misc & 0x0f;
      const watered1 = (misc & 0x10) >> 4;
      const watered2 = (misc & 0x20) >> 5;
      const watered3 = (misc & 0x40) >> 6;
      const watered4 = (misc & 0x80) >> 7;

      trees.push({
        berryId,
        stage,
        stopGrowth,
        minutesUntilNextStage,
        berryYield,
        regrowthCount,
        watered1,
        watered2,
        watered3,
        watered4,
      });
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return trees;
}
