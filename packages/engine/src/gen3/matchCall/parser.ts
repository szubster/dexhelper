import {
  MATCH_CALL_BLOCK_LENGTH,
  MATCH_CALL_BLOCK_SECTION_OFFSET,
  MATCH_CALL_REGISTERED_FLAGS_COUNT,
  MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET,
  MATCH_CALL_REGISTERED_FLAGS_START_BIT,
  MATCH_CALL_UNLOCK_FLAG_BIT,
  MATCH_CALL_UNLOCK_FLAG_SECTION_OFFSET,
} from './offsets';

export interface Gen3MatchCall {
  hasMatchCall: boolean;
  registeredTrainers: boolean[];
  rematchStates: number[];
}

export function parseGen3MatchCall(
  view: DataView,
  section1Offset: number,
  section2Offset: number,
  gameVersion: string,
): Gen3MatchCall | undefined {
  if (gameVersion !== 'emerald') {
    return undefined; // Match Call only exists in Emerald
  }

  try {
    const hasMatchCallByte = view.getUint8(section2Offset + MATCH_CALL_UNLOCK_FLAG_SECTION_OFFSET);
    const hasMatchCall = !!((hasMatchCallByte >> MATCH_CALL_UNLOCK_FLAG_BIT) & 1);

    const registeredTrainers: boolean[] = [];
    let currentByteOffset = MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET;
    let currentBitIndex = MATCH_CALL_REGISTERED_FLAGS_START_BIT;

    for (let i = 0; i < MATCH_CALL_REGISTERED_FLAGS_COUNT; i++) {
      const byte = view.getUint8(section2Offset + currentByteOffset);
      registeredTrainers.push(!!((byte >> currentBitIndex) & 1));

      currentBitIndex++;
      if (currentBitIndex > 7) {
        currentBitIndex = 0;
        currentByteOffset++;
      }
    }

    const rematchStates: number[] = [];
    for (let i = 0; i < MATCH_CALL_BLOCK_LENGTH; i++) {
      rematchStates.push(view.getUint8(section1Offset + MATCH_CALL_BLOCK_SECTION_OFFSET + i));
    }

    return {
      hasMatchCall,
      registeredTrainers,
      rematchStates,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
