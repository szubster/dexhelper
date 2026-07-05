---
id: task-247-274-gen2-roamer-radar-impl
type: TASK
title: Implement Gen 2 Roamer Radar Widget
status: READY
owner_persona: coder
created_at: '2026-07-05'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-069-247-gen2-roamer-radar-widget
tags: [ui, gen2, save-engine]
rejection_count: 0
rejection_reason: ''
---

# Implement Gen 2 Roamer Radar Widget

## Objective
Implement a UI component that displays a list of active Gen 2 roamers (Raikou, Entei, Suicune).

## Context & Contracts
* Data extraction for Gen 2 roamers is partially done by `parseRoamingLegendaries` in `src/engine/saveParser/parsers/gen2.ts`, storing them in `saveData.roamingLegendaries`. You MUST first modify this parser to also extract the `hp` byte (which is at offset `+4` in the `roam_struct`) and include it in the returned object so that the UI can determine if the roamer is defeated.
* **CRITICAL REQUIREMENT:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level (e.g., `const ROAMER_OFFSET_HP = 4;`), forbidding inline magic numbers.
* Target Component: Create a new component `src/components/dashboard/Gen2RoamerRadar.tsx` (or similar) using the tactical aesthetic (TacticalCard, TacticalBadge, etc).
* Gen 2 map mapping: Use `saveData.gameVersion` to lookup locations. Map Group (`mapGroup`) and Map Number (`mapId`) must be translated to human-readable names using `src/engine/data/gen2/mapLocations.json` (as done in `src/engine/saveParser/parsers/gen2.ts` via `gen2MapLocations[groupStr]?.[mapStr]`).
* If `mapGroup === 255` (0xFF), the roamer is inactive.
* If a roamer's HP is 0 (or speciesId is 0), it is defeated or caught.
* Integrate the new component into the main dashboard view, potentially replacing or co-existing with Gen 3 roamer widgets based on the active save file version.
* **Transient Failure Rule:** If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
* **Permanent Failure Rule:** If you must abort or permanently fail this task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
* **Empty PR Rule:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Modify `parseRoamingLegendaries` in `src/engine/saveParser/parsers/gen2.ts` to extract the `hp` byte. Ensure the `hp` offset is defined as a module-level constant (no magic numbers).
- [ ] Implement UI component to list Raikou, Entei, and Suicune status.
- [ ] Show human-readable route for active roamers using `gen2MapLocations`.
- [ ] Display visual tags indicating "Active", "Caught", "Defeated", or "Inactive" using `TacticalBadge`.
- [ ] Add rendering integration into the dashboard if appropriate.
