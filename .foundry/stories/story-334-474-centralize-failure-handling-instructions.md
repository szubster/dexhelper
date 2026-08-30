---
id: story-334-474-centralize-failure-handling-instructions
type: STORY
title: Centralize Failure Handling Instructions
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-28'
depends_on:
  - story-334-473-update-tech-lead-prompt
jules_session_id: '6824297089265951511'
pr_number: null
parent: epic-117-334-centralize-prompt-rules
tags:
  - foundry
  - agents
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Centralize Failure Handling Instructions

## 1. Context & Objectives
This story is part of `epic-117-334-centralize-prompt-rules`. Since the Tech Lead will no longer append reminders for failure management and the Empty PR Checkbox policy to every single TASK node, these critical instructions must be centralized.

## 2. Requirements
- Review `core_policies.md`, `coder.md`, and `qa.md`.
- Ensure explicit, centralized documentation on task failure management (transient failures, permanent failures) and Empty PR Checkbox rules exists so that Coder and QA agents are fully aware of them.
- If these instructions are already adequately covered in `core_policies.md` (which is auto-appended to all agent prompts via the compilation architecture), verify they are clear and deduplicate them from `coder.md` and `qa.md` if necessary to avoid contradictory reminders.

## 3. Acceptance Criteria
- [ ] Centralized instructions for failure handling and Empty PR submission are verified in `core_policies.md`.
- [ ] Any duplicate or contradictory reminders across `coder.md` and `qa.md` are removed or properly aligned.
- [ ] task-474-498-verify-and-deduplicate-failure-instructions
