---
id: epic-117-334-centralize-prompt-rules
type: EPIC
title: Centralize Coder and QA Prompt Rules
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-19'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '5329767741544408648'
pr_number: null
parent: prd-118-117-centralize-prompt-reminders
tags:
  - foundry
  - agents
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Centralize Coder and QA Prompt Rules

## 1. Context & Objectives
This epic fulfills the primary objective of `prd-118-117-centralize-prompt-reminders` by ensuring that instructions regarding transient failures, permanent failures, and Empty PR Checkbox policy are centralized and reinforced in the agent prompt files (`coder.md`, `qa.md`) or the core policy document (`core_policies.md`), rather than being appended to every single TASK node by the Tech Lead.

## 2. Requirements
- The `tech_lead.md` persona prompt must be updated to remove the directive forcing the Tech Lead to append `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks to task nodes.
- Ensure that the agent prompts (`coder.md`, `qa.md`) or `core_policies.md` have explicit, centralized documentation on task failure management and PR submission rules, so the system does not lose this critical knowledge.
- Review existing documentation to verify no duplicate or contradictory reminders exist across the agent guidelines.

## 3. High-Level Acceptance Criteria
- [ ] `tech_lead.md` is updated to remove the requirement to append reminder blocks to tasks.
- [ ] Centralized instructions for failure handling and Empty PR submission are verified/added to `core_policies.md`, `coder.md`, and `qa.md`.
- [ ] story-334-473-update-tech-lead-prompt
- [ ] story-334-474-centralize-failure-handling-instructions
- [ ] story-334-475-prompt-rules-integration-e2e
