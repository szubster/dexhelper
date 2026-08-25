---
id: story-334-473-update-tech-lead-prompt
type: STORY
title: Update Tech Lead Prompt
status: READY
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
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

# Story: Update Tech Lead Prompt

## 1. Context & Objectives
This story is part of `epic-117-334-centralize-prompt-rules`. The objective is to update the Tech Lead persona prompt (`.github/agents/tech_lead.md`) to remove the directive that forces the Tech Lead to append `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks to task nodes.

## 2. Requirements
- Edit `.github/agents/tech_lead.md`.
- Ensure there are no instructions remaining that tell the Tech Lead to append reminder blocks to tasks regarding task failure management and PR submission rules (such as transient failures, permanent failures, and Empty PR Checkbox policy).
- The prompt should still instruct the Tech Lead to draft technical blueprints and define clear contracts.

## 3. Acceptance Criteria
- [ ] The `tech_lead.md` file is successfully modified.
- [ ] No instructions about appending `### REMINDER FOR CODER` or `### REMINDER FOR QA` blocks remain in `tech_lead.md`.
