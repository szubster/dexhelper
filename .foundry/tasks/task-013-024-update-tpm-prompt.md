---
id: task-013-024-update-tpm-prompt
type: TASK
title: "Update TPM Prompt for Archiving Logic"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on:
  - .foundry/stories/story-005-013-tpm-archiving-logic.md
jules_session_id: "940115287298606683"
parent: .foundry/stories/story-005-013-tpm-archiving-logic.md
tags: ["infrastructure"]
rejection_count: 0
notes: "Self-verification by coder is sufficient as this is a simple text prompt change."
---

# Update TPM Prompt for Archiving Logic

Update the `.github/agents/tpm.md` persona prompt to instruct the TPM agent on how to conservatively archive `COMPLETED` nodes.

## Context
As part of the scheduling improvements, we need to instruct the TPM agent to identify and archive at least one test `COMPLETED` node when present. The agent must be instructed to be conservative: even if marked `COMPLETED`, if it determines it might still be relevant or needed, it should retain it. It's better to leave more nodes unarchived than to aggressively remove nodes that might still have value.

## Acceptance Criteria
- [x] Update `.github/agents/tpm.md` to instruct the TPM to archive at least one `COMPLETED` test node.
- [x] Instruct the TPM to be conservative and prioritize retention over aggressive removal of nodes that might still be needed.

## Technical Contract
- Modify `.github/agents/tpm.md` using the replace tool.
- This is a prompt change for an AI agent, so specific script logic is not needed, only plain English instruction in the agent's markdown persona file.
- **Intelligent Verification Protocol:** This is a low-risk modification to a prompt. No separate QA task is required. The `coder` should self-verify the changes to the markdown file.
