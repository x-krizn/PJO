import { useState, useEffect } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { Joystick } from './components/Joystick';
import { FireButton } from './components/FireButton';
import { Radar } from './components/Radar';
import { GameState, Vector2 } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Target, Play, Info, Settings, Menu as MenuIcon } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [moveVector, setMoveVector] = useState<Vector2>({ x: 0, y: 0 });
  const [aimVector, setAimVector] = useState<Vector2>({ x: 0, y: 0 });
  const [isFiring, setIsFiring] = useState(false);
  const [moveMode, setMoveMode] = useState<'AUTO' | 'MANUAL' | 'SEMI'>('MANUAL');
  const [resetMoveTrigger, setResetMoveTrigger] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 1024
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // SW registration is handled by main.tsx via vite-plugin-pwa — do not duplicate here.
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-mono">
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 flex flex-col items-center gap-8 md:gap-12 p-4"
          >
            <div className="text-center space-y-4">
              <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white neon-text"
              >
                PROJECT: ORION
              </motion.h1>
              <p className="text-emerald-500/60 font-mono tracking-[0.2em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm">
                Tactical Mech Combat Initiative
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl px-4 md:px-8">
              <div className="hardware-panel p-4 md:p-6 space-y-2 md:space-y-4 group hover:border-emerald-500/50 transition-colors cursor-pointer">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                <h3 className="font-display text-sm md:text-lg">DEFENSE</h3>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Advanced composite plating and energy shielding systems.
                </p>
              </div>
              <div className="hardware-panel p-4 md:p-6 space-y-2 md:space-y-4 group hover:border-blue-500/50 transition-colors cursor-pointer">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                <h3 className="font-display text-sm md:text-lg">ENERGY</h3>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  High-output fusion core with rapid regeneration capabilities.
                </p>
              </div>
              <div className="hardware-panel p-4 md:p-6 space-y-2 md:space-y-4 group hover:border-orange-500/50 transition-colors cursor-pointer">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                <h3 className="font-display text-sm md:text-lg">OFFENSE</h3>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Precision targeting and thermal management protocols.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-4">
              <button 
                onClick={handleStartGame}
                className="hardware-panel px-8 md:px-12 py-4 flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-black transition-all group"
              >
                <Play className="w-5 h-5 fill-current" />
                <span className="font-display font-bold tracking-widest">INITIATE MISSION</span>
              </button>
              <div className="flex gap-4 justify-center">
                <button className="hardware-panel p-4 hover:bg-white/5 transition-all">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="hardware-panel p-4 hover:bg-white/5 transition-all">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-4 md:bottom-8 text-[8px] md:text-[10px] font-mono text-white/20 tracking-widest uppercase">
              System Version 0.4.2-BETA // Orion Initiative
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col lg:block"
          >
            {isMobile ? (
              <div className="flex flex-col h-full w-full bg-black relative">
                {/* Full Screen Viewport Background */}
                <div className="absolute inset-0 z-0">
                  <GameCanvas 
                    onStateUpdate={setGameState} 
                    moveVector={moveVector}
                    aimVector={aimVector}
                    isFiring={isFiring}
                  />
                </div>

                {/* Overlays */}
                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  {/* Top Row: Status & Radar */}
                  <div className="flex h-[18%] gap-1 p-1">
                    <div className="flex-1 hardware-panel border-blue-500/30 overflow-hidden relative bg-black/10 backdrop-blur-[2px] pointer-events-auto">
                      <div className="absolute top-1 left-2 text-[8px] text-blue-400 uppercase font-bold z-10">Status</div>
                      {gameState && <HUD gameState={gameState} compact />}
                    </div>
                    <div className="flex-1 hardware-panel border-orange-500/30 overflow-hidden relative bg-black/10 backdrop-blur-[2px] pointer-events-auto">
                      <div className="absolute top-1 left-2 text-[8px] text-orange-400 uppercase font-bold z-10">Radar</div>
                      {gameState && <Radar gameState={gameState} />}
                    </div>
                  </div>

                  {/* Spacer for middle viewport area */}
                  <div className="flex-grow" />

                  {/* Bottom Controls Area */}
                  <div className="p-1 space-y-1 pointer-events-auto">
                    {/* Action Bar */}
                    <div className="flex justify-center items-center gap-2 mb-1">
                      <button className="hardware-panel w-12 h-12 flex flex-col items-center justify-center bg-black/40 border-emerald-500/30 active:bg-emerald-500/20 transition-colors">
                        <MenuIcon className="w-5 h-5 text-emerald-500" />
                        <span className="text-[8px] text-emerald-500/50">MENU</span>
                      </button>

                      {[1, 2, 3, 4].map(i => (
                        <div 
                          key={i} 
                          className="hardware-panel w-12 h-12 flex flex-col items-center justify-center bg-black/40 border-emerald-500/30 transition-colors"
                        >
                          <span className="text-[8px] text-emerald-500/50">{i}</span>
                          <div className="w-5 h-5 border border-dashed border-white/10" />
                        </div>
                      ))}

                      <div className="relative w-12 h-12">
                        <FireButton 
                          onPress={() => setIsFiring(true)} 
                          onRelease={() => setIsFiring(false)} 
                        />
                      </div>
                    </div>

                    <div className="flex h-32 gap-1">
                      <div className="flex-1 hardware-panel border-emerald-500/30 flex items-center justify-center relative bg-black/20 backdrop-blur-sm">
                        <button 
                          onClick={() => {
                            const modes: ('AUTO' | 'MANUAL' | 'SEMI')[] = ['AUTO', 'MANUAL', 'SEMI'];
                            const nextIndex = (modes.indexOf(moveMode) + 1) % modes.length;
                            setMoveMode(modes[nextIndex]);
                          }}
                          className="absolute top-1 left-2 text-[8px] text-emerald-400 uppercase font-bold z-10 hover:bg-emerald-500/20 px-1 rounded transition-colors"
                        >
                          {moveMode}
                        </button>
                        
                        {moveMode === 'SEMI' && (
                          <button 
                            onClick={() => setResetMoveTrigger(prev => prev + 1)}
                            className="absolute top-1 right-2 text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase font-bold z-10 active:bg-emerald-500 active:text-black transition-all"
                          >
                            Center
                          </button>
                        )}

                        <Joystick 
                          onMove={setMoveVector} 
                          onEnd={() => {}} 
                          autoCenter={moveMode === 'AUTO'}
                          resetTrigger={resetMoveTrigger}
                        />
                      </div>
                      <div className="flex-1 hardware-panel border-red-500/30 flex items-center justify-center relative bg-black/20 backdrop-blur-sm">
                        <div className="absolute top-1 left-2 text-[8px] text-red-400 uppercase font-bold z-10">Targeting</div>
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Joystick 
                            onMove={setAimVector} 
                            onEnd={() => setAimVector({ x: 0, y: 0 })} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {gameState?.isGameOver && (
                    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 p-4 pointer-events-auto">
                      <div className="hardware-panel p-6 text-center space-y-4 border-red-500">
                        <h2 className="text-2xl font-display text-red-500 neon-text">MISSION FAILED</h2>
                        <p className="text-emerald-400">SCORE: {gameState.score}</p>
                        <button 
                          onClick={() => window.location.reload()}
                          className="hardware-panel px-6 py-2 w-full hover:bg-white/5 transition-all font-display text-sm"
                        >
                          RESTART
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <GameCanvas 
                  onStateUpdate={setGameState} 
                />
                {gameState && <HUD gameState={gameState} />}
                
                {/* Desktop Radar */}
                <div className="absolute top-8 right-8 w-48 h-48 hardware-panel border-orange-500/30 z-30 hidden lg:block">
                  <div className="absolute top-1 left-2 text-[8px] text-orange-400 uppercase font-bold">Radar</div>
                  {gameState && <Radar gameState={gameState} />}
                </div>
                
                {/* Action Bar */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                  <button className="hardware-panel w-12 h-12 flex flex-col items-center justify-center bg-black/40 border-emerald-500/30 active:bg-emerald-500/20 transition-colors">
                    <MenuIcon className="w-5 h-5 text-emerald-500" />
                    <span className="text-[8px] text-emerald-500/50">MENU</span>
                  </button>

                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i} 
                      className="hardware-panel w-12 h-12 flex flex-col items-center justify-center bg-black/40 border-emerald-500/30 transition-colors"
                    >
                      <span className="text-[8px] text-emerald-500/50">{i}</span>
                      <div className="w-5 h-5 border border-dashed border-white/10" />
                    </div>
                  ))}

                  <div className="relative w-12 h-12">
                    <FireButton 
                      onPress={() => setIsFiring(true)} 
                      onRelease={() => setIsFiring(false)} 
                    />
                  </div>
                </div>

                {gameState?.isGameOver && (
                  <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="hardware-panel p-8 md:p-12 text-center space-y-6 md:space-y-8 w-full max-w-md"
                    >
                      <h2 className="text-4xl md:text-6xl font-display text-red-500 neon-text">MISSION FAILED</h2>
                      <div className="space-y-2">
                        <p className="text-white/40 uppercase tracking-widest text-[10px]">Final Score</p>
                        <p className="text-3xl md:text-4xl font-display text-emerald-400">{gameState.score}</p>
                      </div>
                      <button 
                        onClick={() => window.location.reload()}
                        className="hardware-panel px-8 py-3 w-full hover:bg-white/5 transition-all font-display"
                      >
                        RESTART INITIATIVE
                      </button>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      </div>
    </div>
  );
}
