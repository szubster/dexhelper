---
id: task-551-562-update-curator-prompt-logic
type: TASK
title: Update Curator Prompt Logic
status: READY
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
parent: story-532-551-curator-historical-mapping-logic
tags:
  - architecture
  - quality
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Curator Prompt Logic

## Summary
Update the curator agent prompt to include historical mapping logic.

## Requirements
- Edit `.github/agents/curator.md`.
- Explicitly instruct the curator to cross-reference `.foundry/docs/architecture/idea_dependency_matrix.md`.
- Provide instructions for identifying regressions based on overlapping domain boundaries.
- Add logic instructing the curator to spawn dynamic remediation nodes (e.g., RESEARCH or TASK) linked to legacy ideas when needed.

## Acceptance Criteria
- [x] Update curator prompt with idea dependency matrix instructions
- [x] Add regression identification instructions
- [x] Add remediation node spawning logic
