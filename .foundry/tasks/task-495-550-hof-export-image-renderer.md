---
id: task-495-550-hof-export-image-renderer
type: TASK
title: Hall of Fame Export Image Renderer Logic
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-495-549-hof-export-font-utility
jules_session_id: null
pr_number: null
parent: story-071-495-hof-certificate-export-logic
tags:
  - task
  - hall-of-fame
  - export
  - html-to-image
research_references:
  - .foundry/archive/docs/adrs/adr-044-022-hof-certificate-generation.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Hall of Fame Export Image Renderer Logic

## Overview
Implement the core rendering logic to convert the hidden Hall of Fame Certificate React component into a high-resolution Canvas/SVG using the `html-to-image` library. Ensure it integrates with the font loading utility and outputs the correct image blob/data URL.

## Context
As specified in ADR 022, we are using the `html-to-image` library for client-side rendering of certificates to avoid server-side costs.

## Acceptance Criteria
- [ ] Add `html-to-image` as a dependency if it's not already installed.
- [ ] Implement the rendering function to convert the component to an image using `html-to-image`.
- [ ] Incorporate the font loading utility (from task-495-549) to ensure custom fonts are applied correctly before rendering.
- [ ] Write unit tests for the image renderer logic.