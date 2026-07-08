1. Use `replace_with_git_merge_diff` to add `trainerName`, `trainerId`, `language`, `numSecretBasesReceived`, `numTimesEntered`, `decorations`, `decorationPositions`, and `party` fields to `Gen3SecretBase` in `src/engine/saveParser/parsers/common.ts`, and also create `Gen3SecretBasePartyMember` interface.
2. Use `write_file` to create `src/engine/gen3/secretBase/parser.ts` with the parsing logic (`parseSecretBaseRecord` and `parseSecretBaseParty`) relying on `DataView` and `decodeGen12String` (we observed it's `decodeGen12String`). Also specify all exact magic numbers as module-level constants.
3. Use `write_file` to create `src/engine/gen3/secretBase/parser.test.ts` to test parsing logic and `RangeError` behavior.
4. Use `run_in_bash_session` to execute `pnpm lint` and `pnpm test` to ensure code passes format and unit testing requirements. Also fix biome check with `pnpm check:fix`.
5. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
6. Use `submit` to submit the PR.
