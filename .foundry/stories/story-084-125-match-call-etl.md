---
id: story-084-125-match-call-etl
type: STORY
title: 'Story: Gen 3 Match Call Static Data ETL'
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '4380526324425258964'
pr_number: null
parent: epic-048-084-gen3-match-call-static-data
tags:
  - feature
  - gen3
  - data-generation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Match Call Static Data ETL

## Overview
As part of building the static dataset for Match Call tracking, we need an ETL (Extract, Transform, Load) script to process and compile the data for the 69 Match Call trainers.

## Description
Extract the 69 Match Call trainers from game data sources, structure them with trainer Name, Location (Route/Cave), and their 5 possible team tiers, and implement EV (Effort Value) calculation logic for defeating each specific team at each tier.

## Acceptance Criteria
- [ ] Implement ETL script to process trainer match call data.
- [ ] Calculate and aggregate the total EV yield for defeating each team.
