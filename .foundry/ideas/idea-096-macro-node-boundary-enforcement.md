---
id: idea-096-macro-node-boundary-enforcement
type: IDEA
title: Enforce Macro Node Functional Boundaries
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-29'
updated_at: '2026-06-30'
depends_on: []
jules_session_id: '2440599855560762801'
pr_number: null
parent: null
tags:
  - process
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: Spawned by Auditor after epic-045-070 rejection
---

# Enforce Macro Node Functional Boundaries

## Context
Audits reveal that EPICs are being verified before their functional requirements are fully implemented, often because the spawned STORYs only scaffolded the architecture without integrating it.

## Proposal
Create a mechanism to ensure that an EPIC cannot be marked COMPLETED until its functional requirements are verifiably integrated into the application, not just scaffolded in isolated components.
