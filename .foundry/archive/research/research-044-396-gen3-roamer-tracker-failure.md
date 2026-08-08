---
id: research-044-396-gen3-roamer-tracker-failure
type: RESEARCH
title: Investigate Gen 3 Roamer Tracker Failures
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-04'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Tracker Failures

## Objective
Investigate the root cause of the previous permanent failures (max rejection count) in the Gen 3 Roamer Tracker epics.

## Description
The previous epics (`epic-044-149`, `epic-044-150`, `epic-044-151`) failed permanently. We need to identify why the tasks could not be completed and ensure the replacement epics and stories account for the failure and avoid repeating it.

## Acceptance Criteria
- [x] Investigate why the previous tasks/stories under `epic-044-149-gen3-roamer-core-extraction-v4` failed and reached the max rejection count.
- [x] Provide actionable recommendations for the implementation to avoid the same failure.

## Findings and Recommendations

### Root Cause
The previous epic `epic-044-149-gen3-roamer-core-extraction-v4` reached the `MAX_REJECTION_THRESHOLD` (3) and was permanently cancelled because it failed the DAG Orchestrator's E2E safeguard. Specifically, the orchestrator requires that any `EPIC` whose children have completed must contain at least one `STORY` tagged with `e2e` or `integration`. Because `epic-044-149` did not generate an integration story in its markdown body before its tasks completed, the orchestrator rejected it with the reason `Merged with unfulfilled acceptance criteria: Missing E2E/integration story`.

The dependent epics (`epic-044-150` and `epic-044-151`) were then automatically cancelled by the orchestrator due to cascading cancellation from the permanently failed parent dependency.

### Actionable Recommendations
1. **E2E/Integration Tagging Requirement**: All generative personas (such as the Epic Planner or Story Owner) must ensure that every generated EPIC breaks down into at least one STORY that explicitly includes `e2e` or `integration` in its tags array within the YAML frontmatter.
2. **Replacement Epics**: The replacement epics (`epic-044-397`, `epic-044-398`, etc.) must strictly adhere to this rule. Ensure that when breaking down these Epics into Stories, a dedicated integration or E2E story is spawned.
