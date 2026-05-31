---
id: idea-054-robust-session-completion
type: IDEA
title: Robust Handling of Session Completion in Heartbeat
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-18'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
notes: ''
rejection_reason: ''
---

# Idea: Robust Handling of Session Completion in Heartbeat

## Context
Currently, the `foundry-heartbeat.ts` script checks the status of Jules sessions via the Jules API. If the API reports a state of `COMPLETED`, but no GitHub pull request is found in the session outputs or via GitHub search, the heartbeat script treats this as a zombie or crashed session and transitions the corresponding task node to `FAILED` with the reason "Session terminated with state: COMPLETED".

This incorrectly punishes agents who successfully complete their execution but, for legitimate reasons (e.g. following the Empty PR policy), do not generate a file diff. Often, Jules will simply complete the run without a PR if no edits are made and `submit` wasn't explicitly invoked with a branch.

## Proposal
We need to make the orchestrator's heartbeat script more robust when handling `COMPLETED` sessions without a Pull Request.

1. **Verify Empty Run Success**: If a session is `COMPLETED` but no PR exists, the heartbeat should differentiate between a silent crash and a deliberate Empty PR action.
2. **Auto-Complete Empty Runs**: Since the task might have been marked as needing an Empty PR (where zero files were changed because the target was already valid), the orchestrator should gracefully allow these tasks to be marked `COMPLETED` instead of `FAILED`, provided they don't violate the acceptance criteria rule (ADR 007/009).

## Impact
- Prevents agents from getting caught in endless Resurrection Loops for tasks that have actually succeeded but required no code changes.
- Reduces manual TPM/CEO intervention for false-positive FAILED nodes.
- Makes the empty PR workflow smoother.

## Next Steps
- [x] Product Manager: Convert this idea to a PRD.

## Links
- PRD: [.foundry/prds/prd-054-025-robust-session-completion.md](.foundry/prds/prd-054-025-robust-session-completion.md)
