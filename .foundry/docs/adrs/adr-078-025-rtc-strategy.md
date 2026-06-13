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
*(This decision will be finalized after the completion of the `research-078-172-rtc-strategy-investigation` node. The researcher's findings will dictate whether we use system time, prompt users for overrides, or implement a hybrid approach.)*

## Acceptance Criteria
- [ ] Based on research findings, detail the final architecture decision for handling RTC across generations.
- [ ] Describe the consequences of this decision on UI components and save parsing logic.
