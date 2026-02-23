import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Vector2 } from '../types';

interface JoystickProps {
  onMove: (vector: Vector2) => void;
  onEnd: () => void;
  autoCenter?: boolean;
  resetTrigger?: number;
}

export const Joystick: React.FC<JoystickProps> = ({
  onMove,
  onEnd,
  autoCenter = true,
  resetTrigger = 0,
}) => {
  const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  // ── Per-instance touch identifier ────────────────────────────────────────
  // Each joystick claims one finger on touchstart and stores its identifier.
  // All window-level touchmove / touchend handlers ignore touches that don't
  // match this identifier, which prevents the two joysticks from interfering
  // with each other when both fingers are down simultaneously.
  const touchIdRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const joystickSize = 120;
  const knobSize = 50;
  const maxDistance = joystickSize / 2;

  // P5-D: stable callback refs so useEffect deps are correct
  const onMoveStable = useCallback(onMove, [onMove]);
  const onEndStable = useCallback(onEnd, [onEnd]);

  // P5-D: resetTrigger effect with correct deps
  useEffect(() => {
    if (resetTrigger > 0) {
      setPosition({ x: 0, y: 0 });
      onMoveStable({ x: 0, y: 0 });
      onEndStable();
    }
  }, [resetTrigger, onMoveStable, onEndStable]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let dx = clientX - cx;
    let dy = clientY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }

    setPosition({ x: dx, y: dy });
    onMoveStable({ x: dx / maxDistance, y: dy / maxDistance });
  }, [onMoveStable, maxDistance]);

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
    touchIdRef.current = null;
    if (autoCenter) {
      setPosition({ x: 0, y: 0 });
      onEndStable();
    }
  }, [autoCenter, onEndStable]);

  // ── Window-level touch tracking ───────────────────────────────────────────
  // touchmove and touchend must be on window (not the container) so the
  // gesture continues even when the finger moves outside the joystick bounds.
  // Both handlers check touchIdRef so only the owning joystick reacts.
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (touchIdRef.current === null) return;
      // Find the specific finger that owns this joystick
      const touch = Array.from(e.touches).find(
        t => t.identifier === touchIdRef.current
      );
      if (touch) {
        e.preventDefault();
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchIdRef.current === null) return;
      // Only end if OUR finger lifted — not any other finger
      const ended = Array.from(e.changedTouches).find(
        t => t.identifier === touchIdRef.current
      );
      if (ended) handleEnd();
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-full bg-emerald-950/30 border-2 border-emerald-500/20 flex items-center justify-center pointer-events-auto"
      style={{ width: joystickSize, height: joystickSize }}
      onTouchStart={(e) => {
        e.preventDefault();
        // Only claim a finger if this joystick isn't already active
        if (touchIdRef.current !== null) return;
        const touch = e.changedTouches[0];
        touchIdRef.current = touch.identifier;
        isDraggingRef.current = true;
      }}
    >
      <div
        className="absolute rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 transition-transform duration-75"
        style={{
          width: knobSize,
          height: knobSize,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
};
