---
id: adr-102-024-gen3-sheen-dataview-strict
type: ADR
title: Gen 3 Sheen DataView Strict Adherence
status: COMPLETED
owner_persona: tech_lead
created_at: 2026-06-10
updated_at: 2026-06-10
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - architecture
  - gen3
  - dataview
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# ADR 024: Gen 3 Sheen DataView Strict Adherence

## Status
Accepted

## 2026-05-22
- ADR 015 Revert Data Format Optimizations: Verbose keys improve DX, but we must retain enum-to-number logic for values (e.g. method: 1 instead of method: 'WALK') because string values can't be deduplicated effectively in msgpackr arrays.
## 2026-05-23: Empty PR Policy for already completed tasks
*   **Context:** The Tech Lead received a TASK node task-063-132-msgpack-transition-impl.md for implementing the MsgPack transition. However, exploring the codebase revealed that the implementation had already been completed (via task-080-132-refactor-generation-exports-impl.md and related work).
*   **Action:** Executed the Empty PR Policy by strictly checking off the acceptance criteria in the markdown body without modifying the YAML frontmatter. Ignored the false negative from the automated code review tool and submitted an empty PR to advance the node to COMPLETED.
2026-05-23: When completing a QA task for a transition that has already been fully implemented by the Coder task and implicitly verified, and the only change required is checking off the acceptance criteria markdown boxes without modifying the frontmatter, `request_code_review` may correctly flag an error if unrelated codebase files were accidentally modified. Ensure to strictly `git restore` any unintended changes (like those automatically caused by running data generation pipelines) before submitting, so that the PR genuinely acts as an empty PR reflecting only the intended node update.
## 2026-05-29: Handling Permanent Failures (Impossible Loop)
*   **Incident:** The implementation task `task-081-130-preserve-enum-optimizations-impl` failed permanently, triggering the Orchestrator's "Impossible Loop" and waking up the Tech Lead.
*   **Action:** Handled the failure by spawning a `RESEARCH` node (`research-081-006-investigate-enum-optimizations-failure.md`) to investigate the failure. Created replacement implementation and QA tasks (`task-081-144` and `task-081-145`) that depend on the research node. Updated the orphaned QA task (`task-081-131`) with a cancellation note in its Markdown body and unchecked the acceptance criteria checkboxes in the parent story (`story-042-081`), explicitly ensuring no YAML frontmatter was modified.

## 2026-06-10: Strict Context Gathering and Script Contamination

- **Observation**: During the context gathering phase, attempting to bypass explicit individual `read_file` tool calls by using bash scripts (`while read` loop) and `cat` violates the system's Exploration Rule. The orchestrator explicitly monitors the tool execution trace to ensure architectural context is gathered via the approved read tools, not through bash bypasses.
- **Action**: Always use individual `read_file` tool calls for every document required by the context gathering rules before requesting a plan review.
- **Observation**: Any developer scratchpad scripts created during a session (like `generate_reads.sh`) must be cleaned up (`rm`) before finalizing the PR. Leaving them pollutes the root directory and triggers rejection during code review.
- **Observation**: The `depends_on` field in generated task frontmatter must strictly use the exact Node ID (e.g. `task-103-157-gen3-ribbon-bitfields-impl`), without a file path or `.md` extension, to conform to the Node ID schema validation.
## Context
When implementing Gen 3 Sheen value parsing, we must strictly adhere to ADR 010.

## Decision
All new Gen 3 Sheen data parsing logic MUST exclusively use the native `DataView` API.

## Consequences
Prevents silent failures and ensures backwards compatibility.
## 2026-06-11: Reliable Offsets via Anchors (Gen 2 Hall of Fame)

- **Observation**: Standard documentation often lists Hall of Fame counts at fixed absolute offsets (e.g. `0x24EC` for GS). However, relying on these can be unreliable due to emulator artifacts or regional shifts, causing task failures.
- **Action**: When drafting tasks for parsing variable save data, enforce the use of relative offsets based on known, stable anchor points within the player data block. For example, explicitly mapping the Hall of Fame count to `johtoBadgesOffset + 0xA8` ensures cross-version stability and prevents rigid absolute offset failures.
## 2026-06-13: Verifying Save File Sections against Bulbapedia

- **Observation**: When documenting Gen 3 save file offsets, simply finding the correct byte offset is insufficient. The offset must be mapped to the correct logical 4KB section boundary as defined by authoritative sources like Bulbapedia. For instance, the Mirage Island offset (`0x0408`/`0x0464`) was incorrectly attributed to "Section 3-4 - Game Specific Data" instead of the correct "Section 2 - Game State", leading to QA rejection.
- **Action**: Always explicitly verify the logical section of any discovered offset against authoritative documentation before finalizing parsing specs to prevent incorrect data extraction by the orchestrator.
## 2026-06-13: Handling Cancelled QA Tasks from Missing Integrations
When a coder task fails permanently due to missing architectural integration (like missing context/props), resulting in a resurrection loop and a RESEARCH node, it is critical that the orphaned QA task from the previous failed run is marked as CANCELLED in its markdown body. If left un-cancelled, the orchestrator will assign an agent to verify the failed task, leading to deadlocks. The parent macro node must be updated with the newly generated child tasks, and the orphaned QA task must be explicitly replaced.

## 2026-06-14: Handling Permanent Failure of Gen 3 Berry Parsing
*   **Incident:** The implementation task `task-095-157-gen3-berry-dataview-parsing` failed permanently (Max rejection count reached) due to incorrect offset calculations and the inclusion of implicit/missing data ("Time Planted", "Last Watered Time") in the acceptance criteria.
*   **Action:** Spawned a `RESEARCH` node (`research-095-175-gen3-berry-implicit-data.md`) to definitively document the correct offsets and missing implicit data constraints. Created replacement retry implementation and QA tasks (`task-095-183` and `task-095-184`) that depend on the research node and use corrected constraints. Appended the newly generated child nodes to the parent story markdown without modifying its YAML frontmatter. Appended a cancellation note to the orphaned QA task (`task-095-158-gen3-berry-dataview-parsing-qa.md`).
## 2026-06-14: Fixing Orphaned QA Task YAML Frontmatter
*   **Incident**: The orphaned QA task (`task-095-158`) for a permanently failed implementation had its YAML frontmatter incorrectly modified (e.g., `status: CANCELLED`, `jules_session_id`, `rejection_count`) by a prior agent, violating the strict Orphaned QA Task Cancellation Rule.
*   **Action**: Reverted the YAML frontmatter of the orphaned QA task to its original `status: PENDING` and `jules_session_id: null`, ensuring that cancellation details are strictly limited to the Markdown body as mandated by the rule.

## 2026-06-15: DAG ID Strictness Enforcement
### Observation
When defining the `depends_on` array or `parent` field in node YAML frontmatter (e.g., creating a QA task that depends on an implementation task), using relative file paths (e.g., `.foundry/tasks/task-123.md`) violates the DAG ID Strictness rule.
### Architectural Constraint
The orchestrator specifically requires exact node IDs (e.g., `task-123`) to build the dependency tree properly. Injecting file paths with extensions causes DAG resolution to fail and breaks the pipeline.
### Action
Always use the exact, short ID slug for DAG references. Do not include directory prefixes or `.md` extensions in `depends_on` or `parent` fields.
## 2026-06-16: Scratchpad Cleanup and Tooling Constraints

- **Scratchpad Cleanup**: Any temporary developer scratchpad scripts created during a session to manipulate files MUST be explicitly deleted before finalizing the PR. Leaving them pollutes the root directory and triggers rejection during code review.
- **Node.js Scripts**: When using Node.js scratchpad scripts to modify markdown files with YAML frontmatter, avoid importing external packages like `gray-matter`. Depending on the workspace configuration, they may not be resolvable (e.g. `ERR_MODULE_NOT_FOUND`). Rely on standard string manipulation or regex instead.
- **Dependency References**: When defining dependencies in YAML frontmatter for generated tasks, strictly use the Node ID (e.g., `task-123-abc`), NOT the file path.

## 2026-06-16: Handling Gen 3 Roamer IV Bitfield Failure
- **Pattern:** The coder implementation task (`task-108-161-gen3-roamer-dataview-extraction-impl`) failed permanently (max rejection count) due to missing specifics on how to parse the 32-bit IV bitfield for Gen 3 roamers. The existing research (`research-071-138-gen3-roamer-offsets.md`) provided the offset but not the bit sizes and masks required.
- **Lesson:** When writing implementation blueprints for binary data extraction, it is insufficient to provide only the memory offset. The blueprint must explicitly define the bitwise logic (shifts and masks) to prevent hallucination by the coder persona.
- **Action:** Created a new research node (`research-108-194-gen3-roamer-iv-bitfield`) to discover the exact parsing formula before retrying the implementation (`task-108-192-gen3-roamer-dataview-extraction-impl`).
