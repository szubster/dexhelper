---
id: story-028-043-migrate-heartbeat-to-gray-matter
type: STORY
title: Rewrite heartbeat regex mutations using gray-matter
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-08'
updated_at: '2026-05-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-018-028-migrate-heartbeat-to-gray-matter
tags:
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Rewrite heartbeat regex mutations using gray-matter

## Goal
In `.github/scripts/foundry-heartbeat.ts`, we currently use fragile regex patterns to modify YAML frontmatter. We need to transition these modifications to use `gray-matter` for parsing and serialization, compliant with ADR-006.

## Tasks Required
1. Import `matter` from `gray-matter` in `foundry-heartbeat.ts` if not already imported.
2. Refactor `transitionNodeToFailed` to parse the file with `matter`, update `status`, `rejection_count`, and `jules_session_id`, then write it back using `matter.stringify()`.
3. Refactor `transitionNodeToReady` similarly.
4. Refactor `transitionNodeToCompleted` similarly.
5. Ensure that the original markdown body is preserved during `matter.stringify()`.

## Acceptance Criteria
- [x] Tasks are outlined and delegated.

### Child Tasks:
- [.foundry/tasks/task-043-073-refactor-heartbeat-matter.md](.foundry/tasks/task-043-073-refactor-heartbeat-matter.md)
- [.foundry/tasks/task-043-074-qa-refactor-heartbeat-matter.md](.foundry/archive/tasks/task-043-074-qa-refactor-heartbeat-matter.md)
