
## Gen 3 Location Map Data
- Map IDs are structured as `(GroupIndex << 8) | MapIndex` driven from `data/maps/map_groups.json` which lists map folder names.
- Map topology details for connection (via `connections` array) and indoor parental resolution (via `warp_events` pointing its `dest_map` property to an outdoor hub's string name) are located within each map's specific `map.json` file inside its `data/maps/` folder.
- Map localizations are decoded from `MAPSEC_*` strings found inside the map's `map.json` property `region_map_section` against `src/data/region_map/region_map_sections.json` where `id` equals `MAPSEC_*`.
