---
id: epic-339-405-librarian-persona-core
type: EPIC
title: "Librarian Persona Core Definition"
status: PENDING
owner_persona: story_owner
created_at: "2026-08-07"
updated_at: "2026-08-07"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-124-339-librarian-persona-context-optimizer
tags:
  - foundry
  - orchestrator
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Librarian Persona Core Definition

## Description
This epic focuses on defining the new `librarian` (Snorlax) persona in the Foundry Orchestrator. This includes creating the persona prompt, setting up its rules and scheduling cadence (e.g., weekly or event-based).

## Acceptance Criteria
- [ ] Implement the `librarian` prompt in `.github/agents/librarian.yaml` (or equivalent location).
- [ ] Update the orchestrator scheduling mechanism to wake up the `librarian`.
- [ ] Enforce Orchestrator Safeguard: Generate a final STORY node dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
