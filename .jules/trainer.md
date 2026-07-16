# Trainer Journal

## Trade Generator Unobtainable Reason
* Critical constraint discovered: When generating gift and trade suggestions (`tradeGenerator.ts`), we cannot hardcode logic like `saveData.generation === 2 ? getGen2UnobtainableReason : getUnobtainableReason`.
* Why? This forces Gen 3 and future generations to incorrectly fall back to Gen 1 logic, potentially throwing errors or generating false negative recommendations.
* Architectural Solution: We must use the established Strategy Pattern. Call `const strategy = getStrategy(saveData.generation);` and then invoke `strategy.getUnobtainableReason(...)`.

## Trade Generator Static Arrays
* Critical constraint discovered: Arrays like `staticNpcTradeData` and `staticGiftEntries` cannot assume `saveData.generation === 2 ? GEN2 : GEN1`.
* Why? This will cause Gen 3 to inherit Gen 1's arrays.
* Architectural Solution: We must use chained ternaries or explicit checks like `saveData.generation === 1 ? GEN1 : saveData.generation === 2 ? GEN2 : []` to ensure future generations safely default to empty arrays rather than inheriting incorrect legacy data.
