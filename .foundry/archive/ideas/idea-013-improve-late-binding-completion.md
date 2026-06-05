---
id: idea-013-improve-late-binding-completion
type: IDEA
title: Improve Late Binding Parent Completion
status: "COMPLETED"
owner_persona: product_manager
created_at: "2026-05-02"
updated_at: "2026-05-03"
depends_on: []
jules_session_id: null
parent: null
tags: ["orchestrator", "late-binding", "bug"]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Improve Late Binding Parent Completion

## Problem Statement

Late binding in the foundry orchestrator should be handled better. Right now, when the last child of a late-binding parent completes, the parent does not complete. There needs to be a differentiation between a state where no more work is required (and the parent can be closed) and a state where it has to be dispatched again (e.g., late binding, or after research).

## Proposed Solution

1. Enhance the orchestrator to detect when a parent node is in a "wait & wake" state (e.g., `PENDING` due to late binding) and all its dynamically spawned children have been completed.
2. Differentiate between a node that is just waiting for dependencies to complete so it can run again, and a node that is actually finished.
3. Automatically mark the parent as `COMPLETED` or wake it up to `READY` state appropriately, instead of leaving it stuck in `PENDING` or requiring manual intervention.

## Generated PRDs
- .foundry/prds/prd-013-012-improve-late-binding-completion.md
