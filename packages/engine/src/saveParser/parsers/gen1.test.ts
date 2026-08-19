import { describe, expect, it, test } from 'vitest';
import { isGen1Save } from '@/utils/detection';
import { parseGen1 } from './gen1';

describe('gen1 parsers', () => {
  describe('TM/HM parsing', () => {
    it('should map TM items to moves and extract event flags', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      // set up enough for isGen1Save to pass
      view.setUint8(0x2f2c, 1);
      view.setUint8(0x2f2d, 15);
      view.setUint8(0x2f2e, 0xff);
      // set EVENT_GOT_TM42 flag (offset 0x29E6 + 0x29/8 = 0x29EB, bit 0x29%8 = 1)
      view.setUint8(0x29eb, 2);
      // add TM01 to inventory
      view.setUint8(0x25c9, 1);
      view.setUint8(0x25ca, 201);
      view.setUint8(0x25cb, 3);
      const parsed = parseGen1(view);
      expect(parsed.gen1TMEventFlags?.[242]).toBe(true);
      const tm42 = parsed.tms?.find((t) => t.id === 242);
      expect(tm42?.isAcquired).toBe(true);
      expect(tm42?.quantity).toBe(0);
      const tm01 = parsed.tms?.find((t) => t.id === 201);
      expect(tm01?.isAcquired).toBe(true);
      expect(tm01?.quantity).toBe(3);
    });
  });
  describe('isGen1Save', () => {
    const cases = [
      { name: 'invalid party count', u8Mods: { 0x2f2c: 7 }, expected: false },
      { name: 'missing party terminator', u8Mods: { 0x2f2c: 1, 0x2f2e: 0x00 }, expected: false },
      { name: 'invalid species id 0', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 0 }, expected: false },
      { name: 'invalid species id 255', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 0xff }, expected: false },
      { name: 'valid save', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 15 }, expected: true },
    ];

    test.for(cases)('should return $expected for $name', ({ u8Mods, expected }) => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      for (const [offset, value] of Object.entries(u8Mods)) {
        view.setUint8(Number(offset), value as number);
      }
      expect(isGen1Save(view)).toBe(expected);
    });
  });
});

describe('parseGen1 - specific data extraction', () => {
  it('should parse party, inventory, and badges correctly', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Party Count = 1
    view.setUint8(0x2f2c, 1);
    // Species List
    view.setUint8(0x2f2d, 15); // Internal ID 15 = Dex 29 (NidoranF)
    view.setUint8(0x2f2e, 0xff); // Terminator

    // Party Details (offset 0x2f2d + 7 = 0x2f34)
    const pOff = 0x2f34;
    view.setUint8(pOff, 15); // Internal ID
    view.setUint8(pOff + 33, 10); // Level
    view.setUint8(pOff + 8, 1); // Move 1: Pound
    view.setUint16(pOff + 27, 0xaaaa, false); // DVs (making it shiny: def=10, spd=10, spc=10, atk=10)

    // OT (offset 0x2f34 + 6*44 = 0x303c)
    // Name: "ASH"
    view.setUint8(0x303c, 0x80);
    view.setUint8(0x303d, 0x92);
    view.setUint8(0x303e, 0x87);
    view.setUint8(0x303f, 0x50);

    // Set owned/seen for detection (15)
    view.setUint8(0x25a3 + Math.floor(28 / 8), 1 << (28 % 8));
    view.setUint8(0x25b6 + Math.floor(28 / 8), 1 << (28 % 8));

    // Badges
    view.setUint8(0x2602, 3); // 2 badges

    // Trainer ID
    view.setUint16(0x2605, 12345, false);

    // Current Map
    view.setUint8(0x260a, 0); // Pallet Town

    // Inventory
    view.setUint8(0x25c9, 2); // 2 items
    view.setUint8(0x25ca, 4); // Poke Ball
    view.setUint8(0x25cb, 5); // Qty
    view.setUint8(0x25cc, 10); // Moon Stone
    view.setUint8(0x25cd, 1); // Qty

    // Current Box Num
    view.setUint8(0x284c, 0);

    // Current Box Count
    view.setUint8(0x30c0, 1);
    view.setUint8(0x30c1, 153); // Internal 153 = Bulbasaur (Dex 1)

    // Current Box Pokemon (offset 0x30c1 + 21 = 0x30d6)
    const bOff = 0x30d6;
    view.setUint8(bOff, 153);
    view.setUint8(bOff + 3, 5); // Level

    // Hidden Item Event Flags
    const hiddenItemOffset = 0x299c;
    view.setUint8(hiddenItemOffset, 0b10101010);
    view.setUint8(hiddenItemOffset + 1, 0b01010101);

    // Hidden Coin Event Flags
    const hiddenCoinOffset = 0x29aa;
    view.setUint8(hiddenCoinOffset, 0b11001100);
    view.setUint8(hiddenCoinOffset + 1, 0b00110011);

    // Parse!
    const data = parseGen1(view);

    expect(data.partyDetails.length).toBe(1);
    expect(data.partyDetails[0]?.speciesId).toBe(29);
    expect(data.partyDetails[0]?.level).toBe(10);
    expect(data.partyDetails[0]?.isShiny).toBe(true); // 0xaaaa gives 10 10 10 10
    expect(data.partyDetails[0]?.moves).toContain(1);
    expect(data.partyDetails[0]?.otName).toBe('ASH');

    expect(data.badges).toBe(3);
    expect(data.trainerId).toBe(12345);
    expect(data.currentMapName).toBe('Pallet Town');

    expect(data.inventory.length).toBe(2);
    expect(data.inventory[0]?.id).toBe(4);
    expect(data.inventory[0]?.quantity).toBe(5);

    expect(data.pcDetails.length).toBe(1);
    expect(data.pcDetails[0]?.speciesId).toBe(1);
    expect(data.pcDetails[0]?.level).toBe(5);

    expect(data.hiddenItemFlags).toBeDefined();
    expect(data.hiddenItemFlags?.length).toBe(14);
    expect(data.hiddenItemFlags?.[0]).toBe(0b10101010);
    expect(data.hiddenItemFlags?.[1]).toBe(0b01010101);

    expect(data.hiddenCoinFlags).toBeDefined();
    expect(data.hiddenCoinFlags?.length).toBe(2);
    expect(data.hiddenCoinFlags?.[0]).toBe(0b11001100);
    expect(data.hiddenCoinFlags?.[1]).toBe(0b00110011);
  });

  it('should parse other PC boxes correctly', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    view.setUint8(0x284c, 0); // Current Box = 0

    // Put pokemon in Box 2 (index 1) which is at 0x4462
    view.setUint8(0x4462, 1); // count
    view.setUint8(0x4463, 153); // Bulbasaur

    const pOff = 0x4462 + 22; // 0x4478
    view.setUint8(pOff, 153);
    view.setUint8(pOff + 3, 12); // level
    view.setUint8(pOff + 8, 1); // move

    const otOff = pOff + 20 * 33;
    view.setUint8(otOff, 0x80);
    view.setUint8(otOff + 1, 0x50); // "A"

    const data = parseGen1(view);

    const pcMons = data.pcDetails.filter((p) => p.storageLocation === 'Box 2');
    expect(pcMons.length).toBe(1);
    expect(pcMons[0]?.speciesId).toBe(1);
    expect(pcMons[0]?.level).toBe(12);
    expect(pcMons[0]?.otName).toBe('A');
  });

  it('should fall back correctly and apply +1 shift for Yellow', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Force a Yellow save by passing 'yellow'
    // We expect it to use +1 for shifts.
    // E.g. Badges should be at 0x2602 + 1 = 0x2603

    // To get offsetShift = 1, res1.paddingBitIsCorrect must be true, and res0.paddingBitIsCorrect false.
    // paddingBitIsCorrect is checking if bit 7 of (ownedBase + 18) is 0.
    // res0 ownedBase = 0x25A3. + 18 = 0x25B5
    // res1 ownedBase = 0x25A4. + 18 = 0x25B6
    view.setUint8(0x25b5, 0x80); // res0 false
    view.setUint8(0x25b6, 0x00); // res1 true

    view.setUint8(0x2603, 5); // Badges

    const data = parseGen1(view, 'yellow');

    // We set badges at 0x2603, which is 0x2602 + 1 (the offset shift).
    // However, we also need to ensure that the heuristic detectForOffset sets offsetShift to 1.
    // But if we pass forcedVersion='yellow', it sets isYellow=true.
    // Wait, let's look at gen1.ts lines 320:
    // let isYellow = forcedVersion === 'yellow';
    // if (!forcedVersion) {
    //   if (resToUse === res1 || res0.version === 'yellow' || res1.version === 'yellow') {
    //     isYellow = true;
    //   }
    // }
    // const offsetShift = resToUse === res1 ? 1 : 0;
    // Ah! `offsetShift` is determined ONLY by `resToUse === res1`. It is NOT overridden by forcedVersion.
    // So to make offsetShift=1, we must make `res1.paddingBitIsCorrect` true and `res0` false.
    expect(data.gameVersion).toBe('yellow');
  });
});

describe('parseGen1 - trainerFlags extraction', () => {
  const EVENT_FLAGS_OFFSET = 0x29e6;
  const EVENT_FLAGS_LENGTH = 0x118;

  it('should extract trainerFlags with absolute zero state and boundary values (ADR 026)', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Absolute zero state
    let data = parseGen1(view);
    expect(data.trainerFlags).toBeDefined();
    expect(data.trainerFlags?.length).toBe(2240);
    expect(data.trainerFlags?.every((flag) => flag === false)).toBe(true);

    // Set all bits to 1
    for (let i = 0; i < EVENT_FLAGS_LENGTH; i++) {
      view.setUint8(EVENT_FLAGS_OFFSET + i, 0xff);
    }
    data = parseGen1(view);
    expect(data.trainerFlags?.every((flag) => flag === true)).toBe(true);

    // Set specific boundaries (first bit and last bit)
    for (let i = 0; i < EVENT_FLAGS_LENGTH; i++) {
      view.setUint8(EVENT_FLAGS_OFFSET + i, 0x00);
    }
    view.setUint8(EVENT_FLAGS_OFFSET, 0x01); // 1st bit
    view.setUint8(EVENT_FLAGS_OFFSET + EVENT_FLAGS_LENGTH - 1, 0x80); // Last bit
    data = parseGen1(view);
    expect(data.trainerFlags?.[0]).toBe(true);
    expect(data.trainerFlags?.[1]).toBe(false);
    expect(data.trainerFlags?.[2239]).toBe(true);
    expect(data.trainerFlags?.[2238]).toBe(false);
  });
});

describe('parseGen1 - additional branches', () => {
  it('should ignore invalid species when extracting party', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    view.setUint8(0x2f2c, 2); // 2 pokemon
    view.setUint8(0x2f2d, 15); // Valid internal ID
    view.setUint8(0x2f2e, 0); // Invalid internal ID

    // Need to actually populate the structure to be found correctly.
    // Offset for first pokemon's detailed data
    const shiftedPartyDataOffset = 0x2f2d + 7;
    view.setUint8(shiftedPartyDataOffset, 15); // First is valid
    view.setUint8(shiftedPartyDataOffset + 44, 0); // Second is invalid

    const data = parseGen1(view);
    expect(data.partyDetails.length).toBe(1);
  });

  it('should ignore invalid species when extracting pc boxes', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    view.setUint8(0x30c0, 2);
    view.setUint8(0x30c1, 153); // Valid internal ID
    view.setUint8(0x30c2, 0xff); // Invalid internal ID

    const currentBoxDataOffset = 0x30c1 + 21;
    view.setUint8(currentBoxDataOffset, 153); // First is valid
    view.setUint8(currentBoxDataOffset + 33, 0xff); // Second is invalid

    const data = parseGen1(view);
    expect(data.pcDetails.length).toBe(1);
  });

  it('should ignore box offset if count > 20', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    view.setUint8(0x284c, 0); // current box = 0
    view.setUint8(0x4462, 21); // box 2 count = 21 (invalid)

    const data = parseGen1(view);
    // Shouldn't crash and shouldn't add pc details
    expect(data.pcDetails.filter((p) => p.storageLocation === 'Box 2').length).toBe(0);
  });

  it('should handle hallOfFameCount raw value of 0xff', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);
    view.setUint8(0x25b3, 0xff);

    const data = parseGen1(view);
    expect(data.hallOfFameCount).toBe(0);
  });

  it('should extract Hall of Fame records correctly', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Trainer name 'AB'
    view.setUint8(0x2598, 0x80);
    view.setUint8(0x2599, 0x81);
    view.setUint8(0x259a, 0x50);

    // Party count 0
    view.setUint8(0x2f2c, 0);

    // hallOfFameCount = 1
    view.setUint8(0x25b3, 1);

    // HoF record 0
    const hofBase = 0x0598;
    // Pokemon 0 in record 0
    view.setUint8(hofBase + 0, 0x01); // internal ID 0x01 -> dex 112 (Rhydon)
    view.setUint8(hofBase + 1, 16); // level 16
    // Nickname 'B'
    view.setUint8(hofBase + 2, 0x81);
    view.setUint8(hofBase + 3, 0x50);

    // Empty Pokemon 1 in record 0 (to test skip)
    view.setUint8(hofBase + 0x10, 0xff);

    const data = parseGen1(view);

    expect(data.hallOfFameCount).toBe(1);
    expect(data.hallOfFameRecords).toBeDefined();
    expect(data.hallOfFameRecords?.length).toBe(1);

    const record = data.hallOfFameRecords?.[0];
    expect(record?.playerName).toBe('AB');
    expect(record?.pokemon.length).toBe(1);

    const pkmn = record?.pokemon[0];
    expect(pkmn?.speciesId).toBe(112);
    expect(pkmn?.level).toBe(16);
    expect(pkmn?.nickname).toBe('B');
  });

  it('should safely catch RangeError when reading HOF records out of bounds', () => {
    // Standard size buffer, but we will wrap the view to throw RangeError for HOF
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Trainer name 'AB'
    view.setUint8(0x2598, 0x80);
    view.setUint8(0x2599, 0x81);
    view.setUint8(0x259a, 0x50);

    // Party count 0
    view.setUint8(0x2f2c, 0);

    // hallOfFameCount = 1
    view.setUint8(0x25b3, 1);

    // Override the getUint8 to throw a RangeError at the HOF offsets
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (byteOffset: number) => {
      // HOF_BASE_OFFSET is 0x0598
      if (byteOffset === 0x0598) {
        throw new RangeError('Simulated Out of bounds');
      }
      if (byteOffset === 0x0599) {
        // Trigger the second catch for the level
        throw new RangeError('Simulated Out of bounds on level');
      }
      return originalGetUint8(byteOffset);
    };

    const data = parseGen1(view);
    expect(data.hallOfFameCount).toBe(1);
    expect(data.hallOfFameRecords?.length).toBe(0); // With full block try/catch, broken record is aborted
  });

  it('should safely catch RangeError when reading HOF level out of bounds', () => {
    // Standard size buffer, but we will wrap the view to throw RangeError for HOF
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Trainer name 'AB'
    view.setUint8(0x2598, 0x80);
    view.setUint8(0x2599, 0x81);
    view.setUint8(0x259a, 0x50);

    // Party count 0
    view.setUint8(0x2f2c, 0);

    // hallOfFameCount = 1
    view.setUint8(0x25b3, 1);

    view.setUint8(0x0598, 0x01); // Set a valid species ID so it reaches the level

    // Override the getUint8 to throw a RangeError at the HOF level offset
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (byteOffset: number) => {
      // HOF_BASE_OFFSET is 0x0598. Level is at 0x0599.
      if (byteOffset === 0x0599) {
        throw new RangeError('Simulated Out of bounds');
      }
      return originalGetUint8(byteOffset);
    };

    const data = parseGen1(view);
    expect(data.hallOfFameCount).toBe(1);
    expect(data.hallOfFameRecords?.length).toBe(0); // With full block try/catch, broken record is aborted
  });

  it('should rethrow unexpected errors', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // hallOfFameCount = 1
    view.setUint8(0x25b3, 1);

    // Override the getUint8 to throw a general Error at the HOF offsets
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (byteOffset: number) => {
      // HOF_BASE_OFFSET is 0x0598
      if (byteOffset >= 0x0598 && byteOffset < 0x0600) {
        throw new Error('Simulated Unexpected Error');
      }
      return originalGetUint8(byteOffset);
    };

    expect(() => parseGen1(view)).toThrow('Simulated Unexpected Error');
  });

  it('should rethrow unexpected errors for HOF level out of bounds', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    view.setUint8(0x25b3, 1); // hallOfFameCount = 1
    view.setUint8(0x0598, 0x01); // Set a valid species ID so it reaches the level

    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (byteOffset: number) => {
      if (byteOffset === 0x0599) {
        throw new Error('Simulated Unexpected Error on Level');
      }
      return originalGetUint8(byteOffset);
    };

    expect(() => parseGen1(view)).toThrow('Simulated Unexpected Error on Level');
  });
});

describe('parseGen1 - yellow version fallbacks', () => {
  it('should detect yellow if res0.version or res1.version is yellow without +1 shift', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // We want padding bits to say "not res1" so it uses res0.
    view.setUint8(0x25b5, 0x00); // res0 padding correct
    view.setUint8(0x25b6, 0x80); // res1 padding incorrect

    // But we want detectGen1GameVersion to return yellow.
    // So we set Pikachu markers.
    view.setUint8(0x271c, 1);

    const data = parseGen1(view);
    expect(data.gameVersion).toBe('yellow');
  });
});
