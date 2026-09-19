---
id: task-517-576-orchestrator-fallback-generic-prompt
type: TASK
title: Orchestrator Fallback to Generic Prompt
status: FAILED
owner_persona: coder
created_at: '2026-09-13'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-418-517-orchestrator-fallback-mechanisms
tags:
  - foundry
  - orchestrator
  - fallback
research_references: []
rejection_count: 0
rejection_reason: >-
  [ACKNOWLEDGED] Autonomous No-Ask Policy Violation: Session entered
  AWAITING_USER_FEEDBACK
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Fallback to Generic Prompt

## Description
Modify the orchestrator's prompt compilation functions to fall back to a default generic prompt when the requested base persona prompt is missing, instead of throwing an error.

## Acceptance Criteria
- [ ] Implement a fallback string in \`compilePromptForNode\` and \`compileScheduledPrompt\` when persona markdown files cannot be found.
- [ ] Log a warning message indicating that the default fallback prompt is being used.
- [ ] Write or update unit tests to verify the generic prompt fallback behavior.
