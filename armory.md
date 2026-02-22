# PROJECT ORION — COMPLETE ARMORY DOCUMENTATION

---

## TABLE OF CONTENTS

1. [Itemization Overview](#itemization-overview)
2. [Equipment System](#equipment-system)
3. [Frame System](#frame-system)
4. [Resource System](#resource-system)
5. [Crafting & Upgrading](#crafting--upgrading)
6. [Complete Parts Index](#complete-parts-index)
7. [Trait Line Loadouts](#trait-line-loadouts)
   - [Warrior (Fighter)](#warrior-fighter-loadout)
   - [Marauder (Barbarian)](#marauder-barbarian-loadout)
   - [Guardian (Paladin)](#guardian-paladin-loadout)
8. [Complete Feat Trees](#complete-feat-trees)

---

# ITEMIZATION OVERVIEW

Itemization in **Project Orion** defines how pilots acquire, equip, and manage mech components. Because pilots are interlopers in the world, most gear must be scavenged, discovered, or crafted from schematics. Itemization ensures that every build feels earned and personalized.

## 📦 Core Principles
- **Discovery-Driven:** Gear is not freely available; players must find blueprints, schematics, or rare drops.  
- **Role-Oriented:** Items align with combat roles (Vanguard, Striker, Tactical, Artillery, Utility, Control).  
- **Resource-Linked:** Items interact with balance stats (Energy, Heat, Threat) to shape playstyle.  
- **Scalable:** Early items provide baseline functionality, while advanced items unlock specialization.

## 🛡️ Item Categories
- **Armor Components**  
  External plating and mounts. Defines durability, load, and stability.  
  *Examples:* Head optics, torso plating, arm stabilizers, leg platforms.

- **Frame Components**  
  Internal systems that define mech identity.  
  *Examples:* Generators, cooling systems, propulsion units, sensor suites.

- **Weapons**  
  Offensive identity. Includes main weapons and sidearms.  
  *Examples:* Cannons, rifles, blades, mortars, pistols.

- **Auxiliaries**  
  Tactical subsystems that expand mech capabilities.  
  *Examples:* Shield emitters, cloaking devices, drones.

- **Utilities**  
  Consumables and deployables for situational advantage.  
  *Examples:* Coolant packs, grenades, mines, ammo reloads.

## 🔑 Acquisition Methods
- **Blueprints & Schematics:** Found in dungeons, enemy drops, or faction caches. Unlock new gear types.  
- **Material Scavenging:** Collect ores, alloys, magitech components to craft or upgrade.  
- **Faction Rewards:** Completing missions or aligning with factions grants unique item sets.  
- **Exploration:** Rare items hidden in world regions encourage replayability.

## 🎯 Player Experience
- **Exploration Reward:** Every dungeon or mission can yield new gear opportunities.  
- **Customization:** Players mix and match armor, weapons, and subsystems to define builds.  
- **Progression:** Itemization ensures steady growth from basic survival gear to specialized role-defining equipment.

## Design Insight
Itemization is the backbone of progression. By tying gear to discovery and resource management, players feel like true interlopers scavenging power from a hostile world. This system ensures that every mech is unique, earned, and thematically grounded.

---

# EQUIPMENT SYSTEM

The Gear system in **Project Orion** defines how pilots customize their mechs through armor, frame components, weapons, auxiliaries, and utilities. Each slot type has a distinct role, balancing **stat-based performance** with **equipment-based expression**.

## Armor Slots
Armor provides external plating and structural mounts. These are **equipment-type** slots.

- **Head Armor**  
  Optics housing, sensor protection.  
- **Torso Armor**  
  Reactor casing, core plating, shield mounts.  
- **Arm Armor**  
  Weapon stabilizers, recoil dampeners.  
- **Leg Armor**  
  Mobility platforms (bipedal, reverse-joint, quadrupedal, tank treads).  

Armor defines **defense, load capacity, and physical stability**.

## Frame Components
Frame components are internal systems that define mech identity. Most are **stat-type**, except auxiliaries.

- **Generator (Stat)** — Energy pool, recharge rate.  
- **Cooling System (Stat)** — Heat dissipation, vent cycle efficiency.  
- **Propulsion (Stat)** — Tracks, boosters, and aerial control.  
- **Sensor Suite (Stat)** — Lock-on speed, perception range, targeting accuracy.  
- **Auxiliary Mounts (Equipment)** — Tactical subsystems (shield emitters, cloaks, drones).  

## Weapon Slots
Weapons define offensive identity. These are **equipment-type** slots.

- **Main Weapon Sets (x2)**  
  - Set 1 = Main 1 + Main 2  
  - Set 2 = Main 3 + Main 4  
  - Arm-mounted, swappable with cooldown.  
- **Sidearms (x2)**  
  Compact fallback weapons (pistols, SMGs, daggers).  

## Utility Slots
Utility slots provide tactical consumables and deployables. These are **equipment-type** slots.

- **Belt Slots (x4)**  
  Consumables (coolant packs, grenades, mines, ammo reloads).  

## Slot Classification Summary

| Category        | Slot            | Type        | Function |
|-----------------|-----------------|-------------|----------|
| **Armor**       | Head, Torso, Arms, Legs | Equipment | Physical plating, load, defense |
| **Frame**       | Generator, Cooling, Boosters, Sensors | Stat | Defines energy, heat, mobility, accuracy |
| **Frame**       | Auxiliary Mounts | Equipment | Tactical subsystems |
| **Weapons**     | Main Weapons (x4), Sidearms (x2) | Equipment | Offensive systems |
| **Utility**     | Belt Slots (x4) | Equipment | Consumables, deployables |

## Design Insight
- **Armor = external plating.** Always equipment type.  
- **Frame components = internal systems.** Mostly stat type, except auxiliaries.  
- **Weapons = offensive identity.** Arm-mounted and sidearms.  
- **Utility = tactical consumables.** Belt slots for situational tools.  

The Gear system ensures every mech has a **unique frame identity** through stat slots, while equipment slots allow for **creative loadout expression**.

---

# FRAME SYSTEM

The **Frame** is the mech's skeleton and core systems. It establishes baseline **structural stats** and **balance stats**, which define the mech's physical limits and behavioral identity. Armor, weapons, and feats build on this foundation.

## 🏗️ Structural Stats
Structural stats are tied directly to the frame's construction. They represent the mech's physical capabilities.

- **Durability**  
  Function: Additional plating layered under armor.  
  Role: Governs survivability and total health pool.  
  Source: Frame reinforcement, not tied to a single component.  

- **Load Capacity**  
  Function: Total frame weight capacity.  
  Role: Determines what weapons, armor, and gear can be mounted.  
  Source: Frame construction and actuators (muscle equivalents).  

- **Propulsion**  
  Function: Core movement system (walk/run, thrust, jump).  
  Role: Defines mech speed, traversal style, and endurance.  
  Source: Integrated propulsion systems.  

- **Stability**  
  Function: Balancing the frame during offensive and defensive actions.  
  Role: Governs recoil absorption, stagger resistance, and recovery from impacts.  
  Source: Frame balance and actuator control.  

## ⚖️ Balance Stats
Balance stats are reactor‑driven and determine the mech's ultimate behavior in combat. They define how builds feel and interact with enemies.

- **Energy**  
  Function: Reactor pool and regeneration rate.  
  Role: Fuels weapons, auxiliaries, and subsystems.  
  Identity: High energy = sustained firepower; low energy = burst builds.  

- **Heat**  
  Function: Dissipation rate and overheat threshold.  
  Role: Governs cadence of weapon fire and reactor stability.  
  Identity: High tolerance = aggressive builds; low tolerance = precision builds.  

- **Threat**  
  Function: Enemy awareness and aggro generation.  
  Role: Controls targeting priority in co‑op play.  
  Identity: High threat = tank/control builds; low threat = stealth/skirmisher builds.  

## 📊 Stat Classification Summary

| Category        | Stat        | Function |
|-----------------|-------------|----------|
| **Structural**  | Durability  | Survivability via plating under armor |
|                 | Load        | Skeleton + actuator capacity for gear |
|                 | Propulsion  | Movement style (walk/run, thrust, jump) |
|                 | Stability   | Balance in offense/defense, recoil, stagger recovery |
| **Balance**     | Energy      | Reactor pool/regeneration, fuels systems |
|                 | Heat        | Dissipation/threshold, cadence control |
|                 | Threat      | Aggro/awareness, defines role in combat |

## 🎯 Design Insight
- **Structural stats = hard limits.** They define what the mech can equip and how it physically performs.  
- **Balance stats = behavioral identity.** They determine how the mech feels to play and how enemies respond.  
- **Feats = modifiers.** They bend both sets: adding plating (durability), bypassing load limits, extending propulsion efficiency, or manipulating balance stats for unique builds.  

The Frame is the foundation of every build. Armor, weapons, and feats layer on top, but the frame always defines the mech's core identity.

---

# RESOURCE SYSTEM

Resources in **Project Orion** define the mech's behavioral identity. While **structural stats** set physical limits, resources determine how builds *feel* in combat. Each resource can be prioritized differently across roles, creating unique playstyles.

## 🔥 Heat
Heat governs cadence, reactor strain, and overdrive potential.

### Priority Chains
- **Pure Heat**  
  *Identity:* Overdrive specialists.  
  *Behavior:* Push weapons/reactors to extreme output, living on the edge of overheating.  
  *Strengths:* Burst potential, AoE suppression.  
  *Weaknesses:* Shutdown risk.  
  *Example Role:* Artillery Overdriver.

- **Heat > Energy**  
  *Identity:* Aggressive reactors.  
  *Behavior:* Heat is the limiter, Energy fuels sustained bursts.  
  *Strengths:* Sustained DPS with bursts.  
  *Weaknesses:* Energy drain accelerates Heat.  
  *Example Role:* Striker Overclocker.

- **Heat > Threat**  
  *Identity:* Volatile tanks.  
  *Behavior:* Heat drives aggression, Threat rises as consequence.  
  *Strengths:* Natural aggro through explosive output.  
  *Weaknesses:* Collapse risk if overheated.  
  *Example Role:* Vanguard Juggernaut.

- **Heat > Energy > Threat**  
  *Identity:* Balanced aggressors.  
  *Behavior:* Heat fuels damage, Energy sustains it, Threat emerges as byproduct.  
  *Strengths:* Flexible hybrid.  
  *Weaknesses:* Jack‑of‑all‑trades.  
  *Example Role:* Tactical Demolisher.

- **Heat > Threat > Energy**  
  *Identity:* Dominators.  
  *Behavior:* Heat drives aggression, Threat manipulation defines presence, Energy is secondary.  
  *Strengths:* Control through intimidation.  
  *Weaknesses:* Energy inefficiency.  
  *Example Role:* Control Enforcer.

## 🔋 Energy
Energy governs reactor pool, regeneration, and subsystem uptime.

### Priority Chains
- **Pure Energy**  
  *Identity:* Sustainers.  
  *Behavior:* Maximize reactor pool and regen.  
  *Strengths:* Endless uptime for weapons/auxiliaries.  
  *Weaknesses:* Vulnerable if disrupted.  
  *Example Role:* Utility Conduit.

- **Energy > Heat**  
  *Identity:* Overclockers.  
  *Behavior:* Energy fuels output, Heat is secondary limiter.  
  *Strengths:* Burst damage with controlled cadence.  
  *Weaknesses:* Heat spikes if Energy is overspent.  
  *Example Role:* Striker Reactor Blade.

- **Energy > Threat**  
  *Identity:* Efficient controllers.  
  *Behavior:* Energy sustains auxiliaries, Threat manipulation is secondary.  
  *Strengths:* Battlefield control through subsystem uptime.  
  *Weaknesses:* Low direct damage.  
  *Example Role:* Control Operator.

- **Energy > Heat > Threat**  
  *Identity:* Balanced sustainers.  
  *Behavior:* Energy fuels, Heat regulates, Threat emerges.  
  *Strengths:* Flexible sustain + suppression.  
  *Weaknesses:* Mediocre burst.  
  *Example Role:* Tactical Coordinator.

- **Energy > Threat > Heat**  
  *Identity:* Manipulators.  
  *Behavior:* Energy drives control, Threat manipulation defines role, Heat is tertiary.  
  *Strengths:* Ally support + aggro redirection.  
  *Weaknesses:* Weak offensive scaling.  
  *Example Role:* Utility Anchor.

## 🎛️ Threat
Threat governs enemy awareness, aggro generation, and battlefield presence.

### Priority Chains
- **Pure Threat**  
  *Identity:* Anchors.  
  *Behavior:* Maximize aggro generation.  
  *Strengths:* Enemy focus control.  
  *Weaknesses:* High incoming damage.  
  *Example Role:* Vanguard Sentinel.

- **Threat > Heat**  
  *Identity:* Aggro reactors.  
  *Behavior:* Threat generation amplified by Heat output.  
  *Strengths:* Natural tanking through aggression.  
  *Weaknesses:* Risk of overheating.  
  *Example Role:* Juggernaut Vanguard.

- **Threat > Energy**  
  *Identity:* Aggro sustainers.  
  *Behavior:* Threat generation amplified by Energy use.  
  *Strengths:* Sustained tanking via subsystem uptime.  
  *Weaknesses:* Energy drain leaves them vulnerable.  
  *Example Role:* Control Guardian.

- **Threat > Heat > Energy**  
  *Identity:* Aggro dominators.  
  *Behavior:* Threat is primary, Heat spikes add volatility, Energy sustains.  
  *Strengths:* Battlefield presence + suppression.  
  *Weaknesses:* Energy inefficiency.  
  *Example Role:* Control Bulwark.

- **Threat > Energy > Heat**  
  *Identity:* Tactical tanks.  
  *Behavior:* Threat anchors enemies, Energy sustains defenses, Heat is tertiary.  
  *Strengths:* Reliable tanking with subsystem uptime.  
  *Weaknesses:* Lower burst potential.  
  *Example Role:* Utility Bastion.

## 📊 Resource Priority Matrix

| Resource | Pure Role | Secondary Chains | Tertiary Chains |
|----------|-----------|------------------|-----------------|
| **Heat** | Overdriver | Heat > Energy, Heat > Threat | Heat > Energy > Threat, Heat > Threat > Energy |
| **Energy** | Sustainer | Energy > Heat, Energy > Threat | Energy > Heat > Threat, Energy > Threat > Heat |
| **Threat** | Anchor | Threat > Heat, Threat > Energy | Threat > Heat > Energy, Threat > Energy > Heat |

## 🎯 Design Insight
- **Resources behave consistently across roles.** Heat = cadence, Energy = sustain, Threat = aggro.  
- **Roles interpret resources differently.** One embraces, another suppresses, another manipulates.  
- **Feats tie into chains.** Minor feats boost the primary resource, major feats exploit secondary/tertiary interactions.  
- This creates a **matrix of roles** where every build has a clear identity based on resource priority.

---

# CRAFTING & UPGRADING

Crafting and upgrading in **Project Orion** define how pilots transform scavenged materials and discovered schematics into functional mech components. As interlopers, pilots cannot rely on native supply chains; instead, they must **find, forge, and refine** their gear through exploration and resource management.

## ⚙️ Core Principles
- **Blueprints First:** New components require blueprints or schematics discovered in the world. Without them, crafting is impossible.  
- **Materials Matter:** Every item requires specific materials (ores, alloys, magitech components). Higher-tier items demand rarer resources.  
- **Incremental Upgrades:** Existing gear can be modified or enhanced, often with fewer restrictions but still requiring materials.  
- **Role Alignment:** Crafted and upgraded gear ties into combat roles (Vanguard, Striker, Tactical, Artillery, Utility, Control).  
- **Resource Integration:** Crafting and upgrades interact with balance stats (Energy, Heat, Threat), shaping mech behavior.  

## 🛠️ Crafting System
Crafting is the process of creating new components from scratch using blueprints and materials.

### Steps
1. **Acquire Blueprint**  
   - Found in dungeons, faction caches, or rare drops.  
   - Unlocks the ability to craft a specific item type.  

2. **Gather Materials**  
   - Common → Rare → Exotic tiers.  
   - Materials define item quality and potential modifiers.  

3. **Assembly Process**  
   - Combine blueprint + materials at a workshop or field forge.  
   - Crafting consumes resources permanently.  

4. **Resulting Item**  
   - New gear enters inventory.  
   - May include randomized sub-modifiers (e.g., +Heat tolerance, +Energy regen).  

### Crafting Categories
- **Armor:** Reinforced plating, reactive shielding.  
- **Frame Components:** Generators, cooling systems, propulsion units.  
- **Weapons:** Cannons, rifles, blades, mortars.  
- **Auxiliaries:** Cloaks, shield emitters, drones.  
- **Utilities:** Deployables, consumables.  

## 🔧 Upgrading System
Upgrading improves existing gear, enhancing stats or adding new modifiers.

### Types of Upgrades
- **Stat Enhancements:** Increase durability, load capacity, propulsion efficiency, stability.  
- **Resource Modifiers:** Adjust Energy regen, Heat dissipation, Threat generation.  
- **Gear Augments:** Add new functions (e.g., shield emitters restore Energy, weapons vent Heat).  

### Upgrade Paths
- **Linear Upgrades:** Straightforward stat increases (e.g., +10% Durability).  
- **Branching Upgrades:** Choose between different enhancements (e.g., heavier plating vs reactive shielding).  
- **Hybrid Upgrades:** Combine stat and gear modifiers (e.g., +Stability and recoil dampening).  

### Requirements
- **Materials:** Even upgrades require scavenged resources.  
- **Prerequisites:** Some upgrades require prior feats, role alignment, or specific gear equipped.  
- **Risk/Reward:** Certain upgrades improve one stat while straining another (e.g., +Durability but +Heat load).  

## 🔄 Crafting vs Upgrading
- **Crafting = Expansion.** Adds new gear to the arsenal.  
- **Upgrading = Refinement.** Improves or modifies existing gear.  
- Together, they create a loop: *discover → craft → upgrade → specialize*.  

## 🎯 Player Experience
- **Exploration Reward:** Crafting and upgrading tie progression to exploration and scavenging.  
- **Customization:** Players tailor mechs to their preferred role and resource chain.  
- **Strategic Depth:** Deciding whether to craft new gear or upgrade existing components creates meaningful choices.  
- **Narrative Fit:** Reinforces pilots as scavengers and engineers, piecing together power from a hostile world.  

## Design Insight
Crafting and upgrading are two sides of the same coin: crafting expands the arsenal, upgrading refines it. Together, they ensure that every mech evolves through **earned progression**, balancing discovery, resource management, and role-driven specialization.

---

# COMPLETE PARTS INDEX

## Weapons

### Physical Damage
- **[N-55 Gladius]**  
  - Type: Rifle (burstfire stabilization)  
  - Weight: Medium  

- **[[M-300 Hasta]]** 
  - Type: Mid‑range autocannon  
  - Weight: Medium  

- **[[M-450 Pilum]]**
  - Type: Heavy autocannon (shock‑channeling spine)  
  - Weight: Heavy  

- **[[S-2 Turbine Khopesh]]**  
  - Type: Compact fallback blade (dual‑wield capable)  
  - Weight: Light  

- **[[B-25 Brushcutter]]**  
  - Type: Twin‑rotor gatling gun  
  - Weight: Heavy  

- **[[M-350 Mauler]]**  
  - Type: Grenade cannon (burst fire)  
  - Weight: Medium  

- **[[LG-950 Tomahawk]]**  
  - Type: Long‑range missile system (soft lock)  
  - Weight: Heavy  

- **[[Siegebreaker]]**
  - Type: Oversized battle‑axe (two‑handed)  
  - Weight: Heavy  

### Blast Damage
- **[[LN-1200 Avalanche]]**  
  - Type: Long‑range rocket system (interference shielding)  
  - Weight: Heavy  

### Energy Damage
- **[[LS-900 Swordspear]]**  
  - Type: Mana‑channeling polearm (cleave strikes)  
  - Weight: Medium  

- **[[RS-450 Projector]]**  
  - Type: Mid‑range beam emitter (shield reinforcement)  
  - Weight: Medium  

- **[[HL-220 Lightburst]]**  
  - Type: Reactor‑linked lance (Judgment Strike)  
  - Weight: Heavy  

- **[[TIG Edge]]**  
  - Type: Compact energy blade  
  - Weight: Light  

## Armor / Core Frames
- **[[BWI Bastion Coreplate]] (Warrior)** — Heavy frontal armor with turbine shielding.  
- **[[Fire & Ice Fortress Coreplate]] (Marauder)** — Super‑heavy frontal armor with outrigging stabilizers.  
- **[[Dawnforge Guardian Coreplate]] (Paladin)** — Heavy armor with stabilizer anchors and energy shield emitters.  

## Core Systems
- **[[PNSY Alchemic Turbine Core Mk.IV]] (Warrior)** — Magitech engine, volatile heat output (supports overclock).  
- **[[RAD Battleheart Ether Reactor Mk.V]] (Marauder)** — Ether reactor with recycling feedback loops.  
- **[[TI Manaheart Reactor Mk.IV]] (Paladin)** — Energy reactor powering shields, aura projection, cleave systems.  

## Defensive Systems
- **[[PNSY R‑11 Rockweiler Buckler]] (Warrior)** — Parrying shield with reactive plating.  
- **[[PNSY UF‑9 Rough Rider Booster]] (Warrior)** — Engagement/evasion kit with thrusters.  
- **[[PNSY D‑0g Repair Drone]] (Warrior)** — Bay‑launched repair drone.  

- **[[RAD R‑22 Bastion Kinetic Recycling]] (Marauder)** — Reactive plating absorbs energy, recycles power.  
- **[[RAD UF‑12 Ether Vapor Launcher]] (Marauder)** — Ether vapor canisters obscure vision, scramble targeting.  
- **[[RAD R463 Fathomless System]] (Marauder)** — Excess energy repairs subsystems and armor.  

- **[[TI Aegis Hard‑Light Shield]] (Guardian)** — Deployable frontal barrier (*Hardening Light*).  
- **[[TI Radiant Sphere Generator]] (Guardian)** — Protective dome around allies.  
- **[[TI Lightwell Recovery System]] (Guardian)** — Converts excess reactor energy into subsystem repair.  
- **[[TI Aegis Charge Buckler]] (Guardian)** — Compact physical shield enabling *Shield Charge*.  

## Optics & Sensors
- **[[Crystal Dynamics EmberSight Suite]] (Warrior)** — Mid‑short range targeting optics.  
- **[[BE Foresight Targeting Array]] (Marauder)** — Long‑range optics with missile tracking.  
- **[[Aegis Radiant Targeting Array]] (Guardian)** — Optics tuned for shield projection and cleave precision.  

- **[[Federated T7 Sensor Array]] (Warrior)** — Heat and motion battlefield monitor.  
- **[[Federated EchoPulse Scanner]] (Warrior)** — Acoustic scanner for breach detection.  
- **[[NDS ArcPulse Sensor Grid]] (Marauder)** — Blast disruption scanner.  
- **[[NDS EchoStorm Threat Analyzer]] (Marauder)** — Missile lock detection.  
- **[[Solbright Flux Sensor Grid]] (Guardian)** — Shield harmonics and battlefield awareness.  
- **[[Aegis Lightveil Analyzer]] (Guardian)** — Analyzer for artillery saturation and shield stress.  

## Verification & Redundancy Check
- **Shields moved to Defensive Systems**: Bucklers, Hard‑Light, Sphere Generator, Charge Buckler.  
- **Damage types standardized**: Physical, Blast, Energy.  
- **Unique roles confirmed**:  
  - *Warrior*: balanced striker (rifles, autocannons, khopesh, buckler, drone).  
  - *Marauder*: super‑heavy artillery (gatling, rockets, missiles, kinetic plating, vapor launcher).  
  - *Guardian*: defensive vanguard (sword‑spear, energy projector, lance, shields, sphere).  
- **No duplicates**: Each part has a distinct function (weapon, shield, armor, core, sensor).

---

# TRAIT LINE LOADOUTS

## WARRIOR (FIGHTER) LOADOUT

### EQUIPMENT LOADOUT — PNSY W416 "Warrior"

#### Panntella Nova Smithy Yard Design Sheet
**Collaborators:**
- Federated Hard Forge Interfaces  
- Crystal Dynamics: Emerald Branch  
- Bog Welding Inc.  

#### Design Overview
- Medium‑weight frontline striker  
- Reinforced front‑facing armor plates for durability  
- Rear core vents produce thrust for rapid repositioning  
- Low center of gravity for balance under fire  
- High stability enabling high‑speed maneuvers and precision strikes  

#### Core Components
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Head**    | Crystal Dynamics G341 Murmillio    | Reinforced helm with glowing alchemic optic core and heat‑dispersing vents  |
| **Torso**   | BWI Bastion Coreplate              | Heavy frontal armor with turbine shielding and inverted chevron insignia    |
| **Arms**    | BWI Twinstrike Gauntlets           | Arm modules with recoil dampeners and reinforced joints for sustained fire  |
| **Legs**    | BWI Gatecrasher Striders           | Shock‑absorbing leg units with booster‑linked actuators for agile movement  |
| **Generator** | PNSY Alchemic Turbine Core Mk.IV | High‑compression magitech engine with volatile heat output (supports overclock feats) |
| **Energy Storage** | Crystal Dynamics ERD Lodestone | Field‑controlled energy reservoir for rapid discharge                       |
| **Optics**  | Crystal Dynamics EmberSight Suite  | Mid‑short range targeting system for fast acquisition and precision         |
| **Sensory A** | Federated T7 Sensor Array        | Battlefield monitor for heat and motion signatures                          |
| **Sensory B** | Federated EchoPulse Scanner      | Acoustic scanner tuned for breach zone detection                            |

#### Weapons
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Weapon 1** | PNSY N‑55 Gladius                 | Rifle with reinforced frame and burstfire stabilization                     |
| **Weapon 2** | PNSY N‑55 Gladius                 | Identical twin for synchronized fire and breach suppression                 |
| **Weapon 3** | PNSY M‑300 Hasta                  | Mid‑range autocannon with moderate fire rate                                |
| **Weapon 4** | PNSY M‑450 Pilum                  | Heavy autocannon with shock‑channeling spine and reinforced hilt            |
| **Sidearm 1** | PNSY S‑2 Turbine Khopesh         | Compact fallback blade with turbine‑assisted swing and heat shimmer         |
| **Sidearm 2** | PNSY S‑2 Turbine Khopesh         | Mirrored variant for dual‑wielding or emergency parry                       |

#### Defensive Systems
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Defensive 1** | PNSY R‑11 Rockweiler Buckler   | Stone parrying shield with reactive plating and embedded sensor node        |
| **Defensive 2** | PNSY UF‑9 Rough Rider Booster  | Engagement and evasion kit with directional thrusters and heat venting      |
| **Defensive 3** | PNSY D‑0g Repair Drone         | Bay‑launched repair drone with patching protocols and diagnostics suite     |

---

## MARAUDER (BARBARIAN) LOADOUT

### EQUIPMENT LOADOUT — RAD Industries HAU "Marauder"

#### Rolson Anduli Development Design Sheet
**Collaborators:**
- Northern Defense Systems  
- Bowlson Electromancy  
- Fire and Ice Metallurgy  

#### Design Overview
- Super‑heavy frontline artillery platform  
- Long‑ and short‑range fire suppression capability  
- Superior stability with outrigging stabilizers  
- Mid‑range missile defense lattice for interception  
- Targeting interference systems for battlefield disruption  

#### Core Components
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Head**    | BE Ironveil Command Dome           | Reinforced helm with layered shielding and interference dampeners           |
| **Torso**   | Fire & Ice Fortress Coreplate      | Super‑heavy frontal armor with outrigging stabilizers and missile defense lattice |
| **Arms**    | Fire & Ice Line Holder             | Oversized arm modules with shock‑channeling conduits and reinforced recoil bracing |
| **Legs**    | Fire & Ice Outrigger Striders      | Heavy plates with specialized actuators for enhanced stability under siege  |
| **Power**   | RAD Battleheart Ether Reactor Mk.V | Ether reactor with recycling feedback loops for sustained output            |
| **Optics**  | BE Foresight Targeting Array       | Long‑range optics suite with interference countermeasures and missile tracking |
| **Sensory A** | NDS ArcPulse Sensor Grid         | Long‑range field scanner for suppression and target disruption              |
| **Sensory B** | NDS EchoStorm Threat Analyzer    | Wide‑band threat scanner tuned for missile lock detection                   |

#### Weapons
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Weapon 1** | RAD B‑25 Brushcutter              | Twin‑rotor gatling gun; intercepts incoming fire while delivering return hail |
| **Weapon 2** | RAD M‑350 Mauler                  | Mid‑range grenade cannon; fires in three‑shot bursts for suppression        |
| **Weapon 3** | RAD LN‑1200 Avalanche Launcher    | Long‑range rocket system with interference shielding and stabilizer fins    |
| **Weapon 4** | RAD LG‑950 Tomahawk               | Long‑range missile system with soft lock capability                         |
| **Sidearm 1** | RAD Siegebreaker (Two‑Handed)    | Oversized battle‑axe type weapon with integrated energy vent                |
| **Sidearm 2** | Reserved Slot                    | Alternate heavy melee integration                                           |

#### Defensive Systems
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Defensive 1** | RAD R‑22 Bastion Kinetic Recycling | Reactive plating absorbs incoming energy, reducing damage and recycling power |
| **Defensive 2** | RAD UF‑12 Ether Vapor Launcher | Launches ether vapor canisters to obscure vision and scramble targeting     |
| **Defensive 3** | RAD R463 Fathomless System     | Uses excess energy to repair subsystems, armor, and frame components        |

---

## GUARDIAN (PALADIN) LOADOUT

### EQUIPMENT LOADOUT — Trinity Industries DE-14 "Guardian"

#### Trinity Industries Development Design Sheet
**Collaborators:**
- Aegis Dynamics  
- Solbright Magitech Consortium  
- Dawnforge Metallurgy  

#### Design Overview
- Heavy frontline defensive vanguard platform  
- Reactor-driven shielding and melee amplification  
- Superior stability with integrated stabilizers  
- Area denial through radiant sphere projection  
- Close-quarters control with mana cleave systems  
- Visual silhouette: radiant shield + spear, mythic defender under fire  

#### Core Components
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Head**    | Aegis Halo Command Dome            | Helm with mana-channeling conduits and tactical shield uplink               |
| **Torso**   | Dawnforge Guardian Coreplate       | Heavy armor with stabilizer anchors and radiant shield emitters             |
| **Arms**    | Solbright Cleaver Assemblies       | Arm modules with reactor-linked sword-spear channels                        |
| **Legs**    | Dawnforge Stabilizer Striders      | Heavy-duty leg assemblies with stabilizer anchors; supports *Unfaltering* feat |
| **Power**   | TI Manaheart Reactor Mk.IV         | Mana reactor powering shields, aura projection, and cleave systems (*Protector's Aura*, *Radiant Cleave*) |
| **Optics**  | Aegis Radiant Targeting Array      | Optics tuned for shield projection and cleave precision                     |
| **Sensory A** | Solbright Flux Sensor Grid       | Sensor grid for shield harmonics and battlefield awareness                  |
| **Sensory B** | Aegis Lightveil Analyzer         | Analyzer tuned for artillery saturation and shield stress testing           |

#### Weapons
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Weapon 1** | TI LS-900 Sword-Spear             | Mana-channeling polearm; executes sweeping cleave strikes (*Radiant Cleave*) |
| **Weapon 2** | TI RS-450 Radiant Projector        | Mid-range radiant beam emitter; doubles as shield reinforcement (*Protector's Aura*) |
| **Weapon 3** | TI HL-220 Lightburst Lance         | Reactor-linked lance; executes Judgment Strike for devastating close-range sweeps |
| **Weapon 4** | Reserved Slot                     | Optional plasma halberd or radiant hammer integration                       |
| **Sidearm 1** | TI Guardian's Edge               | Compact mana blade for precision melee defense                              |
| **Sidearm 2** | TI Aegis Charge Buckler          | Physical shield enabling *Shield Charge* feat; reinforced with impact dampeners |

#### Defensive Systems
| Slot        | Component Name                     | Description                                                                 |
|-------------|------------------------------------|-----------------------------------------------------------------------------|
| **Defensive 1** | TI Aegis Hard-Light Shield      | Deployable frontal barrier; absorbs sustained fire until reactor saturation (*Hardening Light*) |
| **Defensive 2** | TI Radiant Sphere Generator     | Forms protective dome around allies; duration limited by reactor reserves   |
| **Defensive 3** | TI Lightwell Recovery System    | Converts excess reactor energy into subsystem repair and shield reinforcement |

---

# COMPLETE FEAT TREES

## Tier I Feats

### Fighter
- **Booster Evasion** — Booster kit; grants boost i‑frames.  

### Fighter/Barbarian
- **Momentum Guard** — Booster kit; stagger resistance while boosting.  

### Fighter/Paladin
- **Radiant Step** — Booster kit + mana core; boost leaves radiant shimmer granting allies stagger resistance.  
- **Radiant Dash** — Booster kit + mana core; boost leaves radiant afterimage that blinds enemies.  

### Barbarian
- **Siege Stability** — Heavy/super‑heavy chassis; outriggers grant stagger immunity while firing heavy weapons.  

### Barbarian/Paladin
- **Anchored Action** — Stabilizer frame + shield/booster; while anchored, either evasion or shield charge gains stagger immunity.  
- **Stabilizer Pulse** — Stabilizer frame + energy shield; anchored shield emits pulse reducing ranged damage for allies.  

### Paladin
- **Shield Charge**  
  *Requirement:* Physical shield equipped  
  *Description:* Charges toward the enemy with shield raised. On impact, causes a short stun.  
  *Trait:* Paladin  

---

## Tier II Feats

### Fighter
- **Sidearm Twin-Link** — Matching sidearms; dual strike execution.  

### Fighter/Barbarian
- **Suppression Link** — Matching suppression weapons; burstfire or sustained fire triggers twin-link bursts.  

### Fighter/Paladin
- **Shielded Volley** — Shield + sidearms; fire sidearms while shielding.  
- **Twin Guard** — Shield + sidearms; suppressive fire while defending.  
- **Radiant Intercept** — Intercept weapon + mana core; intercept shots emit radiant flare that blinds enemies.  

### Barbarian
- **Suppression Chainfire** — Suppression/intercept weapon; sustained fire builds suppression stacks.  

### Barbarian/Paladin
- **Aura of Suppression** — Mana core + suppression weapon; aura reduces enemy accuracy/movement.  

### Paladin/Barbarian
- **Guardian's Interference** — Mana core + interference launcher; aura scrambles enemy targeting.  

### Paladin
- **Protector's Aura**  
  *Requirement:* Mana core equipped  
  *Description:* Reserves a portion of total energy as interference shielding for the user and nearby allies. Prevents damage from ranged energy attacks (except AoE). Deflects, but does not fully block small arms fire.  
  *Trait:* Paladin  

---

## Tier III Feats

### Fighter
- **Sidearm Parry** — Parry-capable sidearm; enables defensive parry.  

### Fighter/Barbarian
- **Attrition Riposte** — Parry weapon; successful parries restore reactor energy. *Loop breaker: once per enemy attack cycle.*  
- **Reactive Overload** — Suppression weapon; damage taken reduces cooldowns. *Loop breaker: stacks decay after 5s.*  
- **Overclock Guard** — Overclock core + defensive plating; overclock hardens plating, reducing damage but increasing reactor heat.  

### Fighter/Paladin
- **Overload Cleave** — Mana reactor + melee; cleave builds overload stacks, next boost restores shield energy. *Loop breaker: stacks capped at 3.*  
- **Cleave Counter** — Mana reactor + parry weapon; parry triggers radiant cleave wave.  

### Barbarian
- **Attrition Guard** — Defensive plating; converts incoming damage into reactor energy. *Loop breaker: diminishing returns per trigger.*  

### Barbarian/Paladin
- **Radiant Barrage** — Mana reactor + heavy weapon; cleave triggers short burst barrage.  

### Paladin/Barbarian
- **Cleave Suppression** — Mana reactor + suppression weapon; cleave applies suppression stacks. *Loop breaker: suppression immunity window on enemies.*  

### Paladin
- **Radiant Cleave**  
  *Requirement:* Mana reactor equipped; main slot melee weapon installed  
  *Description:* Charge up melee weapon to perform a 180° sweep in front of the user, releasing a mana‑energy wave that damages enemies in its arc.  
  *Trait:* Paladin  
  *Loop Breaker:* Can only trigger one secondary effect per cleave.  

---

## Tier IV Feats

### Fighter
- **Main Weapon Twin-Link** — Matching main weapons; fire all 4 simultaneously.  

### Fighter/Barbarian
- **Overclock Barrage** — Overclock core + suppression weapon; resets cooldowns, boosts suppression fire rate. *Loop breaker: adds reactor heat each use, cannot reset Core Overclock.*  
- **Disruption Riposte** — Interference launcher; activation grants brief parry window.  

### Fighter/Paladin
- **Guardian's Dash** — Booster kit + energy shield; boost through enemies triggers shield pulse, stunning and restoring ally shields. *Loop breaker: cooldown 10s.*  
- **Overclocked Ward** — Overclock core + energy shield; boosts shield recharge and grants CC immunity.  
- **Suppression Ward** — Energy shield + suppression weapon; shield activation projects suppression stacks onto enemies.  

### Barbarian
- **Disruption Field** — Interference launcher; aura doubles effect duration.  

### Barbarian/Paladin
- **Unyielding Bulwark** — Heavy frame + energy shield; CC immunity while shielding allies.  

### Paladin/Barbarian
- **Siege Ward** — Heavy frame + radiant sphere; dome grants stagger/stun immunity to allies.  

### Paladin
- **Unfaltering**  
  *Requirement:* Heavy or super‑heavy frame equipped  
  *Description:* When buffing an ally, the user becomes immune to crowd control effects for the duration of the buff.  
  *Trait:* Paladin  

---

## Tier V Feats

### Fighter
- **Core Overclock** — Overclock core; resets all cooldowns, volatile heat tradeoff. *Loop breaker: cannot reset itself or other reset feats.*  

### Fighter/Barbarian
- **Salvo Link** — Matching heavy weapons; chain into twin-link salvo bursts.  
- **Avalanche Surge** — Artillery optics; salvos overclock into rapid multi-target chains at heat cost. *Loop breaker: escalating energy cost per chain.*  

### Fighter/Paladin
- **Lightstorm Barrage** — Mana reactor + artillery optics; radiant salvo projectiles deal cleave damage.  
- **Lightstorm Salvo** — Mana reactor + artillery optics; radiant salvo projectiles deal suppression damage.  

### Barbarian
- **Multi-Lock Array** — Artillery optics; salvo systems lock multiple targets.  

### Barbarian/Paladin
- **Judgment Battery** — Mana reactor + artillery optics; cleave restores energy, boosts salvo lock speed.  
- **Radiant Convergence** — Mana reactor + radiant sphere generator; cleave/salvo inside sphere amplifies ally damage briefly.  

### Paladin/Barbarian
- **Avalanche Light** — Mana reactor + artillery optics; radiant salvo inflicts suppression damage.  

### Paladin
- **Hardening Light**  
  *Requirement:* Energy shield equipped  
  *Description:* Attacks against the user's energy shield return a portion of the damage and restore that amount of energy to the reactor.  
  *Trait:* Paladin

---

*End of Complete Armory Documentation*
