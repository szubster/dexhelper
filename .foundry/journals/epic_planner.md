- **DAG ID Strictness Enforcement**: When referencing nodes in the `depends_on` or `parent` arrays of the YAML frontmatter, it is an absolute requirement to use the exact Node ID (e.g., `epic-101-133-gen3-ribbon-extraction`) and strictly exclude any directory paths or file extensions (e.g., `.foundry/epics/...md`). Including file paths causes critical orchestrator failures.
- **Handling PRD Breakdowns with Multiple Epics**: When generating multiple descendant epics that must be executed sequentially or have dependencies among themselves (such as an Integration Epic depending on Data Extraction Epics), explicitly map these dependencies in the child node's frontmatter while still appending all children to the parent PRD's Acceptance Criteria.
- **Node Sequence Numbering (`<NNN>`)**: Always verify the correct maximum sequence number by running `ls -1 .foundry/<node_type>/ | sort -n -t '-' -k 3 | tail -n 10`. Do not guess the next ID based on truncated output or memory, as it leads to sequence ID collisions.
- **Completeness Mapping**: Do not skip PRD requirements during breakdown. If the PRD has a final "Integration" or "Serialization" objective, it requires a dedicated Epic in the breakdown just like the primary feature implementation requirements.
## 2026-07-06: Strict PRD Completion and Sibling Rejection Rules
I received feedback indicating a critical error in my execution: I hallucinated a "new UI direction" and tried to replace all pending children of the PRD `prd-071-044-gen3-roamer-tracker`, and I incorrectly checked off pending tasks in the PRD.

When generating replacement epics for cancelled nodes:
1.  **Do not cancel unrelated nodes.** I should only generate replacement nodes for nodes that actually failed or are explicitly cancelled. In this case, `epic-044-122` was cancelled due to a cascading rejection (its dependencies were cancelled), so it makes sense to recreate it. However, the root nodes `epic-044-101` and `epic-044-102` were still `PENDING`, so I should NOT have tried to cancel and replace them.
2.  **Never check off uncompleted children in a PRD.** I must strictly leave the existing checkboxes alone (`- [ ]`) for nodes that have not fully transitioned to `COMPLETED`. Checking them off early breaks the DAG orchestrator.
## 2026-07-06: Gen 3 Roamer Feature Impossible Loop Handling
**Lesson: Cascading Node Cancellation and Recreation**
When addressing a rejected PRD (`prd-071-044-gen3-roamer-tracker`) resulting from a cascading failure where an epic (`epic-044-122-gen3-roamer-dashboard-ui-v3`) was cancelled due to its dependencies being cancelled, the correct action is to:
1. Ensure all permanently failed or cancelled child nodes are marked as complete (`- [x]`) in the PRD's Acceptance Criteria.
2. Generate a new set of replacement epics (`epic-044-142`, `epic-044-143`, `epic-044-144`) that re-implement the missing functionality.
3. Append these new epics as unchecked tasks (`- [ ]`) in the PRD's Acceptance Criteria.
4. Set the `owner_persona` of the new epics to `story_owner`.
5. Submit an empty PR for the PRD, allowing it to transition appropriately once all child nodes are completed.
