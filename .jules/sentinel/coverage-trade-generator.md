# Sentinel Learnings: tradeGenerator.ts

- **Strict Type Overrides:** When mocking complex interfaces like `AssistantApiData`, specifically object maps like `pokemonMetadata`, ensure `efrm` is typed and handled properly as an array of numbers. Missing these caused failures when the engine recursively traversed pre-evolutions.
- **Side-effects / Artifacts:** Do not commit temporary coverage outputs (`coverage-output.txt`) or `test-tradeGen.ts` runner scripts. Ensure these are cleaned up before final review.
- **Coverage Details:** Added tests specifically checking the `hasPhysicalPreEvo` bypass logic, and explicitly setting test scenarios where the player does *not* own the requested Pokémon to test branch coverage for exclusive exclusions correctly.
