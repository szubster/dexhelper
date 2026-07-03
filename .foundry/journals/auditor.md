# Auditor Journal

### Lesson: Impossible Loop Awakening for CANCELLED Nodes
When nodes are transitioned to CANCELLED (e.g. due to max rejection threshold), they must trigger the same Impossible Loop parent awakening logic as FAILED nodes, otherwise the DAG deadlocks. Parent awakening conditions must include CANCELLED status when a rejection reason is present.

## 2026-06-17: Gen 1 and Gen 2 Hall of Fame Parsing Architecture
**Constraint:**
The implementation successfully parses Gen 1 using an absolute base offset (`0x25B3`) with a version-specific `offsetShift` (for Yellow). Crucially, the Gen 2 implementation correctly relies on a dynamic, relative offset calculation (`0xA8` bytes after the `johtoBadgesOffset`). This reinforces that save data parsing must avoid hardcoded absolute offsets when the data structure dynamically shifts based on version or state, opting instead for calculated relative offsets anchored to known stable points.

### Tailwind v4 @utility Consolidation & Variant Inheritance
Native Tailwind v4 `@utility` directive handles custom component definition exceptionally well compared to `@layer components` because variants (`hover:`, `active:`, etc.) are naturally inherited and parsed by v4's engine without requiring specific nested variants inside the utility block, unless defining specific internal overrides. This greatly reduces repetitive class usage. Pattern: tactical-* utilities correctly utilized Tailwind v4 native @utility to inherit hover and focus states naturally without nested variant requirements.

### Strict Hierarchical Verification for Macro Nodes
When verifying macro nodes like EPICs, it's critical to recursively check that all spawned descendant nodes (down to the TASK level) have fully transitioned to the COMPLETED state before submitting an empty PR. Relying solely on the parent node's acceptance criteria checkboxes or immediate child nodes can prematurely transition the node to VERIFYING, leading to system inconsistency as the actual implementation might not yet be merged into the codebase. This applies to all deep levels of the spawned sub-tree.

## Save File Parsing Strategy
When implementing save file parsing, strictly use dynamic relative offset calculations (anchored to known base offsets) instead of absolute hardcoded offsets for extracting dynamic data blocks to ensure robustness against version-specific shifts and prevent regressions.

### Lesson: Pokerus Bitwise Parsing and Cured State
When extracting Pokerus state from an 8-bit integer, relying on bitwise operations requires explicitly handling boundary conditions like the "cured" state (where strain is non-zero but days remaining is 0). This is critical to distinguish from a completely uninfected state (all zeros) and prevents state regressions across generations. We have formally documented this requirement in `ADR 026: Bitwise State Extraction and Cured Boundaries` to act as an architectural constraint for future Gens.

**Architectural Constraints & Learnings:**
* In Gen 2, a Pokemon's Pokerus status is stored within a single raw byte at offset `+28` of its data structure.
* The byte is structured as two bitfields: the upper 4 bits (`rawPokerus >> 4`) represent the virus *strain*, and the lower 4 bits (`rawPokerus & 0x0f`) denote the *days remaining*.
* This offset map (`+28`) and its extraction strategy should be preserved and referenced when building cross-generation migration logic.

## 2026-06-19: Enforcing Reusable Constants for Memory Offsets
**Constraint:**
Always enforce the rule against inline magic numbers during verification. All memory offsets, bit lengths, and shifts must be defined as reusable, descriptive constants at the module level.
### QA Task Verification Pairing Flexibility
During the audit of `epic-071-074-define-tailwind-v4-utilities`, it was discovered that `story-074-114-define-tactical-button-and-focus` lacked a corresponding QA task.

**Why this matters:**
While generally QA tasks verify implementations, the coder is always responsible for writing tests. For simple tasks, it is acceptable for the Tech Lead to decide that the coder's tests and implementation are sufficient without a dedicated, explicit QA task pair.

**Recommendation/Learnings:**
Do not strictly enforce QA task pairing for every single implementation task if the Tech Lead has deemed the complexity low enough to bypass it.

## 2026-06-21: Verification of Tailwind v4 Tactical Utilities Epic

I verified `epic-071-074-define-tailwind-v4-utilities` and its child stories and tasks.

## 2026-06-23: Late-Binding Hierarchy Orchestrator Exception

**Pattern / Constraint:**
A new process change regarding late-binding hierarchical dependencies has been implemented in the orchestrator. A `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for their parent to become active.

### Orchestrator Late-Binding Verification
The orchestrator's exception for late-binding parent nodes (allowing them to remain PENDING while their generated children execute, preventing DAG deadlocks) was successfully verified. The corresponding tests in `foundry-orchestrator.test.ts` provide adequate coverage for this specific hierarchical logic exception. This ensures smooth progression of macro nodes without triggering infinite wait loops.

## 2026-06-28: React Context as DAG Data Single Source of Truth

**Pattern / Constraint:**
When implementing shared state for multiple visual representations of the same underlying Directed Acyclic Graph (DAG) data (e.g., a React Flow spatial visualizer alongside a Kanban/Scrum board view), lifting the core parsed data (nodes, edges) into a shared React Context (like `DagContext`) serves as an effective "Single Source of Truth".

**Why this matters:**
This prevents disjointed UI states, eliminates redundant parsing overhead, and simplifies synchronization. Future UI features that need DAG data (e.g., a Permanent Failure Dashboard) must subscribe to this central provider rather than establishing independent data fetching or parsing pipelines.

### Lesson: Hierarchical Verification Failures
When verifying macro nodes (EPICs/STORYs), verify that the implemented code actually fulfills the parent's requirements. In epic-045-070-implement-dag-context, the sub-tasks created the context and provider, but the provider didn't actually implement the data fetching or wrap the views, leading to premature verification. Macro node requirements must be fully realized in the codebase, not just partially scaffolded, before the parent is verified.
## 2026-06-29: Verification of Gen 2 Event Flag Parsing Engine
**Lesson: Explicit Bit Mapping for Bulk Event Arrays**
When a feature (like the daily event tracker) relies on extracting a large block of bitwise flags (e.g., the 256-byte `eventFlags` array), extracting the array is only the first step. The specific, individual bit offsets corresponding to the target events must be explicitly mapped and documented so that downstream UI or data layer tasks can actually consume them. If these are not mapped during the initial extraction epic, explicit `RESEARCH` nodes must be spawned to identify them before the UI implementation begins.
### Epic Documentation Macro Node Completion Verification
When verifying `epic-045-071-documentation-macro-node-completion`, it was noted that `story-071-110-verify-core-documentation` was completed without any corresponding child tasks. Late-binding nodes can be closed out if the work is verified or completed manually, but this highlights the need for the Auditor to always recursively confirm that all descendants are truly COMPLETED, and if a node has no children, that the intent of the node was actually fulfilled in the codebase.

### Lesson: Documentation Lagging State Machine Updates
During the verification of `epic-045-071-documentation-macro-node-completion`, it was discovered that `schema.md` contains contradictions. Invariant 7 states "`COMPLETED` nodes are read-only. Once a PR is merged, the node must not be edited. The TPM archives it." However, `ADR 014` introduced the `VERIFYING` state, meaning when a PR is merged, the node transitions to `VERIFYING`, not `COMPLETED`. Documentation updates for process changes must holistically review all related invariants.
## Lesson: Bitwise Flag Parsing with DataView
- When parsing bitwise flags or blocks (like Gen 2 event flags) with the DataView API, explicit bounds checking and RangeError handling is an effective strategy to prevent corrupted save files from crashing the application.

## Lesson: Bitwise Flag Mapping with DataView
- When parsing large bitwise blocks (like the 256-byte Gen 2 eventFlags array) using the DataView API, ensure you explicitly map the specific bit offsets corresponding to target events (e.g., Togepi, Eevee static gifts). Just extracting the array is insufficient for downstream frontend consumption; explicitly identifying the individual bit offsets is required for successful strategy layer integration.

## Lesson: DataView Bounds Checking as Architectural Requirement
**Context:** When integrating Gen 2 event flags (or any bitwise block), relying on the `DataView` API over raw `Uint8Array` manipulations is an established architectural standard (ADR 010).
**Why this matters:** Simply extracting data is insufficient. A critical pattern emerged: robust implementation *requires* explicit unit tests that intentionally trigger and catch `RangeError` exceptions for out-of-bounds reads. This test-driven approach ensures the parsing engine fails gracefully on corrupted `.sav` files, propagating predictable validation errors to the UI layer instead of silent crashes. Future parsing tasks must couple `DataView` usage with these strict boundary failure tests.

### Lesson: Macro Node Spawn Verification
When evaluating macro nodes like IDEA, PRD, EPIC, or STORY, the Auditor must verify that the downstream child nodes were actually spawned and fully completed before transitioning the macro node to COMPLETED. If an IDEA node's acceptance criteria are marked as completed (e.g., "- [x] Product Manager: Convert this idea into a PRD"), but no corresponding PRD file actually exists in the codebase, the verification MUST fail. A macro node is only verified if its intent is actually realized in the implementation through its generated descendants.

### Lesson: Macro Node Recurring Verification Failures
When evaluating macro nodes (like IDEA, PRD), a recurring pattern of failure is agents submitting the macro node (with an Empty PR) without actually spawning the required child nodes (e.g., the Product Manager marking the IDEA as complete without creating the PRD). This violates the core invariant that macro nodes cannot complete until all of their descendant nodes in the DAG have reached the COMPLETED or CANCELLED status. If the child nodes do not exist, the macro node's intent is unrealized, and verification MUST fail, rejecting the submission back to the responsible agent to generate the downstream nodes.

## 2026-07-02: Verification of Pokerus Bitwise Refactoring

I verified `epic-038-061-pokerus-state-exfiltration`. The previous rejection citing the inline bitwise logic implementation violation of ADR 026 has been successfully resolved. The logic was appropriately refactored into a standardized `parsePokerus` helper in `src/engine/saveParser/parsers/common.ts` and integrated correctly into the main parser, accompanied by comprehensive boundary state tests. This confirms that explicitly rejecting macro nodes effectively enforces architectural standards.

## 2026-07-03: Verification of Dynamic Moves PP PokeData

I verified `epic-049-086-dynamic-move-pp-parsing` and its child stories (`story-086-128`, `story-086-129`, `story-086-130`). The implementation successfully shifted move parsing into the `scripts/generate-pokedata.ts` pipeline, including extracting data directly from PokéAPI, parsing historical accuracy/power/pp based on generation overrides, and outputting to `moves.jsonl`. The node's Acceptance Criteria and spawned child nodes were fully completed in the codebase.

**Lesson: Verifying Macro Nodes with Downstream Artifacts**
This epic successfully demonstrated the end-to-end flow of dynamic data extraction. When auditing build-time scripts (like `generate-pokedata.ts`), it is important to check the actual output artifacts (e.g. `data/db/moves.jsonl`) to ensure the compacted data matches expectations. I verified the generated JSONL structure and properties matched the logic implemented in the script.

## 2026-07-03: Verification of Gen 3 Battle Frontier Data Extraction

**Findings / Learnings:**
During the verification of `epic-046-078-gen3-battle-frontier-data-extraction`, the parser implementation for Battle Frontier Data (Win Streaks, Symbols, Total BP, and BP) was reviewed. The implementation currently gates parsing of all Battle Frontier structures behind a hardcoded version check (`_forcedVersion === 'emerald'`), meaning none of this data is extracted for Ruby and Sapphire. While the Frontier itself was fully expanded in Emerald, Ruby and Sapphire *do* feature a Battle Tower. It is currently unresolved whether Ruby and Sapphire save files contain a different structural representation for their Battle Tower win streaks and records, or if the current extraction logic is simply overly restrictive. This gap requires further research to ensure comprehensive Gen 3 support.

### Lesson: Strict Verification of Architectural ADRs (ADR 026)
During the audit of `epic-038-061-pokerus-state-exfiltration`, the implementation correctly adhered to `ADR 026: Bitwise State Extraction and Cured Boundaries`. The logic was properly refactored to use explicit bitwise operators (`>>` and `&`) within a shared helper (`parsePokerus` in `common.ts`), moving away from localized inline parsing.

**Why this matters:**
This centralization and the explicit testing of boundary cases (specifically, the absolute zero uninfected state vs. the "cured" state where duration is zero but strain remains) completely prevented regressions when migrating the parsing engine across states. This highlights that Auditor rejections (like the previous rejection for this epic) are highly effective in enforcing architectural standards, and that comprehensive boundary testing on seemingly trivial numeric bitfields is critical for correct game state representation.
