# M00-THE-BOG — ZONE DOCUMENTATION v2

---

## VERIFICATION STATUS

**TIER 1 (Documented in narrative.md):**
- Zone designation: M00-THE-BOG
- NPC present: "The Orb" (can be rescued)
- Bedivere's corpse findable in zone
- Player spawn point if arriving from this zone to border town
- The Orb provides dialogue referencing border town if rescued

**TIER 1 (User specifications):**
- The Orb is a "Poe"
- All Poe call themselves "Poe"
- Poe appear in high æther density areas
- This pattern will NOT be made apparent to the player
- Mechs retain æther immunity BUT are NOT immune to corrosive bog water
- Dense maze structure: downed trees, temple/monastery ruins, traps, hostile creatures
- Bedivere carries a numbered list of seemingly nonsense items
- Collecting all list items + returning to bog triggers secret boss event
- Secret boss: "Lady of the Lake" (half machine-snake form)
- Bedivere's Signet Ring triggers loyalist hostility in border town
- Enemy roster: Orc Warrior, Orc Scout, Bog Wurm

---

## ZONE OVERVIEW

**Designation:** M00-THE-BOG  
**Type:** Starting zone / Tutorial area (inferred from M00 designation)  
**Environmental Hazard:** Corrosive bog water  
**Ætheric Status:** High æther density (enables Poe manifestation)  
**Exit:** Connects to Camelot Border Town

---

## ENVIRONMENTAL STRUCTURE

**Terrain:**
- Dense maze layout
- Downed trees (natural obstacles)
- Ruins of old temple or monastery (architectural remnants)
- Trap systems (type unspecified)
- Corrosive water hazard zones

**Navigation:**
- Maze-like structure implies multiple paths
- Environmental hazards create routing challenges
- Ruins suggest vertical elements and interior spaces

---

## HAZARD SYSTEM

### Corrosive Bog Water

**Critical Distinction:**
- Pilots are æther-immune (as documented in loredoc.md)
- Pilots are NOT immune to bog water corrosion
- Bog water represents separate hazard type from ætheric exposure

**Mechanical Effect:**
- Contact with bog water deals damage over time
- Creates environmental pressure despite pilot immunity to æther
- Forces navigation around water zones or damage mitigation

---

## ENEMY ROSTER

### Orc Warrior

**Classification:** Melee Frontline  
**Faction:** Orc (appears in M00-THE-BOG, M01-ORC-ENCAMPLEMENT, Border Town invasions)

**Stats:**
- **HP:** 800
- **Armor:** 15 (light plating)
- **Mobility:** Medium (standard movement speed)
- **Threat Generation:** Medium

**Combat Behavior:**
- Aggressive melee fighter
- Closes distance to player
- Basic combo attacks

**Attacks:**
- **Heavy Strike** — 120 Physical damage, 1.5s windup
- **Combo Slash** — 3-hit combo, 60/60/80 Physical damage
- **Charging Ram** — Gap closer, 100 Physical damage + knockback

**Loot Table:**
- Scrap Metal (common)
- Orc War Paint (uncommon)
- Crude Weapon Parts (uncommon)

**Design Notes:**
- Entry-level melee enemy
- Teaches player spacing and dodge timing
- Vulnerable to ranged kiting

---

### Orc Scout

**Classification:** Ranged Harassment  
**Faction:** Orc (appears in M00-THE-BOG, M01-ORC-ENCAMPLEMENT, Border Town invasions)

**Stats:**
- **HP:** 500
- **Armor:** 8 (leather wraps)
- **Mobility:** High (faster movement, evasive)
- **Threat Generation:** Low

**Combat Behavior:**
- Maintains distance from player
- Flanking positioning
- Retreats when cornered

**Attacks:**
- **Bow Shot** — 80 Physical damage, 0.8s windup
- **Poison Arrow** — 60 Physical damage + 20 damage/sec for 5 seconds
- **Smoke Bomb** — Creates obscuring cloud, teleports to new position

**Loot Table:**
- Primitive Arrows (common)
- Leather Scraps (common)
- Orc Bow (rare)

**Design Notes:**
- Teaches player target prioritization
- Forces player to deal with ranged threats
- Fragile when caught in melee

---

### Bog Wurm

**Classification:** Hybrid Ambush Predator  
**Faction:** Æther-Corrupted (appears in M00-THE-BOG)

**Stats:**
- **HP:** 1200
- **Armor:** 20 (metallic scales)
- **Mobility:** Low on land, High in water
- **Threat Generation:** High (aggressive when engaged)

**Combat Behavior:**
- Ambushes from water or debris
- Snake-like movement patterns
- Burrows/submerges to reposition

**Attacks:**
- **Constrict** — Grapple attack, 40 Physical damage/sec, player immobilized
- **Acid Spit** — 150 Energy damage, creates corrosive puddle (30 damage/sec for 8 seconds)
- **Thrash** — AoE tail sweep, 180 Physical damage, knocks players back

**Special Mechanic:**
- **Submerge:** Burrows into water/ground, becomes untargetable for 5 seconds, then re-emerges near player

**Loot Table:**
- Corroded Metal Plating (common)
- Wurm Scales (uncommon)
- Ætheric Residue (rare)
- Hydraulic Actuator (rare)

**Design Notes:**
- Snake-like machine hybrid (thematic tie to Lady of the Lake)
- Teaches player to handle grapples and environmental hazards
- More dangerous near water zones
- Ætheric corruption visible in design (glowing energy veins in mechanical parts)

---

## NPC ENCOUNTER

### The Orb / "Poe"

**Identity:**
- Self-identifies as "Poe"
- Classification: Poe (entities appearing in high æther density)
- Can be "rescued" by player
- Provides dialogue about border town if rescued

**Lore Context:**
- Poe manifestations tied to ætheric concentration
- Pattern recurs across multiple zones (not revealed to player)
- Suggests ætheric desynchronization creates these entities

---

## DISCOVERABLE CONTENT

### Bedivere's Corpse

**Location:** Somewhere in bog (en route to border town exit)

**Items:**
- **Bedivere's Signet Ring** — Quest item (triggers loyalist hostility in border town, required for dungeon subplot)
- **Numbered List** — Cryptic item list, triggers Lady of the Lake secret boss when all items collected + return to bog

**Lore Significance:**
- Fallen knight en route to border town
- Ring proves player looted his corpse (explains loyalist hostility)
- List represents hidden quest line

---

## SECRET BOSS EVENT

### Lady of the Lake

**Trigger Conditions:**
1. Loot numbered list from Bedivere's corpse
2. Collect all items referenced in list
3. Return to M00-THE-BOG

**Boss Identity:**
- "Lady of the Lake" (Arthurian reference)
- Form: Half machine, half snake
- Implies corruption/transformation from original form

**Design Implication:**
- Optional content (requires specific item collection)
- Rewards thorough exploration
- Ties to Camelot mythology with ætheric/mechanical corruption theme
- Thematically connected to Bog Wurms (snake-machine hybrids)

---

## ZONE CONNECTIONS

**Outbound:**
- Exit leads to Camelot Border Town
- Player spawns at border town outer perimeter if arriving from bog

**Relationship to Narrative:**
- Bedivere died en route (was traveling from bog toward border town)
- The Orb can reference border town (implies awareness of geography)
- Orc presence suggests proximity to M01-ORC-ENCAMPMENT

---

## ENVIRONMENTAL STORYTELLING

**Temple/Monastery Ruins:**
- Suggests pre-catastrophe religious or scholarly presence
- State of ruin implies desynchronization damage or abandonment
- Potential lore documents about catastrophe
- May contain hints about Bedivere's mission

**Downed Trees:**
- Natural decay OR catastrophic event
- Creates maze-like navigation
- Implies overgrown, neglected environment
- Forced abandonment after catastrophe

**High Æther Density:**
- Enables Poe manifestation
- Explains Bog Wurm corruption (ætheric + mechanical fusion)
- Suggests zone is in severe desynchronization state
- Creates hostile environment for non-pilots

**Machine-Organic Hybrids:**
- Bog Wurms = corrupted wildlife
- Lady of the Lake = corrupted entity
- Suggests æther + technology creates unstable fusions

---

## DESIGN THEMES

**Isolation:**
- Maze structure creates disorientation
- Corpse of fallen knight (Bedivere)
- Ruined architecture suggests lost civilization
- Hostile environment (water, enemies, æther)

**Corruption:**
- Corrosive water despite pilot immunity
- Bog Wurms as machine-snake hybrids
- Lady of the Lake's transformation
- Ætheric density warping living creatures

**Hidden Depth:**
- Secret boss gated behind item collection
- Poe presence (pattern player won't recognize initially)
- Nonsense list becomes meaningful puzzle
- Optional content rewards thorough exploration

**Tutorial Through Environment:**
- Multiple enemy types teach core mechanics
- Orc Warrior = melee combat
- Orc Scout = ranged/target priority
- Bog Wurm = grapples/environmental hazards
- Prepares player for border town complexity

---

## ÆTHERIC CONTEXT

**From loredoc.md:**
- Æther is hostile medium causing molecular disintegration
- Pilots uniquely immune to ætheric exposure
- Desynchronization creates spatial/environmental anomalies

**Bog Application:**
- High æther density = severe desynchronization
- Explains Poe manifestation
- Explains Bog Wurm corruption (æther fuses organic + machine)
- Explains environmental corruption
- Does NOT explain bog water corrosion (separate chemical/magical hazard from æther)

---

## PLAYER EXPERIENCE FLOW

**First Visit:**
1. Spawn in bog (or arrive via waygate from previous zone)
2. Navigate maze of trees, ruins, traps
3. Avoid/traverse corrosive water zones
4. Combat encounters: Orc Warriors, Orc Scouts, Bog Wurms
5. Meet The Orb / Poe entity (optional rescue)
6. Discover Bedivere's corpse
7. Loot Signet Ring + numbered list
8. Exit to border town

**Strategic Considerations:**
- Taking ring = harder border town (loyalist hostility)
- List items = long-term quest (return later for secret boss)
- Rescuing Poe = dialogue/lore reward

**Optional Return (Post-List Completion):**
1. Collect all items from numbered list (scattered across zones)
2. Return to M00-THE-BOG via waygate or backtracking
3. Trigger Lady of the Lake boss encounter
4. Defeat secret boss
5. Receive unique rewards (unspecified)

---

## COMBAT ENCOUNTER DESIGN

**Solo Encounters:**
- 1-2 Orc Warriors OR 2-3 Orc Scouts
- 1 Bog Wurm (ambush from water/debris)

**Mixed Encounters:**
- 1 Orc Warrior + 2 Orc Scouts (teaches target priority)
- 1 Bog Wurm + 1-2 Orc Warriors (forces split attention)

**Environmental Hazards:**
- Corrosive water forces positioning choices
- Narrow paths between downed trees limit mobility
- Ruins provide cover but also ambush points
- Traps punish careless movement

**Difficulty Curve:**
- Early encounters: 1-2 enemies, open terrain
- Mid-zone: Mixed groups, environmental pressure
- Pre-exit: Bog Wurm + orc support near water zones

---

*Last Updated: 2026-02-16*  
*Version: 2.0*  
*Changes: Added enemy stat blocks, expanded combat design*
