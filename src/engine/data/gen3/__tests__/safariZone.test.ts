import { describe, expect, it } from 'vitest';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../safariZone';

describe('Gen3 Safari Zones', () => {
  it('HoennSafariZone should contain expected areas', () => {
    expect(HoennSafariZone).toBeDefined();
    expect(HoennSafariZone.length).toBeGreaterThan(0);
  });

  it('HoennSafariZone should have valid pokemon encounters', () => {
    for (const area of HoennSafariZone) {
      expect(area.name).toBeDefined();
      expect(area.encounters).toBeDefined();
      for (const [version, encounters] of Object.entries(area.encounters)) {
        if (!encounters) continue;
        expect(['ruby', 'sapphire', 'emerald']).toContain(version);
        for (const encounter of encounters) {
          expect(encounter.pokemon).toBeDefined();
          expect(typeof encounter.chance).toBe('number');
          expect(typeof encounter.minLevel).toBe('number');
          expect(typeof encounter.maxLevel).toBe('number');
          expect(encounter.method).toBeDefined();
        }
      }
    }
  });

  it('KantoSafariZoneGen3 should contain expected areas', () => {
    expect(KantoSafariZoneGen3).toBeDefined();
    expect(KantoSafariZoneGen3.length).toBeGreaterThan(0);
  });

  it('KantoSafariZoneGen3 should have valid pokemon encounters', () => {
    for (const area of KantoSafariZoneGen3) {
      expect(area.name).toBeDefined();
      expect(area.encounters).toBeDefined();
      for (const [version, encounters] of Object.entries(area.encounters)) {
        if (!encounters) continue;
        expect(['firered', 'leafgreen']).toContain(version);
        for (const encounter of encounters) {
          expect(encounter.pokemon).toBeDefined();
          expect(typeof encounter.chance).toBe('number');
          expect(typeof encounter.minLevel).toBe('number');
          expect(typeof encounter.maxLevel).toBe('number');
          expect(encounter.method).toBeDefined();
        }
      }
    }
  });
});
