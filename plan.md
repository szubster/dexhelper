1. **Update `src/engine/gen3/secretBase/parser.ts`**
   - Use `replace_with_git_merge_diff` to modify the constants.
   - Remove `TRAINER_NAME_LENGTH_RS`, `TRAINER_NAME_LENGTH_EMERALD`, `TRAINER_ID_OFFSET_RS`, and `TRAINER_ID_OFFSET_EMERALD`.
   - Add `TRAINER_NAME_LENGTH = 7` and `TRAINER_ID_OFFSET = 0x09`.
   - Remove the `isEmerald` check in `parseSecretBaseRecord`.
   - Update `parseSecretBaseRecord` to use `TRAINER_NAME_LENGTH` and `TRAINER_ID_OFFSET`.

2. **Update tests in `src/engine/gen3/secretBase/parser.test.ts`**
   - Ensure `parseSecretBaseRecord` tests use the correct offset for the Trainer ID (`11` since `2 + 7 + 0 + 2 = 11`, meaning offset is `0x09` exactly). Wait, in the test:
     `view.setUint32(10, 1234567, true);` -> change `10` to `9`.

3. **Verify the change**
   - Run `pnpm lint`, `pnpm test`, and `xvfb-run pnpm test:e2e` in bash to verify the code logic and typing.

4. **Update Task Checkboxes and Pre-Commit**
   - Use `replace_with_git_merge_diff` to modify `.foundry/tasks/task-333-349-gen3-secret-base-locations-retry-impl.md`.
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

5. **Submit PR**
   - Submit the PR using the `submit` tool.
