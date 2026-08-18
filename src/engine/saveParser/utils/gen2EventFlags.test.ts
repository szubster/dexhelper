import { describe, expect, it } from 'vitest';
import { GEN2_BOSS_EVENT_FLAGS, getUpcomingGen2Boss, parseGen2NarrativeFlags } from './gen2EventFlags';

describe('Gen 2 Narrative Progression Flags', () => {
  it('should parse specific claimed narrative flags correctly', () => {
    const eventFlags = new Uint8Array(256);

    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    const falknerFlag = GEN2_BOSS_EVENT_FLAGS['EVENT_BEAT_FALKNER'] as number;
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    const mortyFlag = GEN2_BOSS_EVENT_FLAGS['EVENT_BEAT_MORTY'] as number;
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    const blueFlag = GEN2_BOSS_EVENT_FLAGS['EVENT_BEAT_BLUE'] as number;

    const falknerByte = falknerFlag >> 3;
    if (eventFlags[falknerByte] !== undefined) {
      eventFlags[falknerByte] |= 1 << (falknerFlag & 7);
    }
    const mortyByte = mortyFlag >> 3;
    if (eventFlags[mortyByte] !== undefined) {
      eventFlags[mortyByte] |= 1 << (mortyFlag & 7);
    }
    const blueByte = blueFlag >> 3;
    if (eventFlags[blueByte] !== undefined) {
      eventFlags[blueByte] |= 1 << (blueFlag & 7);
    }

    const flags = parseGen2NarrativeFlags(eventFlags);
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    expect(flags['EVENT_BEAT_FALKNER']).toBe(true);
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    expect(flags['EVENT_BEAT_MORTY']).toBe(true);
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    expect(flags['EVENT_BEAT_BLUE']).toBe(true);

    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    expect(flags['EVENT_BEAT_BUGSY']).toBe(false);
    // biome-ignore lint/complexity/useLiteralKeys: required for typescript indexing rule
    expect(flags['EVENT_BEAT_CHAMPION_LANCE']).toBe(false);
  });

  it('should correctly determine the upcoming Gen 2 boss', () => {
    let defeatedBosses: Record<string, boolean> = {};
    let upcomingBoss = getUpcomingGen2Boss(defeatedBosses);
    expect(upcomingBoss).toBe('EVENT_RIVAL_CHERRYGROVE_CITY');

    defeatedBosses = {
      EVENT_RIVAL_CHERRYGROVE_CITY: true,
      EVENT_BEAT_FALKNER: true,
      EVENT_RIVAL_AZALEA_TOWN: true,
      EVENT_BEAT_BUGSY: true,
    };

    upcomingBoss = getUpcomingGen2Boss(defeatedBosses);
    expect(upcomingBoss).toBe('EVENT_BEAT_WHITNEY');

    defeatedBosses = {
      EVENT_RIVAL_CHERRYGROVE_CITY: true,
      EVENT_BEAT_FALKNER: true,
      EVENT_RIVAL_AZALEA_TOWN: true,
      EVENT_BEAT_BUGSY: true,
      EVENT_BEAT_WHITNEY: true,
      EVENT_RIVAL_BURNED_TOWER: true,
      EVENT_BEAT_MORTY: true,
      EVENT_BEAT_CHUCK: true,
      EVENT_BEAT_JASMINE: true,
      EVENT_CLEARED_ROCKET_HIDEOUT: true,
      EVENT_BEAT_PRYCE: true,
      EVENT_RIVAL_GOLDENROD_UNDERGROUND: true,
      EVENT_CLEARED_RADIO_TOWER: true,
      EVENT_BEAT_CLAIR: true,
      EVENT_RIVAL_VICTORY_ROAD: true,
      EVENT_BEAT_ELITE_4_WILL: true,
      EVENT_BEAT_ELITE_4_KOGA: true,
      EVENT_BEAT_ELITE_4_BRUNO: true,
      EVENT_BEAT_ELITE_4_KAREN: true,
      EVENT_BEAT_CHAMPION_LANCE: true,
      EVENT_BEAT_LTSURGE: true,
      EVENT_BEAT_SABRINA: true,
      EVENT_BEAT_ERIKA: true,
      EVENT_BEAT_JANINE: true,
      EVENT_BEAT_MISTY: true,
      EVENT_BEAT_BROCK: true,
      EVENT_BEAT_BLAINE: true,
      EVENT_BEAT_BLUE: true,
      EVENT_BEAT_RIVAL_IN_MT_MOON: true,
      EVENT_RED_IN_MT_SILVER: true,
    };
    upcomingBoss = getUpcomingGen2Boss(defeatedBosses);
    expect(upcomingBoss).toBeNull();
  });
});
