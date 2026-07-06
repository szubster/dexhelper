---
id: task-247-275-gen2-roamer-radar-qa
type: TASK
title: QA Gen 2 Roamer Radar Widget
status: CANCELLED
owner_persona: qa
created_at: '2026-07-05'
updated_at: '2026-07-05'
depends_on: [task-247-274-gen2-roamer-radar-impl]
jules_session_id: null
pr_number: null
parent: story-069-247-gen2-roamer-radar-widget
tags: [qa, ui, gen2]
rejection_count: 0
rejection_reason: 'Parent story cancelled'
---

# QA Gen 2 Roamer Radar Widget

## Objective
Verify the implementation of the Gen 2 Roamer Radar Widget.

## Context & Contracts
* Verify that the UI component lists Raikou, Entei, and Suicune and accurately displays their state using `TacticalBadge` components.
* Ensure the location resolution correctly maps `mapGroup` and `mapId` to human-readable names using `src/engine/data/gen2/mapLocations.json`.
* **Transient Failure Rule:** If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
* **Permanent Failure Rule:** If you must abort or permanently fail this task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
* **Empty PR Rule:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify UI component lists the active Gen 2 roamers.
- [ ] Verify component correctly resolves human-readable route locations.
- [ ] Verify status tags accurately reflect the save data (Active, Caught, Defeated).
- [ ] Verify component adheres to the tactical aesthetic (ADR 024 / ADR 008 constraints).

### CANCELLED
This task is cancelled as its parent story is cancelled.
