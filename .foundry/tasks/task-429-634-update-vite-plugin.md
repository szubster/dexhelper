---
id: task-429-634-update-vite-plugin
type: TASK
title: Update Vite Plugin for Gen-Specific Bundles
status: PENDING
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-29'
depends_on:
  - task-429-633-split-data-generation
jules_session_id: null
pr_number: null
parent: story-400-429-gen-specific-extensions
tags:
  - performance
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Update Vite Plugin for Gen-Specific Bundles

## Context
The data generation scripts have been split to output generation-specific JSONL files. Now the Vite plugin needs to consume them and produce the `msgpack` bundles.

## Description
Modify `vite-plugins/pokedata-plugin.ts` to build and serve the generation-specific bundles (`pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, `pokedata-gen3.msgpack`) alongside the core bundle. The `generateData()` function must read the split JSONL files and create separate hashes/buffers via `msgpackr` for each bundle. Ensure each file is correctly emitted inside `generateBundle()` and URLs are routed properly in the `configureServer` middleware.

## Acceptance Criteria
- [ ] Update `vite-plugins/pokedata-plugin.ts` to generate `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, and `pokedata-gen3.msgpack`.
- [ ] Ensure the plugin properly handles hashes and routing for the new bundles in development and production builds.
