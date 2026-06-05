---
id: prd-019-019-automated-branch-cleanup
type: PRD
title: Automated Branch Cleanup PRD
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-08'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-019-automated-branch-cleanup
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Automated Branch Cleanup PRD

## Overview
Based on the `idea-019-automated-branch-cleanup`, the "Resurrection Loop" spawns fresh sessions on new branches for failed tasks, leaving old Git branches behind. We need a way to automatically clean them up.

## Requirements
1. Identify branches associated with `FAILED` or `CANCELLED` task nodes.
2. Ensure the cleanup logic safely identifies these terminal task branches.
3. Integrate cleanup logic in `foundry-heartbeat.ts` or a new periodic workflow, triggering remote branch deletion on the remote repository.


## Epic Breakdown
- [x] `.foundry/epics/epic-019-030-automated-branch-cleanup.md`
