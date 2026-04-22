---
id: task-019-tpm-precheck-script
type: TASK
title: "TPM Precheck Script"
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

# TPM Precheck Script

Implement `.github/agents/tpm-precheck.sh` to determine if there is any actionable work for the TPM persona before the scheduled workflow spawns a Jules session.

## Technical Blueprint

1. **Pre-check Logic**:
   - The script should check for nodes that are in `status: "COMPLETED"` or `status: "BLOCKED"` by searching the frontmatter of all files in `.foundry/**/*.md` (excluding `docs/` and `journals/`).
   - It can use simple tools like `grep` to quickly determine if there are matching files. For example, check if any line matches `status: "COMPLETED"` or `status: COMPLETED` or `status: 'COMPLETED'` in `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/`.
   - Furthermore, it should check if there are stale journals in `.foundry/journals/`. For simplicity of this v1 check, if any file exists in `.foundry/journals/` that is not `.gitkeep`, it might be actionable. Alternatively, stick to just the status checks for `COMPLETED`/`BLOCKED` for now, as that's the primary TPM responsibility.

2. **Exit Strategy**:
   - If actionable work is found (e.g., at least one node is `COMPLETED`), exit with `0` (continue).
   - If NO actionable work is found, echo a descriptive message and exit with `2` (the standard code to skip execution gracefully).

3. **Make it Executable**:
   - The script must have `chmod +x` permissions so the workflow runner can execute it.

## Acceptance Criteria
- [ ] `.github/agents/tpm-precheck.sh` exists and is executable.
- [ ] Script successfully exits with `0` when there are `COMPLETED` nodes.
- [ ] Script successfully exits with `2` when there are no `COMPLETED` nodes.

## Verification Protocol
Self-verification designated to the `coder`. The coder must manually run the script locally with dummy data to verify the logic correctly identifies `COMPLETED` nodes and exits with the expected codes. Document the results in the task journal.
