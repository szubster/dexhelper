---
id: prd-013-012-improve-late-binding-completion
type: PRD
title: Improve Late Binding Parent Completion
status: ACTIVE
owner_persona: architect
created_at: '2026-05-02'
updated_at: '2026-05-03'
depends_on: []
jules_session_id: '6970302152251493497'
pr_number: null
parent: .foundry/ideas/idea-013-improve-late-binding-completion.md
tags:
  - orchestrator
  - late-binding
  - bug
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Improve Late Binding Parent Completion

## Problem Statement

Late binding in the foundry orchestrator should be handled better. Right now, when the last child of a late-binding parent completes, the parent does not complete. There needs to be a differentiation between a state where no more work is required (and the parent can be closed) and a state where it has to be dispatched again (e.g., late binding, or after research).

## Proposed Solution

1. Enhance the orchestrator to detect when a parent node is in a "wait & wake" state (e.g., `PENDING` due to late binding) and all its dynamically spawned children have been completed.
2. Differentiate between a node that is just waiting for dependencies to complete so it can run again, and a node that is actually finished.
3. Automatically mark the parent as `COMPLETED` or wake it up to `READY` state appropriately, instead of leaving it stuck in `PENDING` or requiring manual intervention.
