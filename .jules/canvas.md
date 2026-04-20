## 2025-04-18 - [Rejected] - 🖼️ Canvas: Holographic dynamic-color hero layout for PokemonDetails
**What:** Redesigned the PokemonDetails component to use a holographic projection hero layout with a dynamic ambient glow backdrop extracted from the Pokemon's sprite.
**Outcome:** Rejected → journaled
**Why:** Maintainer felt the previous design was better as it looked more like "snooping for Pokémon", aligning better with the app's core fantasy/feel than a polished high-tech hologram.
**Pattern:** Avoid overly slick, polished "high-tech" designs. The UI should prioritize the "snooping" / utility-driven feel of an actual Pokédex over flashy holographic effects.

## 2025-05-15 - [Rejected] - 🖼️ Canvas: Box Navigation Redesign
**What:** Redesigned StorageGrid to use a split PC Terminal layout with a sidebar for locations, replacing the endless scrolling list.
**Outcome:** Rejected → journaled
**Why:** Maintainer pointed out that clicking on boxes instead of scrolling is more problematic, especially on mobile devices.
**Pattern:** Avoid replacing vertical scrolling with click-to-navigate tab/sidebar layouts when the number of items is high (like 14+ boxes), as it can degrade the mobile experience.

## 2025-04-19 - [Accepted] - 🖼️ Canvas: StorageGrid Terminal Layout
**What:** Redesigned the `StorageGrid` component to replace its previous "endless scroll" linear layout with a more structured and thematic split "PC Terminal" layout.
**Outcome:** Accepted → journaled
**Why:** The PR was merged, confirming that using categorical navigation to reduce cognitive load and excessive scrolling when dealing with many items is a strong UX pattern for desktop, provided it's done thoughtfully.
**Pattern:** Adopt categorical navigation for numerous similar items when it significantly reduces cognitive load and scrolling, ensuring it fits the "snooping" aesthetic.
