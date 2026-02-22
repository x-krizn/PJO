# CAMELOT BORDER TOWN — ZONE DOCUMENTATION v1

---

## VERIFICATION STATUS

**TIER 1 (Documented in narrative.md):**
- Border town location: between M01-ORC-ENCAMPMENT and interior Camelot
- Bedivere's corpse findable en route (located in M00-THE-BOG)
- Boss encounters: Percival, Tristan, Bors
- Large explorable area + massive deep dungeon
- No safezone designation
- NPC hostility mechanic: "grail sickness"
- Dynamic invasion system: orc raiding parties
- Post-catastrophe state: desynchronized regions
- Visual flickering between ruin/restoration states
- Collapsed central authority
- Factional warfare context
- Waygate control as political objective

**TIER 1 (User specifications):**
- Bedivere's Signet Ring triggers hostility from loyalist NPCs
- Loyalist faction loyal to Percival/Tristan/Bors
- Non-loyalist faction apathetic to knight authority
- Ring hostility is ADDITIVE to grail sickness (both systems active)

---

## ZONE OVERVIEW

**Designation:** CAMELOT-BORDER-TOWN  
**Type:** Large contested settlement  
**Political Status:** No central authority, factional control  
**Safezone:** None (all areas potentially hostile)  
**Strategic Importance:** Gateway between orc territories and Camelot interior, waygate access point

---

## SETTLEMENT LAYOUT

### Outer Perimeter (Contested Zone)

**Structure:**
- Collapsed stone walls, partially rebuilt with scrap
- Orc siege equipment abandoned mid-assault
- Burnt-out waystation buildings
- Defensive barricades (incomplete)

**Function:**
- Player spawn point if arriving from M00-THE-BOG
- First line of defense against orc invasions
- Least populated, most dangerous area

**Encounters:**
- Orc raiding parties (if invasion active)
- Feral grail-sick NPCs (wander from interior)
- Scavengers (neutral or hostile depending on state)

---

### Market District (Central Hub)

**Structure:**
- Half-functioning marketplace
- NPC merchant zones (hostile/neutral state fluctuates)
- Visible desynchronization effects: buildings phase between intact/ruined states
- Overturned market stalls with rotting goods

**Function:**
- Primary trade zone (when NPCs are neutral/non-hostile)
- Container caches: weapon parts, consumables, blueprints
- NPC dialogue and lore acquisition

**Desynchronization Effects:**
- Buildings flicker between states every 10-15 seconds
- NPCs occasionally phase through walls (visual only)
- Time-of-day cycles rapidly (day/night shifts within minutes)

**Encounters:**
- Merchant NPCs (grail sickness states + loyalist/non-loyalist factions)
- Civilian NPCs (potential allies or threats)
- Opportunistic scavengers during orc invasions

---

### Barracks Quarter (Combat Zone)

**Structure:**
- Former knight garrison, now factional holdout
- Heavy fortifications (partially intact)
- Armory containers (high-tier loot)
- Training yard (now battlefield)

**Function:**
- Percival/Tristan/Bors patrol routes originate here
- Heavy enemy density (corrupted knights, loyalists)
- High-tier loot in armory containers
- Boss encounter staging area

**Encounters:**
- Boss patrol routes (can encounter individually or together)
- Loyalist NPCs (high concentration, hostile if player has ring)
- Elite corrupted knights (grail-sick warriors)

---

### Cathedral District (Atmospheric/Lore Zone)

**Structure:**
- Grail iconography, corrupted religious imagery
- Burnt grail tapestries
- Collapsed cathedral sections
- Altar area (intact but defiled)

**Function:**
- Grail sickness visual cues: NPCs with glowing eyes, erratic behavior
- Lore documents explaining catastrophe impact on Camelot
- Environmental storytelling about pre-catastrophe society
- Potential quest givers (priests, scholars)

**Atmosphere:**
- Cathedral bells ringing arrhythmically (desynchronization motif)
- Distant screams (grail sickness victims)
- Religious NPCs in various states of corruption

---

### Dungeon Entrance (Gateway to Deep Dungeon)

**Structure:**
- Massive stone staircase descending into darkness
- Aetheric mist rising from below (similar to M00-THE-BOG aesthetic)
- Grail symbols carved into walls, glowing faintly
- Guardian statues (desynchronized, flickering)

**Function:**
- Gateway to deep dungeon (massive multi-floor structure)
- Gated by access requirement (see Access Requirements section)
- Final progression gate before Camelot waygate access

**Visual Design:**
- Descending into ætheric darkness
- Grail corruption visible in architecture
- Sense of forbidden depth

---

## NPC HOSTILITY SYSTEM

### Grail Sickness Mechanic

**State 1: Neutral (25% baseline probability)**
- NPC will trade, provide dialogue
- Grail sickness symptoms visible but controlled (glowing eyes, slight tremors)
- Safe to interact with

**State 2: Agitated (50% baseline probability)**
- NPC dialogue becomes hostile/erratic
- Will attack if player loiters too long (15-second timer)
- Drops standard loot upon death
- Visual cues: Intense eye glow, twitching movements

**State 3: Feral (25% baseline probability)**
- Immediate aggro on sight
- Enhanced stats (+25% damage, +50% movement speed)
- Drops grail-corrupted crafting materials
- Visual cues: Full-body corruption, glowing veins, bestial movement

**Environmental Trigger:**
- Orc raid invasion forces ALL NPCs into Feral state for duration
- Creates layered threat: player vs orcs vs corrupted NPCs
- NPCs revert to normal state distribution after invasion ends

---

### Bedivere's Ring Hostility (Additive System)

**Trigger:** Player loots Bedivere's Signet Ring from corpse in M00-THE-BOG

**Faction Identification:**
- **Loyalist NPCs:** Loyal to Percival/Tristan/Bors, view player as thief/murderer
- **Non-Loyalist NPCs:** Apathetic to knight authority, don't care about ring

**Combined Behavior Matrix:**

| NPC Faction | Grail State | Has Ring? | Behavior |
|-------------|-------------|-----------|----------|
| **Loyalist** | Neutral | No | Neutral, will trade |
| **Loyalist** | Neutral | Yes | **Hostile (immediate)** |
| **Loyalist** | Agitated | No | 15s timer → hostile |
| **Loyalist** | Agitated | Yes | **Hostile (immediate)** |
| **Loyalist** | Feral | Either | Hostile (grail override) |
| **Non-Loyalist** | Neutral | Either | Neutral, will trade |
| **Non-Loyalist** | Agitated | Either | 15s timer → hostile |
| **Non-Loyalist** | Feral | Either | Hostile (grail override) |

**Strategic Implication:**
- Taking ring significantly increases border town difficulty
- Loyalist merchants become inaccessible
- Non-loyalist merchants remain viable trade options
- Player must identify faction affiliation before engaging NPCs
- Ring is required for dungeon subplot (risk vs reward)

---

## BOSS ENCOUNTERS

### Percival — Grail Knight (Heavy Tank)

**Classification:** Guardian Archetype  
**Behavioral Identity:** Protector, draws aggro, shields allies

**Stats:**
- **HP:** 8,000
- **Armor:** 40 (heavy knight plating)
- **Mobility:** Low (heavy frame)
- **Resource Priority:** Threat > Energy > Heat

**Combat Behavior:**
- Guardian-archetype, protects Tristan/Bors if fought together
- Positions between player and allies
- High threat generation through defensive actions

**Mechanics:**

- **Shield Wall Stance**  
  Raises shield, reduces incoming damage by 60%  
  Reflects 30% of projectile damage back to attacker  
  Duration: Until interrupted or repositioning needed

- **Grail Regeneration**  
  Passive HP regeneration when below 50% health  
  Restores 80 HP/second  
  Disabled if staggered or knocked down

- **Righteous Charge**  
  Gap-closer ability  
  Charges toward player, 300 Physical damage on impact  
  Knockback effect, 3-second stun  
  Cooldown: 20 seconds

**Loot Drops:**
- Guardian Frame Blueprint (rare)
- "Grail Fragment" (quest item, required for dungeon access - Combat Gate option)
- Heavy Plating Components (uncommon)
- Grail Water (consumable)

**Design Notes:**
- Tank archetype, low damage but high survivability
- Dangerous when protecting other bosses
- Shield Wall must be flanked or broken with heavy attacks
- Grail Regeneration forces aggressive play to prevent sustain

---

### Tristan — Corrupted Ranger (DPS/Ranged)

**Classification:** Kiting Specialist  
**Behavioral Identity:** Ranged harassment, maintains distance

**Stats:**
- **HP:** 5,500
- **Armor:** 15 (light leather + enchanted cloak)
- **Mobility:** High (evasive movement)
- **Resource Priority:** Energy > Heat > Threat

**Combat Behavior:**
- Kiting, maintains distance from player
- Punishes melee rushdown with escape abilities
- Targets low-armor players first in group encounters

**Mechanics:**

- **Longbow Volley**  
  High-damage ranged attack pattern  
  Fires 5 arrows in rapid succession  
  120 Physical damage per arrow (600 total)  
  Cooldown: 12 seconds

- **Smoke Retreat**  
  Teleports to edge of arena when cornered  
  Leaves smoke cloud (obscures vision for 4 seconds)  
  Cooldown: 15 seconds

- **Grail Sight**  
  Reveals player position through walls/obstacles  
  Enables tracking shots while player in cover  
  Duration: 8 seconds  
  Cooldown: 25 seconds

**Loot Drops:**
- Advanced Sensor Suite (rare)
- "Corrupted Shard" (crafting material for energy weapons)
- Longbow Schematic (uncommon)
- Smoke Bomb consumables (common)

**Design Notes:**
- Pure ranged DPS, fragile when caught
- Smoke Retreat forces player to reposition constantly
- Grail Sight punishes cover-based play
- High priority target in combined boss fight

---

### Bors — Berserk Striker (High-Risk Aggro)

**Classification:** Marauder Archetype  
**Behavioral Identity:** Relentless aggression, escalating damage

**Stats:**
- **HP:** 6,500
- **Armor:** 25 (medium plating, berserker focus)
- **Mobility:** Medium (aggressive pursuit)
- **Resource Priority:** Heat > Threat > Energy

**Combat Behavior:**
- Marauder-archetype, relentless aggression
- Gains power as fight progresses
- Punishes defensive/passive play

**Mechanics:**

- **Fury Stacks**  
  Gains +10% damage per hit landed (max 10 stacks = +100% damage)  
  Stacks decay if Bors doesn't attack for 6 seconds  
  Visual indicator: Glowing red aura intensifies with stacks

- **Grail Overload** (Phase 2: 50% HP threshold)  
  Enters overdrive state  
  Immune to heat penalties  
  Attack speed increased by 40%  
  Fury stacks no longer decay  
  Duration: Until death or player flees arena

- **Execution Lunge**  
  One-shot ability if player below 20% HP  
  Telegraphed 2-second windup (audio cue + red visual)  
  500 Physical damage + execute (instant kill if HP < 20%)  
  Cooldown: 30 seconds

**Loot Drops:**
- Heavy Lance "Camlann's Ruin" (unique weapon)
- Armor Plating Blueprint (rare)
- "Grail Fragment" (quest item)
- Berserker Core Components (uncommon)

**Design Notes:**
- Escalating threat (gets stronger as fight continues)
- Forces aggressive play to avoid Fury stack buildup
- Execution Lunge is telegraphed but deadly
- Grail Overload at 50% HP creates second phase urgency

---

### Combined Fight Mechanics

**If All 3 Fought Simultaneously:**

**Synergies:**
- Percival protects Tristan, enabling free ranged DPS
- Bors builds Fury while player focuses other targets
- Tristan's Grail Sight reveals player to all bosses

**Rewards:**
- **"Knight's Oath" Feat:** +10% damage vs Camelot enemies (permanent unlock)
- Unique dialogue sequence reveals lore about grail corruption
- All three loot pools drop simultaneously
- Guaranteed blueprint drops from each boss

**Strategic Considerations:**
- Kill order matters: Tristan (ranged DPS) → Bors (escalating threat) → Percival (sustain tank)
- OR: Separate bosses by kiting, fight individually
- Combined fight is significantly harder but yields better rewards

---

## ORC RAIDING PARTY SYSTEM

### Dynamic Invasion Trigger

**Probability:**
- 15% chance every 5 minutes of exploration
- Timer starts when player enters border town
- Timer pauses during boss encounters

**Announcement:**
- War horn sound (audio cue)
- Red visual pulse across screen
- Orc war drums (ambient audio)
- NPCs react with fear/aggression (if not feral)

**Duration:**
- Invasion lasts until all orcs killed OR player escapes to dungeon entrance
- Blocks zone exit to M00-THE-BOG until cleared
- Blocks fast travel until cleared

---

### Invasion Composition

**Standard Invasion Force:**
- 8-12 Orc Grunts (melee frontline)
- 2-4 Orc Rangers (ranged harassment)
- 1 Orc Chieftain (mini-boss)

**Orc Grunt Stats:**
- **HP:** 1,000
- **Armor:** 18
- **Damage:** 100-140 Physical per hit
- **Behavior:** Aggressive melee, prioritizes NPCs over player initially

**Orc Ranger Stats:**
- **HP:** 600
- **Armor:** 10
- **Damage:** 90 Physical per arrow
- **Behavior:** Ranged support, kiting

**Orc Chieftain Stats:**
- **HP:** 3,500
- **Armor:** 30
- **Damage:** 200-280 Physical per hit
- **Abilities:**
  - War Cry (buffs nearby orcs +25% damage for 15 seconds)
  - Ground Slam (AoE 250 damage, 2-second stun)
  - Rallying Command (prevents orc morale break)

**Loot:**
- Map Fragments (chieftain drop, 50% chance)
- Orc War Paint (consumable)
- Scrap Metal, Crude Weapons
- Orc Breaker Lance Blueprint (rare, chieftain only)

---

### Tactical Layer

**Orc Behavior:**
- Orcs prioritize attacking NPCs first
- Player can exploit chaos: loot NPC corpses, scavenge while enemies distracted
- Orcs will engage player if directly attacked or if NPCs are dead

**NPC Response:**
- ALL NPCs enter Feral state during invasion (grail sickness override)
- NPCs fight orcs but also hostile to player
- Three-way battle: Player vs Orcs vs Corrupted NPCs

**Reputation Mechanic:**
- Successfully defending town (killing all orcs before NPCs die) grants reputation bonus
- Sufficient reputation with surviving NPCs → temporary safezone effect
- Safezone duration: 15 minutes or until next invasion
- NPCs in safezone remain in Neutral grail state, ignore ring hostility temporarily

**Failure State:**
- If player flees to dungeon entrance, orcs loot market district
- Container caches emptied (loot lost)
- Dead NPCs don't respawn (permanently reduces town population)
- Reputation penalty with survivors

---

## DUNGEON ENTRANCE ACCESS REQUIREMENTS

### Option A: Combat Gate

**Requirement:** Must defeat Percival, Tristan, AND Bors  
**Unlock Mechanism:** Door opens after collecting all 3 "Grail Fragments"  
**Fragments:**
- Percival drops 1 fragment
- Bors drops 1 fragment
- Tristan drops 1 fragment (correction from narrative.md assumption)

**Design Philosophy:**
- Forces boss combat mastery
- Clear progression gate
- Rewards combat-focused players

---

### Option B: Exploration Gate

**Requirement:** Must find 3 hidden switches scattered throughout border town  
**Switch Locations:**
- Switch 1: Hidden in Market District (behind desynchronizing wall)
- Switch 2: Hidden in Cathedral District (beneath altar)
- Switch 3: Hidden in Barracks Quarter (armory secret room)

**Design Philosophy:**
- Rewards thorough exploration
- Avoids forced combat
- Encourages interaction with desynchronization mechanics

---

### Option C: Reputation Gate

**Requirement:** Must achieve neutral standing with town NPCs  
**Reputation Gain:**
- Survive multiple orc raids without looting NPC corpses
- Defend NPCs during invasions
- Complete NPC quests (if implemented)

**Threshold:** 
- Reputation must reach "Neutral" or higher with majority faction
- Requires minimum 3 successful defenses OR equivalent quest completion

**Design Philosophy:**
- Ethical constraint, aligns with narrative themes
- Rewards defensive/supportive playstyle
- Conflicts with ring acquisition (taking ring makes this harder)

---

## LOOT & PROGRESSION

### Border Town Unique Items

**Blueprints:**
- "Camelot Knight Frame" (Guardian-focused chassis)
- "Grail-Touched Plating" (armor with HP regen passive)
- "Orc Breaker Lance" (high knockback, anti-infantry weapon)

**Consumables:**
- Grail Water (corrupted healing: restores 50% HP but generates 30% heat)
- Orc War Paint (temporary +15% damage vs humanoid enemies, 10-minute duration)

**Quest Items:**
- Bedivere's Signet Ring (found on corpse in M00-THE-BOG, triggers loyalist hostility)
- Map Fragment 2/3 (completes map from M01-ORC-ENCAMPMENT)
- Grail Fragments (boss drops, required for dungeon access - Combat Gate option)

**Crafting Materials:**
- Grail-Corrupted Alloys (from feral NPC drops)
- Knight Plating Scraps (from loyalist NPCs)
- Orc Scrap Metal (from invasion enemies)

---

### Container Loot Tables

**Market District Containers:**
- Weapon Parts (common)
- Consumables (common)
- Blueprints (rare, 10% chance)
- Currency/Trade Goods (common)

**Barracks Quarter Containers:**
- Heavy Weapon Parts (uncommon)
- Armor Plating (uncommon)
- Knight-tier Blueprints (rare, 15% chance)
- Grail-Touched Materials (rare)

**Cathedral District Containers:**
- Lore Documents (common)
- Grail Water (uncommon)
- Religious Artifacts (quest items)
- Energy Reactor Components (rare)

---

## ATMOSPHERIC DESIGN

### Desynchronization Visual Effects

**Building Flicker:**
- Buildings alternate between intact/ruined states every 10-15 seconds
- Merchant stalls appear full, then empty, then full again
- Visual indicator of severe desynchronization

**NPC Phase-Through:**
- NPCs occasionally phase through walls (visual only, doesn't affect gameplay)
- Creates unsettling atmosphere
- Hints at reality breakdown

**Time-of-Day Rapid Cycling:**
- Day/night shifts within minutes instead of hours
- Sun/moon positions inconsistent
- Reinforces temporal instability

---

### Audio Design

**Ambient Sounds:**
- Distant screams (grail sickness victims in cathedral)
- Orc war drums (foreshadows invasion, creates tension)
- Cathedral bells ringing arrhythmically (desynchronization motif)
- Metallic scraping (corrupted knights patrolling)

**Combat Audio:**
- Boss-specific themes (heroic but corrupted for knights)
- Orc invasion horn (dramatic announcement)
- Grail sickness vocalizations (inhuman screeching)

**Environmental Audio:**
- Creaking buildings (desynchronization stress)
- Distant combat (factional warfare beyond town)
- Wind through ruins (desolation)

---

### Environmental Storytelling

**Visual Cues:**
- Corpses in knight armor scattered throughout
- Orc graffiti over Camelot heraldry
- Burnt grail tapestries in cathedral
- Overturned market stalls with rotting goods
- Abandoned siege equipment at outer perimeter

**Lore Implications:**
- Town was prosperous before catastrophe
- Orc assault was sudden and devastating
- Knight garrison failed to protect civilians
- Grail corruption spread from interior Camelot
- Desynchronization worsening over time

---

## INTEGRATION WITH EXISTING SYSTEMS

### Connection to M00-THE-BOG

**Narrative Bridge:**
- Bedivere's corpse found in bog (was traveling toward border town)
- The Orb/Poe references border town if rescued
- Player spawns at outer perimeter when arriving from bog

**Mechanical Connection:**
- Bedivere's ring acquisition in bog affects border town NPC behavior
- Orc presence in both zones (establishes faction continuity)
- Ætheric themes (Poe in bog, grail sickness in town)

---

### Connection to M01-ORC-ENCAMPMENT

**Narrative Bridge:**
- Orc invasions originate from encampment direction
- Map fragments from both zones merge for complete regional map
- Establishes orc faction as persistent threat

**Mechanical Connection:**
- Orc enemy types consistent across zones
- Invasion system creates dynamic threat
- Map merge reveals waygate location in Camelot interior (next zone)

---

### Connection to Deep Dungeon

**Narrative Bridge:**
- Dungeon serves as skill check before waygate access
- Contains lore documents explaining tuning crystal catastrophe
- Final boss drops "Camelot Waygate Key"

**Mechanical Connection:**
- Access gated by player choice (combat/exploration/reputation)
- Dungeon difficulty scales from border town combat complexity
- Waygate key progression gate to interior Camelot

---

## PLAYER EXPERIENCE FLOW

### First Visit (Critical Path)

1. **Arrival** — Spawn at outer perimeter from M00-THE-BOG
2. **Exploration** — Navigate market district, assess NPC states
3. **Discovery** — Identify loyalist vs non-loyalist factions (if ring acquired)
4. **Combat** — Engage or avoid boss patrols (Percival/Tristan/Bors)
5. **Invasion Event** — Survive first orc raid (likely triggers during exploration)
6. **Progression Gate** — Work toward dungeon access (combat/exploration/reputation)
7. **Dungeon Entry** — Descend into deep dungeon with acquired key/switches/reputation

---

### Optional Activities

**Boss Hunting:**
- Hunt bosses individually for loot/fragments
- Attempt combined boss fight for Knight's Oath feat
- Farm boss respawns for crafting materials

**Reputation Building:**
- Defend NPCs during invasions
- Complete NPC quests (if implemented)
- Work toward safezone status

**Loot Farming:**
- Clear container caches in all districts
- Farm grail-corrupted materials from feral NPCs
- Acquire blueprints for new equipment

**Exploration:**
- Search for hidden switches (if pursuing Exploration Gate)
- Read lore documents in cathedral
- Map desynchronization patterns

---

### Strategic Considerations

**Ring Decision:**
- Take ring early = harder town, unlock dungeon subplot
- Skip ring initially = easier town, return later with better gear
- Non-loyalist merchant identification essential if taking ring

**Boss Order:**
- Fight individually (safer, slower progression)
- Fight all 3 together (Knight's Oath reward, high risk)
- Farm fragments/loot by separating encounters

**Invasion Management:**
- Defend for reputation gains
- Flee for survival
- Exploit chaos for NPC corpse looting (reputation penalty)

**Dungeon Access Route:**
- Combat Gate = prove fighting skill
- Exploration Gate = prove thoroughness
- Reputation Gate = prove ethical play (conflicts with ring)

---

*Last Updated: 2026-02-16*  
*Version: 1.0*  
*Status: Complete mechanical foundation, ready for enemy stat blocks and detailed quest implementation*
