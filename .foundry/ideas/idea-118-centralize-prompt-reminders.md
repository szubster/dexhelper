---
id: idea-118-centralize-prompt-reminders
type: IDEA
title: Centralize Coder and QA Task Prompt Reminders
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-17'
updated_at: '2026-07-18'
depends_on: []
jules_session_id: '12010554275977225691'
pr_number: null
tags:
  - foundry
  - agents
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Centralize Coder and QA Task Prompt Reminders

## 1. Context and Problem Statement
Currently, the Tech Lead persona has explicit instructions to append a "REMINDER FOR CODER" or "REMINDER FOR QA" block to every single generated TASK node. This creates massive redundancy across hundreds of task files. Furthermore, I noticed that these instructions are partially duplicated in the agent prompts themselves (`coder.md` and `qa.md`).

## 2. Proposed Solution
1. Remove the directive from the `tech_lead.md` persona prompt that forces them to append these reminders to the markdown body of every task.
2. Ensure that the core instructions regarding transient failures (`FAILED`), permanent failures (`CANCELLED`), and Empty PR Checkbox policy are centralized and reinforced in the agent prompt files (`coder.md`, `qa.md`) or the core policy document (`core_policies.md`).
3. (Optional but recommended) Run a one-time migration to remove the redundant `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks from existing pending/ready tasks to clean up the workspace.

## 3. Expected Impact
- Reduced token usage and "prompt rot" across the system.
- Cleaner, more focused TASK node markdown files that only contain the actual technical blueprint.
- Easier to update failure handling policies in the future by modifying a single central document rather than fighting legacy instructions embedded in tasks.
