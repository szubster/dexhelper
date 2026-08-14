---
id: idea-115-remove-obsolete-orphaned-node-manual-cancellation
type: IDEA
title: Remove Obsolete Orphaned Node Manual Cancellation Rule
status: COMPLETED
owner_persona: auditor
created_at: '2026-07-12'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - orchestrator
  - agile-coach
rejection_reason: ''
---

# Remove Obsolete Orphaned Node Manual Cancellation Rule

## Description
The Agile Coach identified friction caused by the obsolete "Orphaned QA Task Cancellation Rule" in `core_policies.md`. The orchestrator's Phase 3.6 cascade cancellation logic now automatically cancels PENDING nodes that depend on permanently failed nodes, making the manual markdown body updates redundant and conflict-prone. This rule has been removed from `core_policies.md` to streamline the agent workflow and align with the Orchestrator's automated capabilities.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD to formalize the removal of manual orphaned node cancellation rules across the documentation.
- [x] prd-115-115-remove-obsolete-orphaned-node-manual-cancellation
