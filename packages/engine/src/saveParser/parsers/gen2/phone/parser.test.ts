import { describe, expect, it } from 'vitest';
import { PHONE_LIST_LENGTH, parseGen2PokegearData } from './parser';

describe('Gen 2 Pokegear Parser', () => {
  it('should parse Gold/Silver data correctly', () => {
    const buffer = new ArrayBuffer(0x8000);
    const dataView = new DataView(buffer);

    // Set some data for GS
    // GS_WPHONE_LIST_INDEX (0xcf2a) -> SRAM (0x4f2a)
    dataView.setUint8(0x4f2a, 5);
    // GS_WSPECIAL_PHONE_CALL_ID (0xd97b) -> SRAM (0x597b)
    dataView.setUint8(0x597b, 42);

    // GS_WPHONE_LIST (0xd9c6) -> SRAM (0x59c6)
    for (let i = 0; i < PHONE_LIST_LENGTH; i++) {
      dataView.setUint8(0x59c6 + i, i + 1);
    }

    const result = parseGen2PokegearData(dataView, false);

    expect(result.phoneListIndex).toBe(5);
    expect(result.specialPhoneCallId).toBe(42);
    expect(result.phoneList).toHaveLength(PHONE_LIST_LENGTH);
    expect(result.phoneList[0]).toBe(1);
    expect(result.phoneList[10]).toBe(11);
    expect(result.swarmFlags).toBeUndefined();
    // In our test loop above, we populate IDs 1 to 11.
    // ID 6 is Beverly (Nugget)
    expect(result.highValueContacts).toBeDefined();
    expect(result.highValueContacts?.some((c) => c.id === 6)).toBe(true);
  });

  it('should parse Crystal data correctly', () => {
    const buffer = new ArrayBuffer(0x8000);
    const dataView = new DataView(buffer);

    // Set some data for Crystal
    dataView.setUint8(0xd03f - 0x8000, 3);
    dataView.setUint8(0xdc31 - 0x8000, 100);
    dataView.setUint8(0xdc20 - 0x8000, 0b10101010);
    dataView.setUint32(0xdc50 - 0x8000, 0x12345678, true);
    dataView.setUint32(0xdc54 - 0x8000, 0x87654321, true);

    for (let i = 0; i < PHONE_LIST_LENGTH; i++) {
      dataView.setUint8(0xdc7c - 0x8000 + i, 20 - i);
    }

    const result = parseGen2PokegearData(dataView, true);

    expect(result.phoneListIndex).toBe(3);
    expect(result.specialPhoneCallId).toBe(100);
    expect(result.swarmFlags).toBe(0b10101010);
    expect(result.dailyPhoneItemFlags).toBe(0x12345678);
    expect(result.dailyPhoneTimeOfDayFlags).toBe(0x87654321);
    expect(result.phoneList).toHaveLength(PHONE_LIST_LENGTH);
    expect(result.phoneList[0]).toBe(20);
    // In our loop, we populate IDs from 20 down to 10.
    // ID 20 is Camper Todd (HP Up), ID 17 is Ralph (Swarm), ID 16 is Wade, ID 13 is Jose.
    expect(result.highValueContacts).toBeDefined();
    expect(result.highValueContacts?.length).toBeGreaterThan(0);
  });

  it('should throw an error on out of bounds reads', () => {
    const buffer = new ArrayBuffer(10); // Very small buffer
    const dataView = new DataView(buffer);

    expect(() => parseGen2PokegearData(dataView, true)).toThrow('The save file is corrupted or incomplete.');
  });
});
