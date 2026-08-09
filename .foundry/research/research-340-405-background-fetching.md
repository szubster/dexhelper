---
id: research-340-405-background-fetching
type: RESEARCH
title: Investigate background fetching and preloading for msgpack files
status: READY
owner_persona: researcher
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
parent: prd-136-340-split-bundles-and-data
tags:
  - performance
  - preloading
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Background Fetching and Preloading

## Context
As part of PRD 136-340 to split bundles and data by game generation, we also want to explore ways to pre-fetch or background fetch the generation-specific msgpack files and assets. This ensures that while initial load is fast, subsequent data is available seamlessly without blocking the main thread or causing noticeable delays when a user navigates to a new generation.

## Objectives
- Investigate the use of `defer` in script tags.
- Explore resource hints (like `<link rel="prefetch">` or `<link rel="preload">`) to hint the browser about msgpack files.
- Document state-of-the-art patterns for background fetching large static data payloads in modern web applications.
- Produce a recommendation on the best approach to integrate into the DexHelper architecture.

## Acceptance Criteria
- [ ] Document findings and recommendations in this node.
