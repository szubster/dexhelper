## 2026-09-02 - [Accepted] - 🖼️ Canvas: Hardware Control Panel Bottom Nav Redesign
**What:** Redesigned the `BottomNav.tsx` and `NavButton.tsx` components to transform the flat navigation bar into a heavy, industrial "Hardware Control Panel". Added physical-looking toggle keys that depress when active, structural bezels with mounting screws, and diegetic LED power indicators.
**Outcome:** Accepted -> wait for review
**Why:** The previous bottom nav had some tactical elements (hazard stripes, sliding active bracket) but lacked the physical depth established in the `AppHeader` redesign. This change unifies the primary navigation bars as heavy, rigid hardware consoles.
**Pattern:** Treat all primary navigation as physical hardware controls (chunky keys, LED indicators) rather than flat UI elements. Enclose major layout regions in thick, dashed or metallic structural frames with diegetic details like screws or wiring.
