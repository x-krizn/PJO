# PROJECT ORION — DOCUMENTATION GAPS CHECKLIST
## Content Required for Border Town Completion

---

## TIER 1: CRITICAL PATH (Required for Border Town to Function)

### Zone Documentation
- [x] **M00-THE-BOG** — Complete zone design
  - [x] Layout/structure
  - [x] Enemy roster with stat blocks
  - [x] "The Orb" NPC documentation
  - [x] Bedivere's corpse location + loot table
  - [x] Exit point to border town
  
- [ ] **M01-ORC-ENCAMPMENT** — Complete zone design
  - [ ] Layout/structure
  - [ ] Orc faction hierarchy
  - [ ] Enemy roster with stat blocks
  - [ ] Map fragment 1/3 acquisition
  - [ ] Connection to border town

- [x] **CAMELOT-BORDER-TOWN** — Mechanical implementation details
  - [x] NPC spawn locations (documented by district)
  - [x] Container placement + loot tables (by district)
  - [x] Boss patrol routes/spawn triggers (barracks quarter origin)
  - [x] Orc invasion spawn points (outer perimeter)
  - [x] Dungeon entrance location (documented with visual design)

### Combat Systems
- [x] **Enemy Stat Blocks** — All hostile entities through border town
  - [x] Basic orc grunts (health, damage, abilities)
  - [x] Orc rangers (health, damage, abilities)
  - [x] Orc chieftain (mini-boss stats)
  - [x] Corrupted NPCs (3 states: neutral, agitated, feral)
  - [x] Percival (full boss mechanics)
  - [x] Tristan (full boss mechanics)
  - [x] Bors (full boss mechanics)

- [x] **Boss Encounter Design** — Detailed combat scripts
  - [x] Phase transitions (Bors Grail Overload at 50% HP)
  - [x] Attack patterns/telegraph timings (documented per boss)
  - [x] Combined fight coordination (synergies + kill order)
  - [x] Loot drop tables (complete item lists per boss)

### NPC Systems
- [ ] **Border Town NPC Roster**
  - [ ] Named NPCs (names, roles, locations)
  - [ ] Merchant inventories
  - [ ] Dialogue trees
  - [x] Grail sickness state machine (transition triggers: 25% neutral, 50% agitated, 25% feral)
  
- [x] **Reputation System**
  - [x] Reputation point formula (invasion defense, quest completion)
  - [x] Threshold values (hostile → neutral → friendly via successful defenses)
  - [x] Safezone activation mechanics (15-minute duration after sufficient reputation)
  - [x] Reputation tracking per NPC vs zone-wide (majority faction based)

### Loot & Progression
- [x] **Complete Loot Tables**
  - [x] Border town container types + contents (market/barracks/cathedral districts)
  - [x] Boss drop pools (exact items, drop rates documented)
  - [x] Orc invasion rewards (map fragments, war paint, scrap metal)
  - [x] Crafting material definitions (grail-corrupted alloys, knight plating, orc scrap)
  
- [x] **Blueprint Acquisition**
  - [x] Which bosses drop which blueprints (Percival: Guardian Frame, Bors: Armor Plating + Camlann's Ruin, Tristan: Sensor Suite)
  - [x] Blueprint rarity tiers (common/uncommon/rare documented)
  - [ ] Crafting requirements per blueprint (need material quantities + crafting station requirements)

---

## TIER 2: DEEP DUNGEON (Required for Complete Border Town Experience)

### Dungeon Structure
- [ ] **Deep Dungeon Layout**
  - [ ] Number of floors
  - [ ] Floor themes/biomes
  - [ ] Checkpoint/rest areas
  - [ ] Escape/exit mechanics

- [ ] **Dungeon Enemy Roster**
  - [ ] Trash mob types per floor
  - [ ] Elite enemy types
  - [ ] Mini-boss encounters
  - [ ] Final boss encounter

- [x] **Dungeon Loot**
  - [ ] Floor-specific loot tables
  - [ ] Chest placements
  - [ ] Secret area rewards
  - [x] Final boss drops (including Waygate Key - documented as progression gate)

### Dungeon Mechanics
- [x] **Access Requirements**
  - [x] Chosen gate type (3 options documented: combat/exploration/reputation)
  - [x] Implementation details for chosen gate (all 3 options fully specified)
  
- [ ] **Environmental Hazards**
  - [ ] Aetheric zones
  - [ ] Collapsing sections
  - [ ] Trap systems

---

## TIER 3: INTEGRATION & POLISH (Required for Cohesive Experience)

### Zone Connections
- [ ] **Waygate System**
  - [ ] Player interaction mechanics
  - [ ] Fast travel UI
  - [ ] Waygate Key usage
  - [ ] Travel costs/restrictions

- [x] **Map Fragment System**
  - [ ] Fragment 1/3 (M01-ORC-ENCAMPMENT - needs source specification)
  - [x] Fragment 2/3 (Border Town - orc chieftain 50% drop)
  - [ ] Fragment 3/3 (Source location unknown)
  - [x] Map merge mechanics (fragments combine to reveal waygate location)
  - [x] Revealed information after merge (waygate in Camelot interior)

### Quest Systems
- [ ] **Border Town Quests**
  - [ ] Main questline structure
  - [ ] Side quest roster
  - [ ] Quest givers + dialogue
  - [ ] Quest rewards
  - [ ] Quest progression tracking

- [x] **Bedivere Subplot**
  - [x] Signet Ring usage (triggers loyalist hostility + required for dungeon subplot)
  - [ ] Connected NPCs (need specific NPC names/dialogue)
  - [ ] Revelation/payoff (needs specifics beyond "dungeon subplot")

### World State
- [x] **Desynchronization Mechanics**
  - [x] Visual flicker implementation (10-15 second cycles)
  - [x] Gameplay impact (NPC phase-through visual only, time-of-day cycling)
  - [x] Trigger frequency (constant ambient effect)
  - [x] Player perception vs mechanical effect (primarily atmospheric)

- [x] **Dynamic Events**
  - [x] Orc invasion trigger formula (15% every 5 min)
  - [x] Event duration (until cleared or player escapes)
  - [x] Failure/success states (NPC deaths permanent, loot lost vs reputation gain)
  - [x] Reward distribution (chieftain drops, reputation, temporary safezone)

---

## TIER 4: SUPPORTING SYSTEMS (Required for Full Functionality)

### Crafting & Economy
- [ ] **Crafting Stations**
  - [ ] Location in border town
  - [ ] Available recipes
  - [ ] Material requirements per item (quantities needed per blueprint)
  
- [ ] **Merchant Economy**
  - [ ] Buy prices
  - [ ] Sell prices
  - [ ] Restock timers
  - [ ] Currency system

### Player Onboarding
- [ ] **Tutorial Sequence**
  - [ ] Starting scenario
  - [ ] Core mechanic introduction
  - [x] First zone (M00-THE-BOG confirmed as starting zone via M00 designation)
  - [ ] Initial gear loadout

- [ ] **Progression Gating**
  - [ ] Level requirements per zone
  - [ ] Gear checks
  - [ ] Skill checks

### Audio-Visual
- [x] **Audio Design Specs**
  - [x] Border town ambient tracks (distant screams, war drums, cathedral bells)
  - [x] Boss fight music (heroic but corrupted themes noted)
  - [x] Orc invasion audio cues (war horn, red visual pulse, war drums)
  - [x] Grail sickness audio indicators (inhuman screeching)

- [x] **Visual Asset Specs**
  - [x] Border town architecture style (stone walls, scrap rebuilds, desynchronizing buildings)
  - [x] Desynchronization VFX (building flicker, NPC phase-through, time cycling)
  - [ ] Boss visual designs (mechanics documented but visual specs incomplete)
  - [ ] UI/HUD mockups

---

## TIER 5: NEXT ZONES (Not Border Town, But Logical Next Steps)

### Future Content
- [ ] **M02-CAMELOT-INTERIOR**
  - [ ] Zone structure
  - [ ] Faction territories
  - [x] Waygate location (documented as progression goal from border town)
  - [ ] Enemy roster
  - [ ] Quest lines

- [x] **Additional Trait Lines** (if planned)
  - [x] Trait lines 4-6 (Rogue, Wizard, Cleric fully documented)
  - [x] Equipment loadouts (all 6 trait lines complete)
  - [x] Feat trees (all 6 trait lines complete)

---

## VERIFICATION STATUS KEY

**TIER 1** — Documented in source files  
**TIER 2** — Inferred from context  
**TIER 3** — Mentioned but not detailed  
**TIER 4** — Missing/requires creation

---

## PRIORITY RECOMMENDATION

**Phase 1 (Minimum Viable):** ✅ COMPLETE
- [x] Enemy stat blocks
- [x] Boss mechanics
- [x] Complete loot tables
- [ ] NPC roster + dialogue (needs named NPCs + dialogue trees)

**Phase 2 (Playable):** PARTIAL
- [ ] Deep dungeon structure (access gates complete, floors/enemies incomplete)
- [ ] Quest system (structure incomplete)
- [x] Reputation mechanics
- [ ] Crafting stations (blueprints defined, stations/requirements incomplete)

**Phase 3 (Polished):** PARTIAL
- [x] Audio-visual specs (audio complete, visual partial)
- [ ] Tutorial sequence (first zone identified, loadout/intro incomplete)
- [x] Dynamic events tuning
- [x] Next zone connections (waygate system mechanics incomplete)

---

## NEWLY IDENTIFIED GAPS (From v1 → v2 Review)

### Critical Missing Details
- [ ] **Crafting Material Quantities** — Blueprints defined but exact material counts needed
- [ ] **Named NPC Roster** — Merchants, quest givers need names/personalities/locations
- [ ] **M01-ORC-ENCAMPLEMENT** — Entire zone still undefined
- [ ] **Deep Dungeon Floors** — Structure exists, content missing
- [ ] **Currency System** — No mention of currency type or economy
- [ ] **Bedivere Subplot Payoff** — Ring usage documented, resolution unclear
- [ ] **Map Fragment 1/3 & 3/3** — Sources need specification
- [ ] **Boss Visual Designs** — Mechanical specs complete, visual descriptions needed
- [ ] **Tutorial Starting Loadout** — Which trait line does new player start with?

---

*Last Updated: 2026-02-16*  
*Version: 002*  
*Changes: Checked off completed documentation from bog-v2.md and border-town-v1.md*
