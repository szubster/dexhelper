# Sentinel Session: Gender Calculation Fallback Branch Coverage

**Target File:** `src/utils/gender.ts`

**Observations & Actions:**
- Extended `src/utils/gender.test.ts` to add test cases covering the default fallback branch logic for non-standard gender rates in `calculateGen2Gender` and `calculateGen3Gender`.
- Tested non-standard rate calculations (e.g., `genderRate = 3`) to verify `femaleThreshold = genderRate * 2 - 1` in Gen 2 and `femaleThreshold = Math.floor((genderRate / 8) * 256) - 1` in Gen 3.
- All tests passed cleanly without modifying application source code.

**Learnings:**
- Default fallback branches for approximation calculations in utility functions can easily be missed if tests only verify common constant values. Adding non-standard rate tests achieves full branch coverage for calculation utilities.
