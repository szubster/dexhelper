---
id: task-478-640-orchestrator-prompt-adaptation-retry
type: TASK
title: Implement Prompt Adaptation for Variants (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-09-16'
updated_at: '2026-09-16'
depends_on:
  - task-478-639-orchestrator-cloning-logic-retry
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - prompt
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Prompt Adaptation for Variants (Retry)

## Objective
Implement logic to inject variant-specific context into agent prompts during task dispatch.

## Scope
1. Update the orchestrator's prompt compilation layer to retrieve variant metadata for cloned nodes.
2. Inject this metadata into the agent's context window.

## Acceptance Criteria
- [ ] Implement context injection logic in the prompt compilation step.
- [ ] Ensure variant details are correctly formatted and appended to the prompt.