# M00-THE-BOG — MINIMAL ASSET LIST (Solo Dev Edition)
## Core Assets Only - Placeholder-Friendly

---

## PHILOSOPHY: MINIMAL VIABLE ASSETS

**Core Principles:**
- ✅ **Reuse everything possible**
- ✅ **Colored boxes are valid placeholders**
- ✅ **Single frame > animation** (use scaling/rotation for variety)
- ✅ **Tint/palette swap instead of unique sprites**
- ✅ **Free asset packs for backgrounds**
- ✅ **Focus on gameplay, not visuals**

**What This List Covers:**
- Bare minimum to make bog **playable**
- ~100-150 total assets (down from 875+)
- Most can be simple shapes with colors

---

## 1. ENVIRONMENT — ULTRA MINIMAL

### 1.1 Core Tileset (10 tiles)

**Ground (64x64 each):**
```
bog_ground_mud.png          → Brown rectangle (walkable)
bog_ground_stone.png        → Gray rectangle (walkable, ruins)
bog_water_corrosive.png     → Green rectangle (hazard)
```

**Walls/Obstacles (64x64):**
```
bog_wall_ruin.png           → Dark gray rectangle (blocks movement)
bog_tree_log.png            → Brown rectangle, rotated (obstacle)
```

**Transition Tiles (optional, can skip):**
```
bog_transition_mud_water.png → Blend brown/green (nice to have)
```

**SHORTCUT:** Use a free tileset (OpenGameArt, itch.io) and just recolor it brown/green for bog aesthetic.

---

### 1.2 Decorative Objects (8 assets)

**Simple Sprites (various sizes):**
```
bog_tree_background.png     → Brown triangle (128x256) - background tree
bog_ruin_pillar.png         → Gray rectangle (64x128) - pillar
bog_debris_rocks.png        → Gray irregular blob (32x32)
bog_debris_wood.png         → Brown irregular blob (32x32)
bog_mist_overlay.png        → Semi-transparent white cloud (256x256, tile it)
```

**Æther Effects (3 simple particles):**
```
bog_aether_particle.png     → Purple/blue dot (8x8)
bog_aether_glow.png         → Purple radial gradient (64x64, overlay)
bog_water_bubble.png        → White circle (8x8)
```

**Total Environment: 18 assets** (can be done in 1-2 hours with basic tools)

---

## 2. ENEMIES — MINIMAL SPRITES

### 2.1 Orc Warrior (8 frames total)

**Single Stance + States:**
```
orc_warrior_base.png        → 96x96 sprite (green humanoid, weapon raised)
orc_warrior_walk.png        → Same sprite, slight lean forward
orc_warrior_attack.png      → Same sprite, weapon forward
orc_warrior_hit.png         → Same sprite, tinted red
orc_warrior_dead.png        → Same sprite, rotated 90° (lying down)
```

**SHORTCUT:** 
- Start with single colored rectangle (green box)
- Add stick figure arms/weapon later if desired
- Use rotation/tinting for variations

---

### 2.2 Orc Scout (6 frames total)

**Palette Swap + Bow:**
```
orc_scout_base.png          → 96x96 sprite (same as warrior but smaller/blue tint)
orc_scout_aim.png           → Base + bow drawn
orc_scout_shoot.png         → Base + bow extended
orc_scout_hit.png           → Base tinted red
orc_scout_dead.png          → Base rotated 90°
orc_scout_smoke.png         → Gray cloud (48x48) - smoke bomb effect
```

**SHORTCUT:** 
- Reuse orc warrior, just shrink + recolor blue/gray
- Bow = simple line/arc

---

### 2.3 Bog Wurm (10 frames)

**Snake Shape:**
```
bog_wurm_base.png           → 192x128 serpentine shape (dark green/gray segmented body)
bog_wurm_head_raised.png    → Just the head portion, raised up
bog_wurm_coiled.png         → Circular coil shape
bog_wurm_attack.png         → Head lunging forward
bog_wurm_submerged.png      → Just ripples in water (32x32)
bog_wurm_hit.png            → Base tinted red
bog_wurm_dead.png           → Base, flat/still
```

**Machine Parts (overlay):**
```
bog_wurm_glow.png           → Purple energy veins (overlay, 192x128)
bog_wurm_metal.png          → Gray metallic segments (overlay)
```

**SHORTCUT:**
- Draw a wiggly segmented line
- Add circle for head
- Glowing overlay = purple lines on top

**Total Enemies: 24 assets** (2-3 hours for all 3 enemy types)

---

## 3. NPCs — BARE MINIMUM

### 3.1 The Orb / Poe (3 frames)

```
poe_orb.png                 → 64x64 glowing sphere (white/blue gradient)
poe_glow.png                → Radial glow overlay (96x96)
poe_particle.png            → Small sparkle (8x8)
```

**SHORTCUT:** Literally a white circle with outer glow in any image editor.

---

### 3.2 Bedivere's Corpse (2 assets)

```
bedivere_corpse.png         → 128x96 knight armor lying down (gray/silver rectangle with cross)
bedivere_looted.png         → Same but darker/grayer (optional)
```

**SHORTCUT:** Gray rectangle with cross = knight corpse. Done.

**Total NPCs: 5 assets** (15 minutes)

---

## 4. PLAYER MECH — START WITH ONE

### 4.1 Warrior Mech Only (12 frames)

**Core Sprites:**
```
mech_warrior_idle.png       → 128x128 mech (boxy humanoid, gray/blue)
mech_warrior_walk.png       → Slight lean forward
mech_warrior_shoot.png      → Arm extended
mech_warrior_melee.png      → Arm swinging
mech_warrior_dash.png       → Leaning hard forward + motion lines
mech_warrior_hit.png        → Tinted red flash
mech_warrior_damaged.png    → Sparks overlay (16x16, reusable)
```

**Weapon Held (draw on sprite or separate layer):**
```
mech_warrior_weapon_rifle.png   → Simple rifle shape (gray rectangle + barrel)
mech_warrior_weapon_blade.png   → Simple blade shape (gray triangle)
```

**Heat Vent Effect:**
```
mech_warrior_vent_steam.png     → White puff cloud (32x32, reusable)
```

**SHORTCUT:**
- Rectangle body + rectangle limbs = mech
- Add color = done
- Weapon = stick on top of sprite
- Later: Add other 5 mechs by palette swapping + weapon swaps

**Total Player: 12 assets** (1-2 hours for first mech)

---

## 5. WEAPONS & VFX — REUSABLE EFFECTS

### 5.1 Projectiles (6 assets)

```
projectile_bullet.png       → 4x4 yellow dot
projectile_arrow.png        → 16x4 brown line with triangle tip
projectile_rocket.png       → 24x8 orange/red rectangle with fins
projectile_beam.png         → 4px wide line (variable length, blue/white)
projectile_energy.png       → 8x8 glowing dot (recolor for different energy types)
projectile_grenade.png      → 8x8 gray circle
```

**Total: 6 assets** (30 minutes)

---

### 5.2 Impact Effects (8 assets)

**Explosions (reuse for all explosion types):**
```
impact_explosion_small.png  → 32x32 orange/yellow circle
impact_explosion_large.png  → 64x64 orange/yellow circle
```

**Hits:**
```
impact_spark.png            → 16x16 yellow starburst
impact_dust.png             → 24x24 brown cloud
impact_energy.png           → 24x24 blue flash
```

**Status Effects:**
```
effect_poison_cloud.png     → 48x48 green cloud
effect_acid_puddle.png      → 64x64 green blob
effect_smoke.png            → 48x48 gray cloud (reuse for smoke bomb, vent steam, etc.)
```

**Total: 8 assets** (30 minutes)

---

### 5.3 Melee Effects (2 assets)

```
effect_slash_trail.png      → 64x64 white arc/swoosh
effect_hit_flash.png        → 32x32 white flash (reuse for all melee impacts)
```

**Total: 2 assets** (10 minutes)

**Total VFX: 16 assets** (1 hour)

---

## 6. UI — ABSOLUTE MINIMUM

### 6.1 Title Screen (5 assets)

```
ui_title_background.png     → 1920x1080 dark bog image (can be zoomed environment tile)
ui_title_logo.png           → Text: "PROJECT ORION" (simple font, 800x200)
ui_button_default.png       → 400x80 gray rectangle
ui_button_hover.png         → 400x80 lighter gray rectangle
ui_button_pressed.png       → 400x80 darker gray rectangle
```

**SHORTCUT:** 
- Title bg = take environment tiles, zoom in, blur
- Buttons = literally colored rectangles
- Text = system font, white

**Total: 5 assets** (30 minutes)

---

### 6.2 HUD (12 assets)

**Core Bars:**
```
ui_bar_background.png       → 400x40 dark gray rectangle
ui_bar_health.png           → 400x40 red rectangle (fill)
ui_bar_energy.png           → 400x40 blue rectangle (fill)
ui_bar_heat.png             → 400x40 orange→red gradient rectangle (fill)
```

**Indicators:**
```
ui_icon_weapon.png          → 64x64 white silhouette (gun shape)
ui_icon_alert.png           → 32x32 red triangle with "!"
ui_minimap_bg.png           → 300x300 black rectangle with border
ui_minimap_player.png       → 16x16 white triangle (arrow)
ui_minimap_enemy.png        → 12x12 red dot
ui_minimap_npc.png          → 12x12 yellow dot
```

**Damage Numbers:**
```
ui_damage_font.png          → Number sprite sheet (0-9, simple white numbers)
ui_heal_font.png            → Same numbers but green
```

**SHORTCUT:** 
- All bars = solid color rectangles that scale horizontally
- Icons = simple shapes (triangle, circle, rectangle)
- Font = use engine's built-in text rendering instead of sprite sheet

**Total: 12 assets** (1 hour, or less if you use engine text rendering)

---

### 6.3 Menus (8 assets)

```
ui_panel_background.png     → 800x600 semi-transparent dark rectangle
ui_button_tab.png           → 200x60 gray rectangle
ui_button_tab_active.png    → 200x60 lighter gray rectangle
ui_item_slot.png            → 80x80 dark square with border
ui_item_slot_hover.png      → 80x80 lighter square with border
ui_tooltip_bg.png           → Scalable semi-transparent black rectangle
ui_dialogue_box.png         → 1200x300 dark rectangle with border
ui_portrait_frame.png       → 200x200 square with decorative border (optional)
```

**SHORTCUT:**
- Everything = rectangles with borders
- Transparency = 80% opacity black
- Can be single asset scaled to different sizes

**Total: 8 assets** (30 minutes)

---

### 6.4 Item Icons (10 core icons)

```
ui_icon_rifle.png           → 64x64 gun silhouette
ui_icon_blade.png           → 64x64 sword silhouette
ui_icon_armor.png           → 64x64 shield silhouette
ui_icon_consumable.png      → 64x64 bottle/potion silhouette
ui_icon_material.png        → 64x64 gear/cog silhouette
ui_icon_blueprint.png       → 64x64 scroll/paper silhouette
ui_icon_quest.png           → 64x64 exclamation mark
ui_icon_locked.png          → 64x64 padlock silhouette
ui_icon_equipped.png        → 64x64 checkmark
ui_icon_warning.png         → 64x64 triangle with "!"
```

**SHORTCUT:**
- Find free icon pack online (FontAwesome, Game-Icons.net)
- Or use simple geometric shapes in single color

**Total: 10 assets** (1 hour if drawing yourself, 10 minutes if using free icons)

**Total UI: 35 assets** (3 hours total, 1 hour if using engine text + free icons)

---

## 7. BOSS — LADY OF THE LAKE (Optional for MVP)

### 7.1 Minimal Boss Sprite (6 frames)

```
boss_lady_idle.png          → 256x256 large serpent/machine hybrid
boss_lady_attack.png        → Same sprite, different pose
boss_lady_special.png       → Glowing/charging effect
boss_lady_hit.png           → Tinted red
boss_lady_dead.png          → Lying flat
boss_lady_glow.png          → Purple energy overlay (corruption visual)
```

**SHORTCUT:**
- Big version of bog wurm + mechanical bits
- Machine half = gray rectangles/gears on one side
- Can be added post-MVP

**Total: 6 assets** (1-2 hours, OPTIONAL)

---

## 8. MAP & LOADING

### 8.1 Map (3 assets)

```
bog_map_layout.png          → 2048x2048 simple top-down layout (can be made in paint)
bog_map_fog.png             → Black overlay with transparency
bog_marker_generic.png      → 16x16 colored dot (recolor for different markers)
```

**Total: 3 assets** (30 minutes)

---

### 8.2 Loading Screen (2 assets)

```
loading_background.png      → 1920x1080 reuse title background OR solid black
loading_bar_bg.png          → 800x40 dark gray rectangle
loading_bar_fill.png        → 800x40 white/blue rectangle (fill)
```

**SHORTCUT:** Loading bg can literally be black screen with white text "LOADING..."

**Total: 3 assets** (15 minutes)

---

## FINAL MINIMAL ASSET COUNT

| Category | Asset Count | Est. Time |
|----------|-------------|-----------|
| **Environment** | 18 | 1-2 hours |
| **Enemies** | 24 | 2-3 hours |
| **NPCs** | 5 | 15 min |
| **Player Mech** | 12 | 1-2 hours |
| **Weapons/VFX** | 16 | 1 hour |
| **UI** | 35 | 1-3 hours |
| **Map/Loading** | 6 | 45 min |
| **Boss (Optional)** | 6 | 1-2 hours |

**TOTAL: ~122 assets (116 without boss)**  
**Total Time: 8-14 hours for complete minimal bog**  
*Can be reduced to 4-6 hours using free asset packs + engine features*

---

## FURTHER SHORTCUTS FOR SOLO DEV

### Use Free Asset Packs
**Recommended Sources:**
- **OpenGameArt.org** — Free tilesets, sprites, VFX
- **itch.io** — Tons of free/cheap game asset packs
- **Kenney.nl** — Free game assets (1-bit, pixel art)
- **Game-Icons.net** — Free SVG icons for UI

**Strategy:**
1. Find free top-down tileset (recolor to brown/green)
2. Find free character sprite pack (recolor for orcs)
3. Use geometric shapes for mechs (or find free mech pack)
4. Use engine's particle system instead of sprite particles

---

### Color = Identity

**Reuse Same Sprite, Different Colors:**
- Orc Warrior = Green tint
- Orc Scout = Blue tint  
- Corrupted NPC = Purple tint
- Boss = Red/Black tint

**One sprite → 4 enemy types via palette swap**

---

### Animation is Optional

**Static Sprites Work:**
- Don't need walk cycles → just slide sprite across screen
- Don't need attack animations → flash sprite + projectile
- Don't need death animations → fade sprite to transparent
- Don't need idle animations → sprite just exists

**Add "juice" via code:**
- Screen shake on hit
- Flash sprite white on damage
- Scale sprite up/down for "breathing"
- Rotate sprite for "falling"

---

### Engine Features Replace Assets

**Use Built-In:**
- **Text Rendering** → No need for font sprite sheets
- **Particle Systems** → No need for smoke/spark sprites
- **Shape Rendering** → Rectangles/circles for health bars, no textures needed
- **Color Overlays** → Tint sprites red for damage, no separate sprite needed
- **Rotation** → Turn sprite 90° for "dead" state

---

## ABSOLUTE BARE MINIMUM (MVP PLAYTHROUGH)

**If you need to make the bog playable THIS WEEKEND:**

### Super Minimal Set (40 assets, 2-3 hours)

**Environment:**
- 3 tiles (mud, stone, water)
- 1 wall/obstacle
- 1 mist overlay

**Enemies:**
- 1 enemy sprite (recolor 3 times for warrior/scout/wurm)
- 1 death sprite (same sprite rotated)
- 1 hit flash (red overlay)

**Player:**
- 1 mech sprite
- 1 weapon sprite (attached to mech)

**VFX:**
- 1 projectile (dot)
- 1 explosion (circle)
- 1 slash trail (arc)

**UI:**
- 3 bars (health, energy, heat) - colored rectangles
- 1 button sprite
- 1 panel background
- Use engine text for everything else

**NPCs:**
- 1 orb sprite (white circle)
- 1 corpse sprite (gray rectangle)

**Map:**
- 1 minimap (simple layout)
- 1 marker (colored dot)

**Load Screen:**
- Black screen + engine text "LOADING..."

**TOTAL: ~40 assets, mostly simple shapes**  
**Time: 2-3 hours if doing it yourself**  
**Time: 30 minutes if using free packs + engine features**

---

## RECOMMENDED WORKFLOW

### Week 1: Gameplay
- Use colored boxes for EVERYTHING
- Get mechanics working (movement, combat, enemy AI)
- Test entire bog loop with placeholders

### Week 2: Core Visuals
- Replace player box with actual mech sprite
- Replace enemy boxes with actual enemy sprites
- Replace environment with basic tileset

### Week 3: Polish
- Add VFX (explosions, impacts)
- Add UI styling
- Add environmental detail (ruins, trees)

### Week 4+: Iterate
- Add animations (if desired)
- Add boss sprite
- Add extra environmental detail
- Add particles/effects

---

## TOOLS FOR SOLO DEV

### Free Art Tools:
- **Aseprite** (paid, $20) or **LibreSprite** (free fork)
- **GIMP** (free Photoshop alternative)
- **Inkscape** (free vector graphics)
- **Paint.NET** (free, Windows only)

### Asset Creation:
- **Piskel** (free online pixel editor)
- **Lospec** (free palette generator)
- **TexturePacker** (sprite sheet tool)

### AI Tools (controversial but useful):
- Generate placeholder sprites with DALL-E/Midjourney
- Use as reference or temp assets
- Replace later with custom art

---

## FINAL RECOMMENDATION

**Phase 1: Get It Working (This Week)**
- 40 assets, colored shapes
- Total time: 2-3 hours

**Phase 2: Make It Pretty (Next Week)**  
- 120 assets, basic sprites
- Total time: 8-12 hours

**Phase 3: Polish (Future)**
- 875 assets, full animations
- Total time: 40+ hours

**Start with Phase 1. Ship something playable. Iterate.**

---

*Last Updated: 2026-02-16*  
*Version: Solo Dev Edition*  
*Remember: Gameplay > Graphics. Ship it.*
