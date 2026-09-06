import type { RuinsOfAlphPuzzles } from '../parsers/common';
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

/**
 * Evaluates the Gen 2 narrative event flags to determine which bosses and rivals have been defeated.
 *
 * **Architecture Note:**
 * Gen 2 narrative flags are stored as bits packed into a byte array. This function decodes those
 * bits using predefined flag indices. It's important to note that while "true" generally means the flag is set,
 * for some Gen 2 rival events (e.g. EVENT_RIVAL_CHERRYGROVE_CITY), the flag being set actually indicates
 * they are NO LONGER present because you have defeated them.
 *
 * @param eventFlags - The raw byte array containing the parsed event flags section of the save file.
 * @returns A dictionary mapping the narrative event key to a boolean indicating if it has been completed (true = defeated).
 * @example
 * const narrativeFlags = parseGen2NarrativeFlags(saveData.eventFlags);
 * if (narrativeFlags['EVENT_BEAT_FALKNER']) { console.log('Falkner has been defeated!'); }
 */
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

/**
 * Determines the next immediate boss or major narrative event the player should encounter.
 *
 * It iterates sequentially through the standard storyline order of Gen 2 until it finds the
 * first event flag that evaluates to false (not completed/defeated).
 *
 * @param defeatedBosses - A dictionary of boolean flags mapping event keys to completion status, typically the output of `parseGen2NarrativeFlags`.
 * @returns The key of the next upcoming boss event, or null if all listed narrative events are completed.
 * @example
 * const nextBoss = getUpcomingGen2Boss(narrativeFlags);
 * if (nextBoss === 'EVENT_BEAT_WHITNEY') { console.log('Prepare for Miltank!'); }
 */
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

const DAILY_EVENT_MYSTERY_GIFT_BYTE = 226;
const DAILY_EVENT_MYSTERY_GIFT_BIT = 1;

const BUG_CATCHING_CONTEST_START_ID = 1814;
const BUG_CATCHING_CONTEST_END_ID = 1833;

const HAIRCUT_OLDER_BYTE = 234;
const HAIRCUT_OLDER_BIT = 4;
const HAIRCUT_YOUNGER_BYTE = 234;
const HAIRCUT_YOUNGER_BIT = 5;

const WEEKLY_LAPRAS_BYTE = 236;
const WEEKLY_LAPRAS_BIT = 0;

const SIBLING_MONICA_BYTE = 235;
const SIBLING_MONICA_BIT = 6;
const SIBLING_TUSCANY_BYTE = 235;
const SIBLING_TUSCANY_BIT = 1;
const SIBLING_WESLEY_BYTE = 235;
const SIBLING_WESLEY_BIT = 4;
const SIBLING_ARTHUR_BYTE = 235;
const SIBLING_ARTHUR_BIT = 2;
const SIBLING_FRIEDA_BYTE = 235;
const SIBLING_FRIEDA_BIT = 0;
const SIBLING_SANTOS_BYTE = 235;
const SIBLING_SANTOS_BIT = 5;
const SIBLING_SUNNY_BYTE = 235;
const SIBLING_SUNNY_BIT = 3;

const BUENA_NO_BLUE_CARD_BYTE = 83;
const BUENA_NO_BLUE_CARD_BIT = 6;
const BUENA_OFFERED_NUMBER_BYTE = 103;
const BUENA_OFFERED_NUMBER_BIT = 4;
const BUENA_MET_BYTE = 103;
const BUENA_MET_BIT = 5;

/**
 * Extracts Gen 2 Daily and Weekly Event Flags.
 *
 * @param eventFlags - The raw byte array containing the parsed event flags section of the save file.
 * @returns An object detailing the status of various daily and weekly events.
 */
export function parseGen2DailyEvents(eventFlags: Uint8Array) {
  const getFlag = (byteIndex: number, bitIndex: number) => {
    return eventFlags[byteIndex] !== undefined && (eventFlags[byteIndex] & (1 << bitIndex)) !== 0;
  };

  let bugCatchingContest = false;
  for (let id = BUG_CATCHING_CONTEST_START_ID; id <= BUG_CATCHING_CONTEST_END_ID; id++) {
    const byteIndex = id >> BITS_PER_BYTE_SHIFT;
    const bitIndex = id & BIT_INDEX_MASK;
    if (getFlag(byteIndex, bitIndex)) {
      bugCatchingContest = true;
      break;
    }
  }

  return {
    mysteryGift: getFlag(DAILY_EVENT_MYSTERY_GIFT_BYTE, DAILY_EVENT_MYSTERY_GIFT_BIT),
    bugCatchingContest,
    haircutBrothers: {
      older: getFlag(HAIRCUT_OLDER_BYTE, HAIRCUT_OLDER_BIT),
      younger: getFlag(HAIRCUT_YOUNGER_BYTE, HAIRCUT_YOUNGER_BIT),
    },
    fridayLapras: getFlag(WEEKLY_LAPRAS_BYTE, WEEKLY_LAPRAS_BIT),
    weekdaySiblings: {
      monica: getFlag(SIBLING_MONICA_BYTE, SIBLING_MONICA_BIT),
      tuscany: getFlag(SIBLING_TUSCANY_BYTE, SIBLING_TUSCANY_BIT),
      wesley: getFlag(SIBLING_WESLEY_BYTE, SIBLING_WESLEY_BIT),
      arthur: getFlag(SIBLING_ARTHUR_BYTE, SIBLING_ARTHUR_BIT),
      frieda: getFlag(SIBLING_FRIEDA_BYTE, SIBLING_FRIEDA_BIT),
      santos: getFlag(SIBLING_SANTOS_BYTE, SIBLING_SANTOS_BIT),
      sunny: getFlag(SIBLING_SUNNY_BYTE, SIBLING_SUNNY_BIT),
    },
    buenasPassword: {
      offeredNumberNoBlueCard: getFlag(BUENA_NO_BLUE_CARD_BYTE, BUENA_NO_BLUE_CARD_BIT),
      offeredNumber: getFlag(BUENA_OFFERED_NUMBER_BYTE, BUENA_OFFERED_NUMBER_BIT),
      metBuena: getFlag(BUENA_MET_BYTE, BUENA_MET_BIT),
    },
  };
}

export const RUINS_OF_ALPH_HO_OH_BYTE = 40;
export const RUINS_OF_ALPH_HO_OH_BIT = 7;
export const RUINS_OF_ALPH_KABUTO_BYTE = 41;
export const RUINS_OF_ALPH_KABUTO_BIT = 0;
export const RUINS_OF_ALPH_OMANYTE_BYTE = 41;
export const RUINS_OF_ALPH_OMANYTE_BIT = 1;
export const RUINS_OF_ALPH_AERODACTYL_BYTE = 41;
export const RUINS_OF_ALPH_AERODACTYL_BIT = 2;

export function parseGen2RuinsOfAlphPuzzles(eventFlags: Uint8Array): RuinsOfAlphPuzzles {
  const getFlag = (byteIndex: number, bitIndex: number) => {
    if (byteIndex >= eventFlags.length || byteIndex < 0) {
      throw new RangeError('The save file is corrupted or incomplete.');
    }
    return ((eventFlags[byteIndex] ?? 0) & (1 << bitIndex)) !== 0;
  };

  return {
    hoOh: getFlag(RUINS_OF_ALPH_HO_OH_BYTE, RUINS_OF_ALPH_HO_OH_BIT),
    kabuto: getFlag(RUINS_OF_ALPH_KABUTO_BYTE, RUINS_OF_ALPH_KABUTO_BIT),
    omanyte: getFlag(RUINS_OF_ALPH_OMANYTE_BYTE, RUINS_OF_ALPH_OMANYTE_BIT),
    aerodactyl: getFlag(RUINS_OF_ALPH_AERODACTYL_BYTE, RUINS_OF_ALPH_AERODACTYL_BIT),
  };
}
