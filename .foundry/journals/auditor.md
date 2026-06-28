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
