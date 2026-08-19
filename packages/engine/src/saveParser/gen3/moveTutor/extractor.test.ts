import { describe, expect, it } from 'vitest';
import { extractEmeraldMoveTutors, extractFRLGMoveTutors } from './extractor';

describe('Gen 3 Move Tutor Extractor', () => {
  describe('extractEmeraldMoveTutors', () => {
    it('should parse valid Emerald Move Tutor flags set to 0', () => {
      const buffer = new ArrayBuffer(0x2000);
      const dataView = new DataView(buffer);
      const sectionOffset = 0x0000;

      const result = extractEmeraldMoveTutors(dataView, sectionOffset);

      expect(result).toEqual({
        swagger: false,
        rollout: false,
        furyCutter: false,
        mimic: false,
        metronome: false,
        sleepTalk: false,
        substitute: false,
        dynamicPunch: false,
        doubleEdge: false,
        explosion: false,
      });
    });

    it('should parse valid Emerald Move Tutor flags set to 1', () => {
      const buffer = new ArrayBuffer(0x2000);
      const dataView = new DataView(buffer);
      const sectionOffset = 0x0000;

      const baseOffset = 0x1270;

      dataView.setUint8(baseOffset + Math.floor(433 / 8), 0b11111110);
      dataView.setUint8(baseOffset + Math.floor(440 / 8), 0b00000111);

      const result = extractEmeraldMoveTutors(dataView, sectionOffset);

      expect(result).toEqual({
        swagger: true,
        rollout: true,
        furyCutter: true,
        mimic: true,
        metronome: true,
        sleepTalk: true,
        substitute: true,
        dynamicPunch: true,
        doubleEdge: true,
        explosion: true,
      });
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(10);
      const dataView = new DataView(buffer);
      const sectionOffset = 0;

      expect(() => extractEmeraldMoveTutors(dataView, sectionOffset)).toThrow(
        'The save file is corrupted or incomplete.',
      );
    });
  });

  describe('extractFRLGMoveTutors', () => {
    it('should parse valid FireRed/LeafGreen Move Tutor flags set to 0', () => {
      const buffer = new ArrayBuffer(0x2000);
      const dataView = new DataView(buffer);
      const sectionOffset = 0x0000;

      const result = extractFRLGMoveTutors(dataView, sectionOffset);

      expect(result).toEqual({
        doubleEdge: false,
        thunderWave: false,
        rockSlide: false,
        explosion: false,
        megaPunch: false,
        megaKick: false,
        dreamEater: false,
        softBoiled: false,
        substitute: false,
        swordsDance: false,
        seismicToss: false,
        counter: false,
        metronome: false,
        mimic: false,
        bodySlam: false,
        frenzyPlant: false,
        blastBurn: false,
        hydroCannon: false,
      });
    });

    it('should parse valid FireRed/LeafGreen Move Tutor flags set to 1', () => {
      const buffer = new ArrayBuffer(0x2000);
      const dataView = new DataView(buffer);
      const sectionOffset = 0x0000;

      const baseOffset = 0x0ee0;

      dataView.setUint8(baseOffset + Math.floor(704 / 8), 0b11111111);
      dataView.setUint8(baseOffset + Math.floor(712 / 8), 0b01111111);
      dataView.setUint8(baseOffset + Math.floor(734 / 8), 0b11000000);
      dataView.setUint8(baseOffset + Math.floor(736 / 8), 0b00000001);

      const result = extractFRLGMoveTutors(dataView, sectionOffset);

      expect(result).toEqual({
        doubleEdge: true,
        thunderWave: true,
        rockSlide: true,
        explosion: true,
        megaPunch: true,
        megaKick: true,
        dreamEater: true,
        softBoiled: true,
        substitute: true,
        swordsDance: true,
        seismicToss: true,
        counter: true,
        metronome: true,
        mimic: true,
        bodySlam: true,
        frenzyPlant: true,
        blastBurn: true,
        hydroCannon: true,
      });
    });

    it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
      const buffer = new ArrayBuffer(10);
      const dataView = new DataView(buffer);
      const sectionOffset = 0;

      expect(() => extractFRLGMoveTutors(dataView, sectionOffset)).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
