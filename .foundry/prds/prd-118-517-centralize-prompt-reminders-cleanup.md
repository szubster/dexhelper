---
id: prd-118-517-centralize-prompt-reminders-cleanup
type: PRD
title: Clean up Coder and QA Persona Prompts
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '3307717559662829484'
parent: idea-118-centralize-prompt-reminders-complete
tags:
  - foundry
  - agents
  - prompts
rejection_reason: ''
---

# Clean up Coder and QA Persona Prompts

## 1. Overview
The Coder and QA persona prompts currently contain redundant information about Late Binding and failure handling that is already comprehensively covered in `core_policies.md`. To reduce prompt bloat and adhere to the Core Agent Policies optimization rules, we need to remove these redundant sections from `.github/agents/coder.md` and `.github/agents/qa.md`.

## 2. Requirements
- The "Late Binding Directive" section should be removed from `.github/agents/coder.md` as it is already defined in `core_policies.md`.
- Any remaining redundant failure handling or policy rules in `.github/agents/qa.md` should be removed or consolidated.
- The base persona prompts must rely entirely on `core_policies.md` for these cross-cutting system rules.

## Acceptance Criteria
- [ ] epic-517-521-centralize-prompt-reminders-cleanup
- [x] Create an EPIC to manage the removal of redundant policies from Coder and QA prompts.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification
