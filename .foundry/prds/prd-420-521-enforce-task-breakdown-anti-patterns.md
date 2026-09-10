---
id: prd-420-521-enforce-task-breakdown-anti-patterns
type: PRD
title: Encourage Modular Task Breakdowns for Tech Leads
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: '1238645081883961142'
parent: idea-420-task-breakdown-anti-patterns
tags: []
notes: Generated from idea-420-task-breakdown-anti-patterns
rejection_reason: ''
---

# PRD: Encourage Modular Task Breakdowns for Tech Leads

## 1. Problem Statement
The Tech Lead often falls into the trap of blindly splitting a story into exactly two tasks (one for the Coder, one for QA), regardless of the story's complexity. We previously had rules against this "Two-Tasks-Max Anti-pattern" in the Tech Lead prompt, but consolidated it out. When complex features (e.g. Save Parsing + React Context + UI Components) are lumped into a single implementation task, it leads to massive PRs, high cognitive load, and increased likelihood of QA rejections and bugs. However, strictly enforcing modular breakdown can lead to unnecessary bloat for simple stories where one or two tasks are sufficient. We need to encourage better decomposition through rewarding modularity rather than enforcing strict limits.

## 2. Requirements
1.  Introduce a new Architectural policy (`.foundry/docs/knowledge_base/agents/task_breakdown.md`) specifically detailing how to effectively split frontend work from engine/backend work, while clarifying that modularity should be balanced and not strictly enforced when not necessary.
2.  Implement an automated validation step during the `TASK` generation phase that flags if a `STORY` with a high complexity score generates a single task, and provides an encouraging prompt to reconsider the breakdown without blocking.

## Acceptance Criteria
- [ ] Implement `.foundry/docs/knowledge_base/agents/task_breakdown.md` policy.
- [ ] Implement automated complexity validation for STORY to TASK breakdown that encourages, but does not strictly enforce, modularity.
