import { describe, expect, it } from 'vitest';
import {
  MATCH_CALL_BLOCK_LENGTH,
  MATCH_CALL_BLOCK_SECTION_ID,
  MATCH_CALL_BLOCK_SECTION_OFFSET,
  MATCH_CALL_REGISTERED_FLAGS_COUNT,
  MATCH_CALL_REGISTERED_FLAGS_SECTION_ID,
  MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET,
  MATCH_CALL_REGISTERED_FLAGS_START_BIT,
  MATCH_CALL_REMATCH_NOT_READY,
  MATCH_CALL_UNLOCK_FLAG_BIT,
  MATCH_CALL_UNLOCK_FLAG_SECTION_ID,
  MATCH_CALL_UNLOCK_FLAG_SECTION_OFFSET,
} from './offsets';

describe('Match Call Offsets', () => {
  it('should have the correct block constants', () => {
    expect(MATCH_CALL_BLOCK_SECTION_ID).toBe(1);
    expect(MATCH_CALL_BLOCK_SECTION_OFFSET).toBe(0x09ca);
    expect(MATCH_CALL_BLOCK_LENGTH).toBe(100);
  });

  it('should have the correct registered flags constants', () => {
    expect(MATCH_CALL_REGISTERED_FLAGS_SECTION_ID).toBe(2);
    expect(MATCH_CALL_REGISTERED_FLAGS_SECTION_OFFSET).toBe(0x031b);
    expect(MATCH_CALL_REGISTERED_FLAGS_START_BIT).toBe(4);
    expect(MATCH_CALL_REGISTERED_FLAGS_COUNT).toBe(78);
  });

  it('should have the correct unlock flag constants', () => {
    expect(MATCH_CALL_UNLOCK_FLAG_SECTION_ID).toBe(2);
    expect(MATCH_CALL_UNLOCK_FLAG_SECTION_OFFSET).toBe(0x0315);
    expect(MATCH_CALL_UNLOCK_FLAG_BIT).toBe(7);
  });

  it('should define the correct rematch not ready constant', () => {
    expect(MATCH_CALL_REMATCH_NOT_READY).toBe(0);
  });
});
