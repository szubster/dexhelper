import { describe, expect, it } from 'vitest';
import { Gen1SafariZone, HoennSafariZone, KantoSafariZoneGen3 } from '../index';

describe('data exports', () => {
  it('should export all safari zones', () => {
    expect(Gen1SafariZone).toBeDefined();
    expect(HoennSafariZone).toBeDefined();
    expect(KantoSafariZoneGen3).toBeDefined();
  });
});
