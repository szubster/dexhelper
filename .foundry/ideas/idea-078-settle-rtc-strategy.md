---
id: idea-078-settle-rtc-strategy
type: IDEA
title: Settle RTC Strategy Once and For All
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '2060025323897284855'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - rtc
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Settle RTC Strategy Once and For All

## Context
RTC (Real-Time Clock) data has proven to be highly problematic, especially in Generation 3 where it is frequently emulator-dependent or entirely missing (e.g., from direct cartridge dumps). Previous attempts to extract RTC data have failed or been cancelled because assuming the presence of a valid, accurate RTC block in the save file leads to brittle features.

## Proposal
We need to settle the RTC strategy once and for all to establish a unified approach across the application.
- Spawn a `RESEARCH` node to investigate the viability, alternatives, and emulator dependencies of RTC data across generations (especially Gen 2 and Gen 3).
- Based on the research, author an `ADR` (Architecture Decision Record) defining exactly how the application should handle time-dependent events. This might mean always using the system's current time, building RTC-independent event suggestions, or prompting the user for manual overrides.
- No immediate feature implementation is expected under this idea unless the research explicitly dictates a necessary structural change. This is primarily a discovery and standardization effort.
- [ ] .foundry/research/research-078-172-rtc-strategy-investigation.md
- [ ] .foundry/docs/adrs/adr-078-025-rtc-strategy.md
