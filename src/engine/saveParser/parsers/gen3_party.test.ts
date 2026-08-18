import { expect, test } from 'vitest';
import {
  GEN3_PARTY_ATTACK_OFFSET,
  GEN3_PARTY_COUNT_OFFSET,
  GEN3_PARTY_DEFENSE_OFFSET,
  GEN3_PARTY_HP_OFFSET,
  GEN3_PARTY_LEVEL_OFFSET,
  GEN3_PARTY_MAX_HP_OFFSET,
  GEN3_PARTY_POKEMON_LIST_OFFSET,
  GEN3_PARTY_SPATK_OFFSET,
  GEN3_PARTY_SPDEF_OFFSET,
  GEN3_PARTY_SPEED_OFFSET,
  GEN3_POKEMON_DATA_OFFSET,
  GEN3_POKEMON_OT_ID_OFFSET,
  GEN3_POKEMON_PV_OFFSET,
  parseGen3Party,
} from './gen3';

test('extracts stats and HP from active team', () => {
  const buffer = new ArrayBuffer(0x3000);
  const view = new DataView(buffer);

  // Write party count = 1
  view.setUint32(GEN3_PARTY_COUNT_OFFSET, 1, true);

  // 1st Pokemon
  const listOffset = GEN3_PARTY_POKEMON_LIST_OFFSET;

  // Set PV = 0, OTID = 1 => decrypt key = 1
  view.setUint32(listOffset + GEN3_POKEMON_PV_OFFSET, 0, true);
  view.setUint32(listOffset + GEN3_POKEMON_OT_ID_OFFSET, 1, true);

  // Permutation PV=0 => GAEM => Growth is at offset 32
  view.setUint16(listOffset + GEN3_POKEMON_DATA_OFFSET, 1 ^ 1, true);

  // Level
  view.setUint8(listOffset + GEN3_PARTY_LEVEL_OFFSET, 100);

  // Current HP is at offset 86 = 0x56
  view.setUint16(listOffset + GEN3_PARTY_HP_OFFSET, 12, true);

  // Max HP is at offset 88 = 0x58
  view.setUint16(listOffset + GEN3_PARTY_MAX_HP_OFFSET, 20, true);

  // Stats
  view.setUint16(listOffset + GEN3_PARTY_ATTACK_OFFSET, 30, true); // atk
  view.setUint16(listOffset + GEN3_PARTY_DEFENSE_OFFSET, 40, true); // def
  view.setUint16(listOffset + GEN3_PARTY_SPEED_OFFSET, 50, true); // spd
  view.setUint16(listOffset + GEN3_PARTY_SPATK_OFFSET, 60, true); // spatk
  view.setUint16(listOffset + GEN3_PARTY_SPDEF_OFFSET, 70, true); // spdef

  const result = parseGen3Party(view, 0, 'ruby');

  expect(result.party.length).toBe(1);
  expect(result.partyDetails.length).toBe(1);
  const detail = result.partyDetails[0];
  expect(detail?.level).toBe(100);
  expect(detail?.currentHp).toBe(12);
  expect(detail?.stats?.hp).toBe(20);
  expect(detail?.stats?.atk).toBe(30);
  expect(detail?.stats?.def).toBe(40);
  expect(detail?.stats?.spd).toBe(50);
  expect(detail?.stats?.spatk).toBe(60);
  expect(detail?.stats?.spdef).toBe(70);
});
