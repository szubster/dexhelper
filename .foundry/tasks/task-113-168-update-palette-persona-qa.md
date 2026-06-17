---
id: task-113-168-update-palette-persona-qa
type: TASK
title: QA - Update palette agent prompt to define ownership of Tailwind styling
status: ACTIVE
owner_persona: qa
created_at: '2026-06-12'
updated_at: '2026-06-17'
depends_on:
  - task-113-167-update-palette-persona-impl
jules_session_id: '13569959418337710833'
pr_number: null
parent: story-077-113-update-palette-persona
tags:
  - styling
  - agents
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Update palette agent prompt to define ownership of Tailwind styling

## Objective
Verify the changes implemented in `task-113-167-update-palette-persona-impl` to `.github/agents/palette.md`.
**Validation Failed**: The implementation task failed to update .github/agents/palette.md with the required changes.

## Context
The coder was tasked with updating the `palette` agent prompt to assign ownership of `src/index.css`, enforce the tactical hardware aesthetic, and manage custom `@utility` primitives via ADR 024. This verification task ensures those requirements were met.

## Validation Steps
1. Verify that `.github/agents/palette.md` explicitly states that the `palette` persona owns `src/index.css`.
2. Verify that the agent is explicitly tasked with enforcing the tactical hardware aesthetic.
3. Verify that the agent manages custom `@utility` primitives per ADR 024.
4. Verify that the constraint prohibiting adding custom CSS has been removed or modified to allow for `@utility` definitions.

## Acceptance Criteria
- [x] Confirmed `.github/agents/palette.md` asserts `palette` ownership of `src/index.css`.
- [x] Confirmed `.github/agents/palette.md` tasks `palette` with enforcing tactical hardware aesthetic and managing custom `@utility` primitives.

## Critical Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- If QA validation fails, you MUST update the target implementation task's YAML frontmatter (set `status: FAILED`, provide `rejection_reason`, increment `rejection_count`), leave its Acceptance Criteria unchecked, and document the failure in `.foundry/journals/qa.md`, while leaving this QA task's frontmatter completely untouched.
