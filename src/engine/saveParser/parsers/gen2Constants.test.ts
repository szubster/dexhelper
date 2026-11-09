import { describe, expect, it } from 'vitest';
import {
  ACTIVE_DECO_COUNT,
  ACTIVE_DECO_OFFSET_RELATIVE_CRYSTAL,
  ACTIVE_DECO_OFFSET_RELATIVE_GS,
  BALLS_POCKET_OFFSET_CRYSTAL,
  BALLS_POCKET_OFFSET_GS,
  BANK_1_BOX_1_OFFSET,
  BANK_1_BOX_2_OFFSET,
  BANK_1_BOX_3_OFFSET,
  BANK_1_BOX_4_OFFSET,
  BANK_1_BOX_5_OFFSET,
  BANK_1_BOX_6_OFFSET,
  BANK_1_BOX_7_OFFSET,
  BANK_2_BOX_8_OFFSET,
  BANK_2_BOX_9_OFFSET,
  BANK_2_BOX_10_OFFSET,
  BANK_2_BOX_11_OFFSET,
  BANK_2_BOX_12_OFFSET,
  BANK_2_BOX_13_OFFSET,
  BANK_2_BOX_14_OFFSET,
  BIT_MASK,
  BITS_PER_BYTE,
  BOX_DATA_BLOCK_OFFSET,
  BOX_SPECIES_LIST_OFFSET,
  CAUGHT_LEVEL_MASK,
  CAUGHT_LOC_EVENT,
  CAUGHT_LOC_TRADED,
  CAUGHT_TIME_DAY,
  CAUGHT_TIME_MASK,
  CAUGHT_TIME_MORNING,
  CAUGHT_TIME_NIGHT,
  CAUGHT_TIME_SHIFT,
  CURRENT_BOX_COUNT_OFFSET,
  CURRENT_BOX_NUM_MASK,
  CURRENT_BOX_NUM_OFFSET_CRYSTAL,
  CURRENT_BOX_NUM_OFFSET_GS,
  CURRENT_BOX_SPECIES_OFFSET,
  DAYCARE_EGG_FLAG_MASK,
  DAYCARE_EGG_FLAG_OFFSET_CRYSTAL,
  DAYCARE_EGG_FLAG_OFFSET_GS,
  DAYCARE_SLOT_1_OFFSET_CRYSTAL,
  DAYCARE_SLOT_1_OFFSET_GS,
  DAYCARE_SLOT_2_OFFSET_CRYSTAL,
  DAYCARE_SLOT_2_OFFSET_GS,
  DECIMAL_RADIX,
  EVENT_FLAG_HO_OH_BIT,
  EVENT_FLAG_HO_OH_BYTE,
  EVENT_FLAG_LUGIA_BIT,
  EVENT_FLAG_LUGIA_BYTE,
  EVENT_FLAG_RED_GYARADOS_BIT,
  EVENT_FLAG_RED_GYARADOS_BYTE,
  EVENT_FLAG_SNORLAX_BIT,
  EVENT_FLAG_SNORLAX_BYTE,
  EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BIT,
  EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BYTE,
  EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BIT,
  EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BYTE,
  EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BIT,
  EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BYTE,
  EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BIT,
  EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BYTE,
  EVENT_FLAG_SUDOWOODO_BIT,
  EVENT_FLAG_SUDOWOODO_BYTE,
  EVENT_FLAGS_LENGTH,
  EVENT_FLAGS_MAX_BITS,
  EVENT_FLAGS_OFFSET_CRYSTAL,
  EVENT_FLAGS_OFFSET_GS,
  GEN2_BOX_SPECIES_LIST_LENGTH,
  GEN2_EGG_CYCLE_STEPS,
  GEN2_EGG_SPECIES_ID,
  GEN2_EMPTY_SLOT,
  GEN2_EMPTY_SLOT_00,
  GEN2_ENTEI_SPECIES_ID,
  GEN2_HOF_MAX_RECORDS,
  GEN2_HOF_POKEMON_COUNT,
  GEN2_HOF_POKEMON_LENGTH,
  GEN2_HOF_POKEMON_NICKNAME_LENGTH,
  GEN2_HOF_POKEMON_OFFSET_LEVEL,
  GEN2_HOF_POKEMON_OFFSET_NICKNAME,
  GEN2_HOF_RECORD_LENGTH,
  GEN2_MAX_BALLS_POCKET,
  GEN2_MAX_BOX_SIZE,
  GEN2_MAX_ITEMS_POCKET,
  GEN2_MAX_KEY_ITEMS_POCKET,
  GEN2_MAX_PARTY_SIZE,
  GEN2_MAX_PC_ITEMS,
  GEN2_MONEY_BYTE_SHIFT_8,
  GEN2_MONEY_BYTE_SHIFT_16,
  GEN2_NPC_TRADE_COUNT,
  GEN2_PARTY_POKEMON_BLOCK_SIZE,
  GEN2_PARTY_SPECIES_LIST_LENGTH,
  GEN2_PKM_DATA_LENGTH,
  GEN2_RAIKOU_SPECIES_ID,
  GEN2_SUICUNE_SPECIES_ID,
  GEN2_TM_BASE_ITEM_ID,
  GEN2_TM_EVENT_FLAGS,
  GEN2_TM_HM_COUNT,
  GEN2_TM_HM_MOVE_MAP,
  HALL_OF_FAME_OFFSET_RELATIVE,
  HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES,
  ITEM_LIST_OFFSET,
  ITEM_QUANTITY_OFFSET,
  ITEM_RECORD_SIZE,
  ITEMS_POCKET_OFFSET_CRYSTAL,
  ITEMS_POCKET_OFFSET_GS,
  JOHTO_BADGES_OFFSET_CRYSTAL,
  JOHTO_BADGES_OFFSET_GS,
  KANTO_BADGES_OFFSET_CRYSTAL,
  KANTO_BADGES_OFFSET_GS,
  KEY_ITEMS_POCKET_OFFSET_CRYSTAL,
  KEY_ITEMS_POCKET_OFFSET_GS,
  MAP_BANK_OFFSET_CRYSTAL,
  MAP_BANK_OFFSET_GS,
  MAP_ID_OFFSET_CRYSTAL,
  MAP_ID_OFFSET_GS,
  MAX_VALID_SPECIES_ID,
  MOM_SAVING_MONEY_ACTIVE_BIT,
  MOM_SAVING_MONEY_OFFSET_RELATIVE,
  MOMS_MONEY_OFFSET_RELATIVE,
  NPC_TRADE_FLAGS_OFFSET_CRYSTAL,
  NPC_TRADE_FLAGS_OFFSET_GS,
  PC_ITEMS_POCKET_OFFSET_CRYSTAL,
  PC_ITEMS_POCKET_OFFSET_GS,
  POKEDEX_OWNED_OFFSET_CRYSTAL,
  POKEDEX_OWNED_OFFSET_GS,
  POKEDEX_SEEN_OFFSET_CRYSTAL,
  POKEDEX_SEEN_OFFSET_GS,
  POKEMON_DATA_BLOCK_SIZE,
  POKEMON_MOVE_COUNT,
  POKEMON_NAME_LENGTH,
  POKEMON_OFFSET_CAUGHT_BYTE_1,
  POKEMON_OFFSET_CAUGHT_BYTE_2,
  POKEMON_OFFSET_CURRENT_HP,
  POKEMON_OFFSET_DVS,
  POKEMON_OFFSET_FRIENDSHIP,
  POKEMON_OFFSET_ITEM,
  POKEMON_OFFSET_LEVEL,
  POKEMON_OFFSET_MOVES,
  POKEMON_OFFSET_NICKNAME,
  POKEMON_OFFSET_OT_NAME,
  POKEMON_OFFSET_POKERUS,
  POKEMON_OFFSET_SPECIES_ID,
  ROAMER_COUNT,
  ROAMER_GLOBAL_OFFSET_MAP_GROUP,
  ROAMER_GLOBAL_OFFSET_MAP_NUMBER,
  ROAMER_INACTIVE_MAP_GROUP,
  ROAMER_OFFSET_DVS,
  ROAMER_OFFSET_HP,
  ROAMER_OFFSET_LEVEL,
  ROAMER_OFFSET_MAP_GROUP,
  ROAMER_OFFSET_MAP_NUMBER,
  ROAMER_OFFSET_SPECIES,
  ROAMER_STRUCT_SIZE,
  ROAMING_LEGENDARIES_OFFSET_CRYSTAL,
  ROAMING_LEGENDARIES_OFFSET_GS,
  TM_POCKET_OFFSET_CRYSTAL,
  TM_POCKET_OFFSET_GS,
  TRAINER_ID_OFFSET,
  TRAINER_NAME_OFFSET,
  UNLOCKED_DECO_BIT_OFFSET,
  UNLOCKED_DECO_BYTE_OFFSET,
  UNLOCKED_DECO_COUNT,
  UNOWN_DEX_LENGTH,
  UNOWN_DEX_OFFSET_CRYSTAL,
  UNOWN_DEX_OFFSET_GS,
  UNOWN_DV_MASK,
  UNOWN_DV_SHIFT,
  UNOWN_FORM_ASCII_A,
  UNOWN_FORM_ATK_SHIFT,
  UNOWN_FORM_DEF_SHIFT,
  UNOWN_FORM_MOD,
  UNOWN_FORM_SPD_SHIFT,
  UNOWN_FORM_VALID_MAX,
  UNOWN_SPECIES_ID,
} from './gen2Constants';

describe('gen2Constants', () => {
  describe('Pokémon data structures and offsets', () => {
    it('defines individual pokemon field offsets correctly', () => {
      expect(POKEMON_OFFSET_SPECIES_ID).toBe(0);
      expect(POKEMON_OFFSET_ITEM).toBe(1);
      expect(POKEMON_OFFSET_MOVES).toBe(2);
      expect(POKEMON_OFFSET_DVS).toBe(21);
      expect(POKEMON_OFFSET_FRIENDSHIP).toBe(27);
      expect(POKEMON_OFFSET_POKERUS).toBe(28);
      expect(POKEMON_OFFSET_CAUGHT_BYTE_1).toBe(29);
      expect(POKEMON_OFFSET_CAUGHT_BYTE_2).toBe(30);
      expect(POKEMON_OFFSET_LEVEL).toBe(31);
      expect(POKEMON_OFFSET_CURRENT_HP).toBe(34);
    });

    it('defines pokemon block sizes and naming lengths correctly', () => {
      expect(POKEMON_DATA_BLOCK_SIZE).toBe(32);
      expect(GEN2_PARTY_POKEMON_BLOCK_SIZE).toBe(48);
      expect(GEN2_PARTY_SPECIES_LIST_LENGTH).toBe(7);
      expect(GEN2_BOX_SPECIES_LIST_LENGTH).toBe(21);
      expect(POKEMON_NAME_LENGTH).toBe(11);
      expect(POKEMON_OFFSET_OT_NAME).toBe(32);
      expect(POKEMON_OFFSET_NICKNAME).toBe(43);
      expect(GEN2_PKM_DATA_LENGTH).toBe(73);
    });

    it('defines box data and item offsets correctly', () => {
      expect(BOX_SPECIES_LIST_OFFSET).toBe(1);
      expect(BOX_DATA_BLOCK_OFFSET).toBe(22);
      expect(ITEM_LIST_OFFSET).toBe(1);
      expect(ITEM_RECORD_SIZE).toBe(2);
      expect(ITEM_QUANTITY_OFFSET).toBe(1);
    });
  });

  describe('TM / HM constants and mappings', () => {
    it('defines TM base item ID and count correctly', () => {
      expect(GEN2_TM_BASE_ITEM_ID).toBe(191);
      expect(GEN2_TM_HM_COUNT).toBe(57);
    });

    it('maps TM/HM item IDs to expected move IDs', () => {
      expect(GEN2_TM_HM_MOVE_MAP[191]).toBe(223); // TM01 DynamicPunch
      expect(GEN2_TM_HM_MOVE_MAP[192]).toBe(29); // TM02 Headbutt
      expect(GEN2_TM_HM_MOVE_MAP[240]).toBe(171); // TM50 Nightmare
      expect(GEN2_TM_HM_MOVE_MAP[241]).toBe(15); // HM01 Cut
      expect(GEN2_TM_HM_MOVE_MAP[247]).toBe(127); // HM07 Waterfall

      const mappedKeys = Object.keys(GEN2_TM_HM_MOVE_MAP).map(Number);
      expect(mappedKeys.length).toBe(57);
      for (const key of mappedKeys) {
        expect(key).toBeGreaterThanOrEqual(191);
        expect(key).toBeLessThanOrEqual(247);
        expect(GEN2_TM_HM_MOVE_MAP[key]).toBeGreaterThan(0);
      }
    });

    it('maps TM item IDs to event flags correctly', () => {
      expect(GEN2_TM_EVENT_FLAGS[191]).toBe(10);
      expect(GEN2_TM_EVENT_FLAGS[192]).toBe(92);
      expect(GEN2_TM_EVENT_FLAGS[240]).toBe(80);

      const flagKeys = Object.keys(GEN2_TM_EVENT_FLAGS).map(Number);
      expect(flagKeys.length).toBe(24);
      for (const key of flagKeys) {
        expect(key).toBeGreaterThanOrEqual(191);
        expect(key).toBeLessThanOrEqual(240);
        expect(GEN2_TM_EVENT_FLAGS[key]).toBeGreaterThan(0);
      }
    });
  });

  describe('SRAM offsets for Gold/Silver vs Crystal', () => {
    it('defines NPC trade flags offsets', () => {
      expect(NPC_TRADE_FLAGS_OFFSET_CRYSTAL).toBe(0x24eb);
      expect(NPC_TRADE_FLAGS_OFFSET_GS).toBe(0x250f);
      expect(GEN2_NPC_TRADE_COUNT).toBe(7);
    });

    it('defines daycare offsets and flags', () => {
      expect(DAYCARE_SLOT_1_OFFSET_GS).toBe(0x2850);
      expect(DAYCARE_SLOT_2_OFFSET_GS).toBe(0x2817);
      expect(DAYCARE_EGG_FLAG_OFFSET_GS).toBe(0x284f);
      expect(DAYCARE_SLOT_1_OFFSET_CRYSTAL).toBe(0x282c);
      expect(DAYCARE_SLOT_2_OFFSET_CRYSTAL).toBe(0x27f3);
      expect(DAYCARE_EGG_FLAG_OFFSET_CRYSTAL).toBe(0x282b);
      expect(DAYCARE_EGG_FLAG_MASK).toBe(0x01);
    });

    it('defines event flags and pokedex offsets', () => {
      expect(EVENT_FLAGS_OFFSET_CRYSTAL).toBe(0x2600);
      expect(EVENT_FLAGS_OFFSET_GS).toBe(0x2624);
      expect(POKEDEX_OWNED_OFFSET_GS).toBe(0x2a4c);
      expect(POKEDEX_OWNED_OFFSET_CRYSTAL).toBe(0x2a69);
      expect(POKEDEX_SEEN_OFFSET_GS).toBe(0x2a6c);
      expect(POKEDEX_SEEN_OFFSET_CRYSTAL).toBe(0x2a89);
      expect(UNOWN_DEX_OFFSET_GS).toBe(0x2a8c);
      expect(UNOWN_DEX_OFFSET_CRYSTAL).toBe(0x2aa9);
      expect(UNOWN_DEX_LENGTH).toBe(26);
    });

    it('defines inventory pocket offsets', () => {
      expect(TM_POCKET_OFFSET_GS).toBe(0x23e7);
      expect(TM_POCKET_OFFSET_CRYSTAL).toBe(0x23c8);
      expect(ITEMS_POCKET_OFFSET_GS).toBe(0x2420);
      expect(ITEMS_POCKET_OFFSET_CRYSTAL).toBe(0x2402);
      expect(KEY_ITEMS_POCKET_OFFSET_GS).toBe(0x244a);
      expect(KEY_ITEMS_POCKET_OFFSET_CRYSTAL).toBe(0x242c);
      expect(BALLS_POCKET_OFFSET_GS).toBe(0x2465);
      expect(BALLS_POCKET_OFFSET_CRYSTAL).toBe(0x2447);
      expect(PC_ITEMS_POCKET_OFFSET_GS).toBe(0x247e);
      expect(PC_ITEMS_POCKET_OFFSET_CRYSTAL).toBe(0x2460);
    });

    it('defines badges, map, and trainer offsets', () => {
      expect(JOHTO_BADGES_OFFSET_GS).toBe(0x23e4);
      expect(JOHTO_BADGES_OFFSET_CRYSTAL).toBe(0x23e5);
      expect(KANTO_BADGES_OFFSET_GS).toBe(0x23e5);
      expect(KANTO_BADGES_OFFSET_CRYSTAL).toBe(0x23e6);
      expect(TRAINER_NAME_OFFSET).toBe(0x200b);
      expect(TRAINER_ID_OFFSET).toBe(0x2009);
      expect(MAP_BANK_OFFSET_GS).toBe(0x25b3);
      expect(MAP_BANK_OFFSET_CRYSTAL).toBe(0x25c6);
      expect(MAP_ID_OFFSET_GS).toBe(0x25b4);
      expect(MAP_ID_OFFSET_CRYSTAL).toBe(0x25c7);
    });

    it('defines current box offsets and masks', () => {
      expect(CURRENT_BOX_NUM_OFFSET_GS).toBe(0x2724);
      expect(CURRENT_BOX_NUM_OFFSET_CRYSTAL).toBe(0x2700);
      expect(CURRENT_BOX_COUNT_OFFSET).toBe(0x2d10);
      expect(CURRENT_BOX_SPECIES_OFFSET).toBe(0x2d11);
      expect(CURRENT_BOX_NUM_MASK).toBe(0x0f);
    });

    it('defines relative offsets for Mom money and decorations', () => {
      expect(MOMS_MONEY_OFFSET_RELATIVE).toBe(-0x06);
      expect(MOM_SAVING_MONEY_OFFSET_RELATIVE).toBe(-0x03);
      expect(ACTIVE_DECO_OFFSET_RELATIVE_CRYSTAL).toBe(0x3b8);
      expect(ACTIVE_DECO_OFFSET_RELATIVE_GS).toBe(0x3dd);
      expect(ACTIVE_DECO_COUNT).toBe(8);
      expect(UNLOCKED_DECO_BYTE_OFFSET).toBe(0x54);
      expect(UNLOCKED_DECO_BIT_OFFSET).toBe(4);
      expect(UNLOCKED_DECO_COUNT).toBe(46);
    });
  });

  describe('Event flags math and stationary encounters', () => {
    it('defines event flag limits and bit manipulation constants', () => {
      expect(EVENT_FLAGS_LENGTH).toBe(0x100);
      expect(EVENT_FLAGS_MAX_BITS).toBe(2048);
      expect(BITS_PER_BYTE).toBe(8);
      expect(BIT_MASK).toBe(1);
      expect(EVENT_FLAGS_LENGTH * BITS_PER_BYTE).toBe(EVENT_FLAGS_MAX_BITS);
    });

    it('computes byte and bit indices for stationary Pokémon encounters', () => {
      // Sudowoodo: 42
      expect(EVENT_FLAG_SUDOWOODO_BYTE).toBe(5);
      expect(EVENT_FLAG_SUDOWOODO_BIT).toBe(2);
      expect(EVENT_FLAG_SUDOWOODO_BYTE * 8 + EVENT_FLAG_SUDOWOODO_BIT).toBe(42);

      // Ho-Oh: 791
      expect(EVENT_FLAG_HO_OH_BYTE).toBe(98);
      expect(EVENT_FLAG_HO_OH_BIT).toBe(7);
      expect(EVENT_FLAG_HO_OH_BYTE * 8 + EVENT_FLAG_HO_OH_BIT).toBe(791);

      // Lugia: 792
      expect(EVENT_FLAG_LUGIA_BYTE).toBe(99);
      expect(EVENT_FLAG_LUGIA_BIT).toBe(0);
      expect(EVENT_FLAG_LUGIA_BYTE * 8 + EVENT_FLAG_LUGIA_BIT).toBe(792);

      // Snorlax: 1872
      expect(EVENT_FLAG_SNORLAX_BYTE).toBe(234);
      expect(EVENT_FLAG_SNORLAX_BIT).toBe(0);
      expect(EVENT_FLAG_SNORLAX_BYTE * 8 + EVENT_FLAG_SNORLAX_BIT).toBe(1872);

      // Red Gyarados: 1873
      expect(EVENT_FLAG_RED_GYARADOS_BYTE).toBe(234);
      expect(EVENT_FLAG_RED_GYARADOS_BIT).toBe(1);
      expect(EVENT_FLAG_RED_GYARADOS_BYTE * 8 + EVENT_FLAG_RED_GYARADOS_BIT).toBe(1873);
    });

    it('computes byte and bit indices for Ruins of Alph puzzles', () => {
      // Ho-Oh puzzle: 839
      expect(EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BYTE).toBe(104);
      expect(EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BIT).toBe(7);
      expect(EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BYTE * 8 + EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BIT).toBe(839);

      // Kabuto puzzle: 840
      expect(EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BYTE).toBe(105);
      expect(EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BIT).toBe(0);
      expect(EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BYTE * 8 + EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BIT).toBe(840);

      // Omanyte puzzle: 841
      expect(EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BYTE).toBe(105);
      expect(EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BIT).toBe(1);
      expect(EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BYTE * 8 + EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BIT).toBe(841);

      // Aerodactyl puzzle: 842
      expect(EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BYTE).toBe(105);
      expect(EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BIT).toBe(2);
      expect(EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BYTE * 8 + EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BIT).toBe(842);
    });
  });

  describe('Box memory bank offsets', () => {
    it('defines bank 1 box offsets in consecutive 0x44e intervals', () => {
      const boxSize = 0x44e;
      expect(BANK_1_BOX_1_OFFSET).toBe(0x4000);
      expect(BANK_1_BOX_2_OFFSET).toBe(BANK_1_BOX_1_OFFSET + boxSize);
      expect(BANK_1_BOX_3_OFFSET).toBe(BANK_1_BOX_2_OFFSET + boxSize);
      expect(BANK_1_BOX_4_OFFSET).toBe(BANK_1_BOX_3_OFFSET + boxSize);
      expect(BANK_1_BOX_5_OFFSET).toBe(BANK_1_BOX_4_OFFSET + boxSize);
      expect(BANK_1_BOX_6_OFFSET).toBe(BANK_1_BOX_5_OFFSET + boxSize);
      expect(BANK_1_BOX_7_OFFSET).toBe(BANK_1_BOX_6_OFFSET + boxSize);
    });

    it('defines bank 2 box offsets in consecutive 0x44e intervals', () => {
      const boxSize = 0x44e;
      expect(BANK_2_BOX_8_OFFSET).toBe(0x6000);
      expect(BANK_2_BOX_9_OFFSET).toBe(BANK_2_BOX_8_OFFSET + boxSize);
      expect(BANK_2_BOX_10_OFFSET).toBe(BANK_2_BOX_9_OFFSET + boxSize);
      expect(BANK_2_BOX_11_OFFSET).toBe(BANK_2_BOX_10_OFFSET + boxSize);
      expect(BANK_2_BOX_12_OFFSET).toBe(BANK_2_BOX_11_OFFSET + boxSize);
      expect(BANK_2_BOX_13_OFFSET).toBe(BANK_2_BOX_12_OFFSET + boxSize);
      expect(BANK_2_BOX_14_OFFSET).toBe(BANK_2_BOX_13_OFFSET + boxSize);
    });
  });

  describe('Roamer constants', () => {
    it('defines roaming Pokémon structure offsets and limits', () => {
      expect(ROAMING_LEGENDARIES_OFFSET_GS).toBe(0x28da);
      expect(ROAMING_LEGENDARIES_OFFSET_CRYSTAL).toBe(0x28b6);
      expect(ROAMER_STRUCT_SIZE).toBe(7);
      expect(ROAMER_OFFSET_SPECIES).toBe(0);
      expect(ROAMER_OFFSET_LEVEL).toBe(1);
      expect(ROAMER_OFFSET_MAP_GROUP).toBe(2);
      expect(ROAMER_OFFSET_MAP_NUMBER).toBe(3);
      expect(ROAMER_OFFSET_HP).toBe(4);
      expect(ROAMER_OFFSET_DVS).toBe(5);
      expect(ROAMER_GLOBAL_OFFSET_MAP_NUMBER).toBe(19);
      expect(ROAMER_GLOBAL_OFFSET_MAP_GROUP).toBe(20);
      expect(ROAMER_COUNT).toBe(3);
      expect(ROAMER_INACTIVE_MAP_GROUP).toBe(0xff);
    });

    it('defines roaming beast species IDs', () => {
      expect(GEN2_RAIKOU_SPECIES_ID).toBe(243);
      expect(GEN2_ENTEI_SPECIES_ID).toBe(244);
      expect(GEN2_SUICUNE_SPECIES_ID).toBe(245);
    });
  });

  describe('Hall of Fame and Unown constants', () => {
    it('defines Hall of Fame offsets and record layout', () => {
      expect(HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES).toBe(0xa8);
      expect(HALL_OF_FAME_OFFSET_RELATIVE).toBe(0xf74);
      expect(GEN2_HOF_MAX_RECORDS).toBe(30);
      expect(GEN2_HOF_POKEMON_COUNT).toBe(6);
      expect(GEN2_HOF_RECORD_LENGTH).toBe(0x62);
      expect(GEN2_HOF_POKEMON_LENGTH).toBe(0x10);
      expect(GEN2_HOF_POKEMON_OFFSET_LEVEL).toBe(5);
      expect(GEN2_HOF_POKEMON_OFFSET_NICKNAME).toBe(6);
      expect(GEN2_HOF_POKEMON_NICKNAME_LENGTH).toBe(10);
    });

    it('defines Unown species and form calculation parameters', () => {
      expect(UNOWN_SPECIES_ID).toBe(201);
      expect(UNOWN_DV_SHIFT).toBe(1);
      expect(UNOWN_DV_MASK).toBe(0b11);
      expect(UNOWN_FORM_ATK_SHIFT).toBe(6);
      expect(UNOWN_FORM_DEF_SHIFT).toBe(4);
      expect(UNOWN_FORM_SPD_SHIFT).toBe(2);
      expect(UNOWN_FORM_MOD).toBe(28);
      expect(UNOWN_FORM_VALID_MAX).toBe(26);
      expect(UNOWN_FORM_ASCII_A).toBe(65);
    });
  });

  describe('Game limits, caught data, and sentinel values', () => {
    it('defines party, box, and inventory limits', () => {
      expect(GEN2_MAX_PARTY_SIZE).toBe(6);
      expect(GEN2_MAX_BOX_SIZE).toBe(20);
      expect(GEN2_MAX_ITEMS_POCKET).toBe(20);
      expect(GEN2_MAX_KEY_ITEMS_POCKET).toBe(26);
      expect(GEN2_MAX_BALLS_POCKET).toBe(12);
      expect(GEN2_MAX_PC_ITEMS).toBe(50);
    });

    it('defines caught time, level, and location masks and shifts', () => {
      expect(CAUGHT_TIME_MASK).toBe(0xc0);
      expect(CAUGHT_TIME_SHIFT).toBe(6);
      expect(CAUGHT_LEVEL_MASK).toBe(0x3f);
      expect(CAUGHT_TIME_MORNING).toBe(1);
      expect(CAUGHT_TIME_DAY).toBe(2);
      expect(CAUGHT_TIME_NIGHT).toBe(3);
      expect(CAUGHT_LOC_EVENT).toBe(0x7e);
      expect(CAUGHT_LOC_TRADED).toBe(0x7f);
    });

    it('defines sentinels, eggs, money shifts, and radix constants', () => {
      expect(GEN2_EMPTY_SLOT).toBe(0xff);
      expect(GEN2_EMPTY_SLOT_00).toBe(0x00);
      expect(MAX_VALID_SPECIES_ID).toBe(251);
      expect(POKEMON_MOVE_COUNT).toBe(4);
      expect(GEN2_EGG_SPECIES_ID).toBe(253);
      expect(GEN2_EGG_CYCLE_STEPS).toBe(256);
      expect(GEN2_MONEY_BYTE_SHIFT_16).toBe(16);
      expect(GEN2_MONEY_BYTE_SHIFT_8).toBe(8);
      expect(DECIMAL_RADIX).toBe(10);
      expect(MOM_SAVING_MONEY_ACTIVE_BIT).toBe(7);
    });
  });
});
