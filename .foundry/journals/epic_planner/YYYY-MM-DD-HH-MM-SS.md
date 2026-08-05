## Session 2026-08-04 - Epic Planner Hand-off

*   **Observation:** The previous generated epics (`epic-044-149-gen3-roamer-core-extraction-v4`, `epic-044-150-gen3-roamer-iv-glitch-v4`, `epic-044-151-gen3-roamer-dashboard-ui-v6`) reached maximum rejection count and were permanently cancelled due to integration failures or impossible loop conditions.
*   **Action:** Created `research-044-396-gen3-roamer-tracker-failure` to investigate the root cause, satisfying the rule for handling permanently failed child nodes.
*   **Action:** Created replacement epics (`epic-044-397-gen3-roamer-core-extraction-v5`, `epic-044-398-gen3-roamer-iv-glitch-v5`, `epic-044-399-gen3-roamer-dashboard-ui-v7`). Crucially, enforced the Epic Planner Core Directive by explicitly adding an acceptance criterion to each EPIC requiring a final STORY dedicated exclusively to Integration and E2E Verification to ensure proper system-wide rendering and prevent future integration failures.

## Session 2026-08-05 - Bundle Splitting Epic Generation
*   **Observation:** Generated bundle splitting epics needed correct `depends_on` references using strict node IDs rather than relative file paths.
*   **Action:** Enforced node ID usage for `depends_on` when decomposing PRD 117-337 into its components.
*   **Action:** Created four epics in sequential order, explicitly including E2E and integration verification stories in their acceptance criteria.
