# QA Journal

## Task Verification & Memory Recording
When verifying tasks that involve adding or modifying parsers for save files (like `task-124-172-gen3-mix-record-events-parser`), make sure to closely inspect that they properly catch `RangeError` from the `DataView` API when checking for out-of-bounds reads.
Always ensure you run `pnpm lint && pnpm test` to verify no regressions were introduced.
When you finish reviewing a node, do not modify the YAML frontmatter. Update only the markdown body by checking off the Acceptance Criteria.

## Gen 2 Breeding Algorithm Constraints
I rejected the implementation of the `calculateBreedingPairs` algorithm because it prioritized pairing two Shiny/Shiny Carrier Pokémon together (score = 2). In Gen 2, two Shiny Pokémon cannot breed with each other because Shininess is determined by DVs (Determinant Values). Pokémon with matching or highly similar Defense and Special DVs (which Shinies share) are considered "related" by the Daycare and will refuse to breed. The algorithm must explicitly exclude these pairs from valid breeding combinations.
