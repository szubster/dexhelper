# Gen 2 Pokegear Phone Call Mechanics

This document outlines the memory structures and RNG mechanics governing Pokegear phone calls in Generation 2 (Gold, Silver, Crystal).

## Memory Offsets & State Flags

### Registered Contacts
- **`wPhoneList`**: Stores the list of registered phone contacts.
  - Size: `CONTACT_LIST_SIZE + 1` bytes. `CONTACT_LIST_SIZE` is exactly 10, thus this structure is 11 bytes long.

### State Flags & Overworld Data
- **`wSwarmFlags` (1 byte)** (Crystal Only: `0xDC20`): Bitmask storing the state of active swarms in the overworld.
  - *Note for Gold/Silver*: Swarms are not tracked in a single bitflag byte. Instead, `wSwarmMapGroup` (`0xDD17`), `wSwarmMapNumber` (`0xDD18`), and `wFishingSwarmFlag` (`0xDD19`) handle active swarms along with a daily flag in `wDailyFlags1` (`0xD968`).
- **`wDailyPhoneItemFlags` (4 bytes)** (Crystal Only: `0xDC50`) **& `wDailyPhoneTimeOfDayFlags` (4 bytes)** (Crystal Only: `0xDC54`): Manage item-giving states from specific NPCs (e.g., evolution stones or berries given by trainers on specific days/times).
  - *Note for Gold/Silver*: These arrays do not exist. In GS, trainer item events and rematches are tracked using standard event flags in the general `wEventFlags` array (`0xD7B7`), rather than dedicated phone memory arrays.
- **`wSpecialPhoneCallID` (1 byte)**: Dictates forced or scripted phone calls (e.g., calls from Prof. Elm, the Bike Shop). If non-zero, triggers specific override behavior before evaluating standard RNG.

## RNG Call Trigger Logic

The triggering of random phone calls in the overworld is evaluated primarily in `CheckPhoneCall` (in `engine/phone/phone.asm`) and relies on several conditions and RNG elements:

1. **Timer Evaluation (`CheckReceiveCallTimer`)**:
   - Compares current time against `wReceiveCallDelay_StartTime` and delay durations like `wReceiveCallDelay_MinsRemaining`.
   - Modifies `wTimeCyclesSinceLastCall` to enforce a cooling-off period (delay between calls).

2. **RNG Check (`CheckPhoneCall`)**:
   - If timer checks pass, a random number is generated and `and %01111111` is applied.
   - There is a 50% chance the call check proceeds.

3. **Caller Sampling (`ChooseRandomCaller`)**:
   - Iterates through registered contacts and populates `wAvailableCallers`.
   - Uses `Random` along with `SimpleDivide` against `wNumAvailableCallers` to sample a specific caller uniformly from the pool of available NPCs.
   - Available callers are restricted by time of day (handled via `CheckPhoneContactTimeOfDay`).

## Wild Encounters (Swarms)
When a phone call triggers a swarm (e.g., Dunsparce, Yanma), the caller's script eventually triggers `RandomPhoneWildMon` (`engine/overworld/wildmons.asm`) or modifies `wSwarmFlags` to replace the map's default encounter slots temporarily.
