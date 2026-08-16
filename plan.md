1. Modify `src/engine/saveParser/parsers/gen3.test.ts` using `replace_with_git_merge_diff` to add tests for `parseGen3TMHMs` and `parseGen3TMEventFlags` using the exact code below.
```typescript
<<<<<<< SEARCH
describe('parseGen3 (trainer flags integration)', () => {
=======
describe('parseGen3TMHMs', () => {
  it('should parse TM/HM items correctly', () => {
    // 256 bytes for RS TM pocket
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);

    // offset RS TM pocket = 0x0640
    const offset = 0x0640;

    // item 1: TM01 Focus Punch (itemId 0x0121) quantity 2 (masked with key 0x1234)
    view.setUint16(offset + 0, 0x0121, true); // TM01 Focus Punch
    view.setUint16(offset + 2, 2 ^ 0x1234, true); // Quantity 2 masked

    // item 2: empty
    view.setUint16(offset + 4, 0, true);

    // item 3: HM01 Cut (itemId 0x0153) quantity 1 (masked with key 0x1234)
    view.setUint16(offset + 8, 0x0153, true); // HM01 Cut
    view.setUint16(offset + 10, 1 ^ 0x1234, true); // Quantity 1 masked

    const result = parseGen3TMHMs(view, 0, 'ruby', 0xabcd1234);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ itemId: 0x0121, quantity: 2, moveId: 264 }); // 264 = Focus Punch
    expect(result[1]).toEqual({ itemId: 0x0153, quantity: 1, moveId: 15 }); // 15 = Cut
  });

  it('should throw Error "The save file is corrupted or incomplete." on RangeError', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3TMHMs(view, 0, 'ruby', 0)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3TMEventFlags', () => {
  it('should parse TM event flags correctly for RSE', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const baseOffset = 0x1000;

    // Set FLAG_RECEIVED_TM_BRICK_BREAK (0x103)
    // byteOffset = 0x103 >> 3 = 0x20
    // bitIndex = 0x103 & 7 = 3
    view.setUint8(baseOffset + 0x20, 1 << 3);

    const result = parseGen3TMEventFlags(view, baseOffset - 0x1020 /* GEN3_EVENT_FLAGS_OFFSET is 0x1020 */, 'ruby');
    expect(result['TM31_BRICK_BREAK']).toBe(true);
    expect(result['TM34_SHOCK_WAVE']).toBe(false);
  });

  it('should parse TM event flags correctly for FRLG', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const baseOffset = 0x1000;

    // Set FLAG_GOT_TM34_FROM_SURGE (0x231)
    // byteOffset = 0x231 >> 3 = 0x46
    // bitIndex = 0x231 & 7 = 1
    view.setUint8(baseOffset + 0x46, 1 << 1);

    const result = parseGen3TMEventFlags(view, baseOffset - 0x1020, 'firered');
    expect(result['TM34_SHOCK_WAVE']).toBe(true);
    expect(result['TM28_DIG']).toBe(false);
  });

  it('should throw Error "The save file is corrupted or incomplete." on RangeError', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3TMEventFlags(view, 0, 'ruby')).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3 (trainer flags integration)', () => {
>>>>>>> REPLACE
```
2. Verify test modification using `read_file` on `src/engine/saveParser/parsers/gen3.test.ts`.
3. Use `replace_with_git_merge_diff` to modify `.foundry/tasks/task-410-430-gen3-tm-hm-parsing-impl.md` to check off the acceptance criteria checkboxes.
4. Verify file modification using `read_file` on `.foundry/tasks/task-410-430-gen3-tm-hm-parsing-impl.md`.
5. Run tests using `run_in_bash_session` with `pnpm lint`, `pnpm test`, and `xvfb-run pnpm test:e2e` to verify no regressions were introduced.
6. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
7. Submit the changes.
