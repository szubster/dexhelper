---
id: idea-137-external-source-links
type: IDEA
title: Add Links to External Sources
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - general
  - documentation
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Add Links to External Sources

## Problem
Currently, when browsing Pokémon, items, or locations in DexHelper, users only see the extracted save file data and basic info. They lack direct paths to deeper encyclopedia details or competitive trivia found on popular external resources like Bulbapedia, Serebii, or Smogon.

## Proposed Solution
Provide external links on Pokémon, item, and location pages:
1. On a Pokémon's detail view, add clean outbound links to Bulbapedia, Serebii, and Smogon.
2. On an Item's detail view, add outbound links to Bulbapedia/Serebii.
3. On a Location's detail view, add outbound links to Bulbapedia/Serebii.

These links should dynamically format using the resource's standard URL pattern and the entity's name (e.g. `https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)`).

## Value Proposition
This bridge connects internal state tracking with rich external wikis, significantly improving the user experience during general research or competitive planning without cluttering DexHelper's interface with redundant static text.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD to specify the exact URL schemas, layout designs, and formatting functions for dynamic external link generation.
