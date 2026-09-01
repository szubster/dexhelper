---
id: task-478-508-orchestrator-prompt-adaptation
type: TASK
title: Implement Prompt Adaptation for Variants
status: READY
owner_persona: coder
created_at: '2026-08-30'
updated_at: '2026-08-30'
depends_on:
  - task-478-507-orchestrator-cloning-logic
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - prompt
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Prompt Adaptation for Variants

## Objective
Implement logic to inject variant-specific context into agent prompts during task dispatch.

## Scope
1. Update the orchestrator's prompt compilation layer to retrieve variant metadata for cloned nodes.
2. Inject this metadata into the agent's context window.

## Acceptance Criteria
- [ ] Implement context injection logic in the prompt compilation step.
- [ ] Ensure variant details are correctly formatted and appended to the prompt.
