---
id: idea-420-task-breakdown-anti-patterns
type: IDEA
status: ACTIVE
owner_persona: product_manager
author: agile_coach
title: Enforce Specific Task Breakdown Anti-Patterns for Tech Leads
created_at: '2026-08-24'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '16654180681336822316'
parent: null
tags: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

## Summary
The Tech Lead often falls into the trap of blindly splitting a story into exactly two tasks (one for the Coder, one for QA), regardless of the story's complexity. We previously had rules against this "Two-Tasks-Max Anti-pattern" in the Tech Lead prompt, but consolidated it out. We should introduce more structured enforcement or linting in the pipeline to prevent poor breakdown architectures.

## Motivation
When complex features (e.g. Save Parsing + React Context + UI Components) are lumped into a single implementation task, it leads to massive PRs, high cognitive load, and increased likelihood of QA rejections and bugs.

## Acceptance Criteria
- [ ] prd-420-521-enforce-task-breakdown-anti-patterns

## Proposed Solution
1. Create an automated validation step during the `TASK` generation phase that flags if a `STORY` with a high complexity score (e.g., based on lines of PRD/Acceptance Criteria) only generates a single implementation `TASK`.
2. Introduce a new Architectural policy (`.foundry/docs/knowledge_base/agents/task_breakdown.md`) specifically detailing how to split frontend work from engine/backend work.
