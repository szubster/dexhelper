---
id: prd-120-335-conflictless-agent-journals
type: PRD
title: Research and Implement Conflict-less Agent Journals
status: ACTIVE
owner_persona: auditor
created_at: '2026-07-20'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '17353405569114618226'
pr_number: null
parent: idea-120-conflictless-agent-journals
tags:
  - foundry
  - journals
  - workflow
  - DX
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Conflict-less Agent Journals

## Objective
To resolve frequent git merge conflicts on `.foundry/journals/*.md` files, we will transition to a conflict-less storage pattern for agent journals.

## Requirements
1. Instead of monolithic markdown files per persona (e.g., `coder.md`), the system must store journal entries as individual timestamped or session-unique markdown files.
2. Journals must be placed in persona-specific subdirectories (e.g., `.foundry/journals/coder/2026-07-20-session-abc.md`).
3. The TPM persona's archiving responsibilities must be updated to aggregate or archive these individual files appropriately.
4. Downstream nodes must correctly reference these fragmented journal files if necessary, or rely on aggregation mechanisms.

## Acceptance Criteria
- [ ] epic-120-338-implement-conflictless-journals

### Auditor Rejection
The generated descendant node epic-120-338-implement-conflictless-journals is currently in a FAILED state. A macro node MUST NOT be verified until its functional requirements are fully implemented and its child tasks are COMPLETED.
