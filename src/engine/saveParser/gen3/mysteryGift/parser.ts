import type { GameVersion, Gen3MysteryGift } from '../../parsers/common';
import {
  FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT,
  FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE,
  FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT,
  FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE,
  FRLG_FLAG_RECEIVED_AURORA_TICKET_BIT,
  FRLG_FLAG_RECEIVED_AURORA_TICKET_BYTE,
  FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BIT,
  FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BYTE,
  MYSTERY_GIFT_FLAGS_OFFSET_EMERALD,
  MYSTERY_GIFT_FLAGS_OFFSET_FRLG,
  MYSTERY_GIFT_FLAGS_OFFSET_RS,
  RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT,
  RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE,
  RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BIT,
  RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BYTE,
  RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT,
  RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE,
  RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BIT,
  RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BYTE,
  RSE_FLAG_RECEIVED_AURORA_TICKET_BIT,
  RSE_FLAG_RECEIVED_AURORA_TICKET_BYTE,
  RSE_FLAG_RECEIVED_MYSTIC_TICKET_BIT,
  RSE_FLAG_RECEIVED_MYSTIC_TICKET_BYTE,
  RSE_FLAG_RECEIVED_OLD_SEA_MAP_BIT,
  RSE_FLAG_RECEIVED_OLD_SEA_MAP_BYTE,
} from './constants';

function checkFlag(view: DataView, baseOffset: number, byteOffset: number, bitIndex: number): boolean {
  try {
    const byte = view.getUint8(baseOffset + byteOffset);
    return (byte & (1 << bitIndex)) !== 0;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function parseGen3MysteryGift(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): Gen3MysteryGift {
  let flagsOffset = saveBlock1Offset;
  if (gameVersion === 'emerald') {
    flagsOffset += MYSTERY_GIFT_FLAGS_OFFSET_EMERALD;
  } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
    flagsOffset += MYSTERY_GIFT_FLAGS_OFFSET_RS;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    flagsOffset += MYSTERY_GIFT_FLAGS_OFFSET_FRLG;
  } else {
    // Fallback if somehow not a gen3 version
    flagsOffset += MYSTERY_GIFT_FLAGS_OFFSET_RS;
  }

  let hasAuroraTicket = false;
  let hasMysticTicket = false;
  const hasEonTicket = false;
  let hasOldSeaMap = false;
  let isSouthernIslandEnabled = false;
  let isBirthIslandEnabled = false;
  let isNavelRockEnabled = false;
  let isFarawayIslandEnabled = false;

  if (gameVersion === 'emerald' || gameVersion === 'ruby' || gameVersion === 'sapphire') {
    hasAuroraTicket = checkFlag(
      view,
      flagsOffset,
      RSE_FLAG_RECEIVED_AURORA_TICKET_BYTE,
      RSE_FLAG_RECEIVED_AURORA_TICKET_BIT,
    );
    hasMysticTicket = checkFlag(
      view,
      flagsOffset,
      RSE_FLAG_RECEIVED_MYSTIC_TICKET_BYTE,
      RSE_FLAG_RECEIVED_MYSTIC_TICKET_BIT,
    );
    hasOldSeaMap = checkFlag(view, flagsOffset, RSE_FLAG_RECEIVED_OLD_SEA_MAP_BYTE, RSE_FLAG_RECEIVED_OLD_SEA_MAP_BIT);

    // Eon ticket isn't listed with a "received" flag in the doc, but we know southern island is enabled.
    // Wait, let's just leave hasEonTicket as false if no received flag is documented, or we could derive it if we wanted. But the interface requires it. We'll set it to false for now unless we know the received flag.
    // Let's actually check if Eon Ticket is just Southern Island enabled, or maybe we leave it false because it's not documented as an item received flag?
    // Actually, we'll set hasEonTicket to false since no received flag was mentioned, or maybe we just leave it for now.

    isSouthernIslandEnabled = checkFlag(
      view,
      flagsOffset,
      RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BYTE,
      RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BIT,
    );
    isBirthIslandEnabled = checkFlag(
      view,
      flagsOffset,
      RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE,
      RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT,
    );
    isNavelRockEnabled = checkFlag(
      view,
      flagsOffset,
      RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE,
      RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT,
    );
    isFarawayIslandEnabled = checkFlag(
      view,
      flagsOffset,
      RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BYTE,
      RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BIT,
    );
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    hasAuroraTicket = checkFlag(
      view,
      flagsOffset,
      FRLG_FLAG_RECEIVED_AURORA_TICKET_BYTE,
      FRLG_FLAG_RECEIVED_AURORA_TICKET_BIT,
    );
    hasMysticTicket = checkFlag(
      view,
      flagsOffset,
      FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BYTE,
      FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BIT,
    );

    isNavelRockEnabled = checkFlag(
      view,
      flagsOffset,
      FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE,
      FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT,
    );
    isBirthIslandEnabled = checkFlag(
      view,
      flagsOffset,
      FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE,
      FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT,
    );
  }

  return {
    hasAuroraTicket,
    hasMysticTicket,
    hasEonTicket, // We'll just leave this as false since it's not explicitly detailed as a received flag in the doc.
    hasOldSeaMap,
    isSouthernIslandEnabled,
    isBirthIslandEnabled,
    isNavelRockEnabled,
    isFarawayIslandEnabled,
  };
}
