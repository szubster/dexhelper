---
id: research-078-172-rtc-strategy-investigation
type: RESEARCH
title: RTC Strategy and Viability Investigation
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '14011111358112477414'
pr_number: null
parent: idea-078-settle-rtc-strategy
tags:
  - rtc
  - gen3
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: RTC Strategy and Viability Investigation

## Objective
Investigate the viability, alternatives, and emulator dependencies of Real-Time Clock (RTC) data across Pokémon generations, specifically focusing on Generation 2 and Generation 3.

## Context
RTC data is known to be problematic, particularly in Generation 3, where emulator dependencies or direct cartridge dumps can result in missing or inaccurate RTC block data. We need to formulate a robust strategy for handling time-dependent events.

## Findings

### 1. Emulator Handling of Gen 2 and Gen 3 RTC Data
Emulators implement RTC features differently, leading to inconsistent `.sav` file formats:
- **VBA-M**: Appends RTC data (typically 44 or 48 bytes) directly to the end of the standard save file. This makes the file size larger than standard (e.g., 128KB + 44 bytes).
- **mGBA**: Creates a completely separate `.rtc` file next to the `.sav` file, keeping the `.sav` file at exactly the expected cartridge size.
- **Physical Cartridge Dumps**: When dumping physical cartridges using standard readers, RTC data is usually omitted entirely, as it's tracked by a separate component on the cartridge that standard dumpers don't extract.

### 2. Structure of RTC Blocks
- **Gen 2 (GSC)**: The standard save file is 32 KB. For cartridges with MBC3 chips containing RTC, the RTC state is stored separately. Emulators handle this discrepancy via appending to the file or keeping separate files.
- **Gen 3 (RSE)**: The standard save file is exactly 128 KB (Flash RAM). Emulators that append data (like VBA-M) will produce a file of size `131,116` bytes (131,072 + 44) or similar.

### 3. Failure Modes
- **Parsing Crashes**: Strict parsing logic that expects exactly 32 KB or 128 KB save files may throw errors or crash when presented with an emulator-appended `.sav` file.
- **Missing Data**: Attempting to extract RTC data will fail completely on clean dumps or mGBA `.sav` files, as the data physically does not exist inside the `.sav` file.
- **Data Corruption**: Relying on emulator-appended data offsets may lead to corrupt state parsing if different emulator versions use different appending formats (e.g., 44 vs 48 bytes in VBA).

### 4. Proposed Alternatives
Because assuming the presence of a valid, accurate RTC block in the `.sav` file leads to brittle features:
- **System Time Fallback**: By default, use the host device's current system time (browser/OS time) to evaluate time-dependent events.
- **Manual UI Overrides**: Provide explicit manual toggles within the application UI, allowing users to override the time (e.g., forcing Day/Night in Gen 2 or a specific time-of-day in Gen 3) for the purpose of checking encounter tables and events.

### 5. Conclusion
Given the extreme fragmentation of RTC data formatting, we must adopt an **RTC-Independent Strategy**. The parsing engine must gracefully accept `.sav` files with appended emulator data without failing, but the application must rely on host system time or manual user input for time-dependent logic rather than attempting to decode the save's internal RTC state.

## Tasks
- [x] Determine how different emulators handle Gen 2 and Gen 3 RTC data.
- [x] Investigate the structure of RTC blocks in `.sav` files across generations.
- [x] Identify the failure modes when RTC data is absent or corrupted.
- [x] Propose alternatives for handling time-dependent features if RTC extraction is deemed unreliable.
- [x] Document findings to support an Architecture Decision Record (ADR) on the final RTC strategy.
