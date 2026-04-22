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

Modify `.github/workflows/foundry-scheduled-agent.yml` to support a pre-check script (`.github/agents/${persona}-precheck.sh`).
If the precheck script exists and returns exit code `2`, the workflow should exit gracefully (`0`) without spawning Jules.

## Acceptance Criteria
- [ ] Workflow explicitly checks for the existence of `.github/agents/${persona}-precheck.sh`.
- [ ] If found, it executes the script before dispatching Jules.
- [ ] If the script exits with status `2`, the action exits with status `0` and does not spawn Jules.
- [ ] If the script exits with another non-zero status, it errors out correctly.
## Verification Protocol
As this is a relatively simple CI workflow conditional modification, the coder is designated to **self-verify**. The coder must document their verification results in their task journal before considering the task complete.
