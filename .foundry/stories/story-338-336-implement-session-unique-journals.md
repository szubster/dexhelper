---
id: story-338-336-implement-session-unique-journals
type: STORY
title: Implement Session-Unique Journal Files
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-22'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: '17362258220025019819'
pr_number: null
parent: epic-120-338-implement-conflictless-journals
tags:
  - foundry
  - journals
  - workflow
  - DX
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Implement Session-Unique Journal Files

## Context
Currently, agent personas write to monolithic journal files (e.g., `.foundry/journals/coder.md`), leading to frequent merge conflicts when multiple agents run concurrently. We need to transition to session-unique files per persona.

## Objectives
- Update the system configuration or core agent prompt infrastructure to point agents towards session-unique files within persona-specific subdirectories (e.g., `.foundry/journals/coder/<session_id>.md` or timestamped).
- Ensure existing infrastructure (like the orchestrator or prompts) supports this new location format.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [ ] task-338-338-session-unique-journals-impl
- [ ] task-338-339-session-unique-journals-qa
- [x] task-338-340-journal-automerge-impl
- [x] task-338-341-journal-automerge-qa
- [ ] task-336-342-journal-automerge-retry-impl
- [ ] task-336-343-journal-automerge-retry-qa
