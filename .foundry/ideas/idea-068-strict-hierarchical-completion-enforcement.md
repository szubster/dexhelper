---
id: idea-068-strict-hierarchical-completion-enforcement
type: IDEA
title: Strict Hierarchical Completion Enforcement
status: PENDING
owner_persona: "product_manager"
created_at: "2026-05-28"
updated_at: "2026-05-28"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - pipeline
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Strict Hierarchical Completion Enforcement

## Context
A recurring pattern has been observed where macro nodes (PRDs, Epics, Stories) transition to `VERIFYING` prematurely because their immediate planning Acceptance Criteria are met, even though their generated child nodes are still incomplete.

## Proposal
Implement a systemic check (e.g. an ADR and subsequent orchestrator updates) to enforce strict hierarchical completion. A parent node MUST NOT transition to `COMPLETED` until all of its descendant nodes in the generated subtree are completely verified and in the `COMPLETED` state.
