---
id: task-422-674-tm-inventory-extraction-logic-v3
type: TASK
title: Implement TM Inventory data extraction logic v3
status: PENDING
owner_persona: coder
created_at: '2026-10-09T14:51:01.000Z'
updated_at: '2026-10-09'
depends_on:
  - research-422-673-tm-inventory-extraction-failure-v3
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
# Implement TM Inventory data extraction logic v3

## Context
This task replaces the permanently failed `task-422-659-tm-inventory-extraction-logic-retry`. Before implementing, the coder must review the findings from `research-422-673-tm-inventory-extraction-failure-v3` to avoid repeating previous mistakes.

## Acceptance Criteria
- [ ] Read the findings in `research-422-673-tm-inventory-extraction-failure-v3`.
- [ ] Implement extraction functions for TM Inventory data for Gen 1, Gen 2, and Gen 3 save files.
- [ ] Integrate PC Box and TM Inventory extraction to run concurrently using Promise.all or similar asynchronous patterns.
