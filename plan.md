1. **Explore & Read Required Documents**:
   - (Completed manually via previous bash commands reading documents)

2. **Modify `src/engine/saveParser/parsers/common.ts`**:
   - Use `replace_with_git_merge_diff` to add `hasBattleFrontier: boolean;` to the `Gen3TrainerCard` interface.
```
<<<<<<< SEARCH
export interface Gen3TrainerCard {
  hasHallOfFame: boolean;
  hasHoennDex: boolean;
  hasNationalDex: boolean;
}
=======
export interface Gen3TrainerCard {
  hasHallOfFame: boolean;
  hasHoennDex: boolean;
  hasNationalDex: boolean;
  hasBattleFrontier: boolean;
}
>>>>>>> REPLACE
```

3. **Modify `src/engine/saveParser/parsers/gen3.ts`**:
   - Use `replace_with_git_merge_diff` to add the `hasBattleFrontier` calculation and add it to `gen3TrainerCard`.
```
<<<<<<< SEARCH
    const gen3TrainerCard = {
      hasHallOfFame: hallOfFameCount > 0,
      hasHoennDex: hoennDexCount === 202,
      hasNationalDex: nationalDexCount === 386,
    };
=======
    const hasBattleFrontier =
      gen3BattleFrontierSymbols !== undefined &&
      gen3BattleFrontierSymbols.tower.gold &&
      gen3BattleFrontierSymbols.dome.gold &&
      gen3BattleFrontierSymbols.palace.gold &&
      gen3BattleFrontierSymbols.arena.gold &&
      gen3BattleFrontierSymbols.factory.gold &&
      gen3BattleFrontierSymbols.pike.gold &&
      gen3BattleFrontierSymbols.pyramid.gold;

    const gen3TrainerCard = {
      hasHallOfFame: hallOfFameCount > 0,
      hasHoennDex: hoennDexCount === 202,
      hasNationalDex: nationalDexCount === 386,
      hasBattleFrontier,
    };
>>>>>>> REPLACE
```

4. **Modify `src/engine/saveParser/parsers/gen3.test.ts`**:
   - Use `replace_with_git_merge_diff` to update the existing test `correctly constructs gen3TrainerCard` to include `hasBattleFrontier: false`.
   - Add a new test simulating a state where all battle frontier symbols are gold to check `hasBattleFrontier: true`. The flag offsets are based on `TOWER_GOLD_OFFSET` etc in `src/engine/saveParser/gen3/battleFrontier/parser.ts`:
     - Tower Gold: `0x1388` bit 5
     - Dome Gold: `0x1388` bit 7
     - Palace Gold: `0x1389` bit 1
     - Arena Gold: `0x1389` bit 3
     - Factory Gold: `0x1389` bit 5
     - Pike Gold: `0x1389` bit 7
     - Pyramid Gold: `0x138A` bit 1
```
<<<<<<< SEARCH
    const saveData = parseGen3(view);
    expect(saveData.gen3TrainerCard).toBeDefined();
    expect(saveData.gen3TrainerCard).toEqual({
      hasHallOfFame: false,
      hasHoennDex: false,
      hasNationalDex: false,
    });
  });
});
=======
    const saveData = parseGen3(view);
    expect(saveData.gen3TrainerCard).toBeDefined();
    expect(saveData.gen3TrainerCard).toEqual({
      hasHallOfFame: false,
      hasHoennDex: false,
      hasNationalDex: false,
      hasBattleFrontier: false,
    });
  });

  it('correctly constructs gen3TrainerCard with hasBattleFrontier true', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

    // Section 1 setup
    const section1Offset = 0xe000 + 1 * 4096;
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint32(section1Offset + 4092, 25, true);

    // Section 2 setup (required by parseGen3)
    const section2Offset = 0xe000 + 2 * 4096;
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint32(section2Offset + 4092, 25, true);

    // Mock Battle Frontier Flags
    view.setUint8(section1Offset + 0x1388, (1 << 5) | (1 << 7));
    view.setUint8(section1Offset + 0x1389, (1 << 1) | (1 << 3) | (1 << 5) | (1 << 7));
    view.setUint8(section1Offset + 0x138a, (1 << 1));

    const saveData = parseGen3(view);
    expect(saveData.gen3TrainerCard).toBeDefined();
    expect(saveData.gen3TrainerCard).toEqual({
      hasHallOfFame: false,
      hasHoennDex: false,
      hasNationalDex: false,
      hasBattleFrontier: true,
    });
  });
});
>>>>>>> REPLACE
```

5. **Verify the implementation**:
   - Run `pnpm lint`, `pnpm test`, and `xvfb-run pnpm test:e2e` to verify the changes.

6. **Complete Pre-commit Steps**:
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

7. **Submit**:
   - Submit the PR with branch name `gen3-battle-frontier-parsing`, title `feat: Add Gen 3 Battle Frontier Parsing Implementation`, and body `Add hasBattleFrontier boolean property to Gen3TrainerCard by checking gen3BattleFrontierSymbols.`.
