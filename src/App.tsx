import { useState, useEffect, useCallback } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { HUD }        from './components/HUD';
import { Joystick }   from './components/Joystick';
import { FireButton } from './components/FireButton';
import { Radar }      from './components/Radar';
import { GameState, Vector2, TargetLockMode, ActionBarMode } from './types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, Zap, Target, Play, Info, Settings,
  Menu as MenuIcon, X, ChevronRight,
} from 'lucide-react';

// ── Settings state type ───────────────────────────────────────────────────────
interface CombatSettings {
  moveMode:       'AUTO' | 'SEMI' | 'MANUAL';
  targetLockMode: TargetLockMode;
  autoLockNext:   boolean;
  actionBarMode:  ActionBarMode;
  autoAction:     boolean;
}

const DEFAULT_SETTINGS: CombatSettings = {
  moveMode:       'MANUAL',
  targetLockMode: TargetLockMode.AUTO,
  autoLockNext:   true,
  actionBarMode:  ActionBarMode.CHAIN,
  autoAction:     false,
};

// ── SettingsMenu ──────────────────────────────────────────────────────────────
const SettingsMenu: React.FC<{
  settings:    CombatSettings;
  onChange:    (s: CombatSettings) => void;
  onClose:     () => void;
}> = ({ settings, onChange, onClose }) => {
  const set = <K extends keyof CombatSettings>(key: K, val: CombatSettings[K]) =>
    onChange({ ...settings, [key]: val });

  const Row: React.FC<{ label: string; sub?: string; children: React.ReactNode }> = ({ label, sub, children }) => (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
      <div>
        <div className="text-[11px] text-white/80 uppercase tracking-wider">{label}</div>
        {sub && <div className="text-[9px] text-white/30 mt-0.5">{sub}</div>}
      </div>
      <div className="flex gap-1 shrink-0">{children}</div>
    </div>
  );

  const Btn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider border transition-all
        ${active
          ? 'bg-emerald-500 border-emerald-400 text-black'
          : 'bg-black/40 border-emerald-500/20 text-emerald-500/60 hover:border-emerald-500/50'
        }`}
    >
      {children}
    </button>
  );

  const Toggle: React.FC<{ value: boolean; onToggle: () => void }> = ({ value, onToggle }) => (
    <button
      onClick={onToggle}
      className={`px-3 py-1 text-[9px] font-bold uppercase border transition-all
        ${value
          ? 'bg-emerald-500 border-emerald-400 text-black'
          : 'bg-black/40 border-white/10 text-white/40 hover:border-emerald-500/40'
        }`}
    >
      {value ? 'ON' : 'OFF'}
    </button>
  );

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4 pointer-events-auto">
      <div className="hardware-panel w-full max-w-sm bg-black/90 p-4 space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-display text-emerald-400 uppercase tracking-widest">Combat Settings</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Movement */}
        <Row label="Movement" sub="How the player mech moves">
          <Btn active={settings.moveMode === 'AUTO'}   onClick={() => set('moveMode', 'AUTO')}>Auto</Btn>
          <Btn active={settings.moveMode === 'SEMI'}   onClick={() => set('moveMode', 'SEMI')}>Semi</Btn>
          <Btn active={settings.moveMode === 'MANUAL'} onClick={() => set('moveMode', 'MANUAL')}>Manual</Btn>
        </Row>

        {/* Target Lock */}
        <Row label="Target Lock" sub="Auto · nearest in range  Semi · nearest in cone  Manual · tap only">
          <Btn active={settings.targetLockMode === TargetLockMode.AUTO}   onClick={() => set('targetLockMode', TargetLockMode.AUTO)}>Auto</Btn>
          <Btn active={settings.targetLockMode === TargetLockMode.SEMI}   onClick={() => set('targetLockMode', TargetLockMode.SEMI)}>Semi</Btn>
          <Btn active={settings.targetLockMode === TargetLockMode.MANUAL} onClick={() => set('targetLockMode', TargetLockMode.MANUAL)}>Manual</Btn>
        </Row>

        {/* Auto-Lock Next */}
        <Row label="Auto-Lock Next" sub="Lock on hit target if in range + line of sight">
          <Toggle value={settings.autoLockNext} onToggle={() => set('autoLockNext', !settings.autoLockNext)} />
        </Row>

        {/* Action Bar Mode */}
        <Row label="Action Bar" sub="Trigger · 1 tap per burst step  Chain · 1 tap = full chain">
          <Btn active={settings.actionBarMode === ActionBarMode.TRIGGER} onClick={() => set('actionBarMode', ActionBarMode.TRIGGER)}>Trigger</Btn>
          <Btn active={settings.actionBarMode === ActionBarMode.CHAIN}   onClick={() => set('actionBarMode', ActionBarMode.CHAIN)}>Chain</Btn>
        </Row>

        {/* Auto Action */}
        <Row label="Auto Action" sub="Skill 1 repeats after reload automatically">
          <Toggle value={settings.autoAction} onToggle={() => set('autoAction', !settings.autoAction)} />
        </Row>

        <div className="pt-2 text-[8px] text-white/20 text-center uppercase tracking-widest">
          Orion v0.4.3 · Settings apply immediately
        </div>
      </div>
    </div>
  );
};

// ── Skill button ──────────────────────────────────────────────────────────────
// Sends a discrete increment signal to GameCanvas each press.
// In Trigger mode: each press = one burst step.
// In Chain mode: each press = start full chain (if not already running).
const SkillButton: React.FC<{
  label:     string;
  onPress:   () => void;
  disabled?: boolean;
  className?: string;
}> = ({ label, onPress, disabled, className = '' }) => (
  <button
    onPointerDown={(e) => { e.preventDefault(); if (!disabled) onPress(); }}
    disabled={disabled}
    className={`hardware-panel flex flex-col items-center justify-center
      bg-black/40 border-emerald-500/30 active:bg-emerald-500/30 transition-colors select-none
      ${disabled ? 'opacity-40' : 'hover:border-emerald-500/60'}
      ${className}`}
  >
    <span className="text-[7px] text-emerald-500/50 uppercase">SK</span>
    <span className="text-[11px] font-bold text-emerald-400">{label}</span>
  </button>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [gameState,   setGameState]   = useState<GameState | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const [moveVector, setMoveVector] = useState<Vector2>({ x: 0, y: 0 });
  const [aimVector,  setAimVector]  = useState<Vector2>({ x: 0, y: 0 });
  const [isFiring,   setIsFiring]   = useState(false);

  // Settings
  const [settings,   setSettings]   = useState<CombatSettings>(DEFAULT_SETTINGS);
  const [menuOpen,   setMenuOpen]   = useState(false);

  // Skill trigger — increments each time skill 0 button is pressed
  const [skillTrigger, setSkillTrigger] = useState(0);
  const fireSkill0 = useCallback(() => setSkillTrigger(n => n + 1), []);

  // Reset trigger for SEMI move joystick
  const [resetMoveTrigger, setResetMoveTrigger] = useState(0);

  // P0-B: increment remounts <GameCanvas> cleanly without page reload
  const [sessionKey, setSessionKey] = useState(0);

  const handleRestart = () => { setGameState(null); setSessionKey(k => k + 1); };

  useEffect(() => {
    const update = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                     || window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', () => setTimeout(update, 100));
    return () => { window.removeEventListener('resize', update); };
  }, []);

  // ── Shared canvas props ────────────────────────────────────────────────────
  const sharedCanvasProps = {
    key:            sessionKey,
    onStateUpdate:  setGameState,
    targetLockMode: settings.targetLockMode,
    autoLockNext:   settings.autoLockNext,
    actionBarMode:  settings.actionBarMode,
    autoAction:     settings.autoAction,
    skillTrigger,
  };

  // ── Game-over overlay (reused in mobile layouts) ───────────────────────────
  const gameOverOverlay = gameState?.isGameOver ? (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 p-4 pointer-events-auto">
      <div className="hardware-panel p-6 text-center space-y-4 border-red-500 w-full max-w-xs">
        <h2 className="text-2xl font-display text-red-500 neon-text">MISSION FAILED</h2>
        <p className="text-emerald-400">SCORE: {gameState.score}</p>
        <button onClick={handleRestart} className="hardware-panel px-6 py-2 w-full hover:bg-white/5 transition-all font-display text-sm">
          RESTART
        </button>
      </div>
    </div>
  ) : null;

  // ── Action bar (shared between portrait and landscape) ─────────────────────
  const actionBar = (size: 'sm' | 'md' = 'md') => {
    const w = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
    return (
      <div className="flex items-center gap-1 pointer-events-auto">
        {/* Menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`hardware-panel ${w} flex flex-col items-center justify-center bg-black/60 border-emerald-500/30 active:bg-emerald-500/20 transition-colors`}
        >
          <MenuIcon className="w-4 h-4 text-emerald-500" />
        </button>

        {/* Skill 0 — GLADIUS chain */}
        <SkillButton
          label="1"
          onPress={fireSkill0}
          className={`${w}`}
        />

        {/* Skill slots 2–4: placeholder */}
        {[2, 3, 4].map(i => (
          <div key={i} className={`hardware-panel ${w} flex flex-col items-center justify-center bg-black/40 border-emerald-500/10`}>
            <span className="text-[7px] text-emerald-500/20 uppercase">SK</span>
            <span className="text-[9px] text-white/10">{i}</span>
          </div>
        ))}
      </div>
    );
  };

  // ── Mobile canvas (always has isMobile=true + joystick vectors) ───────────
  const mobileCanvas = (
    <GameCanvas
      {...sharedCanvasProps}
      moveVector={moveVector}
      aimVector={aimVector}
      isFiring={isFiring}
      isMobile={true}
    />
  );

  // ── Joystick panels ────────────────────────────────────────────────────────
  const moveJoystick = (size: number) => (
    <div className="hardware-panel border-emerald-500/30 bg-black/50 flex items-center justify-center relative"
         style={{ width: size, height: size }}>
      <button
        onClick={() => setSettings(s => {
          const modes = ['AUTO', 'SEMI', 'MANUAL'] as const;
          return { ...s, moveMode: modes[(modes.indexOf(s.moveMode) + 1) % 3] };
        })}
        className="absolute top-1 left-1 text-[7px] text-emerald-400 uppercase font-bold z-10 px-1 bg-black/40 rounded"
      >
        {settings.moveMode}
      </button>
      {settings.moveMode === 'SEMI' && (
        <button
          onClick={() => setResetMoveTrigger(p => p + 1)}
          className="absolute top-1 right-1 text-[7px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 rounded uppercase font-bold z-10"
        >
          CTR
        </button>
      )}
      <Joystick
        onMove={setMoveVector}
        onEnd={() => {}}
        autoCenter={settings.moveMode === 'AUTO'}
        resetTrigger={resetMoveTrigger}
      />
    </div>
  );

  const aimJoystick = (size: number) => (
    <div className="hardware-panel border-red-500/30 bg-black/50 flex items-center justify-center relative"
         style={{ width: size, height: size }}>
      <div className="absolute top-1 left-1 text-[7px] text-red-400 uppercase font-bold z-10">AIM</div>
      <Joystick onMove={setAimVector} onEnd={() => setAimVector({ x: 0, y: 0 })} />
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  //  Mobile landscape layout
  // ════════════════════════════════════════════════════════════════════════════
  const mobileLandscapeGame = (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">{mobileCanvas}</div>

      {/* Top-left: status */}
      <div className="absolute top-0 left-0 z-10 pointer-events-auto" style={{ width: 168 }}>
        <div className="hardware-panel border-blue-500/30 bg-black/70 backdrop-blur-sm m-1 overflow-hidden relative" style={{ height: 110 }}>
          <div className="absolute top-1 left-2 text-[8px] text-blue-400 uppercase font-bold z-10">Status</div>
          {gameState && <HUD gameState={gameState} compact />}
        </div>
      </div>

      {/* Top-right: radar */}
      <div className="absolute top-0 right-0 z-10 pointer-events-auto" style={{ width: 130 }}>
        <div className="hardware-panel border-orange-500/30 bg-black/70 backdrop-blur-sm m-1 overflow-hidden relative" style={{ height: 130 }}>
          <div className="absolute top-1 left-2 text-[8px] text-orange-400 uppercase font-bold z-10">Radar</div>
          {gameState && <Radar gameState={gameState} />}
        </div>
      </div>

      {/* Center-bottom: action bar + fire */}
      <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center items-end gap-2 pointer-events-none">
        <div className="pointer-events-auto">{actionBar('sm')}</div>
        <FireButton onPress={() => setIsFiring(true)} onRelease={() => setIsFiring(false)} />
      </div>

      {/* Bottom-left: move joystick */}
      <div className="absolute bottom-0 left-0 z-10 pointer-events-auto m-1">
        {moveJoystick(140)}
      </div>

      {/* Bottom-right: aim joystick */}
      <div className="absolute bottom-0 right-0 z-10 pointer-events-auto m-1">
        {aimJoystick(140)}
      </div>

      {menuOpen && (
        <SettingsMenu settings={settings} onChange={setSettings} onClose={() => setMenuOpen(false)} />
      )}
      {gameOverOverlay}
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  //  Mobile portrait layout
  // ════════════════════════════════════════════════════════════════════════════
  const mobilePortraitGame = (
    <div className="flex flex-col h-full w-full bg-black relative">
      <div className="absolute inset-0 z-0">{mobileCanvas}</div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Top panels */}
        <div className="flex gap-1 p-1 pointer-events-auto" style={{ height: 116 }}>
          <div className="flex-1 hardware-panel border-blue-500/30 overflow-hidden relative bg-black/70 backdrop-blur-[2px]">
            <div className="absolute top-1 left-2 text-[8px] text-blue-400 uppercase font-bold z-10">Status</div>
            {gameState && <HUD gameState={gameState} compact />}
          </div>
          <div className="flex-1 hardware-panel border-orange-500/30 overflow-hidden relative bg-black/70 backdrop-blur-[2px]">
            <div className="absolute top-1 left-2 text-[8px] text-orange-400 uppercase font-bold z-10">Radar</div>
            {gameState && <Radar gameState={gameState} />}
          </div>
        </div>

        <div className="flex-grow" />

        {/* Bottom controls */}
        <div className="pointer-events-auto bg-black/60 backdrop-blur-sm">
          {/* Action bar row */}
          <div className="flex justify-center items-center gap-1.5 pt-1.5 px-1">
            {actionBar('md')}
            <div className="relative w-10 h-10">
              <FireButton onPress={() => { setIsFiring(true); fireSkill0(); }} onRelease={() => setIsFiring(false)} />
            </div>
          </div>

          {/* Joystick row */}
          <div className="flex gap-1 p-1" style={{ height: 134 }}>
            <div className="flex-1 flex items-center justify-center relative">
              {moveJoystick(120)}
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              {aimJoystick(120)}
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <SettingsMenu settings={settings} onChange={setSettings} onClose={() => setMenuOpen(false)} />
      )}
      {gameOverOverlay}
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  //  Root render
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div className="relative w-screen overflow-hidden flex items-center justify-center font-mono"
         style={{ height: '100dvh' }}>
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          // ── Main menu ───────────────────────────────────────────────────────
          <motion.div key="menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-10 flex flex-col items-center gap-6 md:gap-12 p-4 w-full max-h-full overflow-auto"
          >
            <div className="text-center space-y-2 md:space-y-4">
              <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }}
                className="text-4xl md:text-8xl font-display font-bold tracking-tighter text-white neon-text">
                PROJECT: ORION
              </motion.h1>
              <p className="text-emerald-500/60 font-mono tracking-[0.2em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm">
                Tactical Mech Combat Initiative
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-6 w-full max-w-4xl px-2 md:px-8">
              {[
                { icon: <Shield className="w-5 h-5 md:w-8 md:h-8 text-emerald-500" />, label: 'DEFENSE',  color: 'emerald', desc: 'Advanced composite plating and energy shielding systems.' },
                { icon: <Zap    className="w-5 h-5 md:w-8 md:h-8 text-blue-500"    />, label: 'ENERGY',   color: 'blue',    desc: 'High-output fusion core with rapid regeneration.' },
                { icon: <Target className="w-5 h-5 md:w-8 md:h-8 text-orange-500"  />, label: 'OFFENSE',  color: 'orange',  desc: 'Precision targeting and thermal management.' },
              ].map(({ icon, label, color, desc }) => (
                <div key={label}
                  className={`hardware-panel p-3 md:p-6 space-y-2 md:space-y-4 hover:border-${color}-500/50 transition-colors cursor-pointer`}>
                  {icon}
                  <h3 className="font-display text-xs md:text-lg">{label}</h3>
                  <p className="text-[8px] text-white/40 leading-relaxed hidden md:block">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto px-4">
              <button onClick={() => setGameStarted(true)}
                className="hardware-panel px-8 md:px-12 py-3 md:py-4 flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-black transition-all">
                <Play className="w-5 h-5 fill-current" />
                <span className="font-display font-bold tracking-widest">INITIATE MISSION</span>
              </button>
              <div className="flex gap-3 justify-center">
                <button className="hardware-panel p-3 md:p-4 hover:bg-white/5 transition-all"><Settings className="w-5 h-5" /></button>
                <button className="hardware-panel p-3 md:p-4 hover:bg-white/5 transition-all"><Info className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="text-[8px] md:text-[10px] font-mono text-white/20 tracking-widest uppercase">
              System Version 0.4.3-BETA // Orion Initiative
            </div>
          </motion.div>
        ) : (
          // ── Game ────────────────────────────────────────────────────────────
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
            {isMobile ? (
              isLandscape ? mobileLandscapeGame : mobilePortraitGame
            ) : (
              // ── Desktop ────────────────────────────────────────────────────
              <div className="relative w-full h-full">
                <GameCanvas {...sharedCanvasProps} isMobile={false} />
                {gameState && <HUD gameState={gameState} />}

                <div className="absolute top-8 right-8 w-48 h-48 hardware-panel border-orange-500/30 z-30 hidden lg:block">
                  <div className="absolute top-1 left-2 text-[8px] text-orange-400 uppercase font-bold">Radar</div>
                  {gameState && <Radar gameState={gameState} />}
                </div>

                {/* Desktop action bar */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                  {actionBar('md')}
                  <div className="relative w-10 h-10">
                    <FireButton onPress={() => setIsFiring(true)} onRelease={() => setIsFiring(false)} />
                  </div>
                </div>

                {gameState?.isGameOver && (
                  <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="hardware-panel p-8 md:p-12 text-center space-y-6 md:space-y-8 w-full max-w-md">
                      <h2 className="text-4xl md:text-6xl font-display text-red-500 neon-text">MISSION FAILED</h2>
                      <div className="space-y-2">
                        <p className="text-white/40 uppercase tracking-widest text-[10px]">Final Score</p>
                        <p className="text-3xl md:text-4xl font-display text-emerald-400">{gameState.score}</p>
                      </div>
                      <button onClick={handleRestart} className="hardware-panel px-8 py-3 w-full hover:bg-white/5 transition-all font-display">
                        RESTART INITIATIVE
                      </button>
                    </motion.div>
                  </div>
                )}

                {menuOpen && (
                  <SettingsMenu settings={settings} onChange={setSettings} onClose={() => setMenuOpen(false)} />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("/textures/carbon-fibre.png")' }} />
      </div>
    </div>
  );
}
