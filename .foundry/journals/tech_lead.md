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
