// Module-level constants for WRAM/SRAM mapping and offsets
export const WRAM_BANK_1_START = 0xa000;
export const SRAM_BANK_1_START = 0x2000;
export const SRAM_WRAM_OFFSET_ADJUST = WRAM_BANK_1_START - SRAM_BANK_1_START; // 0x8000

// Gold/Silver WRAM Offsets
export const GS_WPHONE_LIST_INDEX = 0xcf2a;
export const GS_WSPECIAL_PHONE_CALL_ID = 0xd97b;
export const GS_WPHONE_LIST = 0xd9c6;

// Crystal WRAM Offsets
export const CRYSTAL_WPHONE_LIST_INDEX = 0xd03f;
export const CRYSTAL_WSWARM_FLAGS = 0xdc20;
export const CRYSTAL_WSPECIAL_PHONE_CALL_ID = 0xdc31;
export const CRYSTAL_WDAILY_PHONE_ITEM_FLAGS = 0xdc50;
export const CRYSTAL_WDAILY_PHONE_TIME_OF_DAY_FLAGS = 0xdc54;
export const CRYSTAL_WPHONE_LIST = 0xdc7c;

export const CONTACT_LIST_SIZE = 10;
export const PHONE_LIST_LENGTH = CONTACT_LIST_SIZE + 1;

import type { HighValueContact } from './constants';
import { filterHighValueCalls } from './filter';

export interface PokegearPhoneData {
  phoneListIndex: number;
  specialPhoneCallId: number;
  phoneList: number[];
  highValueContacts?: HighValueContact[];
  swarmFlags?: number;
  dailyPhoneItemFlags?: number;
  dailyPhoneTimeOfDayFlags?: number;
}

export function parseGen2PokegearData(dataView: DataView, isCrystal: boolean): PokegearPhoneData {
  try {
    if (isCrystal) {
      const phoneListIndex = dataView.getUint8(CRYSTAL_WPHONE_LIST_INDEX - SRAM_WRAM_OFFSET_ADJUST);
      const specialPhoneCallId = dataView.getUint8(CRYSTAL_WSPECIAL_PHONE_CALL_ID - SRAM_WRAM_OFFSET_ADJUST);
      const swarmFlags = dataView.getUint8(CRYSTAL_WSWARM_FLAGS - SRAM_WRAM_OFFSET_ADJUST);
      const dailyPhoneItemFlags = dataView.getUint32(CRYSTAL_WDAILY_PHONE_ITEM_FLAGS - SRAM_WRAM_OFFSET_ADJUST, true); // Little endian read for 4 bytes? The docs don't specify, but bitflags are usually easiest treated as an array of bytes or 32-bit uint. We'll use getUint32. Actually, let's just get it as 4 bytes.
      const dailyPhoneTimeOfDayFlags = dataView.getUint32(
        CRYSTAL_WDAILY_PHONE_TIME_OF_DAY_FLAGS - SRAM_WRAM_OFFSET_ADJUST,
        true,
      );

      const phoneListOffset = CRYSTAL_WPHONE_LIST - SRAM_WRAM_OFFSET_ADJUST;
      const phoneList: number[] = [];
      for (let i = 0; i < PHONE_LIST_LENGTH; i++) {
        phoneList.push(dataView.getUint8(phoneListOffset + i));
      }

      return {
        phoneListIndex,
        specialPhoneCallId,
        swarmFlags,
        dailyPhoneItemFlags,
        dailyPhoneTimeOfDayFlags,
        phoneList,
        highValueContacts: filterHighValueCalls(phoneList),
      };
    } else {
      const phoneListIndex = dataView.getUint8(GS_WPHONE_LIST_INDEX - SRAM_WRAM_OFFSET_ADJUST);
      const specialPhoneCallId = dataView.getUint8(GS_WSPECIAL_PHONE_CALL_ID - SRAM_WRAM_OFFSET_ADJUST);

      const phoneListOffset = GS_WPHONE_LIST - SRAM_WRAM_OFFSET_ADJUST;
      const phoneList: number[] = [];
      for (let i = 0; i < PHONE_LIST_LENGTH; i++) {
        phoneList.push(dataView.getUint8(phoneListOffset + i));
      }

      return {
        phoneListIndex,
        specialPhoneCallId,
        phoneList,
        highValueContacts: filterHighValueCalls(phoneList),
      };
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
