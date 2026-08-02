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

## 2026-06-19: Enforcing Reusable Constants for Memory Offsets
**Constraint:**
Always enforce the rule against inline magic numbers during verification. All memory offsets, bit lengths, and shifts must be defined as reusable, descriptive constants at the module level.
### QA Task Verification Pairing Flexibility
During the audit of `epic-071-074-define-tailwind-v4-utilities`, it was discovered that `story-074-114-define-tactical-button-and-focus` lacked a corresponding QA task.

**Why this matters:**
While generally QA tasks verify implementations, the coder is always responsible for writing tests. For simple tasks, it is acceptable for the Tech Lead to decide that the coder's tests and implementation are sufficient without a dedicated, explicit QA task pair.

**Recommendation/Learnings:**
Do not strictly enforce QA task pairing for every single implementation task if the Tech Lead has deemed the complexity low enough to bypass it.

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

## 2026-07-03: Verification of Dynamic Moves PP PokeData

**Lesson: Verifying Macro Nodes with Downstream Artifacts**
The implementation successfully shifted move parsing into the `scripts/generate-pokedata.ts` pipeline, including extracting data directly from PokéAPI, parsing historical accuracy/power/pp based on generation overrides, and outputting to `moves.jsonl`. When auditing build-time scripts (like `generate-pokedata.ts`), it is important to check the actual output artifacts (e.g. `data/db/moves.jsonl`) to ensure the compacted data matches expectations.
## 2026-07-03: Verification of Gen 3 Battle Frontier Data Extraction

**Findings / Learnings:**
During the verification of `epic-046-078-gen3-battle-frontier-data-extraction`, the parser implementation for Battle Frontier Data (Win Streaks, Symbols, Total BP, and BP) was reviewed. The implementation currently gates parsing of all Battle Frontier structures behind a hardcoded version check (`_forcedVersion === 'emerald'`), meaning none of this data is extracted for Ruby and Sapphire. While the Frontier itself was fully expanded in Emerald, Ruby and Sapphire *do* feature a Battle Tower. It is currently unresolved whether Ruby and Sapphire save files contain a different structural representation for their Battle Tower win streaks and records, or if the current extraction logic is simply overly restrictive. This gap requires further research to ensure comprehensive Gen 3 support.

## 2026-07-03: Verification of Orchestrator Hierarchical Completion Checks

**Pattern / Constraint:**
During the verification of `epic-045-070-orchestrator-strict-completion`, the implementation for enforcing strict hierarchical completion in the orchestrator was reviewed. The orchestrator now correctly extracts child node relationships from markdown body references (e.g. `- [ ] path/to/file.md`) and establishes multi-parent DAG traversal (via BFS) for resolving completion constraints.

**Why this matters:**
This prevents macro nodes (like `IDEA`, `PRD`, `EPIC`, `STORY`) from prematurely transitioning to `VERIFYING` or `COMPLETED` when their functional requirements (delegated to child tasks spawned via markdown references) are not actually implemented. Enforcing strictness on macro node completion ensures that when an Epic is reported as complete, all spawned asynchronous research or follow-up tasks have also successfully fulfilled their contracts, protecting the structural integrity of the DAG.

## 2026-07-04: TPM Persona and Archive Directory
The Archive is maintained independently by the TPM persona. The fact that a node is not in the archive directory does not mean it is not complete.

## 2026-07-06: Verification of Relative Offsets ADR Epic (ADR 028)

**Lesson: Extending ADR 028 to Algorithmic Magic Numbers & Enforcing Constraints without Tooling**
When verifying algorithmic implementations, such as the Feebas seed extraction (`epic-036-058-feebas-backend-parsing`) and `epic-053-103-relative-offsets-adr`, it was determined that tooling limitations in Biome and Oxlint prevent the creation of custom linter rules to flag inline magic numbers during dynamic save block extraction. Consequently, `ADR 028: Relative Offsets & Magic Numbers` was formally established.
Because automated linting is unfeasible, this architectural constraint (mandating reusable module-level constants) must be rigorously and manually enforced during code review. The implementation of the LCG algorithm correctly adhered to `ADR 028` by extracting not only save file offsets but also algorithmic magic numbers (like LCG multipliers, addends, and bit shifts) into explicit, reusable constants at the module level. This confirms that the mandate against magic numbers applies strictly to both memory operations and algorithmic implementations to improve code readability and maintainability. Furthermore, a follow-up node (`idea-104-refactor-existing-parsers-adr-028`) was spawned to proactively refactor legacy code to comply with this new standard, ensuring technical debt does not accumulate.

**Lesson: Static Dashboard Visualization with React Flow (ADR 008)**
When verifying `epic-046-079-gen3-battle-frontier-dashboard-ui`, the implementation correctly utilized React Flow (ADR 008) for a purely static data presentation rather than interactive diagramming. By explicitly disabling all interactive features (`panOnDrag={false}`, `zoomOnScroll={false}`, `elementsSelectable={false}`, etc.) and leveraging the `fitView` option, React Flow effectively functioned as a responsive grid layout engine for the Frontier Brain progress visuals. Furthermore, the UI strictly adhered to the "tactical hardware/snooping" aesthetic (ADR 024) by utilizing established utility primitives (`border-dashed`, `rounded-none`, etc.). This confirms that standardized tooling and styling constraints enable scalable, consistent UI integration without requiring bespoke diagramming logic for each new feature.

## 2026-07-07: Verification of Gen 3 Battle Frontier Dashboard UI Epic

**Lesson: Verifying Cross-Version Compatibility Constraints**
When verifying `epic-046-079-gen3-battle-frontier-dashboard-ui`, it was noted that the underlying data parsing implementation explicitly restricted Battle Frontier data extraction to Emerald saves only (`_forcedVersion === 'emerald'`), as the Frontier is an Emerald-exclusive feature. However, Ruby and Sapphire feature the Battle Tower. As identified in `research-078-150-rs-battle-tower-data`, it remains unresolved if RS save files contain different structural representations for their Battle Tower win streaks or if they simply live at different offsets. During macro node verification, when an architectural gap like this is discovered, the Auditor must spawn a downstream `RESEARCH` node to investigate the cross-version compatibility gap. Since `research-078-150-rs-battle-tower-data` was previously spawned but the current Epic is complete, the Auditor must ensure the Epic's completion does not incorrectly imply RS compatibility for the Battle Tower dashboard component without resolving the pending research.

## 2026-07-09: Verification of Gen 2 Pokerus State Exfiltration Epic

**Lesson: Explicit Bitwise Extraction and Boundary Testing (ADR 026 and ADR 028) Enforcement**
When verifying `epic-038-061-pokerus-state-exfiltration`, the implementation successfully adhered to `ADR 026` after prior rejections. The bitwise extraction of Pokerus (strain and days remaining) from the raw byte was correctly refactored into a shared utility (`parsePokerus` in `common.ts`) utilizing explicit bitwise shifts and masks defined as module-level constants (removing inline magic numbers as per `ADR 028`). Furthermore, correct boundary states (such as the "cured" state vs uninfected state) were comprehensively tested. This confirms that explicitly rejecting macro nodes effectively enforces architectural standards and protects against scaling regressions when transitioning from monolithic parsers to composable utilities.

### Gen 3 Lottery Offsets Extraction
When verifying `epic-104-133-gen3-lottery-offsets-research`, I learned that the 32-bit lottery PRNG seed in Gen 3 is split across two 16-bit variables. Crucially, the order of these variables (High/Low words) is swapped between Ruby/Sapphire and Emerald. Ruby/Sapphire stores the Low 16 bits first (at index 0x404B) and the High 16 bits second (at 0x404C), while Emerald stores the High 16 bits first (at 0x404B) and the Low 16 bits second (at 0x404C). This introduces a complexity in extracting a 32-bit value that we need to standardize.

## 2026-07-11: Automated Max Rejection Cancellation
Successfully verified that the Automated Max Rejection Cancellation epic was correctly broken down into two child stories (`story-096-153-max-rejection-cancellation` and `story-096-154-parent-awakening-logic`) and that both stories were successfully completed.

### epic-052-096-automated-max-rejection-cancellation
- **Node**: `epic-052-096-automated-max-rejection-cancellation`
- **Result**: Verification Passed.
- **Notes**: The Epic was successfully broken down into stories `story-096-153-max-rejection-cancellation` and `story-096-154-parent-awakening-logic`. Both stories and their descendant task nodes were implemented, merged, and moved to COMPLETED status. The `foundry-orchestrator.ts` Phase 3.0 and Phase 3.6 correctly implemented the logic to handle max rejections and CANCELLED nodes, as verified by reading the scripts and running the test suite. All child nodes and their tasks are completely marked as `[x]`. I am submitting an empty PR to transition this node to COMPLETED.

## 2026-07-12
**Architectural Constraint (State Machine UI Consistency):**
When changing node state transitions (e.g., from FAILED to CANCELLED for max rejections), we must explicitly audit downstream UI consumers (like the DAG Dashboard) that may be relying on the previous status to render information correctly.

## 2026-07-19: Enforcing the Impossible Loop Policy on Macro Nodes

**Pattern / Constraint:**
When verifying `idea-067-extract-dag-utils`, it was discovered that one of its spawned descendant macro nodes (`prd-067-036-extract-dag-utils`) was permanently CANCELLED due to a max rejection count, yet the IDEA node itself had its acceptance criteria erroneously checked.

**Why this matters:**
The Auditor MUST reject any macro node whose descendant nodes have been permanently cancelled. This enforces the Impossible Loop Policy, ensuring the node owner takes responsibility for handling the permanent failure (e.g., by spawning a `RESEARCH` node and defining a new path forward) instead of allowing an incomplete feature to bypass verification.

## From Session 18386111525126870827

# Epic 057-127: Orchestrator Safeguard Investigation
## Verification and Learnings
- **Verification**: The epic successfully investigated and implemented programmatic safeguards in `foundry-orchestrator.ts` and `foundry-heartbeat.ts` to require at least one child STORY with `e2e` or `integration` tags before an EPIC can be marked `COMPLETED`. The logic accurately checks for these tags. Both child stories (`story-127-269-epic-e2e-safeguard` and `story-127-347-orchestrator-safeguard-e2e`) are fully completed and verified.
- **Learnigns**: The programmatic enforcement of E2E tasks is vital to maintain quality for macro nodes. Orchestrator-level checks prevent manual errors from skipping important integration verifications.
