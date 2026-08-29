---
id: task-409-493-tpm-journal-aggregation-script-impl
type: TASK
title: Implement TPM Journal Aggregation Script
status: PENDING
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '5799943991093245774'
pr_number: null
parent: story-401-409-tpm-journal-aggregation
tags:
  - tpm
  - journals
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement TPM Journal Aggregation Script

## Description
Implement a script to aggregate timestamped journal files across persona subdirectories into a master file and archive the original files, and update the TPM persona instructions based on .github/agents/tpm.md.

## Acceptance Criteria
- [ ] Create `.github/scripts/aggregate-journals.ts` to aggregate timestamped `.md` files in `.foundry/journals/` and `.jules/` into `master.md` within their respective persona directories.
- [ ] Ensure the script moves the processed individual files into `.foundry/archive/journals/<persona>/` (or `.foundry/archive/jules/<persona>/`).
- [ ] Update `.github/agents/tpm.md` to instruct the TPM persona to execute `npx tsx .github/scripts/aggregate-journals.ts` during its hourly run.