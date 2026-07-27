1. **Update `SaveData` interface** in `src/engine/saveParser/parsers/common.ts` to include `gen3LotteryNumber?: number`.
2. **Update `parseGen3`** in `src/engine/saveParser/parsers/gen3.ts` to extract the lottery number using `parseGen3LotteryNumber(view, section1Offset, _forcedVersion)` for Emerald, Ruby, and Sapphire, and include it in the `SaveData` result.
3. **Create `useLotteryMatch` hook** in `src/hooks/useLotteryMatch.ts` that selects `saveData` from `useStore`, extracts all Pokémon from party, PC, and daycare, and runs `getBestLotteryMatch`. It will return the winning number, best match Pokémon, OT ID, matched digits, and prize tier.
4. **Create tests for `useLotteryMatch`** in `src/hooks/useLotteryMatch.test.ts`, using `@testing-library/react` and Vitest, testing the return format and logic when there are matches vs no matches.
5. **Run all tests** to ensure no regressions and verify the new hook.
6. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
7. Submit the branch.
