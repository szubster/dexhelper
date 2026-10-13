---
id: epic-346-519-wip-artifact-promotion
type: EPIC
title: Artifact Promotion Workflow
status: COMPLETED
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-10-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-151-346-wip-draft-signaling
tags:
  - foundry
  - adr
  - wip
research_references: []
rejection_reason: ''
locks: []
---

## Description
This epic focuses on defining and automating procedural mechanisms for promoting WIP and draft artifacts to `STABLE` or `ACTIVE` states. This process involves stripping markdown warning banners, changing YAML frontmatter statuses, and removing code-level feature flags or namespacing boundaries once a feature is fully merged and released.

## Acceptance Criteria
- [x] Automate markdown banner removal on promotion
- [x] Update DRAFT frontmatter to STABLE during promotion
- [x] Remove feature flags/graduate code upon promotion
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification
- [x] story-519-520-automate-banner-removal
- [x] story-519-521-update-frontmatter-promotion
- [x] story-519-522-graduate-code-feature-flags
- [x] story-519-523-artifact-promotion-e2e
