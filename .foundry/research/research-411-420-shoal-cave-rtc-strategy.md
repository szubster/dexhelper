---
id: research-411-420-shoal-cave-rtc-strategy
type: RESEARCH
title: Investigate RTC Strategy for Shoal Cave (ADR 025 Compliance)
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-13'
updated_at: '2026-08-13'
depends_on: []
jules_session_id: '1809259624386391484'
pr_number: null
parent: epic-340-411-shoal-cave-data-extraction
tags:
  - research
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: RTC Strategy for Shoal Cave

## Objective
Investigate how the "Data Extraction Layer (RTC & Shoal Items)" epic (`epic-340-411`) should handle RTC extraction given the constraints set out in ADR 025.

## Findings
ADR 025 explicitly states that we must adopt an **RTC-Independent Fallback Strategy**. Because RTC data formatting is highly fragmented depending on the emulator and is entirely absent in physical cartridge dumps, attempting to decode the game's internal RTC state directly from `.sav` files is unreliable.

Instead, the application already uses a hybrid approach:
1. System Time Fallback
2. Manual UI Overrides (implemented via `Gen3RTCContext`)

Therefore, the requirement in `epic-340-411` to "Locate and extract the RTC value from the Gen 3 save structure" directly contradicts our architectural decision in ADR 025. We should not attempt to extract the internal RTC from the save file. We should rely on the existing `Gen3RTCContext` to provide the time.

However, the Epic also requires parsing the Items pocket for Shoal Shells and Shoal Salts. This part is valid and still needs to be done.

## Next Steps
We must "late-bind" this epic because it contains a requirement that contradicts our architecture.
1. The epic's RTC extraction requirement should be ignored/cancelled based on ADR 025.
2. We must draft a STORY to implement the item pocket parsing for Shoal Shells and Shoal Salts.
3. We must draft an E2E STORY for the Shoal Cave items as required by the Epic's acceptance criteria.
