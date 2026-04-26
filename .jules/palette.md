## 2024-04-11 - Focus Visible Styles for Interactive Elements
**Learning:** Custom UI elements, mapped list buttons, and standard HTML elements functioning as buttons/links in complex layouts (e.g., AppLayout, BottomNav) often omit focus indicators when custom styling is heavily applied. This breaks keyboard navigation.
**Action:** Always ensure all interactive elements explicitly include the standard focus visible utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`) to maintain consistent accessibility and keyboard navigation across the application.

## 2024-04-12 - Custom Segmented Control ARIA Roles
**Learning:** When creating custom segmented controls with mutually exclusive options, using `role="switch"` is incorrect as switches imply an on/off state. `role="group"` is also too generic. A segmented control is conceptually a set of radio buttons.
**Action:** Use `role="radiogroup"` for the container and `role="radio"` for the individual buttons, along with `aria-checked={boolean}` and proper `aria-label`s on the container, to ensure screen readers correctly interpret the mutually exclusive selection pattern.

## 2024-04-13 - Added aria-label to icon-only buttons
**Learning:** For accessibility, ensure all icon-only interactive elements (like buttons) include an `aria-label` attribute, as relying solely on the `title` attribute is insufficient for screen readers. Icon-only buttons (e.g. close buttons, clear input buttons) can also be visually ambiguous. In Dexhelper, several key interactive elements like the Assistant Panel debug toggle, Pokedex Cards, and Storage Grid cards lacked proper screen reader announcements despite having visual cues or titles.
**Action:** Always provide a `title` attribute for sighted users (especially on desktop where they can hover) alongside `aria-label` for screen readers to icon-only buttons and interactive card elements that act as links or triggers, ensuring the label clearly describes the action or destination (e.g., `aria-label={"View details for " + pokemon.name}`). This makes the interface more intuitive and accessible without cluttering the visual design.

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

# Palette UX/A11y Learnings


## 2026-04-23 - Role Group for Checkbox-like Filters
**Learning:** Collections of buttons that act like a set of checkboxes (where multiple can be active simultaneously, indicated by `aria-pressed`) need a container role to group them semantically for screen readers.
**Action:** When creating a row or container of toggle buttons (like multi-select filters), wrap them in a container with `role="group"` and an `aria-label` describing the filter's purpose (e.g., "Filter Pokémon").

## 2026-04-24 - Focus Visible on Modal and Custom Action Buttons
**Learning:** Several custom action buttons in modals (like the Close buttons in `SettingsModal` and `PokemonDetails`, Confirmation buttons in `ClearStorageButton`, and choice selectors in `VersionModal`) were missing standard `focus-visible` styles, leading to poor keyboard navigation visibility.
**Action:** Always ensure that every custom button, regardless of its context (modals, overlays, inline prompts), includes the standard focus indicator utility classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950` or a context-appropriate color variant like `ring-red-500` for destructive actions).
