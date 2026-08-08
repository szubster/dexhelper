---
id: epic-338-405-kurt-apricorn-dashboard-ui
type: EPIC
title: Gen 2 Kurt Apricorn Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: "2026-08-06"
updated_at: "2026-08-06"
depends_on:
  - "epic-338-404-kurt-apricorn-data-engine"
jules_session_id: null
pr_number: null
parent: prd-121-338-gen2-kurt-apricorn-tracker
tags:
  - gen2
  - ui
rejection_count: 0
rejection_reason: ""
notes: ""
---
# Gen 2 Kurt Apricorn Dashboard UI

## Context
As defined in PRD `prd-121-338-gen2-kurt-apricorn-tracker`, the UI layer must display the state of Kurt's Apricorn crafting process. This includes showing active orders, providing ready-for-pickup notifications based on the system clock, and tallying Apricorn resources.

## Objectives
- Implement an Active Order Tracker component to show what type of Apricorn was given, the expected Poké Ball, and the quantity.
- Implement a notification component that checks the crafting state against the system clock to alert when the balls are ready for pickup.
- Implement a Resource Dashboard comparing uncrafted Apricorns in the bag to those currently with Kurt.
- Ensure strict adherence to ADR 008 (tactical UI aesthetic: sharp edges, dashed borders, monospace fonts).

## Acceptance Criteria
- [ ] story_owner: Break this EPIC down into actionable STORY nodes.
- [ ] story_owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).