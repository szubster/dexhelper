---
id: prd-420-521-enforce-task-breakdown-anti-patterns
type: PRD
title: "Enforce Specific Task Breakdown Anti-Patterns for Tech Leads"
status: READY
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: idea-420-task-breakdown-anti-patterns
tags: []
notes: "Generated from idea-420-task-breakdown-anti-patterns"
---

# PRD: Enforce Specific Task Breakdown Anti-Patterns for Tech Leads

## 1. Problem Statement
The Tech Lead often falls into the trap of blindly splitting a story into exactly two tasks (one for the Coder, one for QA), regardless of the story's complexity. We previously had rules against this "Two-Tasks-Max Anti-pattern" in the Tech Lead prompt, but consolidated it out. We should introduce more structured enforcement or linting in the pipeline to prevent poor breakdown architectures. When complex features (e.g. Save Parsing + React Context + UI Components) are lumped into a single implementation task, it leads to massive PRs, high cognitive load, and increased likelihood of QA rejections and bugs.

## 2. Requirements
1.  Introduce a new Architectural policy (`.foundry/docs/knowledge_base/agents/task_breakdown.md`) specifically detailing how to split frontend work from engine/backend work.
2.  Implement an automated validation step during the `TASK` generation phase that flags if a `STORY` with a high complexity score (e.g., based on lines of PRD/Acceptance Criteria) only generates a single implementation `TASK`.

## Acceptance Criteria
- [ ] Implement `.foundry/docs/knowledge_base/agents/task_breakdown.md` policy.
- [ ] Implement automated complexity validation for STORY to TASK breakdown.
