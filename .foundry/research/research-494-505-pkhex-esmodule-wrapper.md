---
id: research-494-505-pkhex-esmodule-wrapper
type: RESEARCH
title: Investigate PKHeX ES Module Wrapper
status: READY
owner_persona: researcher
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-473-494-gen3-egg-hatch-e2e-impl
tags:
  - e2e
  - pkhex
research_references: []
rejection_count: 0
notes: ''
---

# Research: PKHeX ES Module Wrapper

## Context
The `task-473-494-gen3-egg-hatch-e2e-impl` task needs a valid Gen 3 save file fixture with an Egg in the active party. The maintainer explicitly forbade manual hex editing to avoid enforcing false beliefs. The `pkhex` node library (v26.1.22) is intended to be used for programmatic save modification, but it currently throws `ERR_PACKAGE_PATH_NOT_EXPORTED` and `ERR_MODULE_NOT_FOUND` errors when used in an ES Module environment (`"type": "module"`).

## Objective
Investigate how to successfully import and execute the `pkhex` WASM library in the current ES Module environment to programmatically generate the `emerald_egg_fixture.sav` without manual hex editing. Document the required syntax, polyfills, or workarounds.
