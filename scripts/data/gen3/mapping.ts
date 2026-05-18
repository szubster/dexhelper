export const GEN3_HOENN_MAP_TO_AID: Record<number, Record<number, { name: string; aid: number; connections?: number[] }>> = {};
export const GEN3_KANTO_MAP_TO_AID: Record<number, Record<number, { name: string; aid: number; connections?: number[] }>> = {};

// We can define a helper for gen3 ID decoding as well, similar to gen2
export const decodeGen3Id = (encoded: number) => ({ group: encoded >> 8, id: encoded & 0xff });
