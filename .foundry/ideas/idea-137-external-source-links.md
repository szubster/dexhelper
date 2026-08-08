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
Currently, when browsing Pokémon, items, or locations in DexHelper, users only see the extracted save file data and basic info. They lack direct paths to deeper encyclopedia details or competitive trivia found on popular external resources like Bulbapedia, Serebii, or Smogon. Additionally, there is no unified pattern or reusable mechanism for integrating external links across different views.

## Proposed Solution
Provide external links on Pokémon, item, location, and other game entity pages, utilizing a generic and highly reusable linking utility or UI component:
1. Design and implement a generic, reusable linking component or utility function that accepts an entity name, type, and source options to dynamically format external URLs (e.g., Bulbapedia, Serebii, Smogon).
2. On a Pokémon's detail view, add clean outbound links to Bulbapedia, Serebii, and Smogon.
3. On an Item's detail view, add outbound links to Bulbapedia/Serebii.
4. On a Location's detail view, add outbound links to Bulbapedia/Serebii.
5. Ensure the reusable component can be easily plugged into any existing or future features (such as moves, abilities, types, and trainers) whenever external linking is possible.

These links should dynamically format using the resource's standard URL pattern and the entity's name (e.g. `https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)`).

## Value Proposition
This bridge connects internal state tracking with rich external wikis, significantly improving the user experience during general research or competitive planning. By standardizing link generation through a generic component, developers can quickly add external references to any present or future UI modules without duplicating formatting logic.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD to specify the exact URL schemas, layout designs, and formatting functions for dynamic external link generation.
- [ ] Product Manager: Define the architecture for a generic, reusable external link component/utility that can be seamlessly integrated across all existing and future features of the application.
