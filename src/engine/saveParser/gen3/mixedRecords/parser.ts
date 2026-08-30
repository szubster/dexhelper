import { decodeGen3String } from '../../parsers/common';
import * as Constants from './constants';
import type { Gen3MixedRecordNPC, Gen3MixedRecordNPCPokemon } from './types';

export function parseGen3MixedRecordNPC(view: DataView, offset: number): Gen3MixedRecordNPC {
  try {
    const trainerName = decodeGen3String(
      view,
      offset + Constants.MIXED_RECORD_NPC_TRAINER_NAME_OFFSET,
      Constants.MIXED_RECORD_NPC_TRAINER_NAME_LENGTH,
    );
    const trainerGender = view.getUint8(offset + Constants.MIXED_RECORD_NPC_TRAINER_GENDER_OFFSET);
    const trainerId = view.getUint32(offset + Constants.MIXED_RECORD_NPC_TRAINER_ID_OFFSET, true);

    const party: Gen3MixedRecordNPCPokemon[] = [];
    const partyBaseOffset = offset + Constants.MIXED_RECORD_NPC_PARTY_OFFSET;

    for (let p = 0; p < Constants.MIXED_RECORD_NPC_PARTY_COUNT; p++) {
      const personalityOffset =
        partyBaseOffset +
        Constants.MIXED_RECORD_POKEMON_PERSONALITY_OFFSET +
        p * Constants.MIXED_RECORD_POKEMON_PERSONALITY_SIZE;
      const personality = view.getUint32(personalityOffset, true);

      if (personality === 0 || personality === 0xffffffff) {
        continue;
      }

      const speciesOffset =
        partyBaseOffset +
        Constants.MIXED_RECORD_POKEMON_SPECIES_OFFSET +
        p * Constants.MIXED_RECORD_POKEMON_SPECIES_SIZE;
      const species = view.getUint16(speciesOffset, true);

      const heldItemOffset =
        partyBaseOffset +
        Constants.MIXED_RECORD_POKEMON_HELD_ITEM_OFFSET +
        p * Constants.MIXED_RECORD_POKEMON_HELD_ITEM_SIZE;
      const heldItem = view.getUint16(heldItemOffset, true);

      const levelOffset =
        partyBaseOffset + Constants.MIXED_RECORD_POKEMON_LEVEL_OFFSET + p * Constants.MIXED_RECORD_POKEMON_LEVEL_SIZE;
      const level = view.getUint8(levelOffset);

      const moves: number[] = [];
      for (let m = 0; m < Constants.MIXED_RECORD_POKEMON_MOVES_COUNT; m++) {
        const moveOffset =
          partyBaseOffset +
          Constants.MIXED_RECORD_POKEMON_MOVES_OFFSET +
          p * (Constants.MIXED_RECORD_POKEMON_MOVES_COUNT * Constants.MIXED_RECORD_POKEMON_MOVE_SIZE) +
          m * Constants.MIXED_RECORD_POKEMON_MOVE_SIZE;
        moves.push(view.getUint16(moveOffset, true));
      }

      const evOffset =
        partyBaseOffset + Constants.MIXED_RECORD_POKEMON_EVS_OFFSET + p * Constants.MIXED_RECORD_POKEMON_EVS_SIZE;
      const evValue = view.getUint8(evOffset);

      party.push({
        personality,
        species,
        heldItem,
        moves,
        level,
        hpEV: evValue,
        atkEV: evValue,
        defEV: evValue,
        speedEV: evValue,
        spAtkEV: evValue,
        spDefEV: evValue,
      });
    }

    return {
      trainerName,
      trainerGender,
      trainerId,
      party,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
