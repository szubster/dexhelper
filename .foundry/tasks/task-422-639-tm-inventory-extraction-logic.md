---
id: task-422-639-tm-inventory-extraction-logic
type: TASK
title: Implement TM Inventory data extraction logic
status: PENDING
owner_persona: coder
created_at: '2026-09-29T00:00:00.000Z'
updated_at: '2026-09-29T00:00:00.000Z'
depends_on:
  - research-422-638-tm-inventory-extraction-failure
jules_session_id: null
pr_number: null
parent: story-411-422-pc-box-and-tm-extraction
tags:
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Implement TM Inventory data extraction logic

## Context
This task replaces the permanently failed `task-422-591-tm-inventory-extraction-logic`. Before implementing, the coder must review the findings from `research-422-638-tm-inventory-extraction-failure` to avoid repeating previous mistakes.

## Acceptance Criteria
- [ ] Read the findings in `research-422-638-tm-inventory-extraction-failure`.
- [ ] Implement extraction functions for TM Inventory data for Gen 1, Gen 2, and Gen 3 save files.
- [ ] Integrate PC Box and TM Inventory extraction to run concurrently using Promise.all or similar asynchronous patterns.
