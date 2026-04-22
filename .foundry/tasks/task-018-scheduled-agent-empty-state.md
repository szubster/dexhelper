---
id: task-018-scheduled-agent-empty-state
type: TASK
title: "Scheduled Agent Workflow Empty State Support"
status: PENDING
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/stories/story-005-empty-state-handling.md
jules_session_id: null
parent: .foundry/stories/story-005-empty-state-handling.md
tags: []
rejection_count: 0
notes: ""
---

# Scheduled Agent Workflow Empty State Support

Modify `.github/workflows/foundry-scheduled-agent.yml` to support skipping Jules agent execution when there is no actionable work. This addresses the empty state requirement.

## Technical Blueprint

1. **Pre-check Script Execution**:
   - Before invoking Jules API in the "Invoke Jules Agent" step, check if an executable script named `.github/agents/${persona}-precheck.sh` exists.
   - If it exists, execute it.

2. **Handle Pre-check Exit Codes**:
   - If the pre-check script exits with status `2` (the standard exit code we will use for "no actionable work"), log a message (e.g., "No actionable work for ${persona}, exiting gracefully") and exit the step successfully (`exit 0`). This will skip the rest of the job and finish without error.
   - If the pre-check script exits with `0`, proceed to spawn the Jules session normally.
   - If the pre-check script exits with any other non-zero code, treat it as an error (`exit 1`).

## Acceptance Criteria
- [ ] Workflow correctly looks for and executes `.github/agents/${persona}-precheck.sh` if it exists.
- [ ] Workflow gracefully exits with `0` without spawning Jules if the script returns `2`.
- [ ] Workflow continues normal execution if the script returns `0`.
- [ ] Workflow fails and exits with `1` if the script returns any other non-zero exit code.

## Verification Protocol
Self-verification designated to the `coder`. The coder must verify the changes by creating a dummy precheck script and manually triggering the workflow to ensure the exit states match the specifications. Document the results in the task journal.
