---
id: epic-120-338-implement-conflictless-journals
type: EPIC
title: Implement Conflict-less Agent Journals
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-21'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '5165473031168310290'
parent: prd-120-335-conflictless-agent-journals
tags:
  - foundry
  - journals
  - workflow
  - DX
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Implement Conflict-less Agent Journals

## Overview
To resolve frequent git merge conflicts on `.foundry/journals/*.md` files, this Epic will transition the system to a conflict-less storage pattern for agent journals. Instead of monolithic files, agents will write to session-unique files, and the TPM will handle aggregation or archiving.

## Acceptance Criteria
- [ ] Implement timestamped or session-unique markdown files for journals.
- [ ] Ensure storage is in persona-specific subdirectories (e.g. `.foundry/journals/coder/`).
- [ ] Update the TPM persona responsibilities to aggregate and archive these individual files appropriately.
- [ ] Update downstream nodes and scripts that reference journals to correctly reference these fragmented journal files or rely on aggregation mechanisms.
- [ ] story-338-336-implement-session-unique-journals
- [ ] story-338-337-update-tpm-aggregation
- [ ] story-338-338-update-downstream-references
