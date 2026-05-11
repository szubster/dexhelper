---
id: idea-019-automated-branch-cleanup
type: IDEA
title: Automated Branch Cleanup
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-08'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: '9119156587416793739'
pr_number: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: >-
  Proposed by Agile Coach based on observed workspace clutter from FAILED
  sessions.
---

# Automated Branch Cleanup

## Problem
The "Resurrection Loop" correctly respawns Jules sessions on new branches when a task fails. However, the old Git branches are left behind in the repository, cluttering the workspace and potentially confusing developers.

## Proposal
Implement an automated Git branch cleanup step in the `foundry-heartbeat` or a dedicated periodic workflow. When a node transitions to `FAILED` or `CANCELLED`, the system should identify the associated branch (via the PR or session ID) and automatically delete it from the remote repository.

## Acceptance Criteria
- [x] Determine the safest method for identifying the branch associated with a failed session.
- [ ] Implement the cleanup logic.
- [ ] Ensure it only deletes branches safely associated with terminal, failed tasks, and not active ones.

## References
- Downstream PRD: `.foundry/prds/prd-019-019-automated-branch-cleanup.md`
