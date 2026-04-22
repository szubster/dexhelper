---
id: task-018-graceful-empty-state
type: TASK
title: "Implement Graceful Empty State Handling"
status: "PENDING"
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-005-empty-state-handling.md
tags: []
rejection_count: 0
notes: ""
---

# Implement Graceful Empty State Handling

Instead of relying on static pre-check scripts, the agent itself must decide if there is actionable work. To handle lack of work gracefully without polluting the repository with empty PRs, implement the following:

## Acceptance Criteria
- [ ] Modify the prompt payload in `.github/workflows/foundry-scheduled-agent.yml` to explicitly instruct the agent that it is acceptable to find no work, and in such cases, it should output an empty result.
- [ ] Implement a mechanism (e.g., a new GitHub action or a modification to an existing one) that automatically detects PRs opened by Jules with an empty diff (0 changed files) and closes them without merging.
- [ ] (Optional) Retain a static check specifically for the `tpm` persona if applicable, but ensure all other scheduled agents rely on prompt-driven empty state handling.

## Verification Protocol
As this involves CI workflow modifications, the coder is designated to **self-verify**. The coder must document their verification results in their task journal before considering the task complete.