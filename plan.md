1. **Optimize `allInstances.some` in `generateSuggestions` in `src/engine/assistant/suggestionEngine.ts`**
   - The loop `for (const trade of STATIC_NPC_TRADE_DATA)` calls `allInstances.some` inside it to check if a trade is claimed.
   - We already have `instancesBySpecies` pre-calculated for Evolutions further down in the file.
   - We can move the initialization of `instancesBySpecies` to above the "NPC Trades" section.
   - Inside the "NPC Trades" loop, we can use `instancesBySpecies.get(trade.receivedId)?.some(...)` instead of iterating over the entire `allInstances` array. This reduces the complexity from O(T * N) to O(T * K) where T is number of trades, N is total instances, and K is instances of the specific received species (usually 0 or 1).

2. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Run `pnpm test`
   - Run `npx @biomejs/biome check --write .`

3. **Submit the PR**
   - PR Title: `⚡ Bolt: Optimize NPC trade checking in suggestion engine`
   - Add the journal entry to `.jules/bolt.md`
