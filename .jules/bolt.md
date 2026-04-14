## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.
## 2024-04-14 - [O(N) Operations inside loop for NPC Trades]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the NPC Trades loop repeatedly iterates over all instances. This causes O(T*N) complexity.
**Action:** Move the pre-calculated `instancesBySpecies` Map above the NPC Trades loop to achieve O(1) species lookups.
