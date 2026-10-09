---
id: task-422-674-tm-inventory-extraction-logic-v3
type: TASK
title: Implement TM Inventory data extraction logic V3
status: PENDING
owner_persona: coder
created_at: '2026-10-09T00:00:00.000Z'
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
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Implement TM Inventory data extraction logic V3

## Context
This task replaces the failed `task-422-659-tm-inventory-extraction-logic-retry`. Implement extraction functions for TM Inventory data.

## Acceptance Criteria
- [ ] Read the findings in `research-422-673-tm-inventory-extraction-failure-v3`.
- [ ] Implement extraction functions for TM Inventory data for Gen 1, Gen 2, and Gen 3 save files.
- [ ] Integrate PC Box and TM Inventory extraction to run concurrently.
