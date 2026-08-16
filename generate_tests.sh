cat << 'INNER_EOF' > /tmp/gen1EventFlags.test.diff
<<<<<<< SEARCH
});
=======
  it('should handle boundary state (flags undefined) for TM flags', () => {
    // Array that is too small
    const eventFlags = new Uint8Array(10);
    const claimed = parseGen1TMFlags(eventFlags);

    // Filter gifts that are out of bounds and check that they return false
    const outOfBoundsGifts = Object.entries(GEN1_TM_EVENT_FLAGS).filter(
      ([, flag]) => flag >> 3 >= 10,
    );

    const outOfBoundsClaimed = outOfBoundsGifts.map(([idStr]) => claimed[parseInt(idStr, 10)]);
    expect(outOfBoundsClaimed.every((val) => val === false)).toBe(true);
  });
});

describe('parseGen1TMFlags', () => {
  it('should handle an absolute zero state correctly for TM flags', () => {
    const eventFlags = new Uint8Array(0x118); // all zeros
    const claimed = parseGen1TMFlags(eventFlags);
    for (const idStr of Object.keys(GEN1_TM_EVENT_FLAGS)) {
      const id = parseInt(idStr, 10);
      expect(claimed[id]).toBe(false);
    }
  });

  it('should parse specific claimed TM flags correctly', () => {
    const eventFlags = new Uint8Array(0x118);

    // Fake setting the TM 206 flag (id: 206, flag: 0x258)
    const tm206Flag = GEN1_TM_EVENT_FLAGS[206];
    if (tm206Flag !== undefined) {
      const byteIndex = tm206Flag >> 3;
      const bitIndex = tm206Flag & 7;
      const current = eventFlags[byteIndex];
      if (current !== undefined) eventFlags[byteIndex] = current | (1 << bitIndex);
    }

    const claimed = parseGen1TMFlags(eventFlags);
    expect(claimed[206]).toBe(true);
    // Another TM should be false
    expect(claimed[211]).toBe(false);
  });
});
>>>>>>> REPLACE
INNER_EOF
