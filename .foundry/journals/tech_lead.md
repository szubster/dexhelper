## 2026-05-12 - Graph Rendering Library Evaluation
Evaluated graph rendering libraries for the DAG Dashboard. Selected React Flow over Mermaid.js and Cytoscape.js. React Flow offers the best balance of seamless integration with our React/Tailwind ecosystem (critical for enforcing the strict tactical hardware aesthetic with custom DOM nodes) and out-of-the-box interactivity features. Documented in ADR 008.
## 2026-05-12: Enforcing Acceptance Criteria in Preflight

### Observation
While orchestrator nodes often contain unchecked acceptance criteria, standard leaf tasks without children that are already "COMPLETED" conceptually (i.e. empty PRs or completed artifacts) must fail if boxes remain unchecked. However, parent tasks use unchecked boxes as late-binding flags to remain alive for further child tasks.

### Action Taken
Drafted Coder and QA tasks to update `foundry-heartbeat.ts` to assign `rejection_reason` on failure, and update `foundry-orchestrator.ts` preflight logic so leaf tasks with target artifacts completed but unchecked boxes fail directly instead of pushing to READY.

## 2026-05-18 - Granular Task Generation
When drafting technical blueprints from stories that contain multiple independent logical components (e.g., roamer tracking AND stat-based evolutions), it is critical to break them down into separate, granular TASK nodes rather than combining them into a single task. The `coder` persona struggled and failed on a combined task due to its broad scope. Creating smaller scopes reduces complexity, minimizes the risk of PR deadlocks, and improves execution success.
## 2026-05-19: Gen 2 TM vs Move Checks (Headbutt/Rock Smash)
*   **Learning:** In Gen 2 (Gold/Silver/Crystal), Headbutt and Rock Smash are single-use TMs (TM02 and TM08), not HMs. Furthermore, they do not require any gym badges to be used in the field. Because they disappear from the inventory when taught, our suggestion engine logic cannot solely rely on TM inventory checks to see if the player has access to these field mechanics.
*   **Action:** We must cross-reference if any Pokémon in the player's party or PC (`allInstances`) actually knows the move (Headbutt ID: 29, Rock Smash ID: 249) instead of just checking the TM pocket, and we must remove the gym badge requirements for these specific interactions.

## 2026-05-19: ADR 007 Compliance and Acceptance Criteria Discrepancy
When finalizing `story-029-057-interaction-logic`, I noted that the story's acceptance criteria still referenced "badges" for Headbutt and Rock Smash encounters. As discovered and implemented in tasks `task-057-120` and `task-057-121`, Gen 2 does *not* require badges for these moves, and the implementation correctly dropped this requirement. To satisfy ADR 007 (completeness contract) and progress the node, I applied the Empty PR Policy exception and checked off the story's acceptance criteria in the markdown body, acknowledging that the underlying *intent* (filtering encounters by correct game mechanics) has been successfully met by the generated downstream tasks.

## 2026-05-20: Handling Permanent Failures (Impossible Loop)
*   **Incident:** The implementation task `task-053-092-implement-dependency-highlighting` failed permanently, triggering the Orchestrator's "Impossible Loop" and waking up the Tech Lead.
*   **Action:** Handled the failure by spawning a `RESEARCH` node (`research-053-002`) to investigate the failure. Created replacement implementation and QA tasks (`task-053-124` and `task-053-125`) that depend on the research node. Updated the orphaned QA task (`task-053-093`) with a cancellation note in its Markdown body and unchecked the acceptance criteria checkboxes in the parent story (`story-029-053`), explicitly ensuring no YAML frontmatter was modified.

## 2026-05-20: Empty PR Policy for previously un-checked story
*   **Context:** The Tech Lead received a STORY node `story-029-053-implement-dependency-highlighting.md` which was kept alive because its acceptance criteria were unchecked, although the downstream replacement implementation and QA tasks (`task-053-124` and `task-053-125`) were already created and completed.
*   **Action:** Handled the failure by simply checking the acceptance criteria checkboxes in the parent story, strictly adhering to the Empty PR policy to allow the parent node to transition to COMPLETED, as the implementation tasks were already successfully completed.

## 2026-05-22
- ADR 015 Revert Data Format Optimizations: Verbose keys improve DX, but we must retain enum-to-number logic for values (e.g. method: 1 instead of method: 'WALK') because string values can't be deduplicated effectively in msgpackr arrays.
