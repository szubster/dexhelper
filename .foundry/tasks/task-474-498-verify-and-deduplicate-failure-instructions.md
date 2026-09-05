---
id: task-474-498-verify-and-deduplicate-failure-instructions
type: TASK
title: Verify and Deduplicate Failure Handling Instructions
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '3726242106208559677'
pr_number: null
parent: story-334-474-centralize-failure-handling-instructions
tags:
  - foundry
  - agents
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Verify and Deduplicate Failure Handling Instructions

## 1. Context & Objectives
This task implements `story-334-474-centralize-failure-handling-instructions`. Since the Tech Lead will no longer append reminders for failure management and the Empty PR Checkbox policy to every single TASK node, these critical instructions must be centralized. They should exist exclusively in `.foundry/docs/knowledge_base/agents/core_policies.md` and be removed from `.github/agents/coder.md` and `.github/agents/qa.md` to prevent redundancy and contradictory reminders.

## 2. Requirements
- Review `.foundry/docs/knowledge_base/agents/core_policies.md` to ensure explicit, centralized documentation on task failure management (transient failures, permanent failures) and Empty PR Checkbox rules exists.
- Review `.github/agents/coder.md` and `.github/agents/qa.md`.
- Remove any duplicate or contradictory reminders regarding failure management, transient/permanent failures, and Empty PR Checkbox policies from `coder.md` and `qa.md`.

## 3. Acceptance Criteria
- [ ] Explicit, centralized documentation for failure handling and Empty PR submission is verified in `core_policies.md`.
- [ ] Duplicate or contradictory reminders are removed from `coder.md` and `qa.md`.
