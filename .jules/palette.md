## 2024-04-11 - Focus Visible Styles for Retro Buttons
**Learning:** Some custom UI elements, like mapped list buttons or dynamically rendered list items (e.g., in LocationSuggestions), can easily omit standard focus indicators when custom styling is heavily applied, making keyboard navigation difficult or invisible.
**Action:** Always ensure dynamic, mapped, or custom interactive elements explicitly include focus visible utilities (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`) to match the application's global focus style.

## 2024-04-12 - Custom Segmented Control ARIA Roles
**Learning:** When creating custom segmented controls with mutually exclusive options, using `role="switch"` is incorrect as switches imply an on/off state. `role="group"` is also too generic. A segmented control is conceptually a set of radio buttons.
**Action:** Use `role="radiogroup"` for the container and `role="radio"` for the individual buttons, along with `aria-checked={boolean}` and proper `aria-label`s on the container, to ensure screen readers correctly interpret the mutually exclusive selection pattern.

## 2024-04-13 - Added aria-label to icon-only buttons
**Learning:** For accessibility, ensure all icon-only interactive elements (like buttons) include an `aria-label` attribute, as relying solely on the `title` attribute is insufficient for screen readers. In Dexhelper, several key interactive elements like the Assistant Panel debug toggle, Pokedex Cards, and Storage Grid cards lacked proper screen reader announcements despite having visual cues or titles.
**Action:** Always add `aria-label` attributes to icon-only buttons and interactive card elements that act as links or triggers, ensuring the label clearly describes the action or destination (e.g., `aria-label={"View details for " + pokemon.name}`).

## 2024-05-18 - [File Upload Input Accessibility]
**Learning:** Using `className="hidden"` on `<input type="file">` elements within a `<label>` hides them completely from the accessibility tree, making it impossible for screen reader users to understand or interact with the file input properly, and preventing keyboard focus.
**Action:** Instead of `className="hidden"`, use Tailwind's `className="sr-only"` combined with `tabIndex={-1}`. `sr-only` keeps the element accessible to screen readers but visually hidden. `tabIndex={-1}` ensures the input itself doesn't receive redundant keyboard focus (since its wrapping `<label>` is naturally focusable or can be made focusable, often using `focus-within:ring-*` to show visual feedback when the hidden input receives internal focus).

## 2025-04-06 - Accessible Custom Toggles
**Learning:** Custom UI components designed to look like interactive switches lack inherent meaning for screen readers. Using just `<button>` with visual styles leaves assistive tech users unable to determine the current state (on/off) or the element's interactive nature as a toggle.
**Action:** Always verify that components visually functioning as switches use `role="switch"`, dynamically update `aria-checked`, provide a descriptive `aria-label`, and include distinct `:focus-visible` styles for clear keyboard navigation.

## 2026-04-07 - Inline Confirmation for Destructive Actions
**Learning:** Destructive actions inside easily dismissible modals are prone to accidental clicks. Adding an inline confirmation step prevents data loss without forcing the user out of their current context.
**Action:** Always implement a two-step inline confirmation (e.g., 'Delete' -> 'Cancel' / 'Confirm') for data-clearing actions within dialogs.

## 2026-04-09 - Accessible Search Inputs
**Learning:** Standard text inputs used for searching often lack intuitive keyboard navigation and immediate visual feedback when clearing text. Without focus returning to the input after clearing, users must manually re-focus the input to start a new search, disrupting the workflow.
**Action:** Always add keyboard shortcuts (like `Escape`) to clear search inputs. When a clear button is used, ensure it has visible focus styles and that its `onClick` handler programmatically returns focus back to the search input.
## 2026-04-10 - Empty States for Search and Filters
**Learning:** Data grids and lists that can be heavily filtered or searched often lack empty states. When a user applies a combination of filters that yields no results, presenting an empty UI implies a bug or broken data load.
**Action:** Always implement a distinct empty state for filtered lists. Use appropriate icons, clear messaging ("No results found"), and actionable advice (e.g., "Try adjusting your filters") to maintain context and guide the user.

## 2026-04-10 - Palette: Add missing focus-visible to grid buttons
**Learning:** The application had missing `focus-visible` styles on core grid interactive elements (`PokedexCard` and `StorageGrid` main buttons), which breaks keyboard navigation visibility.
**Action:** Always include the standard `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950` classes when adding or updating interactive list/grid items.
