import { describe, expect, it } from 'vitest';
import {
  GEN2_BOSS_EVENT_FLAGS,
  getUpcomingGen2Boss,
  parseGen2DailyEvents,
  parseGen2NarrativeFlags,
} from './gen2EventFlags';

describe('Gen 2 Narrative Progression Flags', () => {
  it('should parse specific claimed narrative flags correctly', () => {
    const eventFlags = new Uint8Array(256);

    const falknerFlag = GEN2_BOSS_EVENT_FLAGS['EVENT_BEAT_FALKNER'] as number;
    const mortyFlag = GEN2_BOSS_EVENT_FLAGS['EVENT_BEAT_MORTY'] as number;
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
    expect(flags['EVENT_BEAT_FALKNER']).toBe(true);
    expect(flags['EVENT_BEAT_MORTY']).toBe(true);
    expect(flags['EVENT_BEAT_BLUE']).toBe(true);

    expect(flags['EVENT_BEAT_BUGSY']).toBe(false);
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

describe('Gen 2 Daily and Weekly Event Flags', () => {
  it('should parse daily and weekly flags correctly', () => {
    const eventFlags = new Uint8Array(256);

    // Set Mystery Gift
    eventFlags[226] = (eventFlags[226] || 0) | (1 << 1);

    // Set Bug-Catching Contest (one of them)
    eventFlags[227] = (eventFlags[227] || 0) | (1 << 0); // ID 1816: byte 227, bit 0

    // Set Haircut Brothers
    eventFlags[234] = (eventFlags[234] || 0) | (1 << 4); // Older
    eventFlags[234] = (eventFlags[234] || 0) | (1 << 5); // Younger

    // Set Friday Lapras
    eventFlags[236] = (eventFlags[236] || 0) | (1 << 0);

    // Set Weekday Siblings
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 6); // Monica
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 1); // Tuscany
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 4); // Wesley
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 2); // Arthur
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 0); // Frieda
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 5); // Santos
    eventFlags[235] = (eventFlags[235] || 0) | (1 << 3); // Sunny

    // Set Buena's Password
    eventFlags[83] = (eventFlags[83] || 0) | (1 << 6); // No Blue Card
    eventFlags[103] = (eventFlags[103] || 0) | (1 << 4); // Offered Number
    eventFlags[103] = (eventFlags[103] || 0) | (1 << 5); // Met Buena

    const flags = parseGen2DailyEvents(eventFlags);

    expect(flags.mysteryGift).toBe(true);
    expect(flags.bugCatchingContest).toBe(true);
    expect(flags.haircutBrothers.older).toBe(true);
    expect(flags.haircutBrothers.younger).toBe(true);
    expect(flags.fridayLapras).toBe(true);
    expect(flags.weekdaySiblings.monica).toBe(true);
    expect(flags.weekdaySiblings.tuscany).toBe(true);
    expect(flags.weekdaySiblings.wesley).toBe(true);
    expect(flags.weekdaySiblings.arthur).toBe(true);
    expect(flags.weekdaySiblings.frieda).toBe(true);
    expect(flags.weekdaySiblings.santos).toBe(true);
    expect(flags.weekdaySiblings.sunny).toBe(true);
    expect(flags.buenasPassword.offeredNumberNoBlueCard).toBe(true);
    expect(flags.buenasPassword.offeredNumber).toBe(true);
    expect(flags.buenasPassword.metBuena).toBe(true);
  });

  it('should return false for unset flags', () => {
    const eventFlags = new Uint8Array(256);
    const flags = parseGen2DailyEvents(eventFlags);

    expect(flags.mysteryGift).toBe(false);
    expect(flags.bugCatchingContest).toBe(false);
    expect(flags.haircutBrothers.older).toBe(false);
    expect(flags.haircutBrothers.younger).toBe(false);
    expect(flags.fridayLapras).toBe(false);
    expect(flags.weekdaySiblings.monica).toBe(false);
    expect(flags.weekdaySiblings.tuscany).toBe(false);
    expect(flags.weekdaySiblings.wesley).toBe(false);
    expect(flags.weekdaySiblings.arthur).toBe(false);
    expect(flags.weekdaySiblings.frieda).toBe(false);
    expect(flags.weekdaySiblings.santos).toBe(false);
    expect(flags.weekdaySiblings.sunny).toBe(false);
    expect(flags.buenasPassword.offeredNumberNoBlueCard).toBe(false);
    expect(flags.buenasPassword.offeredNumber).toBe(false);
    expect(flags.buenasPassword.metBuena).toBe(false);
  });
});
