---
id: research-517-518-locate-authentic-mystery-gift-saves
type: RESEARCH
title: Locate Authentic Mystery Gift Saves
status: FAILED
owner_persona: researcher
created_at: '2026-09-16'
updated_at: '2026-09-19'
depends_on: []
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
  [ACKNOWLEDGED] Autonomous No-Ask Policy Violation: Session entered
  AWAITING_USER_FEEDBACK
notes: ''
locks: []
---

# Locate Authentic Mystery Gift Saves

## Objective
The goal is to track down authentic Pokemon Emerald and FireRed `.sav` files that contain Mystery Gift Wonder Cards (such as Aurora Ticket, MysticTicket, Eon Ticket, or Old Sea Map) for use as E2E test fixtures, or to use a trusted 3rd party tool like `PKHeX` to safely generate them.

## Acceptance Criteria
- [ ] Provide authentic `.sav` files or use PKHeX to generate valid test saves containing Mystery Gift flags.
- [ ] Place the `.sav` files in `tests/fixtures/saves/gen3/` and add them to `tests/fixtures/manifest.json`.
