## Refactoring Goal
Improve AI readability and predictable reasoning for Generation 2 Bug-Catching Contest scoring logic by extracting domain constants and decomposing IV and stat calculations into pure helper functions in `src/engine/bugCatchingContest/gen2Scoring.ts`.

## Actions Taken
- Extracted domain constants for multipliers and bonuses:
  - `BUG_CONTEST_MAX_HP_MULTIPLIER = 4`
  - `BUG_CONTEST_CURRENT_HP_DIVISOR = 8`
  - `BUG_CONTEST_HELD_ITEM_BONUS = 1`
  - `BUG_CONTEST_SHINY_IV_BONUS = 29`
  - `IV_BONUS_DEFENSE = 16`
  - `IV_BONUS_ATTACK = 8`
  - `IV_BONUS_SPECIAL = 4`
  - `IV_BONUS_SPEED = 1`
- Extracted `calculateBugContestIvBonus(ivs, isShiny)` helper function to encapsulate shiny override (29 points) and bit-quotient bonus accumulation for each stat.
- Extracted `calculateOtherStatsSum(pokemon)` helper function to sum non-HP stats (Attack, Defense, Special Attack, Special Defense, Speed).
- Refactored `calculateGen2BugCatchingScore` into a declarative, multi-step composition.
- Added comprehensive unit tests in `src/engine/bugCatchingContest/gen2Scoring.test.ts` covering the new helper functions and exported constants.

## Critical Learnings
- **Inline Arithmetic Masks Domain Rules:** Conflating stat summation, odd-quotient IV bit checks, and HP fractions in a single function body obscures the Gen 2 Bug-Catching Contest rules from AI agents.
- **Decomposition Enhances Testability & Comprehension:** Splitting IV bonus calculations into an isolated pure helper with explicit constant weights (`IV_BONUS_DEFENSE = 16`, etc.) makes it easy for LLMs to understand the scoring mechanism, verify edge cases independently, and avoid regression during future mechanic updates.
