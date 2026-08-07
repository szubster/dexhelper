## 2025-02-12 - [Accepted] - 🖼️ Canvas: Tactical Header and Control Deck Redesign
**What:** Redesigned `AppHeader.tsx` and `BottomNav.tsx` to enhance the "Terminal Operator" aesthetic. Introduced hazard stripes and a multi-tiered layout in the header. Transformed the bottom nav into a flush, full-width industrial "Control Deck" with larger hit targets.
**Outcome:** Accepted -> wait for review
**Why:** The previous floating nav pill and flat header felt too modern/app-like. This change grounds the UI in physical, tactical hardware, increasing immersion.
**Pattern:** Using repeating-linear-gradient for hazard stripes and flush, border-heavy containers creates a strong industrial feel. Floating elements should be avoided in favor of anchored panels.
