import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/engine/saveParser/utils/gen1EventFlags.test.ts', 'utf8');

content = content.replace(`
  it('should handle boundary state (flags undefined)', () => {
    // Array that is too small
    const eventFlags = new Uint8Array(10);
    const claimed = parseGen1StaticEncounters(eventFlags);
    for (const [idStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
      if (gift.eventFlag !== undefined && (gift.eventFlag >> 3) >= 10) {
        const id = parseInt(idStr, 10);
        expect(claimed[id]).toBe(false);
      }
    }
  });`, `
  it('should handle boundary state (flags undefined)', () => {
    // Array that is too small
    const eventFlags = new Uint8Array(10);
    const claimed = parseGen1StaticEncounters(eventFlags);

    // Filter gifts that are out of bounds and check that they return false
    const outOfBoundsGifts = Object.entries(STATIC_GIFT_DATA).filter(
      ([, gift]) => gift.eventFlag !== undefined && (gift.eventFlag >> 3) >= 10
    );

    const outOfBoundsClaimed = outOfBoundsGifts.map(([idStr]) => claimed[parseInt(idStr, 10)]);
    expect(outOfBoundsClaimed.every(val => val === false)).toBe(true);
  });`);

writeFileSync('src/engine/saveParser/utils/gen1EventFlags.test.ts', content);
