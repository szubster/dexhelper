---
id: task-126-489-match-call-msgpack-export
type: TASK
title: Match Call MsgPack Export via Vite Plugin
status: READY
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-084-126-match-call-msgpack
tags:
  - feature
  - gen3
  - data-generation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Match Call MsgPack Export via Vite Plugin

## Description
Modify the `vite-plugins/pokedata-plugin.ts` to include the `gen3_match_call.jsonl` data inside the `msgpackr` bundling process, exporting it as part of the unified MsgPack binary format.

## Acceptance Criteria
- [ ] Parse `gen3_match_call.jsonl` in the `pokedata-plugin.ts`.
- [ ] Add the parsed data to the unified PokeData export object to be bundled with msgpack.
