---
id: task-409-421-gen3-event-inventory-extraction-ui-qa
type: TASK
title: Gen 3 Event Inventory Items Extraction UI QA
status: ACTIVE
owner_persona: qa
created_at: '2026-08-12'
updated_at: '2026-08-18'
depends_on:
  - task-409-420-gen3-event-inventory-extraction-ui-impl
jules_session_id: '16229964847516633279'
pr_number: null
parent: story-404-409-gen3-event-inventory-extraction
tags:
  - gen3
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Event Inventory Items Extraction UI QA

## Overview
Verify the UI integration and rendering of the extracted Gen 3 event items data.

## Requirements
- Verify that the UI dashboard correctly displays the presence of the Eon Ticket, Mystic Ticket, Aurora Ticket, and Old Sea Map.
- Ensure that the UI components adhere to the aesthetic constraints (e.g., ADR 008, `rounded-none`, `border-dashed`, monospaced fonts).
- Verify that component tests provide adequate coverage for the new UI elements.

## Acceptance Criteria
- [ ] UI integration has been verified manually or via tests.
- [ ] UI components adhere to aesthetic constraints.
- [ ] Component tests pass and provide adequate coverage.
