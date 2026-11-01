## Refactoring Goal
Improve AI readability and extensibility by extracting item-stealing move constants and a declarative helper function in `src/engine/moves/itemStealers.ts`.

## Actions Taken
- Extracted `ITEM_STEALING_MOVE_IDS` array constant containing `[THIEF_MOVE_ID, COVET_MOVE_ID]`.
- Created pure helper function `findStealingMove(moves: readonly number[]): number | undefined` using `.find()`.
- Refactored `findItemStealers` to use `flatMap` and `findStealingMove` instead of imperative `for` loops and `if / else if` branches.
- Updated `src/engine/moves/__tests__/itemStealers.test.ts` to test `findStealingMove` and `ITEM_STEALING_MOVE_IDS`.

## Critical Learnings
- **Imperative move checks obscure move category intent:** Replacing hardcoded `if (moves.includes(THIEF)) ... else if (moves.includes(COVET))` with a declarative lookup array (`ITEM_STEALING_MOVE_IDS`) and a pure helper (`findStealingMove`) allows LLMs to easily understand move categories and extend them without touching control flow.
