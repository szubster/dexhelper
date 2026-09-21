import { expect, test } from 'vitest';
import {
  GEN3_PARTY_COUNT_OFFSET,
  GEN3_PARTY_POKEMON_LIST_OFFSET,
  GEN3_PC_POKEMON_STRUCT_SIZE,
  GEN3_POKEMON_DATA_OFFSET,
  GEN3_POKEMON_OT_ID_OFFSET,
  GEN3_POKEMON_PV_OFFSET,
  GEN3_POKEMON_STRUCT_SIZE,
  iterateGen3Party,
  iterateGen3PCBoxes,
  PC_BOX_POKEMON_LIST_OFFSET,
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

  const partyDetails = [];
  for (const { partyDetail } of iterateGen3Party(view, 0, 'ruby')) {
    partyDetails.push(partyDetail);
  }

  expect(partyDetails.length).toBe(2);
  expect(partyDetails[0]?.personalityValue).toBe(0x12345678);
  expect(partyDetails[0]?.nature).toBe(0x12345678 % 25);
  expect(partyDetails[1]?.personalityValue).toBe(0xabcdef01);
  expect(partyDetails[1]?.nature).toBe(0xabcdef01 % 25);
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

  const pcDetails = [];
  for (const { pcDetail } of iterateGen3PCBoxes(view)) {
    pcDetails.push(pcDetail);
  }

  expect(pcDetails.length).toBe(2);
  expect(pcDetails[0]?.personalityValue).toBe(0x11111111);
  expect(pcDetails[0]?.nature).toBe(0x11111111 % 25);
  expect(pcDetails[1]?.personalityValue).toBe(0x22222222);
  expect(pcDetails[1]?.nature).toBe(0x22222222 % 25);
});

test('handles out-of-bounds reads gracefully for party parsing', () => {
  const buffer = new ArrayBuffer(10); // Too small
  const view = new DataView(buffer);

  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of iterateGen3Party(view, 0, 'ruby')) {
      // iterate
    }
  }).toThrow('The save file is corrupted or incomplete.');
});

test('handles out-of-bounds reads gracefully for PC parsing', () => {
  const buffer = new ArrayBuffer(10); // Too small
  const view = new DataView(buffer);

  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of iterateGen3PCBoxes(view)) {
      // iterate
    }
  }).toThrow('The save file is corrupted or incomplete.');
});
