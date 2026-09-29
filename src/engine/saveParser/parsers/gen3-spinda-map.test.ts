import { expect, test } from 'vitest';
import { mapSpindaSpots, SPINDA_SPOT_ORIGINS } from './gen3';

test('mapSpindaSpots correct offsets based on pid bytes', () => {
  // Check simple 0 case
  const pidZero = 0;
  const spotsZero = mapSpindaSpots(pidZero);
  expect(spotsZero.bottomLeft.x).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_LEFT.x);
  expect(spotsZero.bottomLeft.y).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_LEFT.y);
  expect(spotsZero.bottomRight.x).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_RIGHT.x);
  expect(spotsZero.bottomRight.y).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_RIGHT.y);
  expect(spotsZero.topLeft.x).toBe(SPINDA_SPOT_ORIGINS.TOP_LEFT.x);
  expect(spotsZero.topLeft.y).toBe(SPINDA_SPOT_ORIGINS.TOP_LEFT.y);
  expect(spotsZero.topRight.x).toBe(SPINDA_SPOT_ORIGINS.TOP_RIGHT.x);
  expect(spotsZero.topRight.y).toBe(SPINDA_SPOT_ORIGINS.TOP_RIGHT.y);

  // Check custom PID 0x8899aabb
  const pidTest = 0x8899aabb;
  const spotsTest = mapSpindaSpots(pidTest);

  expect(spotsTest.topLeft.x).toBe(SPINDA_SPOT_ORIGINS.TOP_LEFT.x + 11);
  expect(spotsTest.topLeft.y).toBe(SPINDA_SPOT_ORIGINS.TOP_LEFT.y + 11);

  expect(spotsTest.topRight.x).toBe(SPINDA_SPOT_ORIGINS.TOP_RIGHT.x + 10);
  expect(spotsTest.topRight.y).toBe(SPINDA_SPOT_ORIGINS.TOP_RIGHT.y + 10);

  expect(spotsTest.bottomLeft.x).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_LEFT.x + 9);
  expect(spotsTest.bottomLeft.y).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_LEFT.y + 9);

  expect(spotsTest.bottomRight.x).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_RIGHT.x + 8);
  expect(spotsTest.bottomRight.y).toBe(SPINDA_SPOT_ORIGINS.BOTTOM_RIGHT.y + 8);
});
