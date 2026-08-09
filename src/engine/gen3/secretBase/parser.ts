import { decodeGen12String, type Gen3SecretBasePartyMember } from '../../saveParser/parsers/common';

export const SECRET_BASE_SIZE = 160;
export const SECRET_BASE_MAP_ID_DIVISOR = 10;
export const FLAGS_OFFSET = 0x01;
export const BATTLED_OWNER_TODAY_MASK = 1 << 5;

export const TRAINER_NAME_OFFSET = 0x02;
export const TRAINER_NAME_LENGTH = 7;

export const TRAINER_ID_OFFSET = 0x09;

export const PARTY_OFFSET = 0x34;
export const PARTY_COUNT = 6;

export const POKEMON_PERSONALITY_OFFSET = 0x00;
export const POKEMON_MOVES_OFFSET = 0x18;
export const POKEMON_SPECIES_OFFSET = 0x48;
export const POKEMON_HELD_ITEM_OFFSET = 0x54;
export const POKEMON_LEVEL_OFFSET = 0x60;
export const POKEMON_EVS_OFFSET = 0x66;

export const POKEMON_MOVES_COUNT = 4;
export const POKEMON_MOVE_SIZE = 2;
export const POKEMON_PERSONALITY_SIZE = 4;
export const POKEMON_SPECIES_SIZE = 2;
export const POKEMON_HELD_ITEM_SIZE = 2;
export const POKEMON_LEVEL_SIZE = 1;
export const POKEMON_EVS_SIZE = 1;

export const DECOR_MAX_SECRET_BASE = 16;
export const NUM_SECRET_BASES_RECEIVED_OFFSET = 0x0e;
export const NUM_TIMES_ENTERED_OFFSET = 0x10;
export const DECORATIONS_OFFSET = 0x12;
export const DECORATION_POSITIONS_OFFSET = 0x22;

export const EMPTY_SECRET_BASE_ID = 0;
export const FLAG_FALSE = 0;

/**
 * Parses the Secret Base Party member structures from a Gen 3 save file.
 *
 * @param view - The DataView of the save file.
 * @param partyOffset - The start offset of the party structure.
 * @returns Array of parsed Gen3SecretBasePartyMember.
 */
export function parseSecretBaseParty(view: DataView, partyOffset: number): Gen3SecretBasePartyMember[] {
  try {
    const party: Gen3SecretBasePartyMember[] = [];

    for (let i = 0; i < PARTY_COUNT; i++) {
      const personalityOffset = partyOffset + POKEMON_PERSONALITY_OFFSET + i * POKEMON_PERSONALITY_SIZE;
      const personality = view.getUint32(personalityOffset, true);

      const speciesOffset = partyOffset + POKEMON_SPECIES_OFFSET + i * POKEMON_SPECIES_SIZE;
      const species = view.getUint16(speciesOffset, true);

      const moves: number[] = [];
      const moveStartOffset = partyOffset + POKEMON_MOVES_OFFSET + i * (POKEMON_MOVES_COUNT * POKEMON_MOVE_SIZE);
      for (let j = 0; j < POKEMON_MOVES_COUNT; j++) {
        moves.push(view.getUint16(moveStartOffset + j * POKEMON_MOVE_SIZE, true));
      }

      const heldItemOffset = partyOffset + POKEMON_HELD_ITEM_OFFSET + i * POKEMON_HELD_ITEM_SIZE;
      const heldItem = view.getUint16(heldItemOffset, true);

      const levelOffset = partyOffset + POKEMON_LEVEL_OFFSET + i * POKEMON_LEVEL_SIZE;
      const level = view.getUint8(levelOffset);

      const evsOffset = partyOffset + POKEMON_EVS_OFFSET + i * POKEMON_EVS_SIZE;
      const evs = view.getUint8(evsOffset);

      party.push({
        personality,
        moves,
        species,
        heldItem,
        level,
        evs,
      });
    }

    return party;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the trainer name and trainer id, alongside the party
 *
 * @param view - The DataView of the save file.
 * @param offset - The start offset of the Secret Base struct.
 * @returns The parsed trainer metadata and party for the secret base, or null if the base is invalid.
 */
export function parseSecretBaseRecord(view: DataView, offset: number) {
  try {
    const secretBaseId = view.getUint8(offset);

    // If ID is 0, the secret base slot is typically empty.
    if (secretBaseId === EMPTY_SECRET_BASE_ID) {
      return null;
    }

    const mapId = Math.floor(secretBaseId / SECRET_BASE_MAP_ID_DIVISOR);

    const flags = view.getUint8(offset + FLAGS_OFFSET);
    const battledOwnerToday = (flags & BATTLED_OWNER_TODAY_MASK) !== FLAG_FALSE;

    const trainerName = decodeGen12String(view, offset + TRAINER_NAME_OFFSET, TRAINER_NAME_LENGTH);

    // Read the 4 byte Trainer ID
    const trainerId = view.getUint32(offset + TRAINER_ID_OFFSET, true);

    const numSecretBasesReceived = view.getUint16(offset + NUM_SECRET_BASES_RECEIVED_OFFSET, true);
    const numTimesEntered = view.getUint8(offset + NUM_TIMES_ENTERED_OFFSET);

    const decorations: number[] = [];
    for (let i = 0; i < DECOR_MAX_SECRET_BASE; i++) {
      decorations.push(view.getUint8(offset + DECORATIONS_OFFSET + i));
    }

    const decorationPositions: number[] = [];
    for (let i = 0; i < DECOR_MAX_SECRET_BASE; i++) {
      decorationPositions.push(view.getUint8(offset + DECORATION_POSITIONS_OFFSET + i));
    }

    const party = parseSecretBaseParty(view, offset + PARTY_OFFSET);

    return {
      secretBaseId,
      mapId,
      trainerName,
      trainerId,
      battledOwnerToday,
      numSecretBasesReceived,
      numTimesEntered,
      decorations,
      decorationPositions,
      party,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
