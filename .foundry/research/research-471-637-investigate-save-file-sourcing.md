---
id: research-471-637-investigate-save-file-sourcing
type: RESEARCH
title: Investigate valid save file sourcing
status: READY
owner_persona: researcher
created_at: '2026-09-30'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-428-471-verify-and-integrate-saves
tags:
  - testing
  - fixtures
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# RESEARCH: Investigate valid save file sourcing

## Context
Previous automated attempts to source public save files have resulted in invalid structures. We need to determine reliable sources or manual methodologies for sourcing valid Gen 1, Gen 2, and Gen 3 game save files.

## Objectives
1. Investigate reliable sources for obtaining valid Pokémon game save files (Gen 1-3) for testing.
2. Determine if automated scraping is viable, or if a manual/tool-assisted approach is required.

## Acceptance Criteria
- [x] Document the findings regarding reliable sources for valid save files.
- [x] Propose a methodology for obtaining valid save files.

## Findings: Reliable Sources for Save Files
1. **Project Pokémon (projectpokemon.org)**: The most reputable community repository for Pokémon save files. They host user-contributed saves, though formats can vary and some may be edited.
2. **GameFAQs**: Hosts many vintage save files, but they are frequently in proprietary legacy formats (e.g., .sps, .cbs, .gme) requiring conversion to raw .sav.
3. **Manual Generation via Accurate Emulators**: Using emulators like BGB (Gen 1/2) and mGBA (Gen 3) to generate saves. These emulators accurately replicate cartridge saving hardware, natively producing valid raw .sav binaries (32KB SRAM for Gen 1/2, 64KB/128KB Flash for Gen 3).

**Automated Scraping Viability:**
Automated scraping is **not viable** and highly discouraged. Public repositories often employ anti-scraping protections (like Cloudflare), and user uploads are frequently archived (.zip) or in proprietary formats that require manual extraction and conversion. Furthermore, automatically scraped files are not guaranteed to have valid checksums or correct memory structures without manual validation.

## Proposed Methodology
A manual, tool-assisted approach is required for reliable test fixtures:
1. **Emulator Generation (Primary Approach)**: Generate pristine save files manually using BGB (Gen 1/2) and mGBA (Gen 3). Create saves at specific milestones (e.g., New Game, First Capture, Hall of Fame) to ensure deterministic, structurally perfect raw `.sav` files.
2. **PKHeX Validation**: For any sourced or generated save file, validate its structural integrity and checksums using PKHeX before adding it to the repository as a test fixture.
3. **Curated Fixture Sourcing**: If specific edge-case saves are needed (e.g., specific event distributions), manually download them from Project Pokémon, extract the raw `.sav`, validate with PKHeX, and commit them manually.
