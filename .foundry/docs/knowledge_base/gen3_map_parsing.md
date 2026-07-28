# Gen 3 Map Data Architecture

This document outlines how location data is structured within the Gen 3 decompilation repositories (e.g., `pret/pokeemerald`, `pret/pokeruby`, `pret/pokefirered`). This structure is crucial for correctly mapping Game Boy internal Map IDs to their corresponding map layout data (including indoor hub logic and topological connections).

## 1. Global Map Grouping

The root registry for all maps is `data/maps/map_groups.json`.
This file contains a `group_order` array, which lists various groups like `gMapGroup_TownsAndRoutes` or `gMapGroup_IndoorDewford`.

Following the `group_order`, the JSON provides arrays for each group. For example:
```json
"gMapGroup_TownsAndRoutes": [
  "PetalburgCity",
  "SlateportCity",
  // ...
]
```
**Map ID Calculation:**
A map's ID consists of its Group Index and its Map Index within that group.
- **Group Index:** The 0-based index of the group inside `group_order`.
- **Map Index:** The 0-based index of the map's string within that group's array.
- **Formula:** `Map ID = (GroupIndex << 8) | MapIndex`

## 2. Individual Map Files

Each string inside a map group array corresponds to a folder within `data/maps/`. For instance, `"Route110_SeasideCyclingRoadSouthEntrance"` points to `data/maps/Route110_SeasideCyclingRoadSouthEntrance/map.json`.

The `map.json` file contains all the topological and encounter configuration for that specific map, most notably:
- `id`: E.g., `"MAP_ROUTE110_SEASIDE_CYCLING_ROAD_SOUTH_ENTRANCE"`
- `region_map_section`: A constant like `"MAPSEC_ROUTE_110"` used to look up the human-readable display name.
- `map_type`: Identifies whether the map is `MAP_TYPE_ROUTE`, `MAP_TYPE_TOWN`, `MAP_TYPE_INDOOR`, etc.
- `connections`: An array containing objects representing connected maps (typically for outdoor `MAP_TYPE_ROUTE` / `MAP_TYPE_TOWN` layouts), formatted as:
  ```json
  "connections": [
    {
      "map": "MAP_ROUTE107",
      "offset": 0,
      "direction": "left"
    }
  ]
  ```
- `warp_events`: For `MAP_TYPE_INDOOR` maps, these warp events dictate how the player leaves the interior. The crucial property is `dest_map`, which points to the macro constant of the outdoor map hub (e.g., `"MAP_ROUTE110"`). This serves as the `prnt` (parent) mapping logic for indoor nodes.
  ```json
  "warp_events": [
    {
      "x": 1,
      "y": 5,
      "elevation": 0,
      "dest_map": "MAP_ROUTE110",
      "dest_warp_id": "4"
    }
  ]
  ```

## 3. Human Readable Location Names

The `region_map_section` constant found in `map.json` is mapped to a human-readable string using `src/engine/data/gen3/mapLocations.json (or similar)` (or `.json.txt` templates in older branches).
This file contains an array `map_sections` which maps the `id` (e.g., `MAPSEC_LITTLEROOT_TOWN`) to its `name` (`LITTLEROOT TOWN`).

## Summary of Parsing Pipeline

To fully map Gen 3 locations, the implementation task must:
1. Parse `map_groups.json` to extract a list of all Map IDs, their folder names, and their Group + Map indices.
2. Read each corresponding `map.json`.
3. Extract `connections` array to populate node connections in the unified map graph.
4. Extract `warp_events` -> `dest_map` to populate the `prnt` parent node logic.
5. Use the map's `region_map_section` to look up the final localized text via `mapLocations.json` (or similar).
