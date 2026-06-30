# QA Journal

## Task Verification & Memory Recording
When verifying tasks that involve adding or modifying parsers for save files (like `task-124-172-gen3-mix-record-events-parser`), make sure to closely inspect that they properly catch `RangeError` from the `DataView` API when checking for out-of-bounds reads.
Always ensure you run `pnpm lint && pnpm test` to verify no regressions were introduced.
When you finish reviewing a node, do not modify the YAML frontmatter. Update only the markdown body by checking off the Acceptance Criteria.

## Gen 2 Breeding Algorithm Constraints
I rejected the implementation of the `calculateBreedingPairs` algorithm because it prioritized pairing two Shiny/Shiny Carrier Pokémon together (score = 2). In Gen 2, two Shiny Pokémon cannot breed with each other because Shininess is determined by DVs (Determinant Values). Pokémon with matching or highly similar Defense and Special DVs (which Shinies share) are considered "related" by the Daycare and will refuse to breed. The algorithm must explicitly exclude these pairs from valid breeding combinations.

- Rejected task-084-210-breeding-pair-algorithm-impl because the algorithm does not handle the Gen 2 rule that prevents two Shiny (or Shiny Carrier) Pokémon from breeding with each other due to overlapping DVs. The rule states that shininess is determined by DVs, and Pokémon with identical or similar DVs are considered 'related' and incompatible for breeding.

## 2026-06-30: Magic Numbers in Gen 3 Parser Retry
The implementer (`coder`) failed `task-121-219-gen3-tv-block-parser-retry-impl` because they used inline magic numbers (`21` and `40`) in `parseGen3MixRecords` to check for Mix Record events, despite the task description explicitly forbidding inline magic numbers and a previous rejection for the same reason (documented in `research-121-216`). This indicates a recurring failure pattern where the coder ignores module-level constant requirements for bounds checking. We must enforce this architectural constraint strictly to prevent fragile parsing logic.
