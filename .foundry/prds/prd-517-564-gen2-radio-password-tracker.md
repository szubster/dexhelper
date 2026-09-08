---
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
rejection_reason: ''
id: prd-517-564-gen2-radio-password-tracker
type: PRD
title: Gen 2 Buena's Password Tracker
status: READY
owner_persona: epic_planner
parent: idea-517-gen2-radio-password-tracker
---

# PRD: Gen 2 Buena's Password Tracker

## Objective
Define the requirements for tracking Buena's Password daily event in Gen 2, including the Blue Card point total and daily completion state.

## Requirements
1. **Blue Card Points**: Parse the save file to extract the player's current Blue Card point total.
2. **Completion State Validation**: Use event flags to determine if the player has successfully submitted the password today. Note that `EVENT_BUENA_OFFERED_HER_PHONE_NUMBER` is tracked in `eventFlags`, but a specific daily flag or offset for "password given today" needs to be researched.
3. **Alerts**: Determine when to show alerts (6 PM to Midnight real-world time).

## Acceptance Criteria
- [ ] research-564-565-buena-password-offsets
