---
id: task-517-669-orchestrator-fallback-generic-prompt-retry
type: TASK
title: Orchestrator Fallback to Generic Prompt (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-09'
depends_on:
  - research-517-668-investigate-orchestrator-generic-prompt-failure
jules_session_id: null
pr_number: null
parent: story-418-517-orchestrator-fallback-mechanisms
tags:
  - foundry
  - orchestrator
  - fallback
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Fallback to Generic Prompt (Retry)

## Description
Modify the orchestrator's prompt compilation functions to fall back to a default generic prompt when the requested base persona prompt is missing. This is a retry task; adhere to the findings from the prerequisite research node.

## Acceptance Criteria
- [ ] Implement a fallback string in `compilePromptForNode` and `compileScheduledPrompt` when persona files cannot be found.
- [ ] Log a warning message indicating that the default fallback prompt is being used.
- [ ] Write or update unit tests to verify the generic prompt fallback behavior.
