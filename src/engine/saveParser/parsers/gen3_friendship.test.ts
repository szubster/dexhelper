import { expect, test } from 'vitest';
import {
  GEN3_PARTY_COUNT_OFFSET,
  GEN3_PARTY_POKEMON_LIST_OFFSET,
  GEN3_PC_POKEMON_STRUCT_SIZE,
  GEN3_POKEMON_DATA_OFFSET,
  GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G,
  GEN3_POKEMON_OT_ID_OFFSET,
  GEN3_POKEMON_PV_OFFSET,
  NUM_SUBSTRUCTURE_PERMUTATIONS,
  PC_BOX_CAPACITY,
  PC_BOX_POKEMON_LIST_OFFSET,
  parseGen3Party,
  parseGen3PCBoxes,
  SUBSTRUCTURE_ORDER,
  SUBSTRUCTURE_SIZE,
} from './gen3';

test('extracts friendship from active team', () => {
  const buffer = new ArrayBuffer(0x3000);
  const view = new DataView(buffer);
  view.setUint32(GEN3_PARTY_COUNT_OFFSET, 1, true);
  const listOffset = GEN3_PARTY_POKEMON_LIST_OFFSET;
  const pv = 0x12345678;
  const otId = 0x87654321;
  view.setUint32(listOffset + GEN3_POKEMON_PV_OFFSET, pv, true);
  view.setUint32(listOffset + GEN3_POKEMON_OT_ID_OFFSET, otId, true);
  const decryptionKey = pv ^ otId;
  const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
  const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
  const decryptedGAEM = new DataView(new ArrayBuffer(48));
  decryptedGAEM.setUint16(0, 1, true);
  decryptedGAEM.setUint8(GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G, 123);
  for (let i = 0; i < 4; i++) {
    const char = permutation?.[i] as 'G' | 'A' | 'E' | 'M';
    const canonicalIndex = 'GAEM'.indexOf(char);
    const encryptedOffset = listOffset + GEN3_POKEMON_DATA_OFFSET + i * SUBSTRUCTURE_SIZE;
    const decryptedOffset = canonicalIndex * SUBSTRUCTURE_SIZE;
    for (let j = 0; j < 3; j++) {
      const decryptedValue = decryptedGAEM.getUint32(decryptedOffset + j * 4, true);
      const encryptedValue = (decryptedValue ^ decryptionKey) >>> 0;
      view.setUint32(encryptedOffset + j * 4, encryptedValue, true);
    }
  }
  const result = parseGen3Party(view, 0, 'ruby');
  expect(result.party.length).toBe(1);
  expect(result.partyDetails.length).toBe(1);
  const detail = result.partyDetails[0];
  expect(detail?.friendship).toBe(123);
});

test('extracts friendship from PC box', () => {
  const buffer = new ArrayBuffer(0x9000);
  const pcBufferView = new DataView(buffer);
  const box = 0;
  const slot = 0;
  const pokemonIndex = box * PC_BOX_CAPACITY + slot;
  const offset = PC_BOX_POKEMON_LIST_OFFSET + pokemonIndex * GEN3_PC_POKEMON_STRUCT_SIZE;
  const pv = 0x12345678;
  const otId = 0x87654321;
  pcBufferView.setUint32(offset + GEN3_POKEMON_PV_OFFSET, pv, true);
  pcBufferView.setUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, otId, true);
  const decryptionKey = pv ^ otId;
  const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
  const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
  const decryptedGAEM = new DataView(new ArrayBuffer(48));
  decryptedGAEM.setUint16(0, 4, true);
  decryptedGAEM.setUint8(GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G, 200);
  for (let i = 0; i < 4; i++) {
    const char = permutation?.[i] as 'G' | 'A' | 'E' | 'M';
    const canonicalIndex = 'GAEM'.indexOf(char);
    const encryptedOffset = offset + GEN3_POKEMON_DATA_OFFSET + i * SUBSTRUCTURE_SIZE;
    const decryptedOffset = canonicalIndex * SUBSTRUCTURE_SIZE;
    for (let j = 0; j < 3; j++) {
      const decryptedValue = decryptedGAEM.getUint32(decryptedOffset + j * 4, true);
      const encryptedValue = (decryptedValue ^ decryptionKey) >>> 0;
      pcBufferView.setUint32(encryptedOffset + j * 4, encryptedValue, true);
    }
  }
  const result = parseGen3PCBoxes(pcBufferView);
  expect(result.pc.length).toBe(1);
  expect(result.pcDetails.length).toBe(1);
  const detail = result.pcDetails[0];
  expect(detail?.friendship).toBe(200);
});
