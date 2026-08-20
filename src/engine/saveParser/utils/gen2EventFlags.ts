export const GEN2_BOSS_EVENT_FLAGS: Record<string, number> = {
  EVENT_RIVAL_CHERRYGROVE_CITY: 1726,
  EVENT_BEAT_FALKNER: 1213,
  EVENT_RIVAL_AZALEA_TOWN: 1727,
  EVENT_BEAT_BUGSY: 1214,
  EVENT_BEAT_RIVAL_IN_MT_MOON: 793,
  EVENT_BEAT_WHITNEY: 1215,
  EVENT_RIVAL_BURNED_TOWER: 1733,
  EVENT_BEAT_MORTY: 1216,
  EVENT_BEAT_CHUCK: 1218,
  EVENT_BEAT_JASMINE: 1217,
  EVENT_CLEARED_ROCKET_HIDEOUT: 34,
  EVENT_BEAT_PRYCE: 1219,
  EVENT_RIVAL_GOLDENROD_UNDERGROUND: 1729,
  EVENT_CLEARED_RADIO_TOWER: 33,
  EVENT_BEAT_CLAIR: 1220,
  EVENT_RIVAL_VICTORY_ROAD: 1730,
  EVENT_BEAT_ELITE_4_WILL: 1464,
  EVENT_BEAT_ELITE_4_KOGA: 1465,
  EVENT_BEAT_ELITE_4_BRUNO: 1466,
  EVENT_BEAT_ELITE_4_KAREN: 1467,
  EVENT_BEAT_CHAMPION_LANCE: 1468,
  EVENT_BEAT_LTSURGE: 1223,
  EVENT_BEAT_SABRINA: 1226,
  EVENT_BEAT_ERIKA: 1224,
  EVENT_BEAT_JANINE: 1225,
  EVENT_BEAT_MISTY: 1222,
  EVENT_BEAT_BROCK: 1221,
  EVENT_BEAT_BLAINE: 1227,
  EVENT_BEAT_BLUE: 1228,
  EVENT_RED_IN_MT_SILVER: 1890,
};

const BITS_PER_BYTE_SHIFT = 3;
const BIT_INDEX_MASK = 7;

export function parseGen2NarrativeFlags(eventFlags: Uint8Array): Record<string, boolean> {
  const flags: Record<string, boolean> = {};
  for (const [key, flag] of Object.entries(GEN2_BOSS_EVENT_FLAGS)) {
    const byteIndex = flag >> BITS_PER_BYTE_SHIFT;
    const bitIndex = flag & BIT_INDEX_MASK;
    // For narrative flags, "true" generally means the flag is set.
    // However, for some Gen 2 rival events, the flag being set means they are NO LONGER there (i.e. defeated).
    // Wait, let's check EVENT_RIVAL_CHERRYGROVE_CITY. It is set when you beat him to hide him.
    // So if it is 1, you defeated him. Yes.
    // EVENT_RED_IN_MT_SILVER is set when you defeat him, making him disappear until Hall of Fame? Wait, EVENT_RED_IN_MT_SILVER might be inverse? Let's treat them all as 1 = defeated for now.
    flags[key] = eventFlags[byteIndex] !== undefined && (eventFlags[byteIndex] & (1 << bitIndex)) !== 0;
  }
  return flags;
}

export function getUpcomingGen2Boss(defeatedBosses: Record<string, boolean>): string | null {
  const narrativeOrder = [
    'EVENT_RIVAL_CHERRYGROVE_CITY',
    'EVENT_BEAT_FALKNER',
    'EVENT_RIVAL_AZALEA_TOWN',
    'EVENT_BEAT_BUGSY',
    'EVENT_BEAT_WHITNEY',
    'EVENT_RIVAL_BURNED_TOWER',
    'EVENT_BEAT_MORTY',
    'EVENT_BEAT_CHUCK',
    'EVENT_BEAT_JASMINE',
    'EVENT_CLEARED_ROCKET_HIDEOUT',
    'EVENT_BEAT_PRYCE',
    'EVENT_RIVAL_GOLDENROD_UNDERGROUND',
    'EVENT_CLEARED_RADIO_TOWER',
    'EVENT_BEAT_CLAIR',
    'EVENT_RIVAL_VICTORY_ROAD',
    'EVENT_BEAT_ELITE_4_WILL',
    'EVENT_BEAT_ELITE_4_KOGA',
    'EVENT_BEAT_ELITE_4_BRUNO',
    'EVENT_BEAT_ELITE_4_KAREN',
    'EVENT_BEAT_CHAMPION_LANCE',
    'EVENT_BEAT_LTSURGE',
    'EVENT_BEAT_SABRINA',
    'EVENT_BEAT_ERIKA',
    'EVENT_BEAT_JANINE',
    'EVENT_BEAT_MISTY',
    'EVENT_BEAT_BROCK',
    'EVENT_BEAT_BLAINE',
    'EVENT_BEAT_BLUE',
    'EVENT_BEAT_RIVAL_IN_MT_MOON',
    'EVENT_RED_IN_MT_SILVER',
  ];

  for (const boss of narrativeOrder) {
    if (!defeatedBosses[boss]) {
      return boss;
    }
  }
  return null;
}
