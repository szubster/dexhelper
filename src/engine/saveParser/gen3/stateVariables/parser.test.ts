import { describe, expect, it } from 'vitest';
import {
  BANK_A_START,
  BANK_B_START,
  EMERALD_VARS_OFFSET,
  EVENT_FLAGS_OFFSET,
  RS_VARS_OFFSET,
  SAVE_INDEX_OFFSET,
  SECTION_ID_OFFSET,
  SECTION_SIZE,
  SIGNATURE_OFFSET,
  SIGNATURE_VALUE,
  VARIABLE_SIZE,
  VARS_START,
} from './constants';
import { extractEventFlag, extractGameVariable, extractLatestSectionOffset } from './parser';

describe('extractGameVariable', () => {
  it('should extract game variable correctly for Emerald', () => {
    const buffer = new ArrayBuffer(10000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const variableId = 0x4048; // Ash gather count
    const expectedValue = 1337;

    const byteOffset = saveBlock1Offset + EMERALD_VARS_OFFSET + (variableId - VARS_START) * VARIABLE_SIZE;
    view.setUint16(byteOffset, expectedValue, true);

    expect(extractGameVariable(view, saveBlock1Offset, variableId, true)).toBe(expectedValue);
  });

  it('should extract game variable correctly for Ruby/Sapphire', () => {
    const buffer = new ArrayBuffer(10000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const variableId = 0x4048; // Ash gather count
    const expectedValue = 42;

    const byteOffset = saveBlock1Offset + RS_VARS_OFFSET + (variableId - VARS_START) * VARIABLE_SIZE;
    view.setUint16(byteOffset, expectedValue, true);

    expect(extractGameVariable(view, saveBlock1Offset, variableId, false)).toBe(expectedValue);
  });

  it('should throw Error for out of bounds access', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => {
      extractGameVariable(view, 0, 0x4048, true);
    }).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('extractEventFlag', () => {
  it('should extract flag correctly using relative offset', () => {
    const buffer = new ArrayBuffer(1024);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const flagId = 0x100;

    // Set the bit
    const byteOffset = saveBlock1Offset + EVENT_FLAGS_OFFSET + (flagId >> 3);
    const bitIndex = flagId & 7;
    view.setUint8(byteOffset, 1 << bitIndex);

    expect(extractEventFlag(view, saveBlock1Offset, flagId)).toBe(true);
    expect(extractEventFlag(view, saveBlock1Offset, flagId + 1)).toBe(false);
  });

  it('should throw Error for out of bounds access', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => {
      extractEventFlag(view, 0, 0x100);
    }).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('extractLatestSectionOffset', () => {
  it('should return highest save index bank offset', () => {
    const buffer = new ArrayBuffer(0x100000);
    const view = new DataView(buffer);

    // Setup Bank A section 2 with lower save index
    const offsetA = BANK_A_START + 5 * SECTION_SIZE;
    view.setUint32(offsetA + SIGNATURE_OFFSET, SIGNATURE_VALUE, true);
    view.setUint16(offsetA + SECTION_ID_OFFSET, 2, true);
    view.setUint32(offsetA + SAVE_INDEX_OFFSET, 10, true);
    // Set a random section in Bank A to initialize the bank's save index
    view.setUint32(BANK_A_START + SIGNATURE_OFFSET, SIGNATURE_VALUE, true);
    view.setUint32(BANK_A_START + SAVE_INDEX_OFFSET, 10, true);

    // Setup Bank B section 2 with higher save index
    const offsetB = BANK_B_START + 8 * SECTION_SIZE;
    view.setUint32(offsetB + SIGNATURE_OFFSET, SIGNATURE_VALUE, true);
    view.setUint16(offsetB + SECTION_ID_OFFSET, 2, true);
    view.setUint32(offsetB + SAVE_INDEX_OFFSET, 11, true);
    // Set a random section in Bank B to initialize the bank's save index
    view.setUint32(BANK_B_START + SIGNATURE_OFFSET, SIGNATURE_VALUE, true);
    view.setUint32(BANK_B_START + SAVE_INDEX_OFFSET, 11, true);

    const resultOffset = extractLatestSectionOffset(view, 2);
    expect(resultOffset).toBe(offsetB);
  });

  it('should fallback to Bank A if Bank B is missing', () => {
    const buffer = new ArrayBuffer(0x100000);
    const view = new DataView(buffer);

    const offsetA = BANK_A_START + 5 * SECTION_SIZE;
    view.setUint32(offsetA + SIGNATURE_OFFSET, SIGNATURE_VALUE, true);
    view.setUint16(offsetA + SECTION_ID_OFFSET, 2, true);
    view.setUint32(offsetA + SAVE_INDEX_OFFSET, 10, true);
    view.setUint32(BANK_A_START + SIGNATURE_OFFSET, SIGNATURE_VALUE, true);
    view.setUint32(BANK_A_START + SAVE_INDEX_OFFSET, 10, true);

    const resultOffset = extractLatestSectionOffset(view, 2);
    expect(resultOffset).toBe(offsetA);
  });

  it('should throw if neither bank has the section', () => {
    const buffer = new ArrayBuffer(0x100000);
    const view = new DataView(buffer);

    expect(() => {
      extractLatestSectionOffset(view, 1);
    }).toThrowError('The save file is corrupted or incomplete: missing section 1.');
  });
});
