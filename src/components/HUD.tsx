import React from 'react';
import { GameState } from '../types';
import { motion } from 'motion/react';

interface HUDProps {
  gameState: GameState;
  compact?: boolean;
}

export const HUD: React.FC<HUDProps> = ({ gameState, compact = false }) => {
  const { player, score } = gameState;
  const activeWeapon = player.weapons[player.activeWeaponIndex];
  const reloadCD = player.cooldowns[activeWeapon.reload_cooldown.id];
  const isReloading = reloadCD !== undefined;

  const hasShields = player.maxShields > 0;

  if (compact) {
    return (
      <div className="w-full h-full p-2 flex flex-col gap-1 overflow-hidden bg-black/20 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-emerald-400 font-bold">{score.toLocaleString()}</span>
          <div className="flex gap-1">
            {player.conditions.map(c => (
              <div key={c.id} className={`w-1.5 h-1.5 rounded-full ${c.type === 'positive' ? 'bg-blue-400' : 'bg-red-400'}`} title={c.label} />
            ))}
            <div className={`w-1.5 h-1.5 rounded-full ${isReloading ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
          </div>
        </div>
        
        <div className="flex flex-col gap-1 mt-1">
          {/* Shields */}
          {hasShields && player.shields > 0 && (
            <div className="h-1 bg-blue-950/50 rounded-full overflow-hidden border border-blue-400/20">
              <motion.div 
                className="h-full bg-blue-400"
                initial={{ width: '0%' }}
                animate={{ width: `${(player.shields / player.maxShields) * 100}%` }}
              />
            </div>
          )}
          {/* Health */}
          <div className="h-2 bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/50">
            <motion.div 
              className="h-full bg-emerald-500"
              initial={{ width: '100%' }}
              animate={{ width: `${(player.health / player.maxHealth) * 100}%` }}
            />
          </div>
          {/* Energy */}
          <div className="h-2 bg-blue-950 rounded-full overflow-hidden border border-blue-900/50">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: '100%' }}
              animate={{ width: `${(player.energy / player.maxEnergy) * 100}%` }}
            />
          </div>
          {/* Heat */}
          <div className="h-2 bg-orange-950 rounded-full overflow-hidden border border-orange-900/50">
            <motion.div 
              className="h-full bg-orange-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(player.heat / player.maxHeat) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <span className="text-[8px] text-emerald-500/50 truncate max-w-[60%]">{activeWeapon.name}</span>
          <span className="text-[10px] text-emerald-400 font-bold">{isReloading ? 'RLD' : player.ammo}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none p-4 md:p-8 font-mono">
      {/* Top Left: Score & Status */}
      <div className="flex flex-col gap-2">
        <div className="hardware-panel p-3 md:p-4 w-32 md:w-48 bg-black/40 backdrop-blur-sm">
          <div className="text-[8px] md:text-[10px] text-emerald-500/50 uppercase tracking-widest mb-1">Mission Score</div>
          <div className="text-lg md:text-2xl font-display text-emerald-400 neon-text">
            {score.toLocaleString().padStart(8, '0')}
          </div>
        </div>
        <div className="hardware-panel p-2 w-32 md:w-48 flex items-center gap-2 bg-black/40 backdrop-blur-sm">
          <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isReloading ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
          <div className="text-[8px] md:text-[10px] text-emerald-500 uppercase">
            {isReloading ? 'Reloading...' : 'System Online'}
          </div>
        </div>
        {/* Conditions */}
        <div className="flex gap-2">
          {player.conditions.map(c => (
            <div key={c.id} className={`hardware-panel px-2 py-1 flex items-center gap-1 bg-black/40 backdrop-blur-sm border-${c.type === 'positive' ? 'blue' : 'red'}-500/30`}>
              <div className={`w-1.5 h-1.5 rounded-full ${c.type === 'positive' ? 'bg-blue-400' : 'bg-red-400'}`} />
              <span className="text-[8px] text-white/60 uppercase">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Left: Mech Stats */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 flex flex-col gap-4">
        <div className="hardware-panel p-4 md:p-6 w-64 md:w-80 bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Shields */}
            {hasShields && (
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] md:text-[10px] uppercase tracking-tighter">
                  <span className="text-blue-400">Shielding</span>
                  {/* P2-C: shields were already correct — kept as-is */}
                  <span className="text-blue-300">{Math.ceil((player.shields / player.maxShields) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-blue-950/50 rounded-full overflow-hidden border border-blue-400/20">
                  <motion.div 
                    className="h-full bg-blue-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(player.shields / player.maxShields) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Health */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] md:text-[10px] uppercase tracking-tighter">
                <span className="text-emerald-500">Hull Integrity</span>
                {/* P2-C: was Math.ceil(player.health)% which showed "500%" at full health.
                    Fixed to compute actual percentage against maxHealth. */}
                <span className="text-emerald-400">{Math.ceil((player.health / player.maxHealth) * 100)}%</span>
              </div>
              <div className="h-1.5 md:h-2 bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/50">
                <motion.div 
                  className="h-full bg-emerald-500"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                />
              </div>
            </div>

            {/* Energy */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] md:text-[10px] uppercase tracking-tighter">
                <span className="text-blue-500">Core Energy</span>
                {/* P2-C: same fix applied to energy for consistency */}
                <span className="text-blue-400">{Math.ceil((player.energy / player.maxEnergy) * 100)}%</span>
              </div>
              <div className="h-1.5 md:h-2 bg-blue-950 rounded-full overflow-hidden border border-blue-900/50">
                <motion.div 
                  className="h-full bg-blue-500"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(player.energy / player.maxEnergy) * 100}%` }}
                />
              </div>
            </div>

            {/* Heat */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] md:text-[10px] uppercase tracking-tighter">
                <span className="text-orange-500">Thermal Load</span>
                {/* P2-C: same fix applied to heat for consistency */}
                <span className="text-orange-400">{Math.ceil((player.heat / player.maxHeat) * 100)}%</span>
              </div>
              <div className="h-1.5 md:h-2 bg-orange-950 rounded-full overflow-hidden border border-orange-900/50">
                <motion.div 
                  className="h-full bg-orange-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(player.heat / player.maxHeat) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right: Weapon Info */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 hidden sm:block">
        <div className="hardware-panel p-3 md:p-4 w-40 md:w-56 text-right bg-black/40 backdrop-blur-sm">
          <div className="text-[8px] md:text-[10px] text-emerald-500/50 uppercase mb-1">{activeWeapon.class}</div>
          <div className="text-sm md:text-lg font-display text-emerald-400">{activeWeapon.name.toUpperCase()}</div>
          
          {/* Ammo Display */}
          <div className="mt-2 flex flex-col items-end gap-1">
            <div className="text-[10px] text-emerald-400/80 font-bold">
              {isReloading ? 'RELOADING' : `${player.ammo} / ${activeWeapon.reload_cooldown.max_shots}`}
            </div>
            <div className="flex gap-1">
              {[...Array(activeWeapon.reload_cooldown.max_shots)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 md:w-2 h-3 rounded-sm border border-emerald-500/20 ${i < player.ammo ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-emerald-900/20'}`} 
                />
              ))}
            </div>
          </div>

          {/* Reload Progress Bar */}
          {isReloading && (
            <div className="mt-2 w-full h-1 bg-emerald-950 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-orange-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(1 - reloadCD.remaining / reloadCD.total) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
