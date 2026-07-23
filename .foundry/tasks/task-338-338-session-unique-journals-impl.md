---
id: task-338-338-session-unique-journals-impl
type: TASK
title: Implement Session-Unique Journal Files
status: ACTIVE
owner_persona: coder
created_at: '2026-07-22'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: '13165369961707733202'
pr_number: null
parent: story-338-336-implement-session-unique-journals
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

# TASK: Implement Session-Unique Journal Files

## Objective
Update the system configuration and core agent prompts to enforce the use of session-unique journal files to prevent merge conflicts.

## Technical Contract
- Locate all occurrences of hardcoded journal paths (e.g., `.foundry/journals/coder.md`) within `.github/agents/*.md` and `.github/scripts/foundry-orchestrator.ts`.
- Update the instructions in `.github/agents/*.md` to direct agents to use session-unique journal files (e.g., `.foundry/journals/coder/<session_id>.md`).
- If the `session_id` is not readily available to the agent, instruct them to use a timestamp-based unique filename (e.g., `.foundry/journals/coder/YYYY-MM-DD-HH-MM-SS.md`).
- Ensure that any code in the orchestrator that reads or writes to these journals is updated to support the new directory-based structure or timestamp format.
- Specifically, update `.github/scripts/foundry-orchestrator.ts` if it references `.foundry/journals/agile_coach.md` directly.

## Acceptance Criteria
- [ ] Agent prompt files in `.github/agents/` are updated to specify session-unique journal paths.
- [ ] The orchestrator (`.github/scripts/foundry-orchestrator.ts`) is updated to support the new format, if applicable.
