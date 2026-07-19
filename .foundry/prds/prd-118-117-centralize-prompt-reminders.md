---
id: prd-118-117-centralize-prompt-reminders
type: PRD
title: Centralize Coder and QA Task Prompt Reminders
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-18'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: '120116510880636003'
pr_number: null
parent: idea-118-centralize-prompt-reminders
tags:
  - foundry
  - agents
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Centralize Coder and QA Task Prompt Reminders

## 1. Context and Problem Statement
Currently, the Tech Lead persona has explicit instructions to append a "REMINDER FOR CODER" or "REMINDER FOR QA" block to every single generated TASK node. This creates massive redundancy across hundreds of task files. Furthermore, these instructions are partially duplicated in the agent prompts themselves (`coder.md` and `qa.md`). This redundancy increases token usage and causes "prompt rot" across the system.

## 2. Objectives
- Clean up TASK node markdown files so they only contain the actual technical blueprints.
- Reduce token usage and system complexity.
- Consolidate agent-specific operational rules (such as how to handle failures or Empty PR Checkbox policy) into centralized documentation or specific persona prompts (`coder.md`, `qa.md`), rather than polluting every single TASK file.

## 3. Scope
- Update the Tech Lead persona prompt to remove the requirement to append the "REMINDER FOR CODER" and "REMINDER FOR QA" blocks to generated TASK nodes.
- Ensure that the `coder.md` and `qa.md` prompts or the `core_policies.md` document adequately cover the rules regarding transient failures, permanent failures, and Empty PR Checkbox policy.
- (Optional) Run a one-time migration to strip existing `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks from currently active or pending TASK nodes.

## 4. Success Criteria
- The Tech Lead prompt (`tech_lead.md`) no longer dictates appending these reminders to TASK nodes.
- `coder.md` and `qa.md` (or `core_policies.md`) have clear, centralized instructions on task failure management and PR submission rules.
- Existing tasks are cleaned up (if the migration script is run), or new tasks generated after this change do not contain the reminder blocks.

## Acceptance Criteria
- [x] Break down into Epics
- [ ] epic-117-334-centralize-prompt-rules
- [ ] epic-117-335-migrate-task-reminders
