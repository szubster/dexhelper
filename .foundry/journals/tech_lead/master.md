# Tech Lead Persona Journal Master

## DAG Strictness
When referring to task or story nodes in `.foundry` files, ensure you're using the file `id` and NOT the `filename` as node references. Use the `id` from the yaml metadata inside the node. Note that they do not contain `.md` suffix.

## Decomposition Strategy
Decompose Epics into highly specific, functional stories and avoid monolithic chunks. When breaking down a STORY into TASK nodes as the Tech Lead, decompose the work into multiple, discrete modular steps (avoiding the 'Two-Tasks-Max' anti-pattern) and do NOT check off the functional Acceptance Criteria checkboxes of the parent STORY node, to avoid violating the Premature Verification policy.

## Empty Task Resolution Strategy
If you discover a STORY task that is functionally already complete because it was implemented by another persona or task, follow the `Graceful Exit` policy by checking off its acceptance criteria. This allows the node to cleanly transition to `COMPLETED` and prevents workflow deadlocks. You must explicitly remove the `### QA Rejection Note` or `### Auditor Rejection` block and its contents from the task's markdown body when checking off its acceptance criteria.

## Handoff Strictness
The Tech Lead persona MUST strictly draft technical blueprints (TASK nodes in `.foundry/tasks/`) and delegate work. Attempting to bypass the system by writing implementation code (e.g., writing the actual E2E tests instead of creating a task for them) directly violates the Foundry workflow and will result in automated code review rejection.

# Session Log 2026-08-18-11-27-17

## Learnings
Discovered a partial Artifact Anomaly when processing `story-139-298-gen2-roamer-status-and-standardization`. The standardized object formatting and property mapping to `saveData.roamingLegendaries` was already implemented previously in `src/engine/saveParser/parsers/gen2.ts`. However, the specific business logic for checking `HP > 0` was omitted. Drafted a highly specific single Task to address just this missing requirement to avoid duplicating the already completed formatting work.
