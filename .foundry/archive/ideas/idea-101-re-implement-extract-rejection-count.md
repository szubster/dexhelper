---
id: idea-101-re-implement-extract-rejection-count
type: IDEA
title: Re-implement Rejection Count Extraction
status: COMPLETED
owner_persona: product_manager
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - ui
  - dashboard
research_references: []
notes: ''
rejection_reason: ''
---

# Re-implement Rejection Count Extraction

The original task (`task-085-142-impl-extract-rejection-count`) designed to fulfill the requirements of ADR 017 (Permanent Failure Dashboard) was permanently failed and reached its Max Rejection Threshold. The implementation failed because the `rejection_count` state was kept tightly coupled in `DagDashboard.tsx` instead of being lifted into the shared React Context (`DagContext.tsx`). This resulted in the functionality being lost.

This idea is to document the process improvement to ensure the requirement is fulfilled.
