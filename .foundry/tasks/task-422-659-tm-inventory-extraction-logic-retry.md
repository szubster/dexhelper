---
id: task-422-659-tm-inventory-extraction-logic-retry
type: TASK
title: Implement TM Inventory data extraction logic
status: PENDING
owner_persona: coder
depends_on:
  - research-422-658-tm-inventory-extraction-failure-retry
parent: story-411-422-pc-box-and-tm-extraction
---
# Implement TM Inventory data extraction logic

## Context
This task replaces the permanently failed `task-422-639-tm-inventory-extraction-logic`. Before implementing, the coder must review the findings from `research-422-658-tm-inventory-extraction-failure-retry` to avoid repeating previous mistakes.

## Acceptance Criteria
- [ ] Read the findings in `research-422-658-tm-inventory-extraction-failure-retry`.
- [ ] Implement extraction functions for TM Inventory data for Gen 1, Gen 2, and Gen 3 save files.
- [ ] Integrate PC Box and TM Inventory extraction to run concurrently using Promise.all or similar asynchronous patterns.
