import { describe, expect, it } from 'vitest';
import {
  FRLG_FLAGS_OFFSET,
  FRLG_FOSSIL_ID_DOME,
  FRLG_FOSSIL_ID_HELIX,
  FRLG_FOSSIL_ID_OLD_AMBER,
  FRLG_VAR_WHICH_FOSSIL_REVIVED,
  FRLG_VARS_OFFSET,
  RSE_FLAGS_OFFSET_EMERALD,
  RSE_FLAGS_OFFSET_RS,
  RSE_FOSSIL_ID_CLAW,
  RSE_FOSSIL_ID_ROOT,
  RSE_FOSSIL_STATE_NONE,
  RSE_FOSSIL_STATE_READY,
  RSE_FOSSIL_STATE_REGENERATING,
  RSE_VAR_FOSSIL_RESURRECTION_STATE_EMERALD,
  RSE_VAR_FOSSIL_RESURRECTION_STATE_RS,
  RSE_VAR_WHICH_FOSSIL_REVIVED_EMERALD,
  RSE_VAR_WHICH_FOSSIL_REVIVED_RS,
  RSE_VARS_OFFSET_EMERALD,
  RSE_VARS_OFFSET_RS,
} from './constants';

describe('Gen 3 Fossil Constants', () => {
  it('should define RSE Ruby/Sapphire offsets correctly', () => {
    expect(RSE_VARS_OFFSET_RS).toBe(0x1340);
    expect(RSE_FLAGS_OFFSET_RS).toBe(0x1220);
    expect(RSE_VAR_FOSSIL_RESURRECTION_STATE_RS).toBe(0x14c8 - 0x1340);
    expect(RSE_VAR_WHICH_FOSSIL_REVIVED_RS).toBe(0x14ca - 0x1340);
  });

  it('should define Emerald offsets correctly', () => {
    expect(RSE_VARS_OFFSET_EMERALD).toBe(0x139c);
    expect(RSE_FLAGS_OFFSET_EMERALD).toBe(0x1270);
    expect(RSE_VAR_FOSSIL_RESURRECTION_STATE_EMERALD).toBe(0x1524 - 0x139c);
    expect(RSE_VAR_WHICH_FOSSIL_REVIVED_EMERALD).toBe(0x1526 - 0x139c);
  });

  it('should define fossil states correctly', () => {
    expect(RSE_FOSSIL_STATE_NONE).toBe(0);
    expect(RSE_FOSSIL_STATE_REGENERATING).toBe(1);
    expect(RSE_FOSSIL_STATE_READY).toBe(2);
  });

  it('should define RSE fossil IDs correctly', () => {
    expect(RSE_FOSSIL_ID_ROOT).toBe(1);
    expect(RSE_FOSSIL_ID_CLAW).toBe(2);
  });

  it('should define FRLG offsets correctly', () => {
    expect(FRLG_VARS_OFFSET).toBe(0x1000);
    expect(FRLG_FLAGS_OFFSET).toBe(0x0ee0);
    expect(FRLG_VAR_WHICH_FOSSIL_REVIVED).toBe(0x10d2 - 0x1000);
  });

  it('should define FRLG fossil IDs correctly', () => {
    expect(FRLG_FOSSIL_ID_HELIX).toBe(357);
    expect(FRLG_FOSSIL_ID_DOME).toBe(358);
    expect(FRLG_FOSSIL_ID_OLD_AMBER).toBe(354);
  });
});
