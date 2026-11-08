# Held Item Extraction Failure Investigation

## Root Cause Analysis
The previous implementation of `extractHeldItems` in `src/engine/tracker/heldItemExtractor.ts` utilized a `Set<number>` to collect held items from `partyDetails` and `pcDetails`. Since a `Set` only stores unique values, any duplicate held items were automatically dropped during extraction. This caused the downstream diffing logic in `diffHeldItems` to fail to accurately detect when additional quantities of an already-held item were acquired.

## Revised Strategy
To fix this and preserve duplicate held items:
1. Replace the `Set<number>` with a standard array (`number[]`).
2. Iterate through `partyDetails` and `pcDetails`. For each valid `pokemon.item` greater than 0, push the item ID to the array.
3. Return the array, sorting it in ascending order (`.sort((a, b) => a - b)`) to maintain deterministic output for the diffing function.
