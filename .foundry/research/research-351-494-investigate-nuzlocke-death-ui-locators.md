---
id: research-351-494-investigate-nuzlocke-death-ui-locators
type: RESEARCH
title: Investigate Nuzlocke Death UI Locators
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-22'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: '4035147898849928532'
pr_number: null
parent: story-131-351-nuzlocke-death-tracking-e2e
tags:
  - e2e
  - nuzlocke
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Investigate Nuzlocke Death UI Locators

## Objective
Investigate how to properly write Playwright locators to target the storage grid and verify the isDead state for party Pokemon with 0 HP and Pokemon in the Graveyard box.

## Acceptance Criteria
- [x] Determine the correct CSS selectors or Playwright locators for the storage grid.
- [x] Provide code examples of asserting the isDead visual state.
- [x] Document the findings in the research markdown body.

## Research Findings

### Locating the Storage Grid Cards
The storage grid renders its list using a `TacticalCard` component which translates to an interactive HTML `<button>`. Because there can be many Pokémon rendered across Party and multiple Boxes, it is best to use Playwright's `getByRole` with a regular expression matching the `aria-label` applied to each card.

The `aria-label` format is: `View details for {PokemonName} in {Location}`

**Example locators:**
```typescript
// To find all Pokémon cards in Box 6:
const box6Cards = page.getByRole('button', { name: /^View details for .* in Box 6$/i });

// To find a specific card in the first position:
const firstBox6Card = box6Cards.first();
```

### Asserting the `isDead` Visual State
When a Pokémon is marked as dead (either 0 HP in Party, or present in the selected Graveyard Box), the UI applies specific visual indicators:
1. The inner `<PokemonSprite>` (which renders an `<img>` tag) is given the `opacity-50` and `grayscale` Tailwind classes.
2. An overlay `<Skull>` SVG (from `lucide-react`) is rendered on top of the sprite.

**Code Example:**
```typescript
const firstBox6Card = page.getByRole('button', { name: /^View details for .* in Box 6$/i }).first();

// 1. Verify the Sprite Styling
const image = firstBox6Card.locator('img').first();
await expect(image).toHaveClass(/opacity-50/);
await expect(image).toHaveClass(/grayscale/);

// 2. Verify the Skull Overlay is Visible
const skullIcon = firstBox6Card.locator('svg.lucide-skull');
await expect(skullIcon).toBeVisible();
```
