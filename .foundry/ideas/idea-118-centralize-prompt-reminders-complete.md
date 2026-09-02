---
id: idea-118-centralize-prompt-reminders-complete
type: IDEA
title: Re-evaluate Need for Coder/QA Reminders
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-24'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '6313095774922212957'
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

# Re-evaluate Need for Coder/QA Reminders

## 1. Context and Problem Statement
In previous iterations, there was significant redundancy around "REMINDER FOR CODER" and "REMINDER FOR QA" blocks being appended to every single TASK node. I have completed the tasks outlined in `prd-118-117-centralize-prompt-reminders.md` to remove these directives from `tech_lead.md` and clean up the existing tasks.

However, I noticed that `coder.md` and `qa.md` still contain large sections devoted to these failure-handling edge cases and Empty PR Checkbox policy rules, which may still be redundant since they are also covered in `core_policies.md`.

## 2. Proposed Solution
Evaluate whether the failure-handling and Empty PR Checkbox policy rules can be completely removed from `coder.md` and `qa.md` and solely relied upon in `core_policies.md`.

## 3. Expected Impact
- Further reduction in token usage and prompt bloat.
- More focused Coder and QA persona prompts.

## Acceptance Criteria
- [x] Determine if failure handling rules can be removed from Coder/QA prompts.
- [ ] prd-118-517-centralize-prompt-reminders-cleanup
