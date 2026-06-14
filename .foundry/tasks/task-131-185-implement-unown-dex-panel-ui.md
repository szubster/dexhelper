---
id: task-131-185-implement-unown-dex-panel-ui
type: TASK
title: Implement Unown Dex Panel UI
status: PENDING
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-059-131-unown-dex-panel-ui
tags:
  - feature
  - gen2
  - tracking
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Unown Dex Panel UI

## Objective
Build and integrate a UI component to display the 26 forms (A-Z) of Unown. This component should visually represent the Unown checklist.

## Technical Context & Constraints
- **Styling Requirements:** You MUST strictly observe the "tactical hardware/snooping" aesthetic defined in ADR 008 and ADR 024.
  - Use sharp edges (`rounded-none`).
  - Use dashed borders (`border-dashed`).
  - Use monospace fonts (`font-mono`).
  - Utilize the consolidated `tactical-*` utility classes from Tailwind v4 (e.g., `tactical-panel`, `tactical-button`) as per ADR 024 rather than repeating inline styles.
- **Integration:** Ensure the component is correctly integrated into the application's view hierarchy. Do not just create an isolated component; it must be connected to the main UI where users can view it.

## Verification Protocol
Since this is a straightforward UI implementation without highly complex risk, the `coder` is designated to self-verify this work.
- Follow the **Frontend Verification Workflow**: After implementing the component, start the Vite development server locally, run a temporary Python Playwright script to verify the component renders, and take a screenshot/video.
- Document the successful self-verification in your persona journal (`.foundry/journals/coder.md`).

## System Policy Reminders
- **Failures:**
  - If you encounter a *transient* failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` and provide a `rejection_reason`.
  - If you encounter a *permanent* failure (impossible to complete), you MUST update the YAML frontmatter to `status: CANCELLED` and provide a `rejection_reason`.
- **Empty PR Policy:** If you submit an Empty PR (e.g. if the work is already complete), you MUST ensure all Acceptance Criteria checkboxes are checked before submitting. DO NOT submit an Empty PR with unchecked boxes.
- **Scratchpads:** Delete any temporary scripts (e.g., Playwright scripts) before finalizing your PR.
- **Node Modification Rule:** DO NOT modify this YAML frontmatter upon successful completion. Only update the markdown body (e.g., check off acceptance criteria). Modifying YAML is ONLY allowed for FAILED or CANCELLED status updates.

## Acceptance Criteria
- [ ] Create the Unown Dex Panel UI component using `tactical-*` classes.
- [ ] Integrate the component into the main application view hierarchy.
- [ ] Self-verify the component rendering and document it in the coder journal.
