---
id: adr-044-022-hof-certificate-generation
type: ADR
title: Hall of Fame Certificate Generation
status: ACTIVE
owner_persona: architect
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on:
  - adr-044-021-hof-data-parsing-architecture
jules_session_id: '17850356702365656365'
pr_number: null
parent: prd-070-044-hall-of-fame-exporter
tags:
  - architecture
  - hall-of-fame
  - rendering
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 022: Hall of Fame Certificate Generation

## Context
We need a way to generate visually appealing "Hall of Fame Certificates" from the parsed data for social sharing.

## Decision
We will use an HTML5 Canvas or SVG approach to render high-resolution certificates on the client side, ensuring privacy and avoiding server-side image generation costs.

Specifically, we will use the `html-to-image` library against a hidden React component.
Constraints include:
- Execution must be entirely local (client-side only).
- The solution must explicitly handle custom font loading to ensure consistent rendering.

## Acceptance Criteria
- [x] Define the rendering technology and constraints.
