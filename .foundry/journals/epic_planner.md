- **DAG ID Strictness Enforcement**: When referencing nodes in the `depends_on` or `parent` arrays of the YAML frontmatter, it is an absolute requirement to use the exact Node ID (e.g., `epic-101-133-gen3-ribbon-extraction`) and strictly exclude any directory paths or file extensions (e.g., `.foundry/epics/...md`). Including file paths causes critical orchestrator failures.
- **Handling PRD Breakdowns with Multiple Epics**: When generating multiple descendant epics that must be executed sequentially or have dependencies among themselves (such as an Integration Epic depending on Data Extraction Epics), explicitly map these dependencies in the child node's frontmatter while still appending all children to the parent PRD's Acceptance Criteria.
- **Node Sequence Numbering (`<NNN>`)**: Always verify the correct maximum sequence number by running `ls -1 .foundry/<node_type>/ | sort -n -t '-' -k 3 | tail -n 10`. Do not guess the next ID based on truncated output or memory, as it leads to sequence ID collisions.
- **Completeness Mapping**: Do not skip PRD requirements during breakdown. If the PRD has a final "Integration" or "Serialization" objective, it requires a dedicated Epic in the breakdown just like the primary feature implementation requirements.
## 2026-07-06: Gen 3 Roamer Feature Impossible Loop Handling
**Lesson: Cascading Node Cancellation and Recreation**
When addressing a rejected PRD (`prd-071-044-gen3-roamer-tracker`) resulting from a cascading failure where an epic (`epic-044-122-gen3-roamer-dashboard-ui-v3`) was cancelled due to its dependencies being cancelled, the correct action is to:
1. Ensure all permanently failed or cancelled child nodes are marked as complete (`- [x]`) in the PRD's Acceptance Criteria.
2. Generate a new set of replacement epics (`epic-044-142`, `epic-044-143`, `epic-044-144`) that re-implement the missing functionality.
3. Append these new epics as unchecked tasks (`- [ ]`) in the PRD's Acceptance Criteria.
4. Set the `owner_persona` of the new epics to `story_owner`.
5. Submit an empty PR for the PRD, allowing it to transition appropriately once all child nodes are completed.
