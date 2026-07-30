1. **Define module-level constants in `src/engine/saveParser/parsers/gen2.ts`:**
   - I need to replace the inline magic number `57` with a constant in the module scope.
   - For example: `const GEN2_TM_HM_COUNT = 57;` and `const GEN2_TM_BASE_ITEM_ID = 191;`
   - Use `replace_with_git_merge_diff` to add the constants near the top of the file, around other pocket and item constants.

2. **Update `parseInventory` in `src/engine/saveParser/parsers/gen2.ts`:**
   - I need to replace `for (let i = 0; i < 57; i++)` with `for (let i = 0; i < GEN2_TM_HM_COUNT; i++)`.
   - Also replace `const itemId = 191 + i;` with `const itemId = GEN2_TM_BASE_ITEM_ID + i;`.
   - I will also ensure I catch `RangeError` from the `DataView` operations here if it's missing, though it seems other places handle it at a higher level, I should check ADRs if `parseInventory` needs its own try/catch, or if the main `parseGen2` try/catch block is sufficient. Ah, wait, `parseInventory` has a few `getUint8` calls. Actually, `parseGen2` does not wrap `parseInventory` in a try/catch. Let's add a try/catch to `parseInventory` to catch `RangeError` and throw a new Error with the message `"The save file is corrupted or incomplete."`, as strictly mandated by the rules for save file parsing.

3. **Verify changes and run tests:**
   - Run `pnpm lint` and `pnpm test src/engine/saveParser/parsers/gen2.test.ts` to ensure everything works properly and formatting is correct.
   - If there are formatting errors, use `pnpm check:fix`.

4. **Complete pre commit steps:**
   - Complete pre commit steps to ensure proper testing, verification, review, and reflection are done.

5. **Submit the changes:**
   - Call the `submit` tool to create the PR, update the `.foundry/tasks/task-320-322-gen2-tm-hm-parsing-impl.md` file checking off all the acceptance criteria, and finish the assignment.
