---
id: task-473-493-update-tech-lead-prompt
type: TASK
title: Update Tech Lead Prompt
status: ACTIVE
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-28'
depends_on: []
jules_session_id: '43843524552931356'
pr_number: null
parent: story-334-473-update-tech-lead-prompt
tags:
  - foundry
  - agents
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Update Tech Lead Prompt

## 1. Context & Objectives
This task implements `story-334-473-update-tech-lead-prompt`. The objective is to update the Tech Lead persona prompt (`.github/agents/tech_lead.md`) to remove the directive that forces the Tech Lead to append `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks to task nodes. Since this is a simple text removal, no separate QA task is required; the Coder will self-verify.

## 2. Requirements
- Edit `.github/agents/tech_lead.md`.
- Ensure there are no instructions remaining that tell the Tech Lead to append reminder blocks to tasks regarding task failure management and PR submission rules.
- The prompt should still instruct the Tech Lead to draft technical blueprints and define clear contracts.

## 3. Acceptance Criteria
- [x] The `tech_lead.md` file is successfully modified.
- [x] No instructions about appending `### REMINDER FOR CODER` or `### REMINDER FOR QA` blocks remain in `tech_lead.md`.
