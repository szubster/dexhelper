---
id: task-517-650-locate-authentic-mystery-gift-saves-retry
type: TASK
title: Locate Authentic Mystery Gift Saves Retry
status: CANCELLED
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-04'
depends_on:
  - research-517-649-investigate-mystery-gift-saves-failure
jules_session_id: null
pr_number: null
parent: task-478-517-setup-mystery-gift-e2e-fixtures
tags:
  - gen3
  - mystery-gift
  - fixtures
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-517-649-investigate-mystery-gift-saves-failure
notes: ''
locks: []
---

# Locate Authentic Mystery Gift Saves Retry

## Objective
The goal is to track down authentic Pokemon Emerald and FireRed `.sav` files that contain Mystery Gift Wonder Cards (such as Aurora Ticket, MysticTicket, Eon Ticket, or Old Sea Map) for use as E2E test fixtures, or to use a trusted 3rd party tool like `PKHeX` to safely generate them, acting as a retry for the permanently failed node research-517-518.

## Acceptance Criteria
- [ ] Provide authentic `.sav` files or use PKHeX to generate valid test saves containing Mystery Gift flags.
- [ ] Place the `.sav` files in `tests/fixtures/saves/gen3/` and add them to `tests/fixtures/manifest.json`.
