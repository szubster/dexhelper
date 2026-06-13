---
id: research-078-172-rtc-strategy-investigation
type: RESEARCH
title: RTC Strategy and Viability Investigation
status: PENDING
owner_persona: researcher
created_at: "2026-06-13"
updated_at: "2026-06-13"
depends_on: []
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

# Research: RTC Strategy and Viability Investigation

## Objective
Investigate the viability, alternatives, and emulator dependencies of Real-Time Clock (RTC) data across Pokémon generations, specifically focusing on Generation 2 and Generation 3.

## Context
RTC data is known to be problematic, particularly in Generation 3, where emulator dependencies or direct cartridge dumps can result in missing or inaccurate RTC block data. We need to formulate a robust strategy for handling time-dependent events.

## Tasks
- [ ] Determine how different emulators handle Gen 2 and Gen 3 RTC data.
- [ ] Investigate the structure of RTC blocks in `.sav` files across generations.
- [ ] Identify the failure modes when RTC data is absent or corrupted.
- [ ] Propose alternatives for handling time-dependent features if RTC extraction is deemed unreliable.
- [ ] Document findings to support an Architecture Decision Record (ADR) on the final RTC strategy.
