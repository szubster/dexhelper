---
id: task-017-create-scheduled-agent-workflow
type: TASK
title: "Create Scheduled Agent Workflow"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: "718881526535556009"
parent: .foundry/stories/story-004-generic-scheduling-workflow.md
tags: []
rejection_count: 0
notes: ""
---

# Create Scheduled Agent Workflow

Implement `.github/workflows/foundry-scheduled-agent.yml`, a reusable workflow that provides a generic scheduling mechanism for Foundry agents.

## Technical Blueprint

1. **Workflow Triggers**:
   - `workflow_call`: To be called by other scheduling workflows. It should accept an input `persona` (string, required).
   - `workflow_dispatch`: For manual testing, accepting a `persona` input.

2. **Job Definition**:
   - Create a job (e.g., `execute_scheduled_agent`) running on `ubuntu-latest`.
   - Checkout the code and set up Node.js.

3. **Prompt Hydration & Execution**:
   - Construct a `prompt_json` payload similar to how `foundry-engine.yml` does.
   - Specifically read `.github/agents/${{ inputs.persona }}.md` for the context.
   - Dispatch to `https://jules.googleapis.com/v1alpha/sessions`.

## Acceptance Criteria
- [ ] Workflow correctly handles input `persona`.
- [ ] Workflow successfully hydrates prompt from `.github/agents/<persona>.md`.
- [ ] Workflow triggers Jules API correctly.
- [ ] Code strictly follows existing patterns in `.github/workflows/foundry-engine.yml`.

*Verification*: Automated verification might not be possible for this CI workflow. A human will verify manually and create a new task or provide a fix outside of the Foundry mechanism if needed.
