---
id: task-409-493-tpm-journal-aggregation-script-impl
type: TASK
title: Implement TPM Journal Aggregation Script
status: ACTIVE
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: '9619700995765181701'
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
- [x] Create `.github/scripts/aggregate-journals.ts` to aggregate timestamped `.md` files in `.foundry/journals/` and `.jules/` into `master.md` within their respective persona directories.
- [x] Ensure the script moves the processed individual files into `.foundry/archive/journals/<persona>/` (or `.foundry/archive/jules/<persona>/`).
- [x] Update `.github/agents/tpm.md` to instruct the TPM persona to execute `npx tsx .github/scripts/aggregate-journals.ts` during its hourly run.
