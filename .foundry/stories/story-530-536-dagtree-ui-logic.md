---
id: story-530-536-dagtree-ui-logic
type: STORY
title: Implement DagTree UI logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '2591668212821569410'
pr_number: null
parent: epic-516-530-replace-xyflow-core
tags:
  - ui-ux
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Implement DagTree UI logic

## Objective
Implement a lightweight, DOM-based directory tree visualization for the Foundry DAG to replace the heavy `@xyflow/react` dependency.

## Scope
1. Implement `DagTree` UI component using standard nested `<ul>`/`<li>` structure.
2. Integrate expand/collapse toggles and "Expand All" / "Collapse All" functionality.
3. Apply tactical hardware aesthetics (sharp edges, dashed borders, monospaced font) following ADR 008.

## Acceptance Criteria
- [ ] Break down into Tasks to implement `DagTree` UI logic.
- [ ] Implement `DagTree` UI component.
- [ ] Apply ADR 008 styling to the component.
- [ ] Implement expand/collapse functionality.
