1. **Fix HM Item ID calculation in src/engine/saveParser/parsers/gen2.ts**
   - Execute a `replace_with_git_merge_diff` to update the TM/HM ID calculation logic to use the simplified and correct `191 + i`, mapping TM01 to 191 (0xBF) and HM01 to 241 (0xF1).

2. **Fix tests in src/engine/saveParser/saveParser.test.ts**
   - Execute a `replace_with_git_merge_diff` to update the assertions for HM01, ensuring it maps to ID 241 instead of 242.

3. **Run tests to verify**
   - Run `pnpm test src/engine/saveParser/saveParser.test.ts` to ensure tests pass.

4. **Complete Pre Commit Steps**
   - Run `initiate_memory_recording`.
   - Submit.
