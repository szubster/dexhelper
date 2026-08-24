---
id: task-443-477-adr-008-ui-compliance-linter-logic
type: TASK
title: Implement ADR 008 Linter Core Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-443-adr-008-ui-compliance-linter
tags:
  - foundry
  - linter
  - compliance
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement ADR 008 Linter Core Logic

## Objective
Implement the core AST parsing logic in `scripts/verify-adr-compliance.ts` to detect violations of ADR 008.

## Technical Requirements
- Create `scripts/verify-adr-compliance.ts`.
- The script should read all `.tsx` and `.ts` files containing UI components in `src/`.
- Parse the files to find Tailwind CSS class strings.
- Detect forbidden classes specifically forbidden by ADR 008 (e.g., `rounded-t`, `rounded-b`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`).
- Ensure `rounded-none`, `border-dashed`, and `font-mono` are used where appropriate (though for a linter, checking for forbidden classes is the priority).

## Acceptance Criteria
- [x] Implement AST parsing logic to extract class names from files.
- [x] Implement logic to detect forbidden classes according to ADR 008.
- [x] The script must exit with a non-zero status code if violations are found, and print the violations (file path, line number, offending class) to the console.
