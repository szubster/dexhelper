## 2024-04-13 - Added aria-label to icon-only buttons
**Learning:** For accessibility, ensure all icon-only interactive elements (like buttons) include an `aria-label` attribute, as relying solely on the `title` attribute is insufficient for screen readers. In Dexhelper, several key interactive elements like the Assistant Panel debug toggle, Pokedex Cards, and Storage Grid cards lacked proper screen reader announcements despite having visual cues or titles.
**Action:** Always add `aria-label` attributes to icon-only buttons and interactive card elements that act as links or triggers, ensuring the label clearly describes the action or destination (e.g., `aria-label={"View details for " + pokemon.name}`).

## 2026-04-16 - Consistent Keyboard Navigation Focus Styles
**Learning:** Some custom UI elements, like mapped list buttons or dynamically rendered list items (e.g., in LocationSuggestions), can easily omit standard focus indicators when custom styling is heavily applied, making keyboard navigation difficult or invisible.
**Action:** Always ensure dynamic, mapped, or custom buttons explicitly include focus visible utilities (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`) to match the application's global focus style.
