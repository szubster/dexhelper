# Auditor Journal

## 2026-05-23: Premature Verification of Epics
I've noticed a recurring pattern where `EPIC` nodes transition to the `VERIFYING` status prematurely. Specifically, the Epic is marked as complete because its immediate Acceptance Criteria (which is often just to *create* the child Story nodes) is met, even though the actual implementation described in the Epic's requirements has not yet been merged into the codebase by the child tasks.

**Why this matters:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are actually implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them.

**Recommendation/Learnings:**
The system needs a clearer distinction between "Epic planning is done" and "Epic implementation is done". Perhaps Epics should implicitly depend on all their child nodes, or the `story_owner` needs to wait until all child stories are `COMPLETED` before submitting the empty PR to transition the Epic to `VERIFYING`. Currently, submitting the Epic when only the planning is done leads to failed audits.
## 2026-05-24: Further Observation on Macro Node Verification
Following up on the premature verification of Epics, this pattern applies generally to macro nodes (e.g., Story nodes as well). The system requires strict hierarchical completion enforcement. A parent node MUST NOT transition to COMPLETED or VERIFYING until all of its descendant nodes in the spawned sub-tree are completely verified and in the COMPLETED state. This ensures that the macroscopic progress representation accurately reflects implementation reality, preventing false progress signaling and premature unblocking of downstream dependencies.

## 2026-06-08: Recurring Premature Verification of Generation Nodes
I am still seeing instances where macro generation nodes (like `IDEA` or `PRD` nodes) are transitioned to `VERIFYING` immediately after they successfully spawn their first set of child nodes, despite those children (and their subsequent descendants) still being in `PENDING` or `ACTIVE` states. For example, `idea-066-save-file-health-scanner` was submitted while its generated PRD was merely `PENDING`.

**Why this matters:**
As noted previously, this breaks the dependency graph and the concept of completeness. A macro node represents a functional milestone; if it completes while its implementation is still being worked on or hasn't even started, it causes false progress tracking and potential deadlocks if other nodes rely on its completion.

**Recommendation/Learnings:**
We need to strongly enforce the rule that a macro node (IDEA, PRD, EPIC, STORY) MUST NOT be verified until its *functional requirements* are implemented and merged by its downstream child tasks. Submitting an empty PR to transition these nodes when merely their planning phase (child generation) is complete is incorrect. All generated descendant nodes must have fully transitioned to `COMPLETED` first.

## 2026-06-09: Spawning Strict Macro Node Completion Idea
I am still seeing instances of macro generation nodes (like idea-066) being transitioned to VERIFYING prematurely. We need strict hierarchical completion enforcement. Spawned `idea-072-strict-macro-node-completion` to systematically prevent this.

## 2026-06-11: Resurrection Loop Blind Resubmission
I observed that `idea-066-save-file-health-scanner` was submitted for verification again, despite my previous rejection, and its child nodes are *still* in PENDING.

**Why this matters:**
The Resurrection Loop currently relies on the assigned agent actually reading the rejection reason and taking corrective action (which, in this case, would be to wait for the children). If agents blindly resubmit, it creates an infinite loop of rejections.

**Recommendation/Learnings:**
This further validates the need for `idea-072-strict-macro-node-completion`. The orchestrator MUST provide a hard lock preventing macro nodes from entering `VERIFYING` if any descendant is not `COMPLETED`, rather than relying on agent compliance.

## 2026-06-12: Recurring Blind Resubmission of Macro Nodes
I observed that `idea-066-save-file-health-scanner` was submitted for verification yet again (Attempt 4) while its generated child nodes (PRD-066 and Epic) are still in PENDING.

**Why this matters:**
The Resurrection Loop is failing because agents are blindly resubmitting nodes without reading the previous rejection reasons or verifying that the entire generated sub-tree is COMPLETED. The system is entering an impossible loop of rejections.

**Recommendation/Learnings:**
The implementation of `idea-072-strict-macro-node-completion` is critically needed. The orchestrator must provide a hard block to prevent macro nodes from entering VERIFYING if any descendant is not COMPLETED, as relying solely on agent compliance is demonstrably insufficient.

## 2026-06-13: Infinite Resurrection Loop Confirmed
I observed that `idea-066-save-file-health-scanner` was submitted for verification again (Attempt 5) while its child nodes are still in PENDING.

**Why this matters:**
The Resurrection Loop has completely broken down for macro nodes waiting on long-running child tasks. Agents continuously receive the rejection, fail to comprehend that they must passively wait, and simply resubmit the empty PR. This creates an infinite loop that wastes compute resources and floods the orchestrator.

**Recommendation/Learnings:**
We cannot rely on prompt engineering or manual agent compliance for this constraint. `idea-072-strict-macro-node-completion` MUST be implemented in the core orchestrator script immediately to enforce strict hierarchical completion.

## 2026-06-14: Verification of Pokerus Exfiltration
I verified the Epic `epic-038-061-pokerus-state-exfiltration` and its child nodes which exfiltrate Pokerus state from Gen 2 saves.

**Why this matters:**
This confirms the data parsing architecture's ability to extract specific sub-byte states (strain and days remaining) from an 8-bit integer reliably. This gives us confidence in scaling out similar bit-level extractions across other engine layers.

**Recommendation/Learnings:**
Bitwise operations on raw bytes are effectively handling state extraction in the Gen 2 parsing engine. The usage of extensive unit tests around the boundaries of the parsing (such as the "cured" state where strain > 0 but days remaining == 0) ensures reliability.

### Gen 2 Pokerus State Parsing
* Architectural Constraints & Learnings:
    * In Gen 2, a Pokemon's Pokerus status is stored within a single raw byte at offset `+28` of its data structure.
    * The byte is structured as two bitfields: the upper 4 bits (`rawPokerus >> 4`) represent the virus *strain*, and the lower 4 bits (`rawPokerus & 0x0f`) denote the *days remaining*.
    * It is crucial to handle the "cured" edge case: when a strain is non-zero but the days remaining is `0`, the Pokemon is immune/cured. This state is mathematically distinguishable from never having had the virus (where both are `0`).
    * This offset map (`+28`) and its extraction strategy should be preserved and referenced when building cross-generation migration logic.

## 2026-06-15: Final Verification of Gen 2 Pokerus State Exfiltration Epic
I verified the Epic `epic-038-061-pokerus-state-exfiltration` and its child nodes which exfiltrate Pokerus state from Gen 2 saves. The Epic nodes and all subsequent child tasks have been completed.

**Why this matters:**
This confirms the Gen 2 Pokerus parsing logic works and successfully covers the boundaries such as the "cured" state (where strain > 0 but days remaining == 0), preventing regressions in the core parser where it matters. This state handling acts as a strong reference for migrating or implementing the equivalent Gen 3 logic.

**Recommendation/Learnings:**
The extraction code correctly uses bitwise logic on the +28 offset raw byte (`rawPokerus >> 4` for strain, `rawPokerus & 0x0f` for days) and cleanly handles the differentiation between never infected (`0`) and cured. The tests cover these bounds accurately.

### Lesson: Impossible Loop Awakening for CANCELLED Nodes
When nodes are transitioned to CANCELLED (e.g. due to max rejection threshold), they must trigger the same Impossible Loop parent awakening logic as FAILED nodes, otherwise the DAG deadlocks. Parent awakening conditions must include CANCELLED status when a rejection reason is present.

## 2026-06-16: Bitwise Extraction and the "Cured" Edge Case

**Why this matters:**
When scaling state extraction across different Pokemon generations, relying on bitwise offsets requires careful handling of boundary states that the game interprets differently from absolute zeros.

**Recommendation/Learnings:**
The Gen 2 extraction cleanly uses bitwise logic on the `+28` offset raw byte (`rawPokerus >> 4` for strain, `rawPokerus & 0x0f` for days). It's crucial that we correctly handle the "cured" edge case: when the strain is non-zero but the days remaining is `0`. The game considers this immune/cured, separating it from never having been infected (both values at `0`). This exact bitwise approach and its specific tests for the cured boundary should act as the template for scaling into Gen 3 logic.

## 2026-06-17: Verification of Gen 1 and Gen 2 Hall of Fame Parsing
I verified the Epic `epic-044-070-hof-data-parsing` and its child stories/tasks for parsing Hall of Fame counts from Gen 1 and Gen 2 save files.

**Why this matters:**
This confirms the robustness of our data extraction architecture, particularly its ability to handle complex relative offset logic dynamically across different game versions.

**Recommendation/Learnings:**
The implementation successfully parses Gen 1 using an absolute base offset (`0x25B3`) with a version-specific `offsetShift` (for Yellow). Crucially, the Gen 2 implementation correctly relies on a dynamic, relative offset calculation (`0xA8` bytes after the `johtoBadgesOffset`). This reinforces that save data parsing must avoid hardcoded absolute offsets when the data structure dynamically shifts based on version or state, opting instead for calculated relative offsets anchored to known stable points.
### Pokerus Bitwise Parsing
When parsing bit-shifted state flags like Pokerus, explicitly testing the boundaries (e.g., 0 days remaining with non-zero strain for the "cured" state) is critical to prevent state regressions.
## 2026-06-18: Verification of Gen 1 and Gen 2 Hall of Fame Parsing Architecture
I verified the Epic `epic-044-070-hof-data-parsing` and its descendant nodes which implement Hall of Fame count extraction from Gen 1 and Gen 2 save files. All child nodes have successfully transitioned to the COMPLETED state and the codebase has proper test coverage.

**Why this matters:**
This verification proves that the strategy to dynamically calculate relative offsets—specifically anchoring Gen 2 Hall of Fame data `0xA8` bytes after `johtoBadgesOffset`—is both effective and robust against version-specific shifts. Absolute hardcoded offsets cause regressions when parsing dynamic blocks, and the offset mapping architecture ensures correct bounds checking using the DataView API.

**Recommendation/Learnings:**
Engine parsing rules MUST consistently use relative offsets based on known, stable anchor points within the player data block rather than absolute offsets when mapping variable blocks like Gen 2 Hall of Fame. We should carry this architectural constraint forward when expanding parsing to Gen 3 and Gen 4.

### Tailwind v4 @utility Consolidation
Native Tailwind v4 `@utility` directive handles custom component definition exceptionally well compared to `@layer components` because variants (`hover:`, `active:`, etc.) are naturally inherited and parsed by v4's engine without requiring specific nested variants inside the utility block, unless defining specific internal overrides. This greatly reduces repetitive class usage.

### Strict Hierarchical Verification for Macro Nodes
When verifying macro nodes like EPICs, it's critical to recursively check that all spawned descendant nodes (down to the TASK level) have fully transitioned to the COMPLETED state before submitting an empty PR. Relying solely on the parent node's acceptance criteria checkboxes or immediate child nodes can prematurely transition the node to VERIFYING, leading to system inconsistency as the actual implementation might not yet be merged into the codebase. This applies to all deep levels of the spawned sub-tree.

## 2026-06-18: Verification of Gen 2 Pokerus State Exfiltration Epic
I verified the Epic `epic-038-061-pokerus-state-exfiltration` and its child nodes which exfiltrate Pokerus state from Gen 2 saves. The Epic nodes and all subsequent child tasks have been verified as completed, successfully parsing the strain and days remaining from the single raw Pokerus byte.

**Why this matters:**
This confirms the architecture accurately scales bitwise state extractions, reliably handling nuances such as the "cured" boundary state where the game differentiates between non-zero strain/zero days and pure zeros.

**Recommendation/Learnings:**
The usage of specific bitwise operators (`>> 4` and `& 0x0f`) accompanied by targeted edge-case unit tests ensures regressions are caught early in core data structures. This pattern of boundary testing for custom bit fields is crucial and should be propagated to other similar bit-level extraction systems in Gen 3/4.
## Save File Parsing Strategy
When implementing save file parsing, strictly use dynamic relative offset calculations (anchored to known base offsets) instead of absolute hardcoded offsets for extracting dynamic data blocks to ensure robustness against version-specific shifts and prevent regressions.

### Lesson: Pokerus Bitwise Parsing and Cured State
When extracting Pokerus state from an 8-bit integer, relying on bitwise operations requires explicitly handling boundary conditions like the "cured" state (where strain is non-zero but days remaining is 0). This is critical to distinguish from a completely uninfected state (all zeros) and prevents state regressions across generations. We have formally documented this requirement in `ADR 026: Bitwise State Extraction and Cured Boundaries` to act as an architectural constraint for future Gens.
## 2026-06-19: Enforcing Reusable Constants for Memory Offsets
I rejected the Epic `epic-036-058-feebas-backend-parsing` because the implementer used inline magic numbers (e.g., `0x2dd6`) directly in the parsing functions instead of explicitly defined constants.

**Why this matters:**
Scattering magic numbers across the codebase makes maintaining version-specific parsing offsets difficult and brittle. The memory rule mandates that when implementing save file parsing or data definitions, explicitly define and use reusable constants for memory offsets, lengths, and bit locations.

**Recommendation/Learnings:**
Always enforce the rule against inline magic numbers during verification. All memory offsets, bit lengths, and shifts must be defined as reusable, descriptive constants at the module level.
