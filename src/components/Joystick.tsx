import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Vector2 } from '../types';

interface JoystickProps {
  onMove: (vector: Vector2) => void;
  onEnd: () => void;
  autoCenter?: boolean;
  resetTrigger?: number;
}

export const Joystick: React.FC<JoystickProps> = ({ onMove, onEnd, autoCenter = true, resetTrigger = 0 }) => {
  const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // P5-D: Wrap callbacks in useCallback so their identity is stable across renders.
  // This allows including them in the dependency arrays below without causing
  // effect re-runs on every parent render. Without this, onMove/onEnd were stale
  // closures in the resetTrigger effect and the touch event effect.
  const onMoveStable = useCallback(onMove, [onMove]);
  const onEndStable = useCallback(onEnd, [onEnd]);

  // P5-D: previously omitted onMove and onEnd from deps — stale closure risk.
  useEffect(() => {
    if (resetTrigger > 0) {
      setPosition({ x: 0, y: 0 });
      onMoveStable({ x: 0, y: 0 });
      onEndStable();
    }
  }, [resetTrigger, onMoveStable, onEndStable]);

  const containerRef = useRef<HTMLDivElement>(null);
  const joystickSize = 120;
  const knobSize = 50;
  const maxDistance = joystickSize / 2;

  const handleStart = (_clientX: number, _clientY: number) => {
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = clientX - centerX;
    let dy = clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }

    setPosition({ x: dx, y: dy });
    onMoveStable({ x: dx / maxDistance, y: dy / maxDistance });
  };

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    if (autoCenter) {
      setPosition({ x: 0, y: 0 });
      onEndStable();
    }
  }, [autoCenter, onEndStable]);

  // P5-D: isDragging, handleMove, handleEnd all included so effect always
  // uses current versions, not stale closures from mount.
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleEnd();

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleEnd]);

  return (
    <div 
      ref={containerRef}
      className="relative rounded-full bg-emerald-950/30 border-2 border-emerald-500/20 flex items-center justify-center pointer-events-auto"
      style={{ width: joystickSize, height: joystickSize }}
      onTouchStart={(e) => {
        e.preventDefault();
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      <div 
        className="absolute rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 transition-transform duration-75"
        style={{ 
          width: knobSize, 
          height: knobSize,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </div>
  );
};
