import { describe, expect, it } from 'vitest';
import { parseSecretBaseParty, parseSecretBaseRecord, SECRET_BASE_SIZE } from './parser';

describe('Secret Base Parser', () => {
  describe('parseSecretBaseParty', () => {
    it('should parse party correctly from a valid view', () => {
      const buffer = new ArrayBuffer(200);
      const view = new DataView(buffer);

      const partyOffset = 52;

      // Pokemon 0: personality=0x12345678, species=0x011C (284 - Masquerain), moves=[1,2,3,4], heldItem=5, level=10, evs=20
      view.setUint32(partyOffset + 0x00, 0x12345678, true);
      view.setUint16(partyOffset + 0x18, 1, true);
      view.setUint16(partyOffset + 0x1a, 2, true);
      view.setUint16(partyOffset + 0x1c, 3, true);
      view.setUint16(partyOffset + 0x1e, 4, true);
      view.setUint16(partyOffset + 0x48, 284, true);
      view.setUint16(partyOffset + 0x54, 5, true);
      view.setUint8(partyOffset + 0x60, 10);
      view.setUint8(partyOffset + 0x66, 20);

      const party = parseSecretBaseParty(view, partyOffset);

      expect(party).toHaveLength(6);
      expect(party[0]?.personality).toBe(0x12345678);
      expect(party[0]?.species).toBe(284);
      expect(party[0]?.moves).toEqual([1, 2, 3, 4]);
      expect(party[0]?.heldItem).toBe(5);
      expect(party[0]?.level).toBe(10);
      expect(party[0]?.evs).toBe(20);
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(10);
      const view = new DataView(buffer);

      expect(() => parseSecretBaseParty(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseSecretBaseRecord', () => {
    it('should return null if secretBaseId is 0', () => {
      const buffer = new ArrayBuffer(SECRET_BASE_SIZE);
      const view = new DataView(buffer);
      view.setUint8(0, 0); // Empty base

      const record = parseSecretBaseRecord(view, 0);
      expect(record).toBeNull();
    });

    it('should parse valid secret base record', () => {
      const buffer = new ArrayBuffer(SECRET_BASE_SIZE);
      const view = new DataView(buffer);

      view.setUint8(0, 15); // Base ID

      view.setUint8(1, 1 << 5); // Set battledOwnerToday flag

      // "ASH\0\0\0\0"
      // Wait, A is 0x80, S is 0x92, H is 0x87 in GEN12_CHAR_MAP (or 0xFF for end)
      view.setUint8(2, 0x80);
      view.setUint8(3, 0x92);
      view.setUint8(4, 0x87);
      view.setUint8(5, 0xff);
      view.setUint8(6, 0xff);
      view.setUint8(7, 0xff);
      view.setUint8(8, 0xff);

      view.setUint32(9, 1234567, true);

      view.setUint16(0x0e, 42, true); // numSecretBasesReceived
      view.setUint8(0x10, 5); // numTimesEntered

      // Decorations
      for (let i = 0; i < 16; i++) {
        view.setUint8(0x12 + i, i + 1);
      }

      // Decoration Positions
      for (let i = 0; i < 16; i++) {
        view.setUint8(0x22 + i, 16 - i);
      }

      // Let's set some party data
      const partyOffset = 52;
      view.setUint16(partyOffset + 0x48, 1, true); // Bulbasaur

      const record = parseSecretBaseRecord(view, 0);

      expect(record).toBeDefined();
      expect(record?.secretBaseId).toBe(15);
      expect(record?.mapId).toBe(1);
      expect(record?.trainerName).toBe('ASH');
      expect(record?.trainerId).toBe(1234567);
      expect(record?.battledOwnerToday).toBe(true);
      expect(record?.numSecretBasesReceived).toBe(42);
      expect(record?.numTimesEntered).toBe(5);
      expect(record?.decorations).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      expect(record?.decorationPositions).toEqual([16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
      expect(record?.party[0]?.species).toBe(1);
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(10);
      const view = new DataView(buffer);
      view.setUint8(0, 1);

      expect(() => parseSecretBaseRecord(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
