import { expect, test } from 'vitest';
import {
  GEN3_PARTY_COUNT_OFFSET,
  GEN3_PARTY_POKEMON_LIST_OFFSET,
  GEN3_PC_POKEMON_STRUCT_SIZE,
  GEN3_POKEMON_DATA_OFFSET,
  GEN3_POKEMON_OT_ID_OFFSET,
  GEN3_POKEMON_PV_OFFSET,
  GEN3_POKEMON_STRUCT_SIZE,
  PC_BOX_POKEMON_LIST_OFFSET,
  parseGen3Party,
  parseGen3PCBoxes,
} from './gen3';

test('extracts PIDs from party correctly', () => {
  const buffer = new ArrayBuffer(0x3000);
  const view = new DataView(buffer);

  view.setUint32(GEN3_PARTY_COUNT_OFFSET, 2, true);

  const listOffset = GEN3_PARTY_POKEMON_LIST_OFFSET;

  view.setUint32(listOffset + GEN3_POKEMON_PV_OFFSET, 0x12345678, true);
  view.setUint32(listOffset + GEN3_POKEMON_OT_ID_OFFSET, 1, true);
  view.setUint16(listOffset + GEN3_POKEMON_DATA_OFFSET, 1 ^ 1, true);

  view.setUint32(listOffset + GEN3_POKEMON_STRUCT_SIZE + GEN3_POKEMON_PV_OFFSET, 0xabcdef01, true);
  view.setUint32(listOffset + GEN3_POKEMON_STRUCT_SIZE + GEN3_POKEMON_OT_ID_OFFSET, 2, true);
  view.setUint16(listOffset + GEN3_POKEMON_STRUCT_SIZE + GEN3_POKEMON_DATA_OFFSET, 1 ^ 1, true);

  const result = parseGen3Party(view, 0, 'ruby');

  expect(result.partyDetails.length).toBe(2);
  expect(result.partyDetails[0]?.personalityValue).toBe(0x12345678);
  expect(result.partyDetails[1]?.personalityValue).toBe(0xabcdef01);
});

test('extracts PIDs from PC boxes correctly', () => {
  const buffer = new ArrayBuffer(0x9000);
  const view = new DataView(buffer);

  view.setUint32(PC_BOX_POKEMON_LIST_OFFSET + GEN3_POKEMON_PV_OFFSET, 0x11111111, true);
  view.setUint32(PC_BOX_POKEMON_LIST_OFFSET + GEN3_POKEMON_OT_ID_OFFSET, 1, true);
  view.setUint16(PC_BOX_POKEMON_LIST_OFFSET + GEN3_POKEMON_DATA_OFFSET, 1 ^ 1, true);

  view.setUint32(PC_BOX_POKEMON_LIST_OFFSET + GEN3_PC_POKEMON_STRUCT_SIZE + GEN3_POKEMON_PV_OFFSET, 0x22222222, true);
  view.setUint32(PC_BOX_POKEMON_LIST_OFFSET + GEN3_PC_POKEMON_STRUCT_SIZE + GEN3_POKEMON_OT_ID_OFFSET, 2, true);
  view.setUint16(PC_BOX_POKEMON_LIST_OFFSET + GEN3_PC_POKEMON_STRUCT_SIZE + GEN3_POKEMON_DATA_OFFSET, 1 ^ 1, true);

  const result = parseGen3PCBoxes(view);

  expect(result.pcDetails.length).toBe(2);
  expect(result.pcDetails[0]?.personalityValue).toBe(0x11111111);
  expect(result.pcDetails[1]?.personalityValue).toBe(0x22222222);
});

test('handles out-of-bounds reads gracefully for party parsing', () => {
  const buffer = new ArrayBuffer(10); // Too small
  const view = new DataView(buffer);

  expect(() => parseGen3Party(view, 0, 'ruby')).toThrow('The save file is corrupted or incomplete.');
});

test('handles out-of-bounds reads gracefully for PC parsing', () => {
  const buffer = new ArrayBuffer(10); // Too small
  const view = new DataView(buffer);

  expect(() => parseGen3PCBoxes(view)).toThrow('The save file is corrupted or incomplete.');
});
