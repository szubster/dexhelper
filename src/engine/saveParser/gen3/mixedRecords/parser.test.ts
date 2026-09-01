import { describe, expect, it } from 'vitest';
import * as Constants from './constants';
import { parseGen3MixedRecordNPC } from './parser';

describe('parseGen3MixedRecordNPC', () => {
  it('should correctly parse an NPC with SoA party layout', () => {
    // We construct a mock buffer.
    const buffer = new ArrayBuffer(Constants.MIXED_RECORD_NPC_LENGTH);
    const view = new DataView(buffer);

    // Write trainer name: 'TEST' (in Gen 3 encoding, uppercase letters are 0xBB to 0xD4)
    // T = 0xBB + ('T'.charCodeAt(0) - 65) = 187 + 19 = 206 = 0xCE
    // E = 0xBB + ('E'.charCodeAt(0) - 65) = 187 + 4 = 191 = 0xBF
    // S = 0xBB + ('S'.charCodeAt(0) - 65) = 187 + 18 = 205 = 0xCD
    const nameChars: number[] = [
      0xce, // T
      0xbf, // E
      0xcd, // S
      0xce, // T
      0xff, // Terminator
    ];
    for (let i = 0; i < nameChars.length; i++) {
      view.setUint8(Constants.MIXED_RECORD_NPC_TRAINER_NAME_OFFSET + i, nameChars[i] as number);
    }

    view.setUint8(Constants.MIXED_RECORD_NPC_TRAINER_GENDER_OFFSET, 1);
    view.setUint32(Constants.MIXED_RECORD_NPC_TRAINER_ID_OFFSET, 12345678, true);

    const partyBaseOffset = Constants.MIXED_RECORD_NPC_PARTY_OFFSET;

    // Pokemon 0 (multiplying by 0 evaluates to 0, which is flagged by oxlint, so omitting 0 multiplications)
    view.setUint32(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_PERSONALITY_OFFSET, 0x12345678, true);
    view.setUint16(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_SPECIES_OFFSET, 25, true); // Pikachu
    view.setUint16(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_HELD_ITEM_OFFSET, 12, true);
    view.setUint8(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_LEVEL_OFFSET, 10);
    // Move 1
    view.setUint16(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_MOVES_OFFSET, 84, true); // Thunder Shock
    view.setUint16(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_MOVES_OFFSET + 2, 0, true);
    view.setUint16(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_MOVES_OFFSET + 4, 0, true);
    view.setUint16(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_MOVES_OFFSET + 6, 0, true);
    view.setUint8(partyBaseOffset + Constants.MIXED_RECORD_POKEMON_EVS_OFFSET, 5);

    // Pokemon 1: Empty slot
    view.setUint32(
      partyBaseOffset +
        Constants.MIXED_RECORD_POKEMON_PERSONALITY_OFFSET +
        1 * Constants.MIXED_RECORD_POKEMON_PERSONALITY_SIZE,
      0,
      true,
    );

    // Pokemon 2: Another empty slot
    view.setUint32(
      partyBaseOffset +
        Constants.MIXED_RECORD_POKEMON_PERSONALITY_OFFSET +
        2 * Constants.MIXED_RECORD_POKEMON_PERSONALITY_SIZE,
      0xffffffff,
      true,
    );

    const npc = parseGen3MixedRecordNPC(view, 0);

    expect(npc.trainerName).toBe('TEST');
    expect(npc.trainerGender).toBe(1);
    expect(npc.trainerId).toBe(12345678);

    expect(npc.party).toHaveLength(1);
    expect(npc.party[0]?.personality).toBe(0x12345678);
    expect(npc.party[0]?.species).toBe(25);
    expect(npc.party[0]?.heldItem).toBe(12);
    expect(npc.party[0]?.level).toBe(10);
    expect(npc.party[0]?.moves).toEqual([84, 0, 0, 0]);
    expect(npc.party[0]?.hpEV).toBe(5);
    expect(npc.party[0]?.atkEV).toBe(5);
  });

  it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
    // Create a buffer that is too small
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => parseGen3MixedRecordNPC(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});
