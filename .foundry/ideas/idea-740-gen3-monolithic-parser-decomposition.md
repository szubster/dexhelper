---
id: idea-740-gen3-monolithic-parser-decomposition
type: IDEA
title: Decompose Monolithic Gen3 Save Parser into Domain Sub-Parsers
status: PENDING
owner_persona: product_manager
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - architecture
  - saveParser
  - gen3
  - refactor
  - modularity
  - technical-debt
research_references: []
experiment_variants: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
---

# Decompose Monolithic Gen3 Save Parser into Domain Sub-Parsers

## Context & Problem Statement
The save parsing engine for Generation 3 (`src/engine/saveParser/parsers/gen3.ts`) currently stands as the single largest source file in the repository at 2,769 lines (paired with a 2,596-line unit test suite `gen3.test.ts`).

While individual feature domains (such as ribbons, roamer, weather anomaly, and storage) have established dedicated subdirectories under `src/engine/saveParser/gen3/`, `parsers/gen3.ts` continues to serve as an unwieldy monolith handling disparate domain concerns:
1. **Flash Bank & Section Resolution**: Low-level A/B bank scanning, checksum verification, and `getLatestSectionOffset` resolution logic.
2. **Substructure Permutation & Decryption**: 100-byte structure decryption, permutation order (`GAEM`), and PID XOR operations.
3. **Party & Stats Calculation**: Dynamic party offset calculation across RSE vs. FRLG, EV/IV unpacking, Nature calculation, and Hidden Power math.
4. **Mini-Game & Environmental Features**: Spinda PID spot mapping, Volcanic Ash parsing, Mirage Island value extraction, TV block / news parsing, and Shoal Cave tide items.
5. **Trainer Flags & NPCs**: TM/HM acquisition bitwise extraction, RSE and FRLG NPC trade logs, and move tutor tracking.

### Why this is technical debt:
- **High Blast Radius & Merge Contention**: Because so many features touch `gen3.ts`, parallel agent runs frequently encounter merge conflicts and test invalidations.
- **Cognitive Load & Test Flakiness**: Navigating a 2,700+ line parser obscures domain boundaries and makes targeted unit testing difficult.
- **Impediment to Worker Offloading & Package Extraction**: Heavy intermingling of binary decryption math with game-specific flag decoders impedes clean worker offloading (`idea-731-wasm-save-parser-worker-offloading.md`) and package extraction into `@dexhelper/core` (`idea-735-core-domain-and-parser-extraction-to-workspace-package.md`).

## Proposed Architecture
Decompose `src/engine/saveParser/parsers/gen3.ts` into a clean, orchestrated pipeline leveraging modular domain parsers under `src/engine/saveParser/gen3/`:

1. **Core Flash Architecture & Decryption**:
   - `src/engine/saveParser/gen3/flash/`: Extract A/B bank rotation, section descriptor parsing, save index comparison, and `getLatestSectionOffset`.
   - `src/engine/saveParser/gen3/crypto/`: Formalize PK3 decryption (`extractGen3PK3`, substructure permutation mapping, and 48-byte XOR decryption).
2. **Player & Party Parser**:
   - `src/engine/saveParser/gen3/party/`: Isolate party Pokémon extraction, RSE vs FRLG offset handling, and party-specific stat enrichment.
3. **Environmental & Feature Sub-Parsers**:
   - `src/engine/saveParser/gen3/spinda/`: Dedicated Spinda PID spot coordinate calculation.
   - `src/engine/saveParser/gen3/environmental/`: Mirage Island, Volcanic Ash, and Shoal Cave items.
   - `src/engine/saveParser/gen3/trades/`: RSE and FRLG NPC trade completion parsing.
4. **Orchestrator Entry Point & Facade**:
   - Refactor `parseGen3(view: DataView)` to act as a pure, high-level composition coordinator that delegates to each specialized sub-parser.
   - Maintain backward-compatible re-exports in `parsers/gen3.ts` to prevent regressions across existing callers and test suites.

## Impact & Value
- **Developer Experience (DX)**: Eliminates the monolithic 2,700-line bottleneck into cohesive, single-responsibility modules under 300 lines each.
- **Targeted Testability**: Allows fine-grained unit testing of specific parsing routines without running the entire monolithic suite.
- **Foundational Enablement**: Directly unblocks off-thread WebWorker parsing and package isolation for `@dexhelper/core`.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD specifying the decomposition boundaries and migration roadmap.
- [ ] Establish submodules under `src/engine/saveParser/gen3/` for flash resolution, party parsing, environmental features, and NPC trades.
- [ ] Refactor `parseGen3` into a modular orchestration function delegating to dedicated sub-parsers.
- [ ] Preserve full backward compatibility via re-exports in `src/engine/saveParser/parsers/gen3.ts`.
- [ ] Ensure all existing Gen 3 parser unit and integration tests pass without regression.
