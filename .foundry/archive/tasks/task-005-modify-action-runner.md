---
id: task-005-modify-action-runner
type: TASK
title: "Modify Action Runner"
status: COMPLETED
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/archive/stories/story-002-personas.md
jules_session_id: null
pr_number: null
parent: .foundry/archive/stories/story-002-personas.md
---

# Modify Action Runner

We need to modify the GitHub action runner to inject the agent configuration depending on the persona.

## Acceptance Criteria
- [x] Update `.github/workflows/foundry-engine.yml`'s "Invoke Jules Agent" step.
- [x] It should dynamically read the `.github/agents/${owner_persona}.md` file according to the node's `owner_persona`.
- [x] If the file exists, inject its context into the JSON prompt sent to Jules. If not, fallback to a default prompt.