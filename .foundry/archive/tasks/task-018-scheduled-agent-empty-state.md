---
id: task-018-scheduled-agent-empty-state
type: TASK
title: "Scheduled Agent Workflow Empty State Support via Prompt"
status: "COMPLETED"
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: .foundry/archive/stories/story-005-empty-state-handling.md
tags: []
rejection_count: 1
notes: ""
---

# Scheduled Agent Workflow Empty State Support via Prompt

Modify `.github/workflows/foundry-scheduled-agent.yml` to support an agent-driven empty state, where the agent decides it has no work and creates an empty PR, which is then automatically closed.

## Technical Blueprint

1. **Prompt Hydration Update**:
   - In the "Invoke Jules Agent" step, modify the `jq` command that constructs the `prompt_json`.
   - Append explicit instructions to the prompt telling the agent that lack of actionable work is acceptable.
   - For example, append: `"If you determine there is no actionable work to be done during this run, simply state that in your PR and complete your session. An empty PR diff is acceptable and will be closed automatically."`

2. **Scope Limitation**:
   - For this task, ONLY update the prompt in `.github/workflows/foundry-scheduled-agent.yml`.
   - The auto-closing mechanism will be implemented in a separate task.

## Acceptance Criteria
- [x] The `foundry-scheduled-agent.yml` workflow prompt explicitly informs the agent how to handle lack of work.

## Verification Protocol
Self-verification designated to the `coder`. Verify by triggering the workflow manually for a persona with no work and ensuring the prompt is formatted correctly in the Actions logs. Document the results in the task journal.
