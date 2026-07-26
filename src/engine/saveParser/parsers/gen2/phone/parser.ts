const GS_SPECIAL_PHONE_CALL_ID_OFFSET = 0xd97b - 0xa000;
const GS_PHONE_LIST_OFFSET = 0xd9c6 - 0xa000;

const CRYSTAL_SWARM_FLAGS_OFFSET = 0xdc20 - 0xa000;
const CRYSTAL_SPECIAL_PHONE_CALL_ID_OFFSET = 0xdc31 - 0xa000;
const CRYSTAL_DAILY_PHONE_ITEM_FLAGS_OFFSET = 0xdc50 - 0xa000;
const CRYSTAL_DAILY_PHONE_TIME_OF_DAY_FLAGS_OFFSET = 0xdc54 - 0xa000;
const CRYSTAL_PHONE_LIST_OFFSET = 0xdc7c - 0xa000;

const CONTACT_LIST_SIZE = 10;

export interface Gen2PokegearData {
  phoneList: number[];
  swarmFlags: number;
  dailyPhoneItemFlags: number;
  dailyPhoneTimeOfDayFlags: number;
  specialPhoneCallID: number;
}

export function parseGen2Pokegear(view: DataView, isCrystal: boolean): Gen2PokegearData {
  const phoneList: number[] = [];
  let swarmFlags = 0;
  let dailyPhoneItemFlags = 0;
  let dailyPhoneTimeOfDayFlags = 0;
  let specialPhoneCallID = 0;

  try {
    const listOffset = isCrystal ? CRYSTAL_PHONE_LIST_OFFSET : GS_PHONE_LIST_OFFSET;

    for (let i = 0; i < CONTACT_LIST_SIZE + 1; i++) {
      phoneList.push(view.getUint8(listOffset + i));
    }

    specialPhoneCallID = view.getUint8(
      isCrystal ? CRYSTAL_SPECIAL_PHONE_CALL_ID_OFFSET : GS_SPECIAL_PHONE_CALL_ID_OFFSET,
    );

    if (isCrystal) {
      swarmFlags = view.getUint8(CRYSTAL_SWARM_FLAGS_OFFSET);
      dailyPhoneItemFlags = view.getUint32(CRYSTAL_DAILY_PHONE_ITEM_FLAGS_OFFSET, true);
      dailyPhoneTimeOfDayFlags = view.getUint32(CRYSTAL_DAILY_PHONE_TIME_OF_DAY_FLAGS_OFFSET, true);
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return {
    phoneList,
    swarmFlags,
    dailyPhoneItemFlags,
    dailyPhoneTimeOfDayFlags,
    specialPhoneCallID,
  };
}
