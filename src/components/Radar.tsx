import React, { useEffect, useRef } from 'react';
import { GameState } from '../types';
import { MAP_WIDTH, MAP_HEIGHT, COLORS, VISION_RANGE, BOG_MAP, TILE_SIZE, TileType } from '../constants';

interface RadarProps {
  gameState: GameState;
}

export const Radar: React.FC<RadarProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { player, enemies, visibleTiles, exploredTiles } = gameState;
    const radarSize = canvas.width;
    // Radar range matches viewport roughly (1200x800), so we show a radius of ~600px
    const radarRange = 600; 
    const scale = radarSize / (radarRange * 2);

    ctx.clearRect(0, 0, radarSize, radarSize);

    // Draw Background
    ctx.fillStyle = 'rgba(0, 10, 0, 0.9)';
    ctx.beginPath();
    ctx.arc(radarSize / 2, radarSize / 2, radarSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw Background Grid
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < radarSize; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, radarSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(radarSize, i);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(radarSize / 2, radarSize / 2);
    
    // Draw Static Objects (Explored only)
    exploredTiles.forEach(key => {
      const [tx, ty] = key.split(',').map(Number);
      const worldX = tx * TILE_SIZE + TILE_SIZE / 2;
      const worldY = ty * TILE_SIZE + TILE_SIZE / 2;
      
      const dx = worldX - player.position.x;
      const dy = worldY - player.position.y;
      
      if (Math.abs(dx) < radarRange && Math.abs(dy) < radarRange) {
        const tile = BOG_MAP[ty][tx];
        if (tile === TileType.GROUND) return;

        const isVisible = visibleTiles.has(key);
        
        if (tile === TileType.WALL) ctx.fillStyle = isVisible ? '#555' : '#222';
        else if (tile === TileType.RUIN) ctx.fillStyle = isVisible ? '#444' : '#1a1a1a';
        else if (tile === TileType.TREE) ctx.fillStyle = isVisible ? '#1a331a' : '#0a140a';
        else if (tile === TileType.WATER) ctx.fillStyle = isVisible ? '#0d3a22' : '#061d11';
        
        const s = TILE_SIZE * scale;
        ctx.fillRect(dx * scale - s / 2, dy * scale - s / 2, s + 0.5, s + 0.5);
      }
    });

    // Draw Actors
    // Player
    ctx.fillStyle = COLORS.PLAYER;
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Player Direction
    ctx.strokeStyle = COLORS.PLAYER;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(player.aimRotation) * 10, Math.sin(player.aimRotation) * 10);
    ctx.stroke();

    // Enemies (Only if in LOS)
    enemies.forEach(enemy => {
      const dx = enemy.position.x - player.position.x;
      const dy = enemy.position.y - player.position.y;
      
      if (Math.abs(dx) < radarRange && Math.abs(dy) < radarRange) {
        const tx = Math.floor(enemy.position.x / TILE_SIZE);
        const ty = Math.floor(enemy.position.y / TILE_SIZE);
        if (visibleTiles.has(`${tx},${ty}`)) {
          ctx.fillStyle = '#ff0000';
          ctx.beginPath();
          ctx.arc(dx * scale, dy * scale, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow effect for enemies
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#ff0000';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    });

    ctx.restore();

    // Radar Overlay (Circles and Sweep)
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(radarSize / 2, radarSize / 2, radarSize / 2 - 1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(radarSize / 2, radarSize / 2, radarSize / 4, 0, Math.PI * 2);
    ctx.stroke();

    // Scanning Sweep Effect
    const time = Date.now() / 1000;
    ctx.save();
    ctx.translate(radarSize / 2, radarSize / 2);
    ctx.rotate(time * 2);
    const sweepGradient = ctx.createConicGradient(0, 0, 0);
    sweepGradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
    sweepGradient.addColorStop(0.2, 'rgba(0, 255, 0, 0)');
    ctx.fillStyle = sweepGradient;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radarSize / 2, 0, 1);
    ctx.fill();
    ctx.restore();

  }, [gameState]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <canvas 
        ref={canvasRef} 
        width={200} 
        height={200} 
        className="aspect-square h-full max-h-full"
      />
    </div>
  );
};
