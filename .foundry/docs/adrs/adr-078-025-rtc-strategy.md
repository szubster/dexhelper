---
id: adr-078-025-rtc-strategy
type: ADR
title: RTC Strategy Architecture Decision
status: PENDING
owner_persona: architect
created_at: "2026-06-13"
updated_at: "2026-06-13"
depends_on:
  - research-078-172-rtc-strategy-investigation
jules_session_id: null
pr_number: null
parent: idea-078-settle-rtc-strategy
tags:
  - rtc
  - gen3
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# ADR 025: RTC Strategy Architecture Decision

## Context
RTC (Real-Time Clock) data is highly problematic in Generation 3 save files, often being emulator-dependent or completely missing from cartridge dumps. We need to formalize a unified approach across the application for handling time-dependent events to prevent brittle features that rely on accurate RTC blocks.

## Decision
Based on the findings from `research-078-172-rtc-strategy-investigation`, we will adopt an **RTC-Independent Fallback Strategy** across the entire application for all generations.

Because RTC data formatting is highly fragmented depending on the emulator (e.g., VBA-M appending bytes vs. mGBA using separate `.rtc` files) and is entirely absent in physical cartridge dumps, attempting to decode the game's internal RTC state directly from `.sav` files is unreliable.

Instead, the application will use a hybrid approach:
1. **System Time Fallback**: By default, time-dependent events (such as Gen 2 Day/Night cycles or Gen 3 time-based encounters/events) will use the host device's current system time.
2. **Manual UI Overrides**: We will implement manual toggles in the application UI that allow users to override the time state explicitly. For example, a user playing a Gen 2 game during the day in the real world can toggle a "Night" mode in the UI to see nocturnal encounter suggestions.

## Consequences
- **Positive:** Our features will no longer be brittle or emulator-dependent. The application will work consistently whether the user provides a VBA-M save, an mGBA save, or a clean hardware cartridge dump.
- **Positive:** Improved user experience via manual time-of-day overrides, allowing users to plan ahead for encounters without waiting for real-world time to pass.
- **Parsing Constraints:** The save parsing engine must be updated to ensure it gracefully handles `.sav` files that are larger than the standard sizes (e.g., ignoring the trailing 44/48 bytes appended by VBA-M) without throwing validation or size mismatch errors.

## Acceptance Criteria
- [x] Based on research findings, detail the final architecture decision for handling RTC across generations.
- [x] Describe the consequences of this decision on UI components and save parsing logic.
